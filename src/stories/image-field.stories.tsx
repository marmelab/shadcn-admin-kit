import React from "react";
import type { RaRecord } from "ra-core";
import { CoreAdminContext, RecordContextProvider } from "ra-core";
import { i18nProvider } from "@/lib/i18nProvider.ts";
import { ImageField, ThemeProvider } from "@/components/admin";

export default {
  title: "Fields/ImageField",
};

const defaultRecord = {
  id: 1,
  avatarUrl: "https://marmelab.com/posters/avatar-166.jpeg?size=32x32",
  name: "John Doe",
};

const Wrapper = ({
  children,
  record = defaultRecord,
}: React.PropsWithChildren<{ record?: RaRecord }>) => (
  <ThemeProvider>
    <CoreAdminContext i18nProvider={i18nProvider}>
      <RecordContextProvider value={record}>{children}</RecordContextProvider>
    </CoreAdminContext>
  </ThemeProvider>
);

export const Basic = () => (
  <Wrapper>
    <ImageField source="avatarUrl" />
  </Wrapper>
);

export const ClassName = () => (
  <Wrapper>
    <ImageField
      source="avatarUrl"
      className="[&_img]:w-32 [&_img]:h-32 [&_img]:rounded-full"
    />
  </Wrapper>
);

export const Title = () => (
  <Wrapper>
    <ImageField source="avatarUrl" title="User Avatar" />
  </Wrapper>
);

export const TitleField = () => (
  <Wrapper>
    <ImageField source="avatarUrl" title="name" />
  </Wrapper>
);

export const Empty = () => (
  <Wrapper record={{ id: 1 }}>
    <ImageField
      source="avatarUrl"
      empty={
        <div
          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
          aria-label="no avatar"
        >
          👤
        </div>
      }
    />
  </Wrapper>
);

export const Multiple = () => (
  <Wrapper
    record={{
      id: 1,
      attachments: [
        { url: "https://marmelab.com/posters/avatar-1.jpeg?size=32x32" },
        { url: "https://marmelab.com/posters/avatar-3.jpeg?size=32x32" },
        { url: "https://marmelab.com/posters/avatar-5.jpeg?size=32x32" },
      ],
    }}
  >
    <ImageField source="attachments" src="url" />
  </Wrapper>
);

export const MultipleTitle = () => (
  <Wrapper
    record={{
      id: 1,
      employees: [
        {
          url: "https://marmelab.com/posters/avatar-1.jpeg?size=32x32",
          title: "Jane Doe",
        },
        {
          url: "https://marmelab.com/posters/avatar-3.jpeg?size=32x32",
          title: "John Smith",
        },
        {
          url: "https://marmelab.com/posters/avatar-5.jpeg?size=32x32",
          title: "Alice Johnson",
        },
      ],
    }}
  >
    <ImageField source="employees" src="url" title="title" />
  </Wrapper>
);

export const MultipleClassName = () => (
  <Wrapper
    record={{
      id: 1,
      employees: [
        { url: "https://marmelab.com/posters/avatar-1.jpeg?size=32x32" },
        { url: "https://marmelab.com/posters/avatar-3.jpeg?size=32x32" },
        { url: "https://marmelab.com/posters/avatar-5.jpeg?size=32x32" },
      ],
    }}
  >
    <ImageField
      source="employees"
      src="url"
      className="[&_ul]:flex [&_ul]:gap-2 [&_img]:w-12 [&_img]:h-12 [&_img]:rounded-full"
    />
  </Wrapper>
);
