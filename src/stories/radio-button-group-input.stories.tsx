import React from "react";
import { CoreAdminContext, Form, RecordContextProvider } from "ra-core";
import { i18nProvider } from "@/lib/i18nProvider.ts";
import { RadioButtonGroupInput, ThemeProvider } from "@/components/admin";
import { useWatch } from "react-hook-form";

export default {
  title: "Inputs/RadioButtonGroupInput",
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

const FormValues = () => {
  const values = useWatch();
  return <pre>{JSON.stringify(values, null, 2)}</pre>;
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
    <RadioButtonGroupInput
      source="gender"
      choices={genders}
      optionText="label"
    />
    <FormValues />
  </Wrapper>
);

export const Row = () => (
  <Wrapper>
    <RadioButtonGroupInput
      source="gender"
      choices={genders}
      optionText="label"
      row={true}
    />
    <FormValues />
  </Wrapper>
);
