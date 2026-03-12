import { ReactNode, useRef } from "react";
import type { Editor } from "@tiptap/react";
import { CoreAdminContext, RecordContextProvider, required } from "ra-core";
import { useFormContext, useWatch } from "react-hook-form";

import {
  FormToolbar,
  SaveButton,
  SimpleForm,
  ThemeProvider,
} from "@/components/admin";
import {
  DefaultEditorOptions,
  RichTextInput,
  RichTextInputToolbar,
  useRichTextInputEditor,
} from "@/components/rich-text-input";
import { Button } from "@/components/ui/button";
import { i18nProvider } from "@/lib/i18nProvider";
import { UnknownRecord } from "@/lib/unkown-types";

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
  toolbar,
}: {
  children: ReactNode;
  theme: "system" | "light" | "dark";
  defaultValues?: UnknownRecord;
  toolbar?: ReactNode;
}) => (
  <ThemeProvider defaultTheme={theme}>
    <CoreAdminContext i18nProvider={i18nProvider}>
      <RecordContextProvider value={defaultValues ?? record}>
        <SimpleForm toolbar={toolbar}>{children}</SimpleForm>
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
  return <pre className="whitespace-pre-wrap wrap-break-word">{JSON.stringify(values, null, 2)}</pre>;
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

export const Validation = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme} defaultValues={{ id: 1, body: "" }}>
    <RichTextInput source="body" validate={required()} />
    <FormValues />
  </StoryWrapper>
);
Object.assign(Validation, StoryArgs);

const BoldButton = () => {
  const editor = useRichTextInputEditor();
  if (!editor) {
    return null;
  }

  return (
    <Button
      type="button"
      variant={editor.isActive("bold") ? "secondary" : "ghost"}
      onClick={() => {
        editor.chain().focus().toggleBold().run();
      }}
    >
      Bold
    </Button>
  );
};

const MyRichTextInputToolbar = () => (
  <RichTextInputToolbar>
    <BoldButton />
  </RichTextInputToolbar>
);

export const Toolbar = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme}>
    <RichTextInput source="body" toolbar={<MyRichTextInputToolbar />} />
    <FormValues />
  </StoryWrapper>
);
Object.assign(Toolbar, StoryArgs);

export const EditorReference = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => {
  const editorRef = useRef<Editor | null>(null);

  return (
    <StoryWrapper
      theme={theme}
      toolbar={
        <FormToolbar>
          <SaveButton />
          <Button
            type="button"
            onClick={() => {
              editorRef.current?.commands.setContent("<h3>Here is my template</h3>");
            }}
          >
            Use template
          </Button>
        </FormToolbar>
      }
    >
      <RichTextInput
        source="body"
        editorOptions={{
          ...DefaultEditorOptions,
          onCreate: ({ editor: nextEditor }) => {
            editorRef.current = nextEditor;
          },
        }}
      />
      <FormValues />
    </StoryWrapper>
  );
};
Object.assign(EditorReference, StoryArgs);

export const ExternalChanges = ({
  theme,
}: {
  theme: "system" | "light" | "dark";
}) => (
  <StoryWrapper theme={theme}>
    <RichTextInput source="body" />
    <BodyHelper />
    <FormValues />
  </StoryWrapper>
);
Object.assign(ExternalChanges, StoryArgs);
