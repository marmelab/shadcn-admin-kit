import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/admin/breadcrumb";
import {
  FilterLiveForm,
  ListBase,
  ListBaseProps,
  type ListControllerResult,
  RaRecord,
  Translate,
  useGetResourceLabel,
  useHasDashboard,
  useResourceContext,
  useResourceDefinition,
  useTranslate,
} from "ra-core";
import { cloneElement, ReactElement, ReactNode } from "react";
import { Link } from "react-router";
import { CreateButton } from "@/components/admin/create-button";
import { ExportButton } from "@/components/admin/export-button";
import { ListPagination } from "@/components/admin/list-pagination";

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
      <ListView<RecordType> {...rest} />
    </ListBase>
  );
};

export interface ListProps<RecordType extends RaRecord = RaRecord>
  extends ListBaseProps<RecordType>,
    ListViewProps<RecordType> {}

export const ListView = <RecordType extends RaRecord = RaRecord>(
  props: ListViewProps<RecordType>
) => {
  const {
    filters,
    pagination = defaultPagination,
    title,
    children,
    actions,
  } = props;
  const translate = useTranslate();
  const resource = useResourceContext();
  if (!resource) {
    throw new Error(
      "The ListView component must be used within a ResourceContextProvider"
    );
  }
  const getResourceLabel = useGetResourceLabel();
  const resourceLabel = getResourceLabel(resource, 2);
  const finalTitle =
    title !== undefined
      ? title
      : translate("ra.page.list", {
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
        <BreadcrumbPage>{resourceLabel}</BreadcrumbPage>
      </Breadcrumb>
      <div className="flex justify-between items-start flex-wrap gap-2 my-2">
        <h2 className="text-2xl font-bold tracking-tight">{finalTitle}</h2>
        {actions ?? (
          <div className="flex items-center gap-2">
            {hasCreate ? <CreateButton /> : null}
            {<ExportButton />}
          </div>
        )}
      </div>
      {filters && filters.length ? (
        <FilterLiveForm>
          <div className="flex flex-col md:flex-row md:items-center gap-2 flex-wrap">
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
      {pagination}
    </>
  );
};

const defaultPagination = <ListPagination />;

export interface ListViewProps<RecordType extends RaRecord = RaRecord> {
  children?: ReactNode;
  render?: (props: ListControllerResult<RecordType, Error>) => ReactNode;
  actions?: ReactNode;
  filters?: ReactElement[];
  pagination?: ReactNode;
  bulkActionsToolbar?: ReactNode;
  title?: ReactNode | string | false;
}
