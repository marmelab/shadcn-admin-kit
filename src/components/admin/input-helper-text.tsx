import { useTranslate } from "ra-core";
import { isValidElement, ReactNode } from "react";
import { ControllerFieldState } from "react-hook-form";
import { FormError } from "./form-error";

export function InputHelperText({
  fieldState,
  helperText,
}: {
  fieldState?: ControllerFieldState;
  helperText?: ReactNode;
}) {
  const translate = useTranslate();

  if (fieldState?.invalid && fieldState?.error?.message) {
    return <FormError fieldState={fieldState} />;
  }

  if (!helperText) {
    return null;
  }

  if (isValidElement(helperText)) {
    return helperText;
  }

  return (
    <p className="text-sm text-muted mt-1">
      {typeof helperText === "string"
        ? translate(helperText, { _: helperText })
        : helperText}
    </p>
  );
}
