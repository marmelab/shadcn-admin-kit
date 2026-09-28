import { ShowBase, useMatch } from "ra-core";
import { List } from "@/components/admin/list";
import { ListPagination } from "@/components/admin/list-pagination";
import { SearchInput } from "@/components/admin/search-input";
import { useIsMobile } from "@/hooks/use-mobile";
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
  const showList = !isMobile || selectedId == null;
  const showDisplay = !isMobile || selectedId != null;

  return (
    <div className="flex min-h-0 flex-1">
      {showList ? (
        <div className="flex w-full shrink-0 flex-col overflow-y-auto px-4 md:w-[400px] md:border-r [&_.filter-field]:grow">
          <List
            resource="threads"
            title={<ThreadListTitle />}
            actions={<ReadTabs />}
            filters={filters}
            filterDefaultValues={{ folder: "inbox" }}
            sort={{ field: "updated_at", order: "DESC" }}
            perPage={25}
            disableBreadcrumb
            pagination={<ListPagination rowsPerPageOptions={[10, 25, 50]} />}
          >
            <ThreadListItems selectedId={selectedId} />
          </List>
        </div>
      ) : null}
      {showDisplay ? (
        <div className="min-w-0 flex-1 overflow-y-auto">
          {selectedId != null ? (
            <ShowBase resource="threads" id={selectedId} key={selectedId}>
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
