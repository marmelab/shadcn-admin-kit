import { CoreAdminContext, RecordContextProvider, required } from "ra-core";
import { TextArrayInput, SimpleForm, ThemeProvider } from "@/components/admin";
import { i18nProvider } from "@/lib/i18nProvider";
import { ReactNode } from "react";

const record = {
  id: 1,
  tags: ["react", "typescript"],
  emails: ["john@example.com", "jane@example.com"],
};

export default {
  title: "Inputs/TextArrayInput",
  parameters: {
    docs: {
      codePanel: true,
    },
  },
};

const StoryWrapper = ({
  children,
  theme,
  defaultValues,
}: {
  children: ReactNode;
  theme: "system" | "light" | "dark";
  defaultValues?: Record<string, unknown>;
}) => (
  <ThemeProvider defaultTheme={theme}>
    <CoreAdminContext i18nProvider={i18nProvider}>
      <RecordContextProvider value={defaultValues ?? record}>
        <SimpleForm>{children}</SimpleForm>
      </RecordContextProvider>
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

export const Basic = ({ theme }: { theme: "system" | "light" | "dark" }) => (
  <StoryWrapper theme={theme}>
    <TextArrayInput source="tags" />
  </StoryWrapper>
);
Object.assign(Basic, storyArgs);

export const WithPlaceholder = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme} defaultValues={{ id: 1, emails: [] }}>
    <TextArrayInput
      source="emails"
      placeholder="Type an email and press Enter"
    />
  </StoryWrapper>
);
Object.assign(WithPlaceholder, storyArgs);

export const WithHelperText = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme}>
    <TextArrayInput source="tags" helperText="Press Enter to add a tag" />
  </StoryWrapper>
);
Object.assign(WithHelperText, storyArgs);

export const WithValidation = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme} defaultValues={{ id: 1, tags: [] }}>
    <TextArrayInput source="tags" validate={required()} />
  </StoryWrapper>
);
Object.assign(WithValidation, storyArgs);

export const Disabled = ({ theme }: { theme: "system" | "light" | "dark" }) => (
  <StoryWrapper theme={theme}>
    <TextArrayInput source="tags" disabled />
  </StoryWrapper>
);
Object.assign(Disabled, storyArgs);

export const ReadOnly = ({ theme }: { theme: "system" | "light" | "dark" }) => (
  <StoryWrapper theme={theme}>
    <TextArrayInput source="tags" readOnly />
  </StoryWrapper>
);
Object.assign(ReadOnly, storyArgs);

export const WithFormat = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper
    theme={theme}
    defaultValues={{ id: 1, tags: ["REACT", "TYPESCRIPT"] }}
  >
    <TextArrayInput
      source="tags"
      format={(v) => v?.map((tag: string) => tag.toLowerCase())}
      helperText="Stored as uppercase, displayed as lowercase via format"
    />
  </StoryWrapper>
);
Object.assign(WithFormat, storyArgs);

export const WithParse = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme}>
    <TextArrayInput
      source="tags"
      parse={(v) => v?.map((tag: string) => tag.trim().toLowerCase())}
      helperText="Values are lowercased and trimmed before saving via parse"
    />
  </StoryWrapper>
);
Object.assign(WithParse, storyArgs);

export const WithFormatAndParse = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper
    theme={theme}
    defaultValues={{ id: 1, tags: ["react", "typescript"] }}
  >
    <TextArrayInput
      source="tags"
      format={(v) => v?.map((tag: string) => tag.toUpperCase())}
      parse={(v) => v?.map((tag: string) => tag.trim().toLowerCase())}
      helperText="Displayed as uppercase (format), saved as lowercase (parse)"
    />
  </StoryWrapper>
);
Object.assign(WithFormatAndParse, storyArgs);
