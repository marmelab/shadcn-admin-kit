import type { QueryClient } from "@tanstack/react-query";
import type { GetListResult } from "ra-core";
import type { Thread } from "../types";

interface ThreadListParams {
  filter?: Record<string, unknown>;
  pagination?: { page: number; perPage: number };
}

// ra-core keys getList queries as [resource, "getList", params]
const threadLists = { queryKey: ["threads", "getList"] };

const getParams = (queryKey: readonly unknown[]) =>
  (queryKey[2] ?? {}) as ThreadListParams;

/** Whether a thread belongs to a list filter (the full-text search is ignored) */
const matchesFilter = (thread: Thread, filter: Record<string, unknown> = {}) =>
  Object.entries(filter).every(
    ([key, value]) => key === "q" || thread[key] === value,
  );

/**
 * Removes a thread from the cached lists it no longer belongs to, so that a
 * move shows up at once instead of after the lists refetch.
 */
export const removeFromStaleLists = (
  queryClient: QueryClient,
  thread: Thread,
) => {
  queryClient
    .getQueriesData<GetListResult<Thread>>(threadLists)
    .forEach(([queryKey, result]) => {
      if (!result || matchesFilter(thread, getParams(queryKey).filter)) return;
      const data = result.data.filter((record) => record.id !== thread.id);
      if (data.length === result.data.length) return;
      queryClient.setQueryData(queryKey, {
        ...result,
        data,
        total: result.total == null ? result.total : result.total - 1,
      });
    });
};

/**
 * Refetches the sidebar counters that counted this thread. Count fetches a
 * single record, which tells its queries apart from the thread list.
 */
export const refreshCounters = (queryClient: QueryClient, thread: Thread) =>
  queryClient.invalidateQueries({
    ...threadLists,
    predicate: ({ queryKey }) => {
      const { filter, pagination } = getParams(queryKey);
      return pagination?.perPage === 1 && matchesFilter(thread, filter);
    },
  });
