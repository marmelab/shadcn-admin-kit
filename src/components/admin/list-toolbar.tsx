import { cn } from "@/lib/utils";
import type { Exporter } from "ra-core";
import * as React from "react";
import { type FC, memo, type ReactElement } from "react";

import { FilterContext } from "./filter-context";
import { FilterForm } from "./filter-form";

export const ListToolbar: FC<ListToolbarProps> = memo((inProps) => {
  const { filters, actions, className, ...rest } = inProps;

  if (!filters && actions === false) {
    return null;
  }

  return Array.isArray(filters) ? (
    <FilterContext.Provider value={filters}>
      <div
        className={cn(
          "flex flex-row justify-between items-end w-full pb-4",
          className
        )}
      >
        <FilterForm />

        {actions}
      </div>
    </FilterContext.Provider>
  ) : (
    <div
      className={cn(
        "flex flex-row justify-between items-end w-full pb-4",
        className
      )}
    >
      {filters ?
        React.cloneElement(filters, {
          ...rest,
          context: "form",
        }) : <div className="flex-1" />}

      {actions &&
        React.cloneElement(actions, {
          ...rest,
          filters,
          ...actions.props,
        })}
    </div>
  );
});

export interface ListToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  actions?: ReactElement<any> | false;
  exporter?: Exporter | false;
  filters?: ReactElement<any> | ReactElement<any>[];
  hasCreate?: boolean;
}
