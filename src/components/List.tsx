import { Breadcrumb, BreadcrumbItem } from "@/components/Breadcrumb";
import {
  FilterLiveForm,
  ListBase,
  ListBaseProps,
  RaRecord,
  useGetResourceLabel,
  useResourceContext,
  useTranslate,
} from "ra-core";
import { cloneElement, ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";

export const List = <RecordType extends RaRecord = RaRecord>(
  props: ListProps<RecordType>
) => {
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

  return (
    <ListBase<RecordType> {...props}>
      <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
      <Breadcrumb className="my-4">
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>{resourceLabel}</BreadcrumbItem>
      </Breadcrumb>
      {filters && filters.length ? (
        <FilterLiveForm>
          <div className="flex items-center my-2 gap-2">
            {filters.map((filter) =>
              cloneElement(filter, {
                key: filter.key ?? (filter.props as { source: string }).source,
              })
            )}
          </div>
        </FilterLiveForm>
      ) : null}
      {children}
    </ListBase>
  );
};

export interface ListProps<RecordType extends RaRecord = RaRecord>
  extends ListBaseProps<RecordType> {
  children: ReactNode;
  filters?: ReactElement[];
}
