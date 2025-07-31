import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import {
  FieldTitle,
  InputProps,
  useChoices,
  useChoicesContext,
  useGetRecordRepresentation,
  useInput,
  useTranslate,
  type ChoicesProps,
} from "ra-core";
import {
  ComponentProps,
  useCallback,
  useEffect,
  type ReactElement,
} from "react";

import { Skeleton } from "../ui/skeleton";
import { InputHelperText } from "./input-helper-text";
import {
  SupportCreateSuggestionOptions,
  useSupportCreateSuggestion,
} from "./useSupportCreateSuggestion";

export const SelectInput = (inProps: SelectInputProps) => {
  const {
    choices: choicesProp,
    className,
    create,
    createLabel,
    createValue,
    createHintValue,
    defaultValue,
    disableValue = "disabled",
    emptyText = "",
    emptyValue = "",
    format,
    filter: _filter,
    helperText,
    isFetching: isFetchingProp,
    isLoading: isLoadingProp,
    isPending: isPendingProp,
    label,
    margin: _margin = "dense",
    onBlur,
    onChange,
    onCreate,
    optionText,
    optionValue,
    parse,
    resource: resourceProp,
    source: sourceProp,
    translateChoice,
    validate,
    ...rest
  } = inProps;
  const translate = useTranslate();

  useEffect(() => {
    if (emptyValue == null) {
      throw new Error(
        `emptyValue being set to null or undefined is not supported. Use parse to turn the empty string into null.`
      );
    }
  }, [emptyValue]);

  const {
    allChoices,
    isPending,
    error: fetchError,
    source,
    resource,
    isFromReference,
  } = useChoicesContext({
    choices: choicesProp,
    isLoading: isLoadingProp,
    isFetching: isFetchingProp,
    isPending: isPendingProp,
    resource: resourceProp,
    source: sourceProp,
  });

  if (source === undefined) {
    throw new Error(
      `If you're not wrapping the SelectInput inside a ReferenceInput, you must provide the source prop`
    );
  }

  if (!isPending && !fetchError && allChoices === undefined) {
    throw new Error(
      `If you're not wrapping the SelectInput inside a ReferenceInput, you must provide the choices prop`
    );
  }

  const getRecordRepresentation = useGetRecordRepresentation(resource);
  const { getChoiceText, getChoiceValue, getDisableValue } = useChoices({
    optionText:
      optionText ?? (isFromReference ? getRecordRepresentation : undefined),
    optionValue,
    disableValue,
    translateChoice: translateChoice ?? !isFromReference,
    createValue,
    createHintValue,
  });
  const {
    field,
    fieldState,
    id: _id,
    isRequired,
  } = useInput({
    defaultValue,
    parse,
    format,
    onBlur,
    onChange,
    resource,
    source,
    validate,
    ...rest,
  });

  const { error, invalid } = fieldState;

  const renderEmptyItemOption = useCallback(() => {
    return typeof emptyText === "string"
      ? emptyText === ""
        ? " " // em space, forces the display of an empty line of normal height
        : translate(emptyText, { _: emptyText })
      : emptyText;
  }, [emptyText, translate]);

  const renderMenuItemOption = useCallback(
    (choice: any) => getChoiceText(choice),
    [getChoiceText]
  );

  const handleChange = useCallback(
    async (value: string) => {
      if (value === emptyValue) {
        field.onChange(emptyValue);
      } else {
        // Find the choice by value and pass it to field.onChange
        const choice = allChoices?.find(
          (choice) => getChoiceValue(choice) === value
        );
        field.onChange(choice ? getChoiceValue(choice) : value);
      }
    },
    [field, getChoiceValue, emptyValue, allChoices]
  );

  const {
    getCreateItem,
    handleChange: handleChangeWithCreateSupport,
    createElement,
  } = useSupportCreateSuggestion({
    create,
    createLabel,
    createValue,
    createHintValue,
    handleChange,
    onCreate,
    optionText,
  });

  const createItem = create || onCreate ? getCreateItem() : null;

  if (isPending) {
    return (
      <FormItem className={cn("w-full", `ra-input-${source}`, className)}>
        {label !== "" && label !== false && (
          <FormLabel>
            <FieldTitle
              label={label}
              source={source}
              resource={resourceProp}
              isRequired={isRequired}
            />
          </FormLabel>
        )}
        <div className="relative">
          <Skeleton className="w-full h-9" />
        </div>
        {helperText && (
          <FormMessage>
            <InputHelperText error={error?.message} helperText={helperText} />
          </FormMessage>
        )}
      </FormItem>
    );
  }

  let finalChoices = fetchError ? [] : allChoices;
  if (create || onCreate) {
    finalChoices = [...finalChoices, createItem];
  }
  const renderHelperText = !!fetchError || helperText !== false || invalid;

  // Handle reset functionality
  const handleReset = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    field.onChange(emptyValue);
  };

  return (
    <>
      <FormItem className={cn("w-full", `ra-input-${source}`, className)}>
        {label !== "" && label !== false && (
          <FormLabel>
            <FieldTitle
              label={label}
              source={source}
              resource={resourceProp}
              isRequired={isRequired}
            />
          </FormLabel>
        )}
        <div className="relative">
          <Select
            value={field.value?.toString() || emptyValue}
            onValueChange={handleChangeWithCreateSupport}
          >
            {field.value && field.value !== emptyValue ? (
              <div
                role="button"
                className="h-4 w-4 p-0 absolute -mt-2 top-[50%] right-8 hover:bg-transparent text-muted-foreground opacity-50 hover:opacity-100"
                onClick={handleReset}
              >
                <X className="h-4 w-4" />
              </div>
            ) : null}

            <SelectTrigger
              className={cn(
                "w-full",
                fetchError || invalid ? "border-red-500" : ""
              )}
            >
              <SelectValue placeholder={renderEmptyItemOption()} />
            </SelectTrigger>
            <SelectContent>
              {finalChoices?.map((choice) => {
                if (!choice) return null;
                const value = getChoiceValue(choice);
                const isDisabled = getDisableValue(choice);

                return (
                  <SelectItem
                    key={value}
                    value={value?.toString()}
                    disabled={isDisabled}
                  >
                    {renderMenuItemOption(
                      !!createItem && choice?.id === createItem.id
                        ? createItem
                        : choice
                    )}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        {renderHelperText && (
          <FormMessage>
            <InputHelperText
              error={error?.message || fetchError?.message}
              helperText={helperText}
            />
          </FormMessage>
        )}
      </FormItem>
      {createElement}
    </>
  );
};

export type SelectInputProps = Omit<InputProps, "source"> &
  ChoicesProps &
  Omit<SupportCreateSuggestionOptions, "handleChange"> & {
    emptyText?: string | ReactElement;
    emptyValue?: any;
    resettable?: boolean;
    margin?: "dense" | "normal" | "none";
    // Source is optional as SelectInput can be used inside a ReferenceInput that already defines the source
    source?: string;
    onChange?: (value: string) => void;
  } & ComponentProps<"select">;
