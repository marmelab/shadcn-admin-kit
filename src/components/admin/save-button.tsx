import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UseMutationOptions } from "@tanstack/react-query";
import { Loader2, Save } from "lucide-react";
import {
  type CreateParams,
  type RaRecord,
  setSubmissionErrors,
  type TransformData,
  type UpdateParams,
  useRecordFromLocation,
  useSaveContext,
  useTranslate,
  warning,
} from "ra-core";
import * as React from "react";
import { type MouseEventHandler, useCallback } from "react";
import { useFormContext, useFormState } from "react-hook-form";

export const SaveButton = <RecordType extends RaRecord = RaRecord>(
  props: SaveButtonProps<RecordType>,
) => {
  const {
    className,
    icon = defaultIcon,
    label = "ra.action.save",
    onClick,
    mutationOptions,
    disabled: disabledProp,
    type = "submit",
    transform,
    variant = "default",
    alwaysEnable = false,
    ...rest
  } = props;
  const translate = useTranslate();
  const form = useFormContext();
  const saveContext = useSaveContext();
  const { dirtyFields, isValidating, isSubmitting } = useFormState();
  // useFormState().isDirty might differ from useFormState().dirtyFields (https://github.com/react-hook-form/react-hook-form/issues/4740)
  const isDirty = Object.keys(dirtyFields).length > 0;
  // Use form isDirty, isValidating and form context saving to enable or disable the save button
  // if alwaysEnable is undefined and the form wasn't prefilled
  const recordFromLocation = useRecordFromLocation();
  const disabled = valueOrDefault(
    alwaysEnable === false || alwaysEnable === undefined
      ? undefined
      : !alwaysEnable,
    disabledProp ||
      (!isDirty && recordFromLocation == null) ||
      isValidating ||
      isSubmitting,
  );

  warning(
    type === "submit" &&
      ((mutationOptions &&
        (mutationOptions.onSuccess || mutationOptions.onError)) ||
        transform),
    'Cannot use <SaveButton mutationOptions> props on a button of type "submit". To override the default mutation options on a particular save button, set the <SaveButton type="button"> prop, or set mutationOptions in the main view component (<Create> or <Edit>).',
  );

  const handleSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (values: any) => {
      let errors;
      if (saveContext?.save) {
        errors = await saveContext.save(values, {
          ...mutationOptions,
          transform,
        });
      }
      if (errors != null) {
        setSubmissionErrors(errors, form.setError);
      }
    },
    [form.setError, saveContext, mutationOptions, transform],
  );

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      if (onClick) {
        onClick(event);
      }
      if (event.defaultPrevented) {
        return;
      }
      if (type === "button") {
        // this button doesn't submit the form, so it doesn't trigger useIsFormInvalid in <FormContent>
        // therefore we need to check for errors manually
        event.stopPropagation();
        await form.handleSubmit(handleSubmit)(event);
      }
    },
    [onClick, type, form, handleSubmit],
  );

  const displayedLabel = label && translate(label, { _: label });

  return (
    <Button
      variant={variant}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "text-primary",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className,
      )}
      {...rest}
    >
      {isSubmitting ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        icon && <span className="mr-2">{icon}</span>
      )}
      {displayedLabel}
    </Button>
  );
};

const defaultIcon = <Save className="h-4 w-4" />;

interface Props<
  RecordType extends RaRecord = RaRecord,
  MutationOptionsError = unknown,
> {
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  label?: string;
  mutationOptions?: UseMutationOptions<
    RecordType,
    MutationOptionsError,
    CreateParams<RecordType> | UpdateParams<RecordType>
  >;
  transform?: TransformData;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export type SaveButtonProps<RecordType extends RaRecord = RaRecord> =
  Props<RecordType> &
    React.ComponentProps<"button"> & {
      alwaysEnable?: boolean;
    };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const valueOrDefault = (value: any, defaultValue: any) =>
  typeof value === "undefined" ? defaultValue : value;
