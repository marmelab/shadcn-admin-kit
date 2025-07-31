import * as React from "react";
import { cn } from "@/lib/utils";

export interface TopToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const TopToolbar = (inProps: TopToolbarProps) => {
  const { className, children, ...props } = inProps;

  return (
    <div
      className={cn(
        "flex justify-end items-end gap-2 whitespace-nowrap flex-auto p-2 pb-4",
        "sm:bg-background sm:p-0 sm:pb-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default TopToolbar;
