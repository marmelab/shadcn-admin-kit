import React from "react";
import { CoreAdminContext, RecordContextProvider } from "ra-core";
import { i18nProvider } from "@/lib/i18nProvider.ts";
import { FileField, ThemeProvider } from "@/components/admin";

export default {
  title: "Fields/FileField",
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
      <RecordContextProvider value={record}>{children}</RecordContextProvider>
    </CoreAdminContext>
  </ThemeProvider>
);

export const Basic = () => (
  <Wrapper>
    <FileField source="attachments" src="src" title="title" />
  </Wrapper>
);
