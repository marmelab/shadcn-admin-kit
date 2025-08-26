import React from "react";
import { CoreAdminContext, Form, RecordContextProvider } from "ra-core";
import { i18nProvider } from "@/lib/i18nProvider.ts";
import { NumberInput, ThemeProvider } from "@/components/admin";

export default {
  title: "Fields/NumberInput",
};

const record = {
  id: 1,
  title: "Apple",
  price: 1.99,
};

const Wrapper = ({ children }: React.PropsWithChildren) => (
  <ThemeProvider>
    <CoreAdminContext i18nProvider={i18nProvider}>
      <RecordContextProvider value={record}>
        <Form>{children}</Form>
      </RecordContextProvider>
    </CoreAdminContext>
  </ThemeProvider>
);

export const Basic = () => (
  <Wrapper>
    <NumberInput source="price" step="0.01" />
  </Wrapper>
);
