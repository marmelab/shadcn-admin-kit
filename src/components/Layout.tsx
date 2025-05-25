import { cn } from "@/lib/utils";
import { CoreLayoutProps } from "ra-core";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserMenu } from "@/components/UserMenu";
import { ThemeModeToggle } from "@/components/ThemeModeToggle";
import { Notification } from "@/components/Notification";
import { AppSidebar } from "@/components/AppSidebar";

export const Layout = (props: CoreLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main
        className={cn(
          "ml-auto w-full max-w-full",
          "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
          "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
          "sm:transition-[width] sm:duration-200 sm:ease-linear",
          "flex h-svh flex-col",
          "group-data-[scroll-locked=1]/body:h-full",
          "has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh"
        )}
      >
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="scale-125 sm:scale-100" />
          <div className="flex-1 flex items-center" id="breadcrumb" />
          <ThemeModeToggle />
          <UserMenu />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{props.children}</div>
      </main>
      <Notification />
    </SidebarProvider>
  );
};
