import { ValidationError } from "ra-core";
import { ControllerFieldState } from "react-hook-form";

export const FormError = (props: { fieldState: ControllerFieldState }) => {
  if (
    !props.fieldState.invalid ||
    !props.fieldState.isTouched ||
    !props.fieldState.error?.message
  ) {
    return null;
  }

  return (
    <p className="text-sm font-medium text-destructive">
      <ValidationError error={props.fieldState.error?.message} />
    </p>
  );
};
