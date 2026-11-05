import type { DataProvider, Identifier } from "ra-core";
import { withLifecycleCallbacks } from "ra-core";
import fakeRestDataProvider from "ra-data-fakerest";
import { account } from "./account";
import { generateData, toSnippet } from "./data/generateData";
import type { Message, Thread } from "./types";

const fakeRest = fakeRestDataProvider(generateData(), true, 300);

const getAll = <RecordType extends Thread | Message>(
  resource: string,
  filter: Record<string, unknown> = {},
) =>
  fakeRest
    .getList<RecordType>(resource, {
      filter,
      pagination: { page: 1, perPage: 10000 },
      sort: { field: "id", order: "ASC" },
    })
    .then(({ data }) => data);

/** Lowercase and without accents, so that "reunion" finds "Réunion" */
const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

/**
 * Ids of the threads containing every word of the search in their subject,
 * correspondents, draft or messages.
 */
const searchThreads = async (q: string) => {
  const words = normalize(q).split(/\s+/).filter(Boolean);
  const [threads, messages] = await Promise.all([
    getAll<Thread>("threads"),
    getAll<Message>("messages"),
  ]);
  const texts = new Map<Identifier, string>(
    threads.map((thread) => [
      thread.id,
      [
        thread.subject,
        thread.name,
        thread.email,
        ...thread.cc.flatMap(({ name, email }) => [name, email]),
        thread.draft ?? "",
      ].join(" "),
    ]),
  );
  messages.forEach((message) => {
    texts.set(
      message.thread_id,
      `${texts.get(message.thread_id) ?? ""} ${message.name} ${message.message}`,
    );
  });
  // Each word of the search starts a word of the text: "tent" does not find
  // "content"
  const patterns = words.map(
    (word) =>
      new RegExp(
        `(^|[^\\p{L}\\p{N}])${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
        "u",
      ),
  );
  return [...texts]
    .filter(([, text]) => {
      const normalized = normalize(text);
      return patterns.every((pattern) => pattern.test(normalized));
    })
    .map(([id]) => id);
};

/**
 * The FakeRest full-text search matches any word in any field, dates and
 * folder names included. A mail client searches for all the words, in the
 * messages too.
 */
const baseDataProvider: DataProvider = {
  ...fakeRest,
  getList: async (resource, params) => {
    const { q, ...filter } = params.filter ?? {};
    if (resource !== "threads" || !q) {
      return fakeRest.getList(resource, params);
    }
    const ids = await searchThreads(q);
    return fakeRest.getList(resource, {
      ...params,
      filter: { ...filter, id: ids },
    });
  },
};

/** Name of a known correspondent, or the address itself */
const getContactName = async (email: string) => {
  if (!email) return "";
  const threads = await getAll<Thread>("threads");
  const contact = threads
    .flatMap((thread) => [thread, ...thread.cc])
    .find((contact) => contact.email === email);
  return contact?.name ?? email;
};

/** Fields derived from the draft body and from the recipient addresses */
const withDraftFields = async (data: Partial<Thread>) => ({
  ...data,
  ...(typeof data.draft === "string"
    ? { snippet: toSnippet(data.draft), updated_at: new Date().toISOString() }
    : {}),
  ...(typeof data.email === "string"
    ? { name: await getContactName(data.email) }
    : {}),
  ...(data.cc
    ? {
        cc: await Promise.all(
          data.cc.map(async ({ email }) => ({
            name: await getContactName(email),
            email,
          })),
        ),
      }
    : {}),
});

const deleteThreadMessages = async (
  threadIds: Identifier[],
  dataProvider: DataProvider,
) => {
  const messages = await getAll<Message>("messages", { thread_id: threadIds });
  if (messages.length > 0) {
    await dataProvider.deleteMany("messages", {
      ids: messages.map((message) => message.id),
    });
  }
};

/**
 * Simulates the server-side logic of a mail backend: a new message updates its
 * thread (and mutes it when asked), moving a draft to the sent folder turns
 * its body into a message, and deleting a thread deletes its messages.
 */
export const dataProvider = withLifecycleCallbacks(baseDataProvider, [
  {
    resource: "messages",
    beforeCreate: async (params, dataProvider) => {
      const { mute, ...data } = params.data;
      if (mute) {
        await dataProvider.update("threads", {
          id: data.thread_id,
          data: { muted: true },
          previousData: {},
        });
      }
      return { ...params, data };
    },
    afterCreate: async (result, dataProvider) => {
      const message = result.data as Message;
      await dataProvider.update("threads", {
        id: message.thread_id,
        data: {
          snippet: toSnippet(message.message),
          updated_at: message.timestamp,
          read: true,
        },
        previousData: {},
      });
      return result;
    },
  },
  {
    resource: "threads",
    beforeCreate: async (params) => ({
      ...params,
      data: await withDraftFields({
        category: "primary",
        labels: [],
        read: true,
        starred: false,
        muted: false,
        cc: [],
        ...params.data,
      }),
    }),
    beforeUpdate: async (params, dataProvider) => {
      const data = await withDraftFields(params.data);
      if (data.folder !== "sent") return { ...params, data };
      const { data: stored } = await dataProvider.getOne<Thread>("threads", {
        id: params.id,
      });
      if (stored.folder !== "drafts") return { ...params, data };
      const thread = { ...stored, ...data };
      await dataProvider.create("messages", {
        data: {
          thread_id: thread.id,
          author: "me",
          ...account,
          to: [{ name: thread.name, email: thread.email }],
          cc: thread.cc,
          message: thread.draft ?? "",
          timestamp: new Date().toISOString(),
        },
      });
      return { ...params, data: { ...data, draft: null } };
    },
    beforeDelete: async (params, dataProvider) => {
      await deleteThreadMessages([params.id], dataProvider);
      return params;
    },
    beforeDeleteMany: async (params, dataProvider) => {
      await deleteThreadMessages(params.ids, dataProvider);
      return params;
    },
  },
]);
