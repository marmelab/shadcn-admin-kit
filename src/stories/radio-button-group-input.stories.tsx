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
  name: "Hello, World",
  category: "lifestyle",
};

const categories = [
  { id: "tech", name: "Tech" },
  { id: "lifestyle", name: "Lifestyle" },
  { id: "people", name: "People" },
];

const FormValues = () => {
  const values = useWatch();
  return <pre className="mt-4">{JSON.stringify(values, null, 2)}</pre>;
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
    <RadioButtonGroupInput source="category" choices={categories} />
    <FormValues />
  </Wrapper>
);

export const Row = () => (
  <Wrapper>
    <RadioButtonGroupInput source="category" choices={categories} row={true} />
    <FormValues />
  </Wrapper>
);

export const Disabled = () => (
  <Wrapper>
    <RadioButtonGroupInput source="category" choices={categories} disabled />
    <FormValues />
  </Wrapper>
);

export const Label = () => (
  <Wrapper>
    <RadioButtonGroupInput
      source="category"
      choices={categories}
      label="Select category"
    />
    <FormValues />
  </Wrapper>
);

export const HelperText = () => (
  <Wrapper>
    <RadioButtonGroupInput
      source="category"
      choices={categories}
      helperText="Select category"
    />
    <FormValues />
  </Wrapper>
);
