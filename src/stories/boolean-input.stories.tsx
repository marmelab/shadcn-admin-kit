import React from "react";
import { CoreAdminContext, Form, RecordContextProvider } from "ra-core";
import type { RaRecord } from "ra-core";
import { i18nProvider } from "@/lib/i18nProvider.ts";
import { BooleanInput, ThemeProvider } from "@/components/admin";
import { useWatch } from "react-hook-form";

export default {
  title: "Inputs/BooleanInput",
};

const defaultRecord = {
  id: 1,
  isPublished: true,
};

const FormValues = () => {
  const values = useWatch();
  return <pre>{JSON.stringify(values, null, 2)}</pre>;
};

const Wrapper = ({
  children,
  record = defaultRecord,
}: React.PropsWithChildren & { record?: RaRecord }) => (
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
    <BooleanInput source="isPublished" />
    <FormValues />
  </Wrapper>
);

export const Disabled = () => (
  <Wrapper>
    <BooleanInput source="isPublished" disabled />
    <FormValues />
  </Wrapper>
);

export const Label = () => (
  <Wrapper>
    <BooleanInput source="isPublished" label="Published?" />
    <FormValues />
  </Wrapper>
);

export const ReadOnly = () => (
  <Wrapper>
    <BooleanInput source="isPublished" readOnly />
    <FormValues />
  </Wrapper>
);

export const Format = () => (
  <Wrapper record={{ id: 1, isPublished: 0 }}>
    <BooleanInput source="isPublished" format={(value) => Boolean(value)} />
    <FormValues />
  </Wrapper>
);

export const Parse = () => (
  <Wrapper record={{ id: 1, isPublished: 0 }}>
    <BooleanInput
      source="isPublished"
      format={(value) => Boolean(value)}
      parse={(value) => (value ? 1 : 0)}
    />
    <FormValues />
  </Wrapper>
);

export const UndefinedValue = () => (
  <Wrapper record={{ id: 1 }}>
    <BooleanInput source="isPublished" />
    <FormValues />
  </Wrapper>
);
