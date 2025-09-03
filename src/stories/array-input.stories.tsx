import { ReactNode } from "react";
import {
  CoreAdminContext,
  minLength,
  RecordContextProvider,
  required,
  ResourceContextProvider,
} from "ra-core";
import { ThemeProvider } from "@/components/admin/theme-provider";
import { ArrayInput } from "@/components/admin/array-input";
import { NumberInput } from "@/components/admin/number-input";
import { TextInput } from "@/components/admin/text-input";
import { SimpleForm } from "@/components/admin/simple-form";
import { SimpleFormIterator } from "@/components/admin/simple-form-iterator";
import { i18nProvider } from "@/lib/i18nProvider";

const defaultRecord = {
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
  record = defaultRecord,
}: {
  children: ReactNode;
  theme: "system" | "light" | "dark";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  record?: any;
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

export const SeveralInputs = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme}>
    <ResourceContextProvider value="posts">
      <SimpleForm>
        <ArrayInput source="tags">
          <SimpleFormIterator>
            <TextInput source="name" />
            <TextInput source="profession" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </ResourceContextProvider>
  </StoryWrapper>
);

export const Inline = () => (
  <StoryWrapper
    theme="light"
    record={{
      id: 1,
      date: "2022-08-30",
      customer: "John Doe",
      items: [
        {
          name: "Office Jeans",
          price: 45.99,
          quantity: 1,
        },
        {
          name: "Black Elegance Jeans",
          price: 69.99,
          quantity: 2,
        },
        {
          name: "Slim Fit Jeans",
          price: 55.99,
          quantity: 1,
        },
      ],
    }}
  >
    <ResourceContextProvider value="orders">
      <SimpleForm>
        <TextInput source="customer" />
        <TextInput source="date" type="date" />
        <ArrayInput source="items">
          <SimpleFormIterator inline>
            <TextInput source="name" />
            <NumberInput source="price" />
            <NumberInput source="quantity" />
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

export const WithoutInputLabel = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme}>
    <ResourceContextProvider value="posts">
      <SimpleForm>
        <ArrayInput source="tags" validate={minLength(5)}>
          <SimpleFormIterator>
            <TextInput source="name" validate={required()} label={false} />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </ResourceContextProvider>
  </StoryWrapper>
);

export const WithHelpText = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme}>
    <ResourceContextProvider value="posts">
      <SimpleForm>
        <ArrayInput source="tags" validate={minLength(5)}>
          <SimpleFormIterator>
            <TextInput
              source="name"
              validate={(required(), minLength(5))}
              helperText="Enter at least 5 characters"
            />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </ResourceContextProvider>
  </StoryWrapper>
);

export const WithoutLabelWithHelpText = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme}>
    <ResourceContextProvider value="posts">
      <SimpleForm>
        <ArrayInput source="tags" validate={minLength(5)}>
          <SimpleFormIterator>
            <TextInput
              source="name"
              label={false}
              validate={(required(), minLength(5))}
              helperText="Enter at least 5 characters"
            />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </ResourceContextProvider>
  </StoryWrapper>
);
