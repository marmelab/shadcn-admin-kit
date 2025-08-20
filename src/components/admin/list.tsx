import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/admin/breadcrumb";
import {
  type Exporter,
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
import { type FC, memo, ReactElement, ReactNode } from "react";
import { Link } from "react-router";
import { cn } from "@/lib/utils.ts";
import { FilterContext, FilterElementProps } from "@/hooks/filter-context.tsx";
import { CreateButton } from "@/components/admin/create-button";
import { ExportButton } from "@/components/admin/export-button";
import { ListPagination } from "@/components/admin/list-pagination";
import { FilterForm } from "@/components/admin/filter-form.tsx";

export const List = <RecordType extends RaRecord = RaRecord>(
  props: ListProps<RecordType>,
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
  props: ListViewProps<RecordType>,
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
      "The ListView component must be used within a ResourceContextProvider",
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

      <h2 className="text-2xl font-bold tracking-tight mb-2">{finalTitle}</h2>

      <ListToolbar
        filters={filters && filters.length ? filters : undefined}
        actions={
          actions ?? (
            <div className="flex items-center gap-2">
              {hasCreate ? <CreateButton /> : null}
              {<ExportButton />}
            </div>
          )
        }
      />
      <div className={cn("my-2", props.className)}>{children}</div>
      {pagination}
    </>
  );
};

const defaultPagination = <ListPagination />;

export interface ListViewProps<RecordType extends RaRecord = RaRecord> {
  children?: ReactNode;
  render?: (props: ListControllerResult<RecordType, Error>) => ReactNode;
  actions?: ReactElement | false;
  filters?: ReactElement<FilterElementProps>[];
  pagination?: ReactNode;
  title?: ReactNode | string | false;
  className?: string;
}

export const ListToolbar: FC<ListToolbarProps> = memo((inProps) => {
  const { filters, actions, className, ...rest } = inProps;

  return Array.isArray(filters) ? (
    <FilterContext.Provider value={filters}>
      <div
        className={cn(
          "flex flex-row justify-between items-end w-full pb-2",
          className,
        )}
      >
        <FilterForm />

        {actions}
      </div>
    </FilterContext.Provider>
  ) : (
    <div
      className={cn(
        "flex flex-row justify-between items-end w-full pb-2",
        className,
      )}
    >
      {filters ? (
        React.cloneElement(filters, {
          ...rest,
          context: "form",
        })
      ) : (
        <span />
      )}

      {actions &&
        React.cloneElement(actions, {
          ...rest,
          filters,
          ...actions.props,
        })}
    </div>
  );
});

export type FiltersType =
  | ReactElement<FilterElementProps>
  | ReactElement<FilterElementProps>[];

export interface ListToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  actions?: ReactElement<{ filters?: FiltersType }> | false;
  exporter?: Exporter | false;
  filters?: FiltersType;
  hasCreate?: boolean;
}
