---
title: DeletedRecordsList
---

## Creating the DeletedRecordsList component

```tsx
import {
  DeletedRecordsListBase,
  type DeletedRecordsListBaseProps,
} from "@react-admin/ra-core-ee";
import {
  RaRecord,
  Translate,
  useGetResourceLabel,
  useHasDashboard,
  useResourceContext,
  useTranslate,
} from "ra-core";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { FilterContext } from "@/hooks/filter-context";
import { ExportButton } from "@/components/admin/export-button";
import { type ListViewProps } from "@/components/admin/list";
import { FilterForm } from "@/components/admin/filter-form";
import { Breadcrumb, BreadcrumbItem, BreadcrumbPage } from "./breadcrumb";
import { ListPagination } from "./list-pagination";

export function DeletedRecordsList<RecordType extends RaRecord = RaRecord>({
  children,
  ...props
}: ListViewProps<RecordType> & DeletedRecordsListBaseProps<RecordType>) {
  return (
    <DeletedRecordsListBase {...props}>
      <DeletedRecordsListView<RecordType> {...props}>
        {children}
      </DeletedRecordsListView>
    </DeletedRecordsListBase>
  );
}

function DeletedRecordsListView<RecordType extends RaRecord = RaRecord>(
  props: ListViewProps<RecordType>,
) {
  const {
    disableBreadcrumb,
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
      "The DeletedRecordListView component must be used within a ResourceContextProvider",
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
  const hasDashboard = useHasDashboard();

  return (
    <>
      {!disableBreadcrumb && (
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
      )}

      <FilterContext.Provider value={filters}>
        <div className="flex justify-between items-start flex-wrap gap-2 my-2">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            {finalTitle}
          </h2>
          {actions ?? (
            <div className="flex items-center gap-2">{<ExportButton />}</div>
          )}
        </div>
        <FilterForm />

        <div className={cn("my-2", props.className)}>{children}</div>

        {pagination}
      </FilterContext.Provider>
    </>
  );
}

const defaultPagination = <ListPagination />;
```
