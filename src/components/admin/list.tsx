import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/admin/breadcrumb";
import { BulkActionsToolbar } from "@/components/admin/bulk-actions-toolbar";
import { CreateButton } from "@/components/admin/create-button";
import { ExportButton } from "@/components/admin/export-button";
import { ListPagination } from "@/components/admin/list-pagination";
import { cn } from "@/lib/utils";
import {
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
import { ReactElement, ReactNode } from "react";
import { Link } from "react-router";
import { ListToolbar } from "./list-toolbar";
import { Title } from "./title";

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
    bulkActionsToolbar = defaultBulkActionsToolbar,
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
      {finalTitle && <Title title={finalTitle?.toString()} />}
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

      <ListToolbar
        filters={filters && filters.length ? filters : undefined}
        actions={
          actions === false ? false :
          actions ?? (
            <div className="flex items-center gap-2">
              {<ExportButton />}
              {hasCreate ? <CreateButton /> : null}
            </div>
          )
        }
      />
      <div className={cn("my-2", props.className)}>{children}</div>
      {pagination}
      {bulkActionsToolbar}
    </>
  );
};

const defaultPagination = <ListPagination />;
const defaultBulkActionsToolbar = <BulkActionsToolbar />;

export interface ListViewProps<RecordType extends RaRecord = RaRecord> {
  children?: ReactNode;
  render?: (props: ListControllerResult<RecordType, Error>) => ReactNode;
  actions?: ReactElement<any> | false;
  filters?: ReactElement[];
  pagination?: ReactNode;
  bulkActionsToolbar?: ReactNode;
  title?: ReactNode | string | false;
  className?: string;
}
