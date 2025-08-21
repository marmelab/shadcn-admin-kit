import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { FormProvider, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { createContext, useContext, useMemo } from "react";
import { ValidationError } from "ra-core";

const Form = FormProvider;

type FormItemContextValue = {
  id: string;
  name: string;
};

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

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

function FormField({ className, id, name, ...props }: FormItemProps) {
  const contextValue: FormItemContextValue = useMemo(
    () => ({
      id,
      name,
    }),
    [id, name],
  );

  return (
    <FormItemContext.Provider value={contextValue}>
      <div
        data-slot="form-item"
        className={cn("form-item grid gap-2", className)}
        role="group"
        {...props}
      />
    </FormItemContext.Provider>
  );
}

type FormItemProps = Omit<React.ComponentProps<"div">, "id"> & {
  id: string;
  name: string;
};

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <div
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

const FormError = ({ className, ...props }: React.ComponentProps<"p">) => {
  const { invalid, error, formMessageId } = useFormField();

  const err = error?.root?.message ?? error?.message;
  if (!invalid || !err) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      <ValidationError error={err} />
    </p>
  );
};

export {
  // eslint-disable-next-line react-refresh/only-export-components
  useFormField,
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormError,
};
