// This file is part of Shadcn Admin Kit (https://github.com/marmelab/shadcn-admin-kit)
import {
  type InputProps,
  useInput,
  useResourceContext,
  FieldTitle,
} from "ra-core";
import {
  FormControl,
  FormError,
  FormField,
  FormLabel,
} from "@/components/admin/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InputHelperText } from "@/components/admin/input-helper-text";

export type TextInputProps = InputProps & {
  multiline?: boolean;
  inputClassName?: string;
} & React.ComponentProps<"textarea"> &
  React.ComponentProps<"input">;

export const TextInput = (props: TextInputProps) => {
  const resource = useResourceContext(props);
  const {
    label,
    source,
    multiline,
    className,
    inputClassName,
    validate: _validateProp,
    format: _formatProp,
    ...rest
  } = props;
  const { id, field, isRequired } = useInput(props);

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
        {multiline ? (
          <Textarea {...rest} {...field} className={inputClassName} />
        ) : (
          <Input {...rest} {...field} className={inputClassName} />
        )}
      </FormControl>
      <InputHelperText helperText={props.helperText} />
      <FormError />
    </FormField>
  );
};
