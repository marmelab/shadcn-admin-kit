import * as React from "react";
import { type HtmlHTMLAttributes, useCallback, useEffect } from "react";
import get from "lodash/get";
import {
  FilterLiveForm,
  useListContext,
  useResourceContext,
  useTranslate,
} from "ra-core";
import { MinusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterElementProps, useFilterContext } from "@/hooks/filter-context";
import { Button } from "@/components/ui/button.tsx";

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
        "flex flex-row justify-start items-end gap-x-2 gap-y-3 flex-auto pointer-events-none flex-wrap",
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

export const FilterFormInput = (inProps: FilterFormInputProps) => {
  const { filterElement, handleHide, className } = inProps;
  const resource = useResourceContext(inProps);
  const translate = useTranslate();

  return (
    <div
      data-source={filterElement.props.source}
      className={cn(
        "filter-field flex flex-row h-full pointer-events-auto gap-2 relative",
        className,
      )}
    >
      {React.cloneElement(filterElement, {
        resource,
        record: emptyRecord,
        size: filterElement.props.size ?? "small",
        helperText: false,
        // ignore defaultValue in Field because it was already set in Form (via mergedInitialValuesWithDefaultValues)
        defaultValue: undefined,
      })}
      {!filterElement.props.alwaysOn && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="hide-filter h-9 w-9 cursor-pointer"
          onClick={handleHide}
          data-key={filterElement.props.source}
          title={translate("ra.action.remove_filter")}
        >
          <MinusCircle className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export interface FilterFormInputProps {
  filterElement: React.ReactElement<FilterElementProps>;
  handleHide: (event: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  resource?: string;
}

const emptyRecord = {};
