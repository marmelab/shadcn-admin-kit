import React from "react";
import { CoreAdminContext, Form, RecordContextProvider } from "ra-core";
import { i18nProvider } from "@/lib/i18nProvider.ts";
import { FileInput, FileField, ThemeProvider } from "@/components/admin";

export default {
  title: "Fields/FileInput",
};

const record = {
  id: 1,
  title: "My Post",
  attachments: [
    { src: "https://example.org/document.pdf", title: "MyDocument.pdf" },
    { src: "https://example.org/picture.png", title: "MyPicture.png" },
  ],
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
    <FileInput source="attachments" multiple>
      <FileField source="src" title="title" target="_blank" />
    </FileInput>
  </Wrapper>
);
