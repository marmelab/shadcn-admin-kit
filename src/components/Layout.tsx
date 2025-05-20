import { CoreLayoutProps } from "ra-core";
import { NavigationBar } from "@/components/NavigationBar";
import { UserMenu } from "@/components/UserMenu";
import { ThemeModeToggle } from "@/components/ThemeModeToggle";
import { Notification } from "@/components/Notification";

export const Layout = (props: CoreLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col p-2">
      <div className="border-b grow-0 pb-2">
        <div className="flex pr-4 w-full justify-between">
          <NavigationBar />
          <div className="flex items-center gap-2">
            <ThemeModeToggle />
            <UserMenu />
          </div>
        </div>
      </div>
      <div className="grow mt-8">{props.children}</div>
      <Notification />
    </div>
  );
};
