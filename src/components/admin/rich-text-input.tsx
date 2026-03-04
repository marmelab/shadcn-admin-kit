import type { InputProps } from "ra-core";
import { FieldTitle, useInput, useResourceContext } from "ra-core";
import type { UseEditorOptions } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

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
} from "@/components/ui/minimal-tiptap";

export const DefaultEditorOptions: Partial<UseEditorOptions> = {
  extensions: [StarterKit],
};

export type RichTextInputProps = InputProps & {
  className?: string;
  toolbar?: MinimalTiptapToolbar;
  editorOptions?: Partial<UseEditorOptions>;
};

/**
 * Rich text editor input powered by TipTap.
 *
 * Stores HTML by default and supports the usual react-admin input props.
 * Pass additional TipTap options via `editorOptions`.
 *
 * @see {@link https://marmelab.com/react-admin/RichTextInput.html React-admin RichTextInput}
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

  const resolvedToolbar = toolbar;

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
