import { LayoutDashboard } from "lucide-react";

// @ts-expect-error just forwarding props
export function Logo(props) {
  return <LayoutDashboard {...props} />;
}
