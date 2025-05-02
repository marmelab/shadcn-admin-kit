import { InputProps, useInput, useTranslate } from "ra-core";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "./FormError";

export const RaInput = (props: InputProps) => {
  const translate = useTranslate();
  const { field, fieldState } = useInput(props);

  return (
    <FormItem>
      <FormLabel>
        {typeof props.label === "string"
          ? translate(props.label, { _: props.label })
          : props.label}
      </FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormDescription>{props.helperText}</FormDescription>
      <FormError fieldState={fieldState} />
    </FormItem>
  );
};
