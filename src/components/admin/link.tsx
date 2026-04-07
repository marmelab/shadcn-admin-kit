import * as React from "react";
import { LinkBase, type LinkBaseProps } from "ra-core";
import { cn } from "@/lib/utils";

/**
 * A router-agnostic Link component for use in admin UI.
 *
 * Wraps ra-core's `LinkBase` with shadcn/ui-compatible styling. This provides a routing
 * abstraction layer so that components are not directly coupled to a specific router package.
 *
 * @see {@link https://marmelab.com/shadcn-admin-kit/docs/link/ Link documentation}
 *
 * @example
 * import { Link } from "@/components/admin";
 *
 * const MyComponent = () => (
 *   <Link to="/posts">Go to Posts</Link>
 * );
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, ...props }, ref) => {
    return <LinkBase ref={ref} className={cn(className)} {...props} />;
  },
);
Link.displayName = "Link";

export interface LinkProps extends LinkBaseProps {
  className?: string;
}
