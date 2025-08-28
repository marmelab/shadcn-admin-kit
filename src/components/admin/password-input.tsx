import { TextInput } from "./text-input";
import { TextInputProps } from "./text-input";

export const PasswordInput = (props: PasswordInputProps) => (
  <TextInput type="password" {...props} />
);

export type PasswordInputProps = Omit<TextInputProps, "type" | "multiline">;
