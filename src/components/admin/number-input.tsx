import { TextInput } from "./text-input";
import { TextInputProps } from "./text-input";

export const NumberInput = (props: NumberInputProps) => (
  <TextInput type="number" {...props} />
);

export type NumberInputProps = Omit<TextInputProps, "type" | "multiline">;
