import type { InputProps } from "ra-core";
import { FieldTitle, useInput, useResourceContext } from "ra-core";
import type { UseEditorOptions } from "@tiptap/react";

import {
  FormControl,
  FormError,
  FormField,
  FormLabel,
} from "@/components/admin/form";
import { InputHelperText } from "@/components/admin/input-helper-text";
import {
  MinimalTiptapEditor,
  type MinimalTiptapToolbar,
} from "@/components/rich-text-input/minimal-tiptap";
import { RichTextInputToolbar } from "@/components/rich-text-input/rich-text-input-toolbar";

export const DefaultEditorOptions: Partial<UseEditorOptions> = {};

export type RichTextInputProps = InputProps & {
  className?: string;
  toolbar?: MinimalTiptapToolbar;
  editorOptions?: Partial<UseEditorOptions>;
};

/**
 * Rich text editor input powered by TipTap.
 *
 * Stores HTML by default and supports the usual input props used by the kit.
 * Pass additional TipTap options via `editorOptions`.
 */
export const RichTextInput = (props: RichTextInputProps) => {
  const {
    className,
    defaultValue = "",
    disabled,
    editorOptions = DefaultEditorOptions,
    helperText,
    label,
    readOnly,
    source,
    toolbar,
    validate: _validateProp,
    format: _formatProp,
  } = props;
  const resource = useResourceContext(props);
  const { id, field, isRequired } = useInput({ ...props, source, defaultValue });

  const resolvedToolbar = toolbar ?? <RichTextInputToolbar />;

  return (
    <FormField id={id} className={className} name={field.name}>
      {label !== false && (
        <FormLabel>
          <FieldTitle
            label={label}
            source={source}
            resource={resource}
            isRequired={isRequired}
          />
        </FormLabel>
      )}
      <FormControl>
        {/* Keep ARIA props from FormControl on a native element, not on the TipTap hook options */}
        <div>
          <MinimalTiptapEditor
            {...editorOptions}
            value={field.value ?? ""}
            onChange={(value) => {
              field.onChange(value);
            }}
            onBlur={() => {
              field.onBlur?.();
            }}
            output="html"
            editable={!disabled && !readOnly}
            toolbar={resolvedToolbar}
          />
        </div>
      </FormControl>
      <InputHelperText helperText={helperText} />
      <FormError />
    </FormField>
  );
};
