import * as React from "react";
import { LinkBase, type LinkBaseProps } from "ra-core";

/**
 * A router-agnostic Link component for use in admin UI.
 *
 * Wraps ra-core's `LinkBase` for admin UI. This provides a routing
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
  (props, ref) => {
    return <LinkBase ref={ref} {...props} />;
  },
);
Link.displayName = "Link";

export type LinkProps = LinkBaseProps;
