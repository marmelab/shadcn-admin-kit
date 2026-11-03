import type { InfiniteData, QueryClient } from "@tanstack/react-query";
import type { GetInfiniteListResult, GetListResult } from "ra-core";
import type { Thread } from "../types";

interface ThreadListParams {
  filter?: Record<string, unknown>;
  pagination?: { page: number; perPage: number };
}

// ra-core keys list queries as [resource, "getList" | "getInfiniteList", params]
const threadLists = { queryKey: ["threads", "getList"] };
const threadInfiniteLists = { queryKey: ["threads", "getInfiniteList"] };

const getParams = (queryKey: readonly unknown[]) =>
  (queryKey[2] ?? {}) as ThreadListParams;

/**
 * Whether a thread belongs to a list filter, for the FakeRest operators the
 * app uses (the full-text search is ignored)
 */
const matchesFilter = (thread: Thread, filter: Record<string, unknown> = {}) =>
  Object.entries(filter).every(([key, value]) => {
    if (key === "q") return true;
    if (key.endsWith("_neq_any")) {
      return !(value as unknown[]).includes(thread[key.slice(0, -8)]);
    }
    const field = thread[key];
    return Array.isArray(field) ? field.includes(value) : field === value;
  });

const removeFromResult = (result: GetListResult<Thread>, thread: Thread) => {
  const data = result.data.filter((record) => record.id !== thread.id);
  if (data.length === result.data.length) return result;
  return {
    ...result,
    data,
    total: result.total == null ? result.total : result.total - 1,
  };
};

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
      queryClient.setQueryData(queryKey, removeFromResult(result, thread));
    });
  queryClient
    .getQueriesData<
      InfiniteData<GetInfiniteListResult<Thread>>
    >(threadInfiniteLists)
    .forEach(([queryKey, result]) => {
      if (!result || matchesFilter(thread, getParams(queryKey).filter)) return;
      queryClient.setQueryData(queryKey, {
        ...result,
        pages: result.pages.map((page) => removeFromResult(page, thread)),
      });
    });
};

/**
 * Refetches the sidebar counters that counted this thread. Count fetches a
 * single record with getList, which tells its queries apart from the thread
 * list (an infinite one).
 */
export const refreshCounters = (queryClient: QueryClient, thread: Thread) =>
  queryClient.invalidateQueries({
    ...threadLists,
    predicate: ({ queryKey }) => {
      const { filter, pagination } = getParams(queryKey);
      return pagination?.perPage === 1 && matchesFilter(thread, filter);
    },
  });
