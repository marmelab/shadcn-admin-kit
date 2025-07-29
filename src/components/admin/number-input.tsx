import { FormError } from "@/components/admin/form-error";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  FieldTitle,
  type InputProps,
  useInput,
  useResourceContext,
} from "ra-core";
import { useState } from "react";

export type NumberInputProps = InputProps &
  React.ComponentProps<"input"> & {
    parse?: (value: string) => number;
  };

export const NumberInput = (props: NumberInputProps) => {
  const resource = useResourceContext(props);
  const {
    label,
    source,
    className,
    validate: _validateProp,
    format: _formatProp,
    parse = convertStringToNumber,
    ...rest
  } = props;

  const { field, fieldState, isRequired } = useInput(props);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numberValue = parse(value);

    setValue(value);
    field.onChange(numberValue ?? 0);
  };

  const [value, setValue] = useState<string | undefined>(
    field.value?.toString() ?? ""
  );

  return (
    <FormItem className={className}>
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
        <Input
          {...rest}
          {...field}
          type="number"
          value={value}
          onChange={handleChange}
        />
      </FormControl>
      {props.helperText && (
        <FormDescription>{props.helperText}</FormDescription>
      )}
      <FormError fieldState={fieldState} />
    </FormItem>
  );
};

const convertStringToNumber = (value?: string | null) => {
  if (value == null || value === "") {
    return null;
  }
  const float = parseFloat(value);

  return isNaN(float) ? 0 : float;
};
