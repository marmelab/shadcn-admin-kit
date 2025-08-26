import React from "react";
import { CoreAdminContext, RecordContextProvider } from "ra-core";
import { i18nProvider } from "@/lib/i18nProvider.ts";
import { ThemeProvider, UrlField } from "@/components/admin";

export default {
  title: "Fields/UrlField",
};

const record = {
  id: 1,
  name: "John Doe",
  website: "https://example.org",
};

const Wrapper = ({ children }: React.PropsWithChildren) => (
  <ThemeProvider>
    <CoreAdminContext i18nProvider={i18nProvider}>
      <RecordContextProvider value={record}>{children}</RecordContextProvider>
    </CoreAdminContext>
  </ThemeProvider>
);

export const Basic = () => (
  <Wrapper>
    <UrlField source={"website"} />
  </Wrapper>
);
