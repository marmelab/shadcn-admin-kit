import { InputProps, useInput, useResourceContext, FieldTitle } from "ra-core";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "./FormError";

export const TextInput = (props: InputProps) => {
  const resource = useResourceContext(props);
  const { field, fieldState, isRequired } = useInput(props);

  return (
    <FormItem>
      <FormLabel>
        <FieldTitle
          label={props.label}
          source={props.source}
          resource={resource}
          isRequired={isRequired}
        />
      </FormLabel>
      <FormControl>
        <Input type={props.type} {...field} />
      </FormControl>
      <FormDescription>{props.helperText}</FormDescription>
      <FormError fieldState={fieldState} />
    </FormItem>
  );
};
