import React from "react";
import {
  CoreAdminContext,
  FilterLiveForm,
  ListContextProvider,
  useList,
} from "ra-core";
import { i18nProvider } from "@/lib/i18nProvider.ts";
import { SearchInput, ThemeProvider } from "@/components/admin";
import { useWatch } from "react-hook-form";

export default {
  title: "Inputs/SearchInput",
};

const records = [
  {
    id: 1,
    title: "Apple",
    price: 1.99,
  },
  {
    id: 2,
    title: "Orange",
    price: 2.99,
  },
  {
    id: 3,
    title: "Pear",
    price: 2.29,
  },
];

const FormValues = () => {
  const values = useWatch();
  return <pre>{JSON.stringify(values, null, 2)}</pre>;
};

const Wrapper = ({ children }: React.PropsWithChildren) => {
  const listContext = useList({
    data: records,
  });

  return (
    <ThemeProvider>
      <CoreAdminContext i18nProvider={i18nProvider}>
        <ListContextProvider value={listContext}>
          <FilterLiveForm>{children}</FilterLiveForm>
        </ListContextProvider>
      </CoreAdminContext>
    </ThemeProvider>
  );
};

export const Basic = () => (
  <Wrapper>
    <SearchInput source="q" alwaysOn />
    <FormValues />
  </Wrapper>
);
