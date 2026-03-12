import { useTiptapEditor } from "./minimal-tiptap/hooks/use-tiptap-editor";

export const useRichTextInputEditor = () => {
  const { editor } = useTiptapEditor();

  return editor;
};
