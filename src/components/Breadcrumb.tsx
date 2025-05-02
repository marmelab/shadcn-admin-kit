import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb({ className, children, ...props }, forwardedRef) {
    const validChildren = getValidChildren(children);
    return (
      <nav
        className={cn("relative break-words", className)}
        aria-label="breadcrumb"
        {...props}
        ref={forwardedRef}
      >
        <ol className="flex items-center">
          {validChildren.map((child, index) => (
            <React.Fragment key={index}>
              {child}
              {index < validChildren.length - 1 ? (
                <li
                  className="inline-flex mx-2 opacity-50 items-center"
                  role="presentation"
                >
                  <ChevronRight className="h-4 w-4" />
                </li>
              ) : null}
            </React.Fragment>
          ))}
        </ol>
      </nav>
    );
  }
);

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  /* The visual separator between each breadcrumb item */
  separator?: React.ReactNode;
}

export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <li
      className={cn("inline-flex items-center", className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </li>
  );
});

function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  ) as React.ReactElement[];
}
