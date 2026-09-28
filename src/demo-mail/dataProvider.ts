import type { DataProvider, Identifier } from "ra-core";
import { withLifecycleCallbacks } from "ra-core";
import fakeRestDataProvider from "ra-data-fakerest";
import { generateData, toSnippet } from "./data/generateData";
import type { Message } from "./types";

const baseDataProvider = fakeRestDataProvider(generateData(), true, 300);

const deleteThreadMessages = async (
  threadIds: Identifier[],
  dataProvider: DataProvider,
) => {
  const { data } = await dataProvider.getList<Message>("messages", {
    filter: { thread_id: threadIds },
    pagination: { page: 1, perPage: 1000 },
    sort: { field: "id", order: "ASC" },
  });
  if (data.length > 0) {
    await dataProvider.deleteMany("messages", {
      ids: data.map((message) => message.id),
    });
  }
};

/**
 * Simulates the server-side logic of a mail backend:
 * a new message updates its thread, and deleting a thread deletes its messages.
 */
export const dataProvider = withLifecycleCallbacks(baseDataProvider, [
  {
    resource: "messages",
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
