import { TextInput } from "./text-input";
import { TextInputProps } from "./text-input";

export const TimeInput = (props: TimeInputProps) => (
  <TextInput type="time" {...props} />
);

export type TimeInputProps = Omit<TextInputProps, "type" | "multiline">;
