import {
  CoreAdminContext,
  minLength,
  RecordContextProvider,
  required,
  ResourceContextProvider,
} from "ra-core";
import { SimpleForm, TextInput, ThemeProvider } from "@/components/admin";
import { i18nProvider } from "@/lib/i18nProvider";
import { ReactNode } from "react";
import { ArrayInput } from "@/components/admin/array-input";
import { SimpleFormIterator } from "@/components/admin/simple-form-iterator";

const record = {
  id: 1,
  tags: [{ name: "tech" }, { name: "news" }, { name: "lifestyle" }],
  title: "My Post",
};

export default {
  title: "Inputs/ArrayInput",
  parameters: {
    docs: {
      codePanel: true,
    },
  },
};

const StoryWrapper = ({
  children,
  theme,
}: {
  children: ReactNode;
  theme: "system" | "light" | "dark";
}) => (
  <ThemeProvider defaultTheme={theme}>
    <CoreAdminContext i18nProvider={i18nProvider}>
      <RecordContextProvider value={record}>{children}</RecordContextProvider>
    </CoreAdminContext>
  </ThemeProvider>
);

export const Basic = ({ theme }: { theme: "system" | "light" | "dark" }) => (
  <StoryWrapper theme={theme}>
    <ResourceContextProvider value="posts">
      <SimpleForm>
        <ArrayInput source="tags">
          <SimpleFormIterator>
            <TextInput source="name" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </ResourceContextProvider>
  </StoryWrapper>
);

export const WithArrayInputValidation = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme}>
    <ResourceContextProvider value="posts">
      <SimpleForm>
        <ArrayInput source="tags" validate={minLength(5)}>
          <SimpleFormIterator>
            <TextInput source="name" validate={required()} />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </ResourceContextProvider>
  </StoryWrapper>
);

export const WithInputValidation = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme}>
    <ResourceContextProvider value="posts">
      <SimpleForm>
        <ArrayInput source="tags">
          <SimpleFormIterator>
            <TextInput source="name" validate={required()} />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </ResourceContextProvider>
  </StoryWrapper>
);
