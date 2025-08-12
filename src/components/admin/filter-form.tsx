import * as React from "react";
import get from "lodash/get";
import { FilterLiveForm, useListContext, useResourceContext } from "ra-core";
import { type HtmlHTMLAttributes, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

import { FilterElementProps, useFilterContext } from "@/hooks/filter-context";
import { FilterFormInput } from "./filter-form-input";

export const FilterForm = (inProps: FilterFormProps) => {
  const { filters: filtersProps, ...rest } = inProps;
  const filters = useFilterContext() || filtersProps;

  return (
    <FilterLiveForm formComponent={StyledForm} {...sanitizeRestProps(rest)}>
      <FilterFormBase filters={filters} />
    </FilterLiveForm>
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FilterFormProps extends FilterFormBaseProps {}

/**
 * @deprecated Use FilterFormBase from `ra-core` once available.
 */
export const FilterFormBase = (props: FilterFormBaseProps) => {
  const { filters } = props;
  const resource = useResourceContext(props);
  const { displayedFilters = {}, filterValues, hideFilter } = useListContext();

  useEffect(() => {
    if (!filters) return;
    filters.forEach((filter) => {
      if (filter.props.alwaysOn && filter.props.defaultValue) {
        throw new Error(
          "Cannot use alwaysOn and defaultValue on a filter input. Please set the filterDefaultValues props on the <List> element instead.",
        );
      }
    });
  }, [filters]);

  const getShownFilters = () => {
    if (!filters) return [];
    const values = filterValues;
    return filters.filter((filterElement) => {
      const filterValue = get(values, filterElement.props.source);
      return (
        filterElement.props.alwaysOn ||
        displayedFilters[filterElement.props.source] ||
        !isEmptyValue(filterValue)
      );
    });
  };

  const handleHide = useCallback(
    (event: React.MouseEvent<HTMLElement>) =>
      hideFilter(event.currentTarget.dataset.key!),
    [hideFilter],
  );

  return (
    <>
      {getShownFilters().map((filterElement) => (
        <FilterFormInput
          key={filterElement.key || filterElement.props.source}
          filterElement={filterElement}
          handleHide={handleHide}
          resource={resource}
        />
      ))}
    </>
  );
};

const sanitizeRestProps = ({
  hasCreate: _hasCreate,
  resource: _resource,
  ...props
}: Partial<FilterFormBaseProps> & { hasCreate?: boolean }) => props;

export type FilterFormBaseProps = Omit<
  HtmlHTMLAttributes<HTMLFormElement>,
  "children"
> & {
  className?: string;
  resource?: string;
  filters?: React.ReactElement<FilterElementProps>[];
};

const StyledForm = (props: React.FormHTMLAttributes<HTMLFormElement>) => {
  return (
    <form
      {...props}
      className={cn(
        "flex flex-row justify-start items-center gap-x-6 gap-y-12 flex-auto pointer-events-none flex-wrap",
        "[&_.form-helper-text]:hidden",
        props.className,
      )}
    />
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEmptyValue = (filterValue: any): boolean => {
  if (filterValue === "" || filterValue == null) return true;

  // If one of the value leaf is not empty
  // the value is considered not empty
  if (typeof filterValue === "object") {
    return Object.keys(filterValue).every((key) =>
      isEmptyValue(filterValue[key]),
    );
  }

  return false;
};
