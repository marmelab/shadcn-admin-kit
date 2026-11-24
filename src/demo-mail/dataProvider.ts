import type { DataProvider, Identifier } from "ra-core";
import { withLifecycleCallbacks } from "ra-core";
import fakeRestDataProvider from "ra-data-fakerest";
import { account } from "./account";
import { generateData, toSnippet } from "./data/generateData";
import type { Contact, Message, Thread } from "./types";

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
        ...[...thread.to, ...thread.cc].flatMap(({ name, email }) => [
          name,
          email,
        ]),
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
  // "content". A word starting with punctuation ("@example.com") matches
  // anywhere.
  const patterns = words.map((word) => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const wordStart = /^[\p{L}\p{N}]/u.test(word) ? "(^|[^\\p{L}\\p{N}])" : "";
    return new RegExp(`${wordStart}${escaped}`, "u");
  });
  return [...texts]
    .filter(([, text]) => {
      const normalized = normalize(text);
      return patterns.every((pattern) => pattern.test(normalized));
    })
    .map(([id]) => id);
};

/**
 * The searches in progress: the list and its unread counter search at once,
 * and share the scan
 */
const pendingSearches = new Map<string, Promise<Identifier[]>>();

const searchThreadsOnce = (q: string) => {
  let search = pendingSearches.get(q);
  if (!search) {
    search = searchThreads(q).finally(() => pendingSearches.delete(q));
    pendingSearches.set(q, search);
  }
  return search;
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
    const ids = await searchThreadsOnce(q);
    return fakeRest.getList(resource, {
      ...params,
      filter: { ...filter, id: ids },
    });
  },
};

/**
 * Names of the known correspondents by address, fetched only when there are
 * addresses to resolve (most thread updates have none)
 */
const getContactNames = async (emails: string[]) => {
  if (!emails.some(Boolean)) return new Map<string, string>();
  const threads = await getAll<Thread>("threads");
  // Reversed, so that the first occurrence of an address wins
  return new Map(
    threads
      .flatMap((thread) => [thread, ...thread.to, ...thread.cc])
      .reverse()
      .map((contact) => [contact.email, contact.name]),
  );
};

/** Fields derived from the draft body and from the recipient addresses */
const withDraftFields = async (data: Partial<Thread>) => {
  const names = await getContactNames([
    data.email ?? "",
    ...[...(data.to ?? []), ...(data.cc ?? [])].map(({ email }) => email),
  ]);
  const withNames = (contacts: Contact[]) =>
    contacts.map(({ email }) => ({ name: names.get(email) ?? email, email }));
  return {
    ...data,
    ...(typeof data.draft === "string"
      ? { snippet: toSnippet(data.draft), updated_at: new Date().toISOString() }
      : {}),
    ...(typeof data.email === "string"
      ? { name: names.get(data.email) ?? data.email }
      : {}),
    ...(data.to ? { to: withNames(data.to) } : {}),
    ...(data.cc ? { cc: withNames(data.cc) } : {}),
  };
};

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
 * thread (and sets its mute toggle), moving a draft to the sent folder turns
 * its body into a message, and deleting a thread deletes its messages.
 */
export const dataProvider = withLifecycleCallbacks(baseDataProvider, [
  {
    resource: "messages",
    beforeCreate: async (params, dataProvider) => {
      const { mute, ...data } = params.data;
      if (typeof mute === "boolean") {
        await dataProvider.update("threads", {
          id: data.thread_id,
          data: { muted: mute },
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
        to: [],
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
          to: [{ name: thread.name, email: thread.email }, ...thread.to],
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
