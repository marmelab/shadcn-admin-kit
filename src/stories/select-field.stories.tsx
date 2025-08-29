import React from "react";
import { CoreAdminContext, RecordContextProvider } from "ra-core";
import { i18nProvider } from "@/lib/i18nProvider.ts";
import { SelectField, ThemeProvider } from "@/components/admin";

export default {
  title: "Fields/SelectField",
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
      <RecordContextProvider value={record}>{children}</RecordContextProvider>
    </CoreAdminContext>
  </ThemeProvider>
);

export const Basic = () => (
  <Wrapper>
    <SelectField
      source={"gender"}
      choices={genders}
      optionText="label"
      optionValue="id"
    />
  </Wrapper>
);
