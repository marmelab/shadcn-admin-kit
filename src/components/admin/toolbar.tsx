import { cn } from "@/lib/utils";
import * as React from "react";
import { Children, type ReactNode } from "react";

import { WithRecord } from "ra-core";
import { CancelButton } from "./cancel-button";
import { DeleteButton } from "./delete-button";
import { SaveButton } from "./save-button";

export const Toolbar = (inProps: ToolbarProps) => {
  const { children, className, resource, ...rest } = inProps;

  return (
    <div
      {...rest}
      className={cn(
        // Responsive styles - mobile-first approach
        "pt-4 flex flex-row flex-auto justify-end",
        className
      )}
      role="toolbar"
    >
      {Children.count(children) === 0 ? (
        <div className="flex-1 flex justify-between gap-4">
          <WithRecord
            render={(record) =>
              record.id !== null && <DeleteButton resource={resource} />
            }
          />
          <div className="flex-1" />
          <CancelButton />
          <SaveButton />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  resource?: string;
}
