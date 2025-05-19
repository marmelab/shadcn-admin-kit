import {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  useCreatePath,
  useGetResourceLabel,
  useHasDashboard,
  useResourceDefinitions,
  useTranslate,
} from "ra-core";
import { Link } from "react-router-dom";

export const NavigationBar = () => {
  const hasDashboard = useHasDashboard();
  const resources = useResourceDefinitions();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {hasDashboard ? <DashboardMenuItem /> : null}
        {Object.keys(resources)
          .filter((name) => resources[name].hasList)
          .map((name) => (
            <ResourceMenuItem key={name} name={name} />
          ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export const DashboardMenuItem = () => {
  const translate = useTranslate();
  const label = translate("ra.page.dashboard", {
    _: "Dashboard",
  });
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          to="/"
          className={cn(
            navigationMenuTriggerStyle(),
            "font-normal hover:bg-background"
          )}
        >
          {label}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export const ResourceMenuItem = ({ name }: { name: string }) => {
  const resources = useResourceDefinitions();
  const getResourceLabel = useGetResourceLabel();
  const createPath = useCreatePath();
  if (!resources || !resources[name]) return null;
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          to={createPath({
            resource: name,
            type: "list",
          })}
          state={{ _scrollToTop: true }}
          className={cn(
            navigationMenuTriggerStyle(),
            "font-normal hover:bg-background"
          )}
        >
          {getResourceLabel(name, 2)}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};
