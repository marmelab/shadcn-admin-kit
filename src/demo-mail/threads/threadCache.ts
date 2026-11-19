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
const matchesFilter = (
  thread: Thread,
  filter: Record<string, unknown> = {},
  ignoredKeys: string[] = [],
) =>
  Object.entries(filter).every(([key, value]) => {
    if (key === "q" || ignoredKeys.includes(key)) return true;
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
 * The ignored filter keys keep the thread in the lists filtering on them.
 */
export const removeFromStaleLists = (
  queryClient: QueryClient,
  thread: Thread,
  ignoredKeys: string[] = [],
) => {
  const isStale = (queryKey: readonly unknown[]) =>
    !matchesFilter(thread, getParams(queryKey).filter, ignoredKeys);
  queryClient
    .getQueriesData<GetListResult<Thread>>(threadLists)
    .forEach(([queryKey, result]) => {
      if (!result || !isStale(queryKey)) return;
      queryClient.setQueryData(queryKey, removeFromResult(result, thread));
    });
  queryClient
    .getQueriesData<
      InfiniteData<GetInfiniteListResult<Thread>>
    >(threadInfiniteLists)
    .forEach(([queryKey, result]) => {
      if (!result || !isStale(queryKey)) return;
      queryClient.setQueryData(queryKey, {
        ...result,
        pages: result.pages.map((page) => removeFromResult(page, thread)),
      });
    });
};

/**
 * Caches the threads as single records before an updateMany. The mutation
 * merges its data into the getOne cache of every id, so a thread never opened
 * would otherwise be cached as a partial record ({ folder }) and open broken.
 */
export const seedRecordCache = (queryClient: QueryClient, threads: Thread[]) =>
  threads.forEach((thread) =>
    queryClient.setQueryData<Thread>(
      ["threads", "getOne", { id: String(thread.id) }],
      (cached) => cached ?? thread,
    ),
  );

/**
 * Refetches the sidebar counters that counted these threads. Count fetches a
 * single record with getList, which tells its queries apart from the thread
 * list (an infinite one).
 */
export const refreshCounters = (queryClient: QueryClient, threads: Thread[]) =>
  // A single invalidation: each one cancels and restarts the counter fetches
  // in progress
  queryClient.invalidateQueries({
    ...threadLists,
    predicate: ({ queryKey }) => {
      const { filter, pagination } = getParams(queryKey);
      return (
        pagination?.perPage === 1 &&
        threads.some((thread) => matchesFilter(thread, filter))
      );
    },
  });
