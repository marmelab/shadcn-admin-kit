import type { InfiniteListBaseProps, RaRecord } from "ra-core";
import { InfiniteListBase } from "ra-core";

import { InfinitePagination } from "@/components/admin/infinite-pagination";
import { Loading } from '@/components/admin/loading';
import { ListView } from '@/components/admin/list';

/**
 * A complete list page with breadcrumb, title, filters, and pagination.
 *
 * It fetches a list of records from the data provider (via ra-core hooks),
 * puts them in a ListContext, renders a default layout (breadcrumb, title,
 * action buttons, inline filters, pagination), then renders its children
 * (usually a <DataTable>).
 *
 * @see {@link https://marmelab.com/shadcn-admin-kit/docs/list/ List documentation}
 *
 * @example
 * import { DataTable, List } from "@/components/admin";
 *
 * export const UserList = () => (
 *   <InfiniteList>
 *     <DataTable>
 *       <DataTable.Col source="id" />
 *       <DataTable.Col source="name" />
 *       <DataTable.Col source="username" />
 *       <DataTable.Col source="email" />
 *       <DataTable.Col source="address.street" />
 *       <DataTable.Col source="phone" />
 *       <DataTable.Col source="website" />
 *       <DataTable.Col source="company.name" />
 *     </DataTable>
 *   </InfiniteList>
 * );
 */
export const InfiniteList = <RecordType extends RaRecord = RaRecord>(
  props: InfiniteListProps<RecordType>,
) => {
  const {
    debounce,
    disableAuthentication,
    disableSyncWithLocation,
    exporter,
    filter = defaultFilter,
    filterDefaultValues,
    loading = defaultAuthLoading,
    pagination = defaultPagination,
    perPage = 10,
    queryOptions,
    resource,
    sort,
    storeKey,
    ...rest
  } = props;

  return (
    <InfiniteListBase<RecordType>
      debounce={debounce}
      disableAuthentication={disableAuthentication}
      disableSyncWithLocation={disableSyncWithLocation}
      exporter={exporter}
      filter={filter}
      filterDefaultValues={filterDefaultValues}
      loading={loading}
      perPage={perPage}
      queryOptions={queryOptions}
      resource={resource}
      sort={sort}
      storeKey={storeKey}
    >
      <ListView<RecordType> {...rest} pagination={pagination} />
    </InfiniteListBase>
  );
};

const defaultFilter = {};
const defaultPagination = <InfinitePagination />;
const defaultAuthLoading = <Loading />;

export interface InfiniteListProps<RecordType extends RaRecord = RaRecord>
  extends InfiniteListBaseProps<RecordType>,
    ListViewProps<RecordType> {}
