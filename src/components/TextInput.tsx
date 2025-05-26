import { InputProps, useInput, useResourceContext, FieldTitle } from "ra-core";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "./FormError";

export type TextInputProps = InputProps & {
  placeholder?: string;
  className?: string;
};

export const TextInput = (props: TextInputProps) => {
  const resource = useResourceContext(props);
  const { field, fieldState, isRequired } = useInput(props);

  return (
    <FormItem className={props.className}>
      {props.label !== false && (
        <FormLabel>
          <FieldTitle
            label={props.label}
            source={props.source}
            resource={resource}
            isRequired={isRequired}
          />
        </FormLabel>
      )}
      <FormControl>
        <Input type={props.type} placeholder={props.placeholder} {...field} />
      </FormControl>
      {props.helperText && (
        <FormDescription>{props.helperText}</FormDescription>
      )}
      <FormError fieldState={fieldState} />
    </FormItem>
  );
};
