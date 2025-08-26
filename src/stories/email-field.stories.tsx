import React from "react";
import { CoreAdminContext, RecordContextProvider } from "ra-core";
import { i18nProvider } from "@/lib/i18nProvider.ts";
import { EmailField, ThemeProvider } from "@/components/admin";

export default {
  title: "Fields/EmailField",
};

const record = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.org",
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
    <EmailField source={"email"} />
  </Wrapper>
);
