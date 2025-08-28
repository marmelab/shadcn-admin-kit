import { TextInput } from "./text-input";
import { TextInputProps } from "./text-input";

export const DateTimeInput = (props: DateTimeInputProps) => (
  <TextInput type="datetime-local" {...props} />
);

export type DateTimeInputProps = Omit<TextInputProps, "type" | "multiline">;
