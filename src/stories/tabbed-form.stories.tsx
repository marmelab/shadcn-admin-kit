import { type ReactNode } from "react";
import {
  CoreAdminContext,
  RecordContextProvider,
  required,
  ResourceContextProvider,
} from "ra-core";
import { ThemeProvider } from "@/components/admin/theme-provider";
import { TabbedForm } from "@/components/admin/tabbed-form";
import { TextInput } from "@/components/admin/text-input";
import { FormToolbar } from "@/components/admin/simple-form";
import { i18nProvider } from "@/lib/i18nProvider";

const defaultRecord = {
  id: 1,
  title: "Hello World",
  body: "Lorem ipsum dolor sit amet.",
  author: "Jane Doe",
  views: 42,
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

const storyArgs = {
  args: { theme: "system" as const },
  argTypes: {
    theme: {
      type: "select" as const,
      options: ["light", "dark", "system"],
    },
  },
};

export default {
  title: "Forms/TabbedForm",
  parameters: {
    docs: {
      codePanel: true,
    },
  },
};

export const Basic = ({ theme }: { theme: "system" | "light" | "dark" }) => (
  <StoryWrapper theme={theme}>
    <ResourceContextProvider value="posts">
      <TabbedForm syncWithLocation={false}>
        <TabbedForm.Tab label="Summary">
          <TextInput source="title" />
          <TextInput source="body" multiline />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Details">
          <TextInput source="author" />
          <TextInput source="views" type="number" />
        </TabbedForm.Tab>
      </TabbedForm>
    </ResourceContextProvider>
  </StoryWrapper>
);
Object.assign(Basic, storyArgs);

export const ThreeTabs = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme}>
    <ResourceContextProvider value="posts">
      <TabbedForm syncWithLocation={false}>
        <TabbedForm.Tab label="Summary">
          <TextInput source="title" />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Body">
          <TextInput source="body" multiline />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Details">
          <TextInput source="author" />
          <TextInput source="views" type="number" />
        </TabbedForm.Tab>
      </TabbedForm>
    </ResourceContextProvider>
  </StoryWrapper>
);
Object.assign(ThreeTabs, storyArgs);

export const WithValidation = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme} record={{ id: 1 }}>
    <ResourceContextProvider value="posts">
      <TabbedForm syncWithLocation={false}>
        <TabbedForm.Tab label="Summary">
          <TextInput source="title" validate={required()} />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Details">
          <TextInput source="author" validate={required()} />
        </TabbedForm.Tab>
      </TabbedForm>
    </ResourceContextProvider>
  </StoryWrapper>
);
Object.assign(WithValidation, storyArgs);

export const NoToolbar = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme}>
    <ResourceContextProvider value="posts">
      <TabbedForm syncWithLocation={false} toolbar={false}>
        <TabbedForm.Tab label="Summary">
          <TextInput source="title" />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Details">
          <TextInput source="author" />
        </TabbedForm.Tab>
      </TabbedForm>
    </ResourceContextProvider>
  </StoryWrapper>
);
Object.assign(NoToolbar, storyArgs);

export const CustomToolbar = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme}>
    <ResourceContextProvider value="posts">
      <TabbedForm
        syncWithLocation={false}
        toolbar={<FormToolbar className="justify-start" />}
      >
        <TabbedForm.Tab label="Summary">
          <TextInput source="title" />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Details">
          <TextInput source="author" />
        </TabbedForm.Tab>
      </TabbedForm>
    </ResourceContextProvider>
  </StoryWrapper>
);
Object.assign(CustomToolbar, storyArgs);

export const WithContentClassName = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme}>
    <ResourceContextProvider value="posts">
      <TabbedForm syncWithLocation={false}>
        <TabbedForm.Tab label="Summary" className="max-w-lg">
          <TextInput source="title" />
          <TextInput source="body" multiline />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Details" className="max-w-xs">
          <TextInput source="author" />
        </TabbedForm.Tab>
      </TabbedForm>
    </ResourceContextProvider>
  </StoryWrapper>
);
Object.assign(WithContentClassName, storyArgs);
