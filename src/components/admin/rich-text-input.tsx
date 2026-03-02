import type { InputProps } from "ra-core";
import { FieldTitle, useInput, useResourceContext } from "ra-core";

import {
  FormControl,
  FormError,
  FormField,
  FormLabel,
} from "@/components/admin/form";
import { InputHelperText } from "@/components/admin/input-helper-text";
import {
  MinimalTiptapEditor,
  type MinimalTiptapProps,
} from "@/components/ui/minimal-tiptap";

export type RichTextInputEditorOptions = Omit<
  MinimalTiptapProps,
  "value" | "onChange" | "onBlur" | "editable" | "output"
>;

export type RichTextInputProps = InputProps & {
  className?: string;
  editorClassName?: string;
  editorContentClassName?: string;
  output?: MinimalTiptapProps["output"];
  placeholder?: string;
  throttleDelay?: number;
  editorOptions?: RichTextInputEditorOptions;
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
    disabled,
    editorClassName,
    editorContentClassName,
    editorOptions,
    helperText,
    label,
    output = "html",
    placeholder,
    readOnly,
    source,
    throttleDelay,
    validate: _validateProp,
    format: _formatProp,
  } = props;
  const resource = useResourceContext(props);
  const { id, field, isRequired } = useInput(props);

  const resolvedPlaceholder = placeholder ?? editorOptions?.placeholder;
  const resolvedThrottleDelay = throttleDelay ?? editorOptions?.throttleDelay;

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
            output={output}
            editable={!disabled && !readOnly}
            placeholder={resolvedPlaceholder}
            throttleDelay={resolvedThrottleDelay}
            className={editorClassName ?? editorOptions?.className}
            editorContentClassName={
              editorContentClassName ?? editorOptions?.editorContentClassName
            }
          />
        </div>
      </FormControl>
      <InputHelperText helperText={helperText} />
      <FormError />
    </FormField>
  );
};
