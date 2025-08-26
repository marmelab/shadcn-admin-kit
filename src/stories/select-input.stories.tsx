import React from "react";
import { CoreAdminContext, Form, RecordContextProvider } from "ra-core";
import { i18nProvider } from "@/lib/i18nProvider.ts";
import { SelectInput, ThemeProvider } from "@/components/admin";

export default {
  title: "Inputs/SelectInput",
};

const record = {
  id: 1,
  name: "John Doe",
  gender: "male",
};

const genders = [
  { id: "male", label: "He/Him" },
  { id: "female", label: "She/Her" },
  { id: "nonbinary", label: "They/Them" },
];

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
    <SelectInput source="gender" choices={genders} optionText="label" />
  </Wrapper>
);
