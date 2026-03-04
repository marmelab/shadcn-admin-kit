import type { ReactNode } from "react";

import { Separator } from "@/components/ui/separator";
import { SectionFive } from "@/components/rich-text-input/minimal-tiptap/components/section/five";
import { SectionFour } from "@/components/rich-text-input/minimal-tiptap/components/section/four";
import { SectionOne } from "@/components/rich-text-input/minimal-tiptap/components/section/one";
import { SectionThree } from "@/components/rich-text-input/minimal-tiptap/components/section/three";
import { SectionTwo } from "@/components/rich-text-input/minimal-tiptap/components/section/two";
import { useTiptapEditor } from "@/components/rich-text-input/minimal-tiptap/hooks/use-tiptap-editor";

export type RichTextInputToolbarProps = {
  children?: ReactNode;
};

const DefaultToolbarItems = () => {
  const editor = useRichTextInputEditor();

  if (!editor) {
    return null;
  }

  return (
    <>
      <SectionOne editor={editor} activeLevels={[1, 2, 3, 4, 5, 6]} />

      <Separator orientation="vertical" className="mx-2" />

      <SectionTwo
        editor={editor}
        activeActions={[
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "code",
          "clearFormatting",
        ]}
        mainActionCount={3}
      />

      <Separator orientation="vertical" className="mx-2" />

      <SectionThree editor={editor} />

      <Separator orientation="vertical" className="mx-2" />

      <SectionFour
        editor={editor}
        activeActions={["orderedList", "bulletList"]}
        mainActionCount={0}
      />

      <Separator orientation="vertical" className="mx-2" />

      <SectionFive
        editor={editor}
        activeActions={["codeBlock", "blockquote", "horizontalRule"]}
        mainActionCount={0}
      />
    </>
  );
};

export const RichTextInputToolbar = ({
  children,
}: RichTextInputToolbarProps) => {
  const editor = useRichTextInputEditor();

  if (!editor && !children) {
    return null;
  }

  return (
    <div className="flex w-max items-center gap-px">
      {children ?? <DefaultToolbarItems />}
    </div>
  );
};

export const useRichTextInputEditor = () => {
  const { editor } = useTiptapEditor();

  return editor;
};
