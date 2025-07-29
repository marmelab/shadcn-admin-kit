import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { FieldTitle, useResourceContext } from "ra-core";
import * as React from "react";
import { forwardRef, useCallback } from "react";

export const FilterButtonMenuItem = forwardRef<any, FilterButtonMenuItemProps>(
  (props, ref) => {
    const { filter, onShow, onHide, displayed } = props;
    const resource = useResourceContext(props);
    const handleShow = useCallback(() => {
      onShow({
        source: filter.props.source,
        defaultValue: filter.props.defaultValue,
      });
    }, [filter.props.defaultValue, filter.props.source, onShow]);
    const handleHide = useCallback(() => {
      onHide({
        source: filter.props.source,
      });
    }, [filter.props.source, onHide]);

    return (
      <div
        className={cn(
          "new-filter-item flex items-center px-2 py-1.5 text-sm cursor-pointer hover:bg-accent rounded-sm",
          filter.props.disabled && "opacity-50 cursor-not-allowed"
        )}
        data-key={filter.props.source}
        data-default-value={filter.props.defaultValue}
        onClick={
          filter.props.disabled
            ? undefined
            : displayed
              ? handleHide
              : handleShow
        }
        ref={ref}
        role="menuitemcheckbox"
        aria-checked={displayed}
      >
        <div className="flex items-center justify-center w-4 h-4 mr-2">
          {displayed && <Check className="h-3 w-3" />}
        </div>
        <div>
          <FieldTitle
            label={filter.props.label}
            source={filter.props.source}
            resource={resource}
          />
        </div>
      </div>
    );
  }
);

export interface FilterButtonMenuItemProps {
  filter: React.ReactElement<any>;
  displayed: boolean;
  onShow: (params: { source: string; defaultValue: any }) => void;
  onHide: (params: { source: string }) => void;
  resource?: string;
  autoFocus?: boolean;
}
