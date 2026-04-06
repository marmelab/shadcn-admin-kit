import React from "react";
import {
  CoreAdminContext,
  ResourceDefinitionContextProvider,
  memoryStore,
} from "ra-core";
import { MemoryRouter } from "react-router";
import { AppSidebar, DashboardMenuItem } from "@/components/admin/app-sidebar";
import { ThemeProvider } from "@/components/admin/theme-provider";
import { i18nProvider } from "@/lib/i18nProvider";
import { SidebarProvider } from "@/components/ui/sidebar";

export default {
  title: "Layout/AppSidebar",
};

const Wrapper = ({
  children,
  basename,
}: React.PropsWithChildren<{
  basename?: string;
}>) => (
  <MemoryRouter initialEntries={["/"]}>
    <ThemeProvider>
      <CoreAdminContext
        i18nProvider={i18nProvider}
        store={memoryStore()}
        basename={basename}
      >
        <ResourceDefinitionContextProvider
          definitions={{
            posts: {
              name: "posts",
              hasList: true,
            },
            comments: {
              name: "comments",
              hasList: true,
            },
          }}
        >
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </ResourceDefinitionContextProvider>
      </CoreAdminContext>
    </ThemeProvider>
  </MemoryRouter>
);

export const Basic = () => (
  <Wrapper>
    <AppSidebar />
  </Wrapper>
);

export const WithBasename = () => (
  <Wrapper basename="/admin">
    <AppSidebar />
  </Wrapper>
);

export const DashboardMenuItemBasic = () => (
  <Wrapper>
    <DashboardMenuItem />
  </Wrapper>
);

export const DashboardMenuItemWithBasename = () => (
  <Wrapper basename="/admin">
    <DashboardMenuItem />
  </Wrapper>
);
