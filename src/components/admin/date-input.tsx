import { TextInput } from "./text-input";
import { TextInputProps } from "./text-input";

export const DateInput = (props: DateInputProps) => (
  <TextInput type="date" {...props} />
);

export type DateInputProps = Omit<TextInputProps, "type" | "multiline">;
