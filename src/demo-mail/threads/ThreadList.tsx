import { List } from "@/components/admin/list";
import { ListPagination } from "@/components/admin/list-pagination";
import { SearchInput } from "@/components/admin/search-input";
import { ReadTabs } from "./ReadTabs";
import { ThreadListItems } from "./ThreadListItems";
import { ThreadListTitle } from "./ThreadListTitle";

const filters = [<SearchInput key="q" source="q" alwaysOn />];

export const ThreadList = () => (
  <div className="flex min-h-0 flex-1">
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
        <ThreadListItems />
      </List>
    </div>
  </div>
);
