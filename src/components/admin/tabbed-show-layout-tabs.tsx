import { cn } from "@/lib/utils";
import { Children, cloneElement, isValidElement, ReactElement } from "react";
import { useParams } from "react-router";
import { TabProps } from "./tab";

export const TabbedShowLayoutTabs = ({
  children,
  syncWithLocation,
  value,
  className,
  ...rest
}: TabbedShowLayoutTabsProps) => {
  const params = useParams();
  const tabValue = params["*"];

  // On gère l'état actif via Tailwind et la prop value
  return (
    <div className={cn("flex border-b border-border", className)} {...rest}>
      {Children.map(children, (tab, index) => {
        if (!tab || !isValidElement(tab)) return null;
        const tabPath = getShowLayoutTabFullPath(tab, index);
        const isActive =
          (syncWithLocation ? tabPath : index) ===
          (syncWithLocation ? tabValue : value);
        return cloneElement(tab, {
          context: "header",
          value: syncWithLocation ? tabPath : index,
          syncWithLocation,
          className: cn(
            "px-4 py-2 border-b-2 text-sm font-medium transition-colors",
            isActive
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-primary hover:border-primary",
            tab.props.className
          ),
        });
      })}
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const getShowLayoutTabFullPath = (tab: any, index: any) => {
  return tab.props.path ? `${tab.props.path}` : index > 0 ? `${index}` : "";
};

export interface TabbedShowLayoutTabsProps {
  children?: ReactElement<TabProps>;
  syncWithLocation?: boolean;
  value?: string | number;
  className?: string;
}
