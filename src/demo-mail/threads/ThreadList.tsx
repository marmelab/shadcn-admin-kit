import { useEffect, useRef, type RefObject } from "react";
import { ShowBase, useListContext, useMatch } from "ra-core";
import { List } from "@/components/admin/list";
import { ListPagination } from "@/components/admin/list-pagination";
import { SearchInput } from "@/components/admin/search-input";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { defaultFolder } from "../types";
import { ReadTabs } from "./ReadTabs";
import { NoThreadSelected, ThreadDisplay } from "./ThreadDisplay";
import { ThreadListItems } from "./ThreadListItems";
import { ThreadListTitle } from "./ThreadListTitle";

const filters = [<SearchInput key="q" source="q" alwaysOn />];

/**
 * The resource only defines a list view, so /threads/:id/show also renders
 * this component: it shows the list and the selected thread side by side on
 * desktop, and one of them at a time on mobile.
 */
export const ThreadList = () => {
  const match = useMatch({ path: "/threads/:id/show", end: false });
  const selectedId = match?.params.id ? Number(match.params.id) : undefined;
  const isMobile = useIsMobile();
  // On mobile, the list is hidden rather than unmounted while a thread is
  // open, so that it keeps its scroll position
  const hideList = isMobile && selectedId != null;
  const showDisplay = !isMobile || selectedId != null;
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex min-h-0 flex-1">
      <div
        ref={listRef}
        className={cn(
          "flex w-full shrink-0 flex-col overflow-y-auto px-4 md:w-[400px] md:border-r [&_.filter-field]:grow",
          hideList && "hidden",
        )}
      >
        <List
          resource="threads"
          title={<ThreadListTitle />}
          actions={<ReadTabs />}
          filters={filters}
          filterDefaultValues={{ folder: defaultFolder }}
          sort={{ field: "updated_at", order: "DESC" }}
          perPage={25}
          disableBreadcrumb
          pagination={<ListPagination rowsPerPageOptions={[10, 25, 50]} />}
        >
          <ScrollToTopOnListChange scrollRef={listRef} />
          <ThreadListItems selectedId={selectedId} />
        </List>
      </div>
      {showDisplay ? (
        // Keyed so that each thread opens scrolled to the top
        <div className="min-w-0 flex-1 overflow-y-auto" key={selectedId}>
          {selectedId != null ? (
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
 * Scrolls the list column to the top when the page, the folder or the search
 * changes. ra-core scrolls the window instead, which does not scroll here.
 */
const ScrollToTopOnListChange = ({
  scrollRef,
}: {
  scrollRef: RefObject<HTMLDivElement | null>;
}) => {
  const { page, perPage, filterValues } = useListContext();
  const filters = JSON.stringify(filterValues);
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [page, perPage, filters, scrollRef]);
  return null;
};
