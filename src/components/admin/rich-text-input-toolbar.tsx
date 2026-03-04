import type { ReactNode } from "react";
import {
  Bold,
  Code2,
  Heading1,
  Heading2,
  Italic,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  Quote,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react";

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
    className="cursor-pointer"
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

  const isDisabled = !editor.isEditable;
  const linkIsActive = editor.isActive("link");
  const hasTextSelection = !editor.state.selection.empty;

  const handleSetLink = () => {
    const previousValue = (editor.getAttributes("link").href as string | undefined) ?? "";
    const nextValue = window.prompt("URL", previousValue);

    if (nextValue === null) {
      return;
    }

    const href = nextValue.trim();
    if (!href) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
  };

  return (
    <>
      <ToolbarButton
        label="Undo"
        disabled={isDisabled}
        onClick={() => {
          editor.chain().focus().undo().run();
        }}
      >
        <Undo2 />
      </ToolbarButton>
      <ToolbarButton
        label="Redo"
        disabled={isDisabled}
        onClick={() => {
          editor.chain().focus().redo().run();
        }}
      >
        <Redo2 />
      </ToolbarButton>
      <ToolbarButton
        label="Bold"
        active={editor.isActive("bold")}
        disabled={isDisabled}
        onClick={() => {
          editor.chain().focus().toggleBold().run();
        }}
      >
        <Bold />
      </ToolbarButton>
      <ToolbarButton
        label="Italic"
        active={editor.isActive("italic")}
        disabled={isDisabled}
        onClick={() => {
          editor.chain().focus().toggleItalic().run();
        }}
      >
        <Italic />
      </ToolbarButton>
      <ToolbarButton
        label="Underline"
        active={editor.isActive("underline")}
        disabled={isDisabled}
        onClick={() => {
          editor.chain().focus().toggleUnderline().run();
        }}
      >
        <Underline />
      </ToolbarButton>
      <ToolbarButton
        label="Strikethrough"
        active={editor.isActive("strike")}
        disabled={isDisabled}
        onClick={() => {
          editor.chain().focus().toggleStrike().run();
        }}
      >
        <Strikethrough />
      </ToolbarButton>
      <ToolbarButton
        label="Code"
        active={editor.isActive("code")}
        disabled={isDisabled}
        onClick={() => {
          editor.chain().focus().toggleCode().run();
        }}
      >
        <Code2 />
      </ToolbarButton>
      <ToolbarButton
        label="Heading 1"
        active={editor.isActive("heading", { level: 1 })}
        disabled={isDisabled}
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
      >
        <Heading1 />
      </ToolbarButton>
      <ToolbarButton
        label="Heading 2"
        active={editor.isActive("heading", { level: 2 })}
        disabled={isDisabled}
        onClick={() => {
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
      >
        <Heading2 />
      </ToolbarButton>
      <ToolbarButton
        label="Bulleted List"
        active={editor.isActive("bulletList")}
        disabled={isDisabled}
        onClick={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        <List />
      </ToolbarButton>
      <ToolbarButton
        label="Numbered List"
        active={editor.isActive("orderedList")}
        disabled={isDisabled}
        onClick={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
      >
        <ListOrdered />
      </ToolbarButton>
      <ToolbarButton
        label="Blockquote"
        active={editor.isActive("blockquote")}
        disabled={isDisabled}
        onClick={() => {
          editor.chain().focus().toggleBlockquote().run();
        }}
      >
        <Quote />
      </ToolbarButton>
      <ToolbarButton
        label="Add Link"
        active={linkIsActive}
        disabled={isDisabled || !hasTextSelection}
        onClick={handleSetLink}
      >
        <Link2 />
      </ToolbarButton>
      <ToolbarButton
        label="Remove Link"
        active={false}
        disabled={isDisabled || !linkIsActive}
        onClick={() => {
          editor.chain().focus().extendMarkRange("link").unsetLink().run();
        }}
      >
        <Link2Off />
      </ToolbarButton>
      <ToolbarButton
        label="Clear formatting"
        active={false}
        disabled={isDisabled}
        onClick={() => {
          editor.chain().focus().unsetAllMarks().run();
        }}
      >
        <RemoveFormatting />
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
