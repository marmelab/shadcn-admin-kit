import { Breadcrumb, BreadcrumbItem } from "@/components/breadcrumb";
import {
  FilterLiveForm,
  ListBase,
  ListBaseProps,
  RaRecord,
  Translate,
  useGetResourceLabel,
  useHasDashboard,
  useResourceContext,
  useResourceDefinition,
  useTranslate,
} from "ra-core";
import { cloneElement, ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";
import { CreateButton } from "@/components/create-button";
import { ExportButton } from "@/components/export-button";
import { ListPagination } from "@/components/list-pagination";
import { BulkActionsToolbar } from "@/components//bulk-actions-toolbar";

export const List = <RecordType extends RaRecord = RaRecord>(
  props: ListProps<RecordType>
) => {
  const {
    debounce,
    disableAuthentication,
    disableSyncWithLocation,
    exporter,
    filter,
    filterDefaultValues,
    loading,
    perPage,
    queryOptions,
    resource,
    sort,
    storeKey,
    ...rest
  } = props;
  return (
    <ListBase<RecordType>
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
      <ListView {...rest} />
    </ListBase>
  );
};

export interface ListProps<RecordType extends RaRecord = RaRecord>
  extends ListBaseProps<RecordType>,
    ListViewProps {}

export const ListView = (props: ListViewProps) => {
  const { filters, children } = props;
  const translate = useTranslate();
  const resource = useResourceContext();
  if (!resource) {
    throw new Error(
      "The ListView component must be used within a ResourceContextProvider"
    );
  }
  const getResourceLabel = useGetResourceLabel();
  const resourceLabel = getResourceLabel(resource, 2);
  const title = translate("ra.page.list", {
    name: resourceLabel,
  });
  const { hasCreate } = useResourceDefinition({ resource });
  const hasDashboard = useHasDashboard();

  return (
    <>
      <Breadcrumb>
        {hasDashboard && (
          <BreadcrumbItem>
            <Link to="/">
              <Translate i18nKey="ra.page.dashboard">Home</Translate>
            </Link>
          </BreadcrumbItem>
        )}
        <BreadcrumbItem>{resourceLabel}</BreadcrumbItem>
      </Breadcrumb>
      <div className="flex justify-between items-end flex-wrap gap-2 mb-2">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <div className="flex items-center gap-2">
          {hasCreate ? <CreateButton /> : null}
          {<ExportButton />}
        </div>
      </div>
      {filters && filters.length ? (
        <FilterLiveForm>
          <div className="flex items-center gap-2 flex-wrap">
            {filters.map((filter) =>
              cloneElement(filter, {
                key: filter.key ?? (filter.props as { source: string }).source,
              })
            )}
          </div>
        </FilterLiveForm>
      ) : (
        <span />
      )}
      <div className="my-2">{children}</div>
      <ListPagination />
      <BulkActionsToolbar />
    </>
  );
};

export interface ListViewProps {
  children: ReactNode;
  filters?: ReactElement[];
}
