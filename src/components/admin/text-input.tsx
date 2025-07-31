import { FormError } from "@/components/admin/form-error";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  FieldTitle,
  type InputProps,
  useInput,
  useResourceContext,
} from "ra-core";

export type TextInputProps = InputProps & {
  minRows?: number;
  multiline?: boolean;
} & React.ComponentProps<"textarea"> &
  React.ComponentProps<"input">;

export const TextInput = (props: TextInputProps) => {
  const resource = useResourceContext(props);
  const {
    label,
    source,
    multiline,
    className,
    validate: _validateProp,
    format: _formatProp,
    ...rest
  } = props;
  const { field, fieldState, isRequired } = useInput(props);

  const value =
    props.type === "datetime-local"
      ? field.value?.slice(0, 16) // Adjust for datetime-local input format
      : props.type === "date"
        ? field.value?.slice(0, 10) // Adjust for date input format
        : field.value;

  return (
    <FormItem className={cn("w-full", className)}>
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
          <Textarea {...rest} {...field} />
        ) : (
          <Input {...rest} {...field} value={value} className="flex-auto" />
        )}
      </FormControl>
      {props.helperText && (
        <FormDescription>{props.helperText}</FormDescription>
      )}
      <FormError fieldState={fieldState} />
    </FormItem>
  );
};
