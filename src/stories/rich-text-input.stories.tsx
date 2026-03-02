import { ReactNode } from "react";
import { CoreAdminContext, RecordContextProvider, required } from "ra-core";
import { useFormContext, useWatch } from "react-hook-form";

import {
  RichTextInput,
  SimpleForm,
  ThemeProvider,
} from "@/components/admin";
import { Button } from "@/components/ui/button";
import { i18nProvider } from "@/lib/i18nProvider";

const record = {
  id: 1,
  body: "<p>This is an <strong>initial rich text</strong> value.</p>",
};

export default {
  title: "Inputs/RichTextInput",
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

const StoryArgs = {
  args: { theme: "system" as const },
  argTypes: {
    theme: {
      type: "select" as const,
      options: ["light", "dark", "system"],
    },
  },
};

const FormValues = () => {
  const values = useWatch();
  return <pre>{JSON.stringify(values, null, 2)}</pre>;
};

const BodyHelper = () => {
  const { setValue, resetField } = useFormContext();
  const currentValue = useWatch({ name: "body" });

  return (
    <div className="space-y-2">
      <p className="text-sm">Current value: {currentValue || "-"}</p>
      <div className="flex gap-2">
        <Button
          type="button"
          onClick={() => {
            setValue("body", "<p>Value changed externally.</p>", {
              shouldDirty: true,
            });
          }}
        >
          Change value
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={() => {
            resetField("body");
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export const Basic = ({ theme }: { theme: "system" | "light" | "dark" }) => (
  <StoryWrapper theme={theme}>
    <RichTextInput source="body" />
    <FormValues />
  </StoryWrapper>
);
Object.assign(Basic, StoryArgs);

export const Disabled = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme}>
    <RichTextInput source="body" disabled />
    <FormValues />
  </StoryWrapper>
);
Object.assign(Disabled, StoryArgs);

export const ReadOnly = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme}>
    <RichTextInput source="body" readOnly />
    <FormValues />
  </StoryWrapper>
);
Object.assign(ReadOnly, StoryArgs);

export const WithHelperText = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme}>
    <RichTextInput source="body" helperText="Use the toolbar to format text" />
    <FormValues />
  </StoryWrapper>
);
Object.assign(WithHelperText, StoryArgs);

export const WithValidation = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme} defaultValues={{ id: 1, body: "" }}>
    <RichTextInput source="body" validate={required()} />
    <FormValues />
  </StoryWrapper>
);
Object.assign(WithValidation, StoryArgs);

export const ExternalChanges = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme}>
    <RichTextInput source="body" />
    <BodyHelper />
  </StoryWrapper>
);
Object.assign(ExternalChanges, StoryArgs);
