import type { ReactNode } from "react";
import { Bold, Italic, List, ListOrdered, Redo2, Strikethrough, Undo2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMinimalTiptapEditor } from "@/components/ui/minimal-tiptap";

export type RichTextInputToolbarProps = {
  children?: ReactNode;
};

type ToolbarButtonProps = {
  active?: boolean;
  disabled?: boolean;
  label: string;
  onClick: () => void;
  children: ReactNode;
};

const ToolbarButton = ({
  active,
  disabled,
  label,
  onClick,
  children,
}: ToolbarButtonProps) => (
  <Button
    type="button"
    size="icon"
    variant={active ? "secondary" : "ghost"}
    aria-label={label}
    title={label}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </Button>
);

const DefaultToolbarItems = () => {
  const editor = useMinimalTiptapEditor();
  if (!editor) {
    return null;
  }

  return (
    <>
      <ToolbarButton
        label="Undo"
        disabled={!editor.isEditable}
        onClick={() => {
          editor.chain().focus().undo().run();
        }}
      >
        <Undo2 />
      </ToolbarButton>
      <ToolbarButton
        label="Redo"
        disabled={!editor.isEditable}
        onClick={() => {
          editor.chain().focus().redo().run();
        }}
      >
        <Redo2 />
      </ToolbarButton>
      <ToolbarButton
        label="Bold"
        active={editor.isActive("bold")}
        disabled={!editor.isEditable}
        onClick={() => {
          editor.chain().focus().toggleBold().run();
        }}
      >
        <Bold />
      </ToolbarButton>
      <ToolbarButton
        label="Italic"
        active={editor.isActive("italic")}
        disabled={!editor.isEditable}
        onClick={() => {
          editor.chain().focus().toggleItalic().run();
        }}
      >
        <Italic />
      </ToolbarButton>
      <ToolbarButton
        label="Strikethrough"
        active={editor.isActive("strike")}
        disabled={!editor.isEditable}
        onClick={() => {
          editor.chain().focus().toggleStrike().run();
        }}
      >
        <Strikethrough />
      </ToolbarButton>
      <ToolbarButton
        label="Bulleted List"
        active={editor.isActive("bulletList")}
        disabled={!editor.isEditable}
        onClick={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        <List />
      </ToolbarButton>
      <ToolbarButton
        label="Numbered List"
        active={editor.isActive("orderedList")}
        disabled={!editor.isEditable}
        onClick={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
      >
        <ListOrdered />
      </ToolbarButton>
    </>
  );
};

export const RichTextInputToolbar = ({
  children,
}: RichTextInputToolbarProps) => (
  <div className="flex flex-wrap items-center gap-1">
    {children ?? <DefaultToolbarItems />}
  </div>
);

export const useRichTextInputEditor = useMinimalTiptapEditor;
