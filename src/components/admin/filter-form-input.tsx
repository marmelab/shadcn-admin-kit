import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MinusCircle } from "lucide-react";
import { useResourceContext, useTranslate } from "ra-core";

export const FilterFormInput = (inProps: FilterFormInputProps) => {
  const { filterElement, handleHide, className } = inProps;
  const resource = useResourceContext(inProps);
  const translate = useTranslate();

  return (
    <div
      data-source={filterElement.props.source}
      className={cn(
        "filter-field flex flex-row min-w-64 h-full pointer-events-auto gap-2 relative",
        "[&_.form-item]:flex-grow [&_.form-item_label]:absolute [&_.form-item_label]:-top-2/3",
        className
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
  filterElement: React.ReactElement<any>;
  handleHide: (event: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  resource?: string;
}

const emptyRecord = {};
