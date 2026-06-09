import React, { lazy } from "react";
import { Layout } from "@/components/admin";
import { CoreAdminContext, memoryStore } from "ra-core";
import { MemoryRouter } from "react-router";
import { ThemeProvider } from "@/components/admin/theme-provider";
import { i18nProvider } from "@/lib/i18nProvider.ts";

export default {
  title: "layout/Layout",
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
        {children}
      </CoreAdminContext>
    </ThemeProvider>
  </MemoryRouter>
);

export const Basic = () => (
  <Wrapper>
    <Layout>Content</Layout>
  </Wrapper>
);

const BrokenComponent = () => {
  throw new Error("I am broken");
};

export const ErrorState = () => (
  <Wrapper>
    <Layout>
      <BrokenComponent />
    </Layout>
  </Wrapper>
);

const LazyComponent = lazy(() => new Promise(() => {}));

export const LoadingState = () => (
  <Wrapper>
    <Layout>
      <LazyComponent />
    </Layout>
  </Wrapper>
);

export const WithBasename = () => (
  <Wrapper basename="/admin">
    <Layout>Sub-path Content</Layout>
  </Wrapper>
);
