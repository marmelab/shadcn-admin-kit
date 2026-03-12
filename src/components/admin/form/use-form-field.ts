import { useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { FormItemContext } from "./form-item-context";

const useFormField = () => {
  const { getFieldState, formState } = useFormContext();
  const { id, name } = useContext(FormItemContext);

  const fieldState = getFieldState(name, formState);

  return useMemo(
    () => ({
      formItemId: id,
      formDescriptionId: `${id}-description`,
      formMessageId: `${id}-message`,
      ...fieldState,
    }),
    [id, fieldState],
  );
};

export { useFormField };
