import React from "react";
import { CoreAdminContext, RecordContextProvider } from "ra-core";
import { i18nProvider } from "@/lib/i18nProvider.ts";
import { DateField, ThemeProvider } from "@/components/admin";

export default {
  title: "Fields/DateField",
};

const record = {
  id: 1,
  tags: [{ name: "tech" }, { name: "news" }, { name: "lifestyle" }],
  title: "My Post",
  created_at: new Date("2025-03-25 14:57:21").toISOString(),
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
    <DateField source={"created_at"} />
  </Wrapper>
);

export const ShowTime = () => (
  <Wrapper>
    <DateField showTime source={"created_at"} />
  </Wrapper>
);
