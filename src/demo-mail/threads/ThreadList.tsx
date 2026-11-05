import { useEffect, useRef, useState, type RefObject } from "react";
import {
  InfiniteListBase,
  ShowBase,
  useInfinitePaginationContext,
  useListContext,
  useLocation,
  useMatch,
} from "ra-core";
import { ListView } from "@/components/admin/list";
import { SearchInput } from "@/components/admin/search-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { defaultFolder } from "../types";
import { Composer } from "./Composer";
import { ReadTabs } from "./ReadTabs";
import { ThreadBulkActions } from "./ThreadBulkActions";
import { NoThreadSelected, ThreadDisplay } from "./ThreadDisplay";
import { ThreadListItems } from "./ThreadListItems";
import { ThreadListTitle } from "./ThreadListTitle";
import { getComposeState } from "./useThreadActions";

const filters = [<SearchInput key="q" source="q" alwaysOn />];

/**
 * The resource only defines a list view, so /threads/:id/show and
 * /threads/create also render this component: it shows the list next to the
 * selected thread or the new message on desktop, and one of them at a time on
 * mobile.
 */
export const ThreadList = () => {
  const match = useMatch({ path: "/threads/:id/show", end: false });
  const selectedId = match?.params.id ? Number(match.params.id) : undefined;
  const isComposing = !!useMatch({ path: "/threads/create", end: false });
  const location = useLocation();
  // The list navigation (search) drops the history state: the editor id is
  // kept until another New message or Forward click. Going back to an editor
  // already opened keeps the current one, which holds the latest changes.
  const [compose, setCompose] = useState<{ id?: number; seen: number[] }>({
    seen: [],
  });
  const stateComposeId = getComposeState(location.state)?.id;
  if (stateComposeId != null && !compose.seen.includes(stateComposeId)) {
    setCompose({ id: stateComposeId, seen: [...compose.seen, stateComposeId] });
  }
  const isMobile = useIsMobile();
  const hasPanel = selectedId != null || isComposing;
  // On mobile, the list is hidden rather than unmounted while a thread is
  // open, so that it keeps its scroll position
  const hideList = isMobile && hasPanel;
  const showPanel = !isMobile || hasPanel;
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex min-h-0 flex-1">
      <div
        ref={listRef}
        className={cn(
          "relative flex w-full shrink-0 flex-col overflow-y-auto overscroll-contain px-4 md:w-[400px] md:border-r [&_.filter-field]:grow",
          hideList && "hidden",
        )}
      >
        <InfiniteListBase
          resource="threads"
          filterDefaultValues={{ folder: defaultFolder }}
          sort={{ field: "updated_at", order: "DESC" }}
          perPage={20}
        >
          <ListView
            title={<ThreadListTitle />}
            actions={<ReadTabs />}
            filters={filters}
            disableBreadcrumb
            pagination={<LoadMoreOnScroll scrollRef={listRef} />}
          >
            <ScrollToTopOnListChange scrollRef={listRef} />
            <ThreadBulkActions selectedId={selectedId} />
            <ThreadListItems selectedId={selectedId} replace={hasPanel} />
          </ListView>
        </InfiniteListBase>
      </div>
      {showPanel ? (
        // Keyed so that each thread opens scrolled to the top, and each New
        // message or Forward click gets a new editor
        <div
          className="relative min-w-0 flex-1 overflow-y-auto overscroll-contain"
          key={isComposing ? `create-${compose.id}` : selectedId}
        >
          {isComposing ? (
            <Composer />
          ) : selectedId != null ? (
            <ShowBase resource="threads" id={selectedId}>
              <ThreadDisplay />
            </ShowBase>
          ) : (
            <NoThreadSelected />
          )}
        </div>
      ) : null}
    </div>
  );
};

/**
 * Loads the next page when the end of the list scrolls into view, like mail
 * clients do instead of a pagination.
 */
const LoadMoreOnScroll = ({
  scrollRef,
}: {
  scrollRef: RefObject<HTMLDivElement | null>;
}) => {
  const { hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfinitePaginationContext();
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasNextPage || isFetchingNextPage) return;
    // Re-created after each page, so that a page too short to scroll loads
    // the next one
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fetchNextPage();
      },
      { root: scrollRef.current, rootMargin: "200px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, scrollRef]);

  return (
    <div ref={sentinelRef} className="pb-4">
      {isFetchingNextPage ? <Skeleton className="h-28 w-full" /> : null}
    </div>
  );
};

/**
 * Scrolls the list column to the top when the folder or the search changes.
 * ra-core scrolls the window instead, which does not scroll here.
 */
const ScrollToTopOnListChange = ({
  scrollRef,
}: {
  scrollRef: RefObject<HTMLDivElement | null>;
}) => {
  const { filterValues } = useListContext();
  const filters = JSON.stringify(filterValues);
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [filters, scrollRef]);
  return null;
};
