import { FormControl, FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import get from "lodash/get";
import {
  type ChoicesProps,
  type InputProps,
  FieldTitle,
  useChoicesContext,
  useGetRecordRepresentation,
  useInput,
} from "ra-core";

import { Skeleton } from "../ui/skeleton";
import { InputHelperText } from "./input-helper-text";

export const RadioButtonGroupInput = (inProps: RadioButtonGroupInputProps) => {
  const {
    choices: choicesProp,
    className,
    format,
    helperText,
    isFetching: isFetchingProp,
    isLoading: isLoadingProp,
    isPending: isPendingProp,
    label,
    margin: _margin = "dense",
    onBlur,
    onChange,
    options: _options = defaultOptions,
    optionText,
    optionValue = "id",
    parse,
    resource: resourceProp,
    row = true,
    source: sourceProp,
    translateChoice: _translateChoice,
    validate,
    disableValue = "disabled",
    disabled,
    readOnly,
    ...rest
  } = inProps;

  const {
    allChoices,
    isPending,
    error: fetchError,
    resource,
    source,
    isFromReference,
  } = useChoicesContext({
    choices: choicesProp,
    isFetching: isFetchingProp,
    isLoading: isLoadingProp,
    isPending: isPendingProp,
    resource: resourceProp,
    source: sourceProp,
  });

  if (source === undefined) {
    throw new Error(
      `If you're not wrapping the RadioButtonGroupInput inside a ReferenceArrayInput, you must provide the source prop`
    );
  }

  if (!isPending && !fetchError && allChoices === undefined) {
    throw new Error(
      `If you're not wrapping the RadioButtonGroupInput inside a ReferenceArrayInput, you must provide the choices prop`
    );
  }

  const { id, isRequired, fieldState, field } = useInput({
    format,
    onBlur,
    onChange,
    parse,
    resource,
    source,
    validate,
    disabled,
    readOnly,
    ...rest,
  });

  const getRecordRepresentation = useGetRecordRepresentation(resource);

  const { error, invalid } = fieldState;

  if (isPending) {
    return <Skeleton className="w-full h-9" />;
  }

  const renderHelperText = !!fetchError || helperText !== false || invalid;

  return (
    <FormControl
      className={cn("ra-input", `ra-input-${source}`, className, {
        "opacity-50": disabled || readOnly,
      })}
    >
      <>
        {label && (
          <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            <FieldTitle
              label={label}
              source={source}
              resource={resource}
              isRequired={isRequired}
            />
          </FormLabel>
        )}

        <RadioGroup
          value={field.value || ""}
          onValueChange={field.onChange}
          className={cn("flex gap-4", row ? "flex-row" : "flex-col")}
          disabled={disabled || readOnly}
        >
          {allChoices?.map((choice) => {
            const value = get(choice, optionValue);
            const isDisabled =
              disabled || readOnly || get(choice, disableValue);

            return (
              <div key={value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={value}
                  id={`${id}-${value}`}
                  disabled={isDisabled}
                />
                <Label
                  htmlFor={`${id}-${value}`}
                  className={cn(
                    "text-sm font-normal cursor-pointer",
                    isDisabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {typeof optionText === "function"
                    ? optionText(choice)
                    : isFromReference
                      ? getRecordRepresentation(choice)
                      : typeof optionText === "string"
                        ? get(choice, optionText || "name")
                        : optionText || "label"}
                </Label>
              </div>
            );
          })}
        </RadioGroup>

        {renderHelperText && (
          <div className="text-sm text-destructive mt-1">
            <InputHelperText
              error={error?.message || fetchError?.message}
              helperText={helperText}
            />
          </div>
        )}
      </>
    </FormControl>
  );
};

export type RadioButtonGroupInputProps = Omit<InputProps, "source"> &
  ChoicesProps & {
    options?: Record<string, any>;
    source?: string;
    row?: boolean;
    margin?: "dense" | "normal" | "none";
  } & React.ComponentProps<"input">;

const defaultOptions = {};
