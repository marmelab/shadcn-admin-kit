/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  CoreAdminContext,
  ListContext,
  ResourceContextProvider,
  ResourceDefinitionContextProvider,
  memoryStore,
} from "ra-core";
import polyglotI18nProvider from "ra-i18n-polyglot";
import defaultMessages from "ra-language-english";
import { BulkDeleteButton, ThemeProvider } from "@/components/admin";
import fakeRestDataProvider from "ra-data-fakerest";

export default {
  title: "Buttons/BulkDeleteButton",
};

const dataProvider = fakeRestDataProvider({
  posts: [
    { id: 1, title: "War and Peace" },
    { id: 2, title: "Pride and Prejudice" },
  ],
});

const Wrapper = ({
  children,
  i18nProvider,
}: React.PropsWithChildren<{
  i18nProvider?: ReturnType<typeof polyglotI18nProvider>;
}>) => (
  <ThemeProvider>
    <CoreAdminContext
      dataProvider={dataProvider}
      i18nProvider={
        i18nProvider ??
        polyglotI18nProvider(() => defaultMessages, "en", undefined, {
          allowMissing: true,
        })
      }
      store={memoryStore()}
    >
      <ResourceDefinitionContextProvider
        definitions={{ posts: { name: "posts" } }}
      >
        <ResourceContextProvider value="posts">
          <ListContext.Provider
            value={{ selectedIds: [1, 2], onUnselectItems: () => {} } as any}
          >
            {children}
          </ListContext.Provider>
        </ResourceContextProvider>
      </ResourceDefinitionContextProvider>
    </CoreAdminContext>
  </ThemeProvider>
);

export const Basic = () => (
  <Wrapper>
    <BulkDeleteButton />
  </Wrapper>
);

export const CustomLabel = () => (
  <Wrapper>
    <BulkDeleteButton label="Remove selected" />
  </Wrapper>
);

export const ResourceSpecificLabel = () => (
  <Wrapper
    i18nProvider={polyglotI18nProvider(
      () => ({
        ...defaultMessages,
        resources: {
          posts: {
            action: {
              delete: "Remove posts",
            },
          },
        },
      }),
      "en",
      undefined,
      { allowMissing: true },
    )}
  >
    <BulkDeleteButton />
  </Wrapper>
);
