import { useCallback, useEffect, useMemo, useRef, type ReactNode } from "react";
import { Bold, Italic, List, ListOrdered, Redo2, Strikethrough, Undo2 } from "lucide-react";
import { Placeholder } from "@tiptap/extensions";
import { StarterKit } from "@tiptap/starter-kit";
import {
  EditorContent,
  type Content,
  type Editor,
  type UseEditorOptions,
  useEditor,
} from "@tiptap/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface MinimalTiptapProps
  extends Omit<
    UseEditorOptions,
    "content" | "extensions" | "editable" | "onBlur" | "onUpdate"
  > {
  value?: Content;
  onChange?: (value: Content) => void;
  onBlur?: (value: Content) => void;
  output?: "html" | "json" | "text";
  placeholder?: string;
  editable?: boolean;
  className?: string;
  editorContentClassName?: string;
  throttleDelay?: number;
  toolbar?: MinimalTiptapToolbar;
}

export type MinimalTiptapToolbar =
  | ReactNode
  | false
  | ((editor: Editor) => ReactNode | false);

const getOutput = (editor: Editor, format: MinimalTiptapProps["output"]) => {
  switch (format) {
    case "json":
      return editor.getJSON();
    case "text":
      return editor.getText();
    case "html":
    default:
      return editor.isEmpty ? "" : editor.getHTML();
  }
};

const ToolbarButton = ({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
}) => (
  <Button
    type="button"
    size="icon"
    variant={active ? "secondary" : "ghost"}
    onClick={onClick}
    aria-label={label}
    title={label}
  >
    {children}
  </Button>
);

const DefaultToolbar = ({ editor }: { editor: Editor }) => (
  <div className="flex flex-wrap items-center gap-1">
    <ToolbarButton
      label="Undo"
      onClick={() => {
        editor.chain().focus().undo().run();
      }}
    >
      <Undo2 className="size-4" />
    </ToolbarButton>
    <ToolbarButton
      label="Redo"
      onClick={() => {
        editor.chain().focus().redo().run();
      }}
    >
      <Redo2 className="size-4" />
    </ToolbarButton>
    <ToolbarButton
      label="Bold"
      active={editor.isActive("bold")}
      onClick={() => {
        editor.chain().focus().toggleBold().run();
      }}
    >
      <Bold className="size-4" />
    </ToolbarButton>
    <ToolbarButton
      label="Italic"
      active={editor.isActive("italic")}
      onClick={() => {
        editor.chain().focus().toggleItalic().run();
      }}
    >
      <Italic className="size-4" />
    </ToolbarButton>
    <ToolbarButton
      label="Strikethrough"
      active={editor.isActive("strike")}
      onClick={() => {
        editor.chain().focus().toggleStrike().run();
      }}
    >
      <Strikethrough className="size-4" />
    </ToolbarButton>
    <ToolbarButton
      label="Bulleted List"
      active={editor.isActive("bulletList")}
      onClick={() => {
        editor.chain().focus().toggleBulletList().run();
      }}
    >
      <List className="size-4" />
    </ToolbarButton>
    <ToolbarButton
      label="Numbered List"
      active={editor.isActive("orderedList")}
      onClick={() => {
        editor.chain().focus().toggleOrderedList().run();
      }}
    >
      <ListOrdered className="size-4" />
    </ToolbarButton>
  </div>
);

export const MinimalTiptapEditor = ({
  value,
  onChange,
  onBlur,
  output = "html",
  placeholder,
  editable = true,
  className,
  editorContentClassName,
  throttleDelay = 0,
  toolbar,
  ...editorOptions
}: MinimalTiptapProps) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const normalizedValue = useMemo<Content>(() => {
    if (value == null) {
      return "";
    }

    if (output === "json") {
      return value;
    }

    return typeof value === "string" ? value : String(value);
  }, [output, value]);

  const normalizedComparableValue = useMemo(() => {
    if (output === "json") {
      return JSON.stringify(normalizedValue);
    }

    return normalizedValue;
  }, [normalizedValue, output]);

  const emitChange = useCallback(
    (nextValue: Content) => {
      if (!onChange) {
        return;
      }

      if (throttleDelay <= 0) {
        onChange(nextValue);
        return;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        onChange(nextValue);
      }, throttleDelay);
    },
    [onChange, throttleDelay],
  );

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  const extensions = useMemo(
    () => [StarterKit, Placeholder.configure({ placeholder: placeholder ?? "" })],
    [placeholder],
  );

  const editor = useEditor({
    immediatelyRender: false,
    content: normalizedValue,
    editable,
    extensions,
    onUpdate: ({ editor: nextEditor }) => {
      emitChange(getOutput(nextEditor, output));
    },
    onBlur: ({ editor: nextEditor }) => {
      onBlur?.(getOutput(nextEditor, output));
    },
    editorProps: {
      attributes: {
        class: "outline-none min-h-40",
      },
      ...editorOptions.editorProps,
    },
    ...editorOptions,
  });

  const getComparableOutput = useCallback(
    (nextEditor: Editor) => {
      switch (output) {
        case "json":
          return JSON.stringify(nextEditor.getJSON());
        case "text":
          return nextEditor.getText();
        case "html":
        default:
          return nextEditor.isEmpty ? "" : nextEditor.getHTML();
      }
    },
    [output],
  );

  useEffect(() => {
    if (!editor) {
      return;
    }

    editor.setEditable(editable);
  }, [editor, editable]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    const currentOutput = getComparableOutput(editor);
    if (currentOutput === normalizedComparableValue) {
      return;
    }

    const { from, to } = editor.state.selection;

    editor.commands.setContent(normalizedValue, {
      emitUpdate: false,
      parseOptions: { preserveWhitespace: "full" },
    });

    const maxSelection = Math.max(editor.state.doc.content.size, 1);
    editor.commands.setTextSelection({
      from: Math.max(1, Math.min(from, maxSelection)),
      to: Math.max(1, Math.min(to, maxSelection)),
    });
  }, [editor, getComparableOutput, normalizedComparableValue, normalizedValue]);

  if (!editor) {
    return null;
  }

  const resolvedToolbar =
    toolbar === undefined
      ? <DefaultToolbar editor={editor} />
      : typeof toolbar === "function"
        ? toolbar(editor)
        : toolbar;

  return (
    <div
      data-slot="minimal-tiptap-root"
      className={cn(
        "border-input focus-within:border-ring focus-within:ring-ring/50 flex w-full flex-col rounded-md border shadow-xs focus-within:ring-[3px]",
        className,
      )}
    >
      {resolvedToolbar !== false && (
        <div className="border-b p-2" data-slot="minimal-tiptap-toolbar">
          {resolvedToolbar}
        </div>
      )}
      <EditorContent
        editor={editor}
        className={cn("minimal-tiptap-editor p-3", editorContentClassName)}
      />
    </div>
  );
};

MinimalTiptapEditor.displayName = "MinimalTiptapEditor";

export default MinimalTiptapEditor;
