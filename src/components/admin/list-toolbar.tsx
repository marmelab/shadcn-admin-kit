import * as React from "react";
import { type FC, memo, type ReactElement } from "react";
import type { Exporter } from "ra-core";
import { cn } from "@/lib/utils";

import { FilterContext, FilterElementProps } from "@/hooks/filter-context";
import { FilterForm } from "@/components/admin/filter-form";

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
