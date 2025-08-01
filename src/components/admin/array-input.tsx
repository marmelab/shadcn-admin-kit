import {
  FieldTitle,
  InputProps,
  OptionalResourceContextProvider,
  SourceContextProvider,
  type SourceContextValue,
  composeSyncValidators,
  isRequired,
  useApplyInputDefaultValues,
  useFormGroupContext,
  useFormGroups,
  useGetValidationErrorMessage,
  useSourceContext,
} from "ra-core";
import * as React from "react";
import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { ArrayInputContext } from "@/hooks/ArrayInputContext";
import { InputHelperText } from "./input-helper-text";
import { FormField, FormError } from "./form";

export const ArrayInput = (props: ArrayInputProps) => {
  const {
    className,
    defaultValue = [],
    label,
    isPending,
    children,
    helperText,
    resource: resourceFromProps,
    source: arraySource,
    validate,
  } = props;

  const formGroupName = useFormGroupContext();
  const formGroups = useFormGroups();
  const parentSourceContext = useSourceContext();
  const finalSource = parentSourceContext.getSource(arraySource);

  const sanitizedValidate = Array.isArray(validate)
    ? composeSyncValidators(validate)
    : validate;
  const getValidationErrorMessage = useGetValidationErrorMessage();

  const { getValues } = useFormContext();

  const fieldProps = useFieldArray({
    name: finalSource,
    rules: {
      validate: async (value) => {
        if (!sanitizedValidate) return true;
        const error = await sanitizedValidate(value, getValues(), props);

        if (!error) return true;
        return getValidationErrorMessage(error);
      },
    },
  });

  useEffect(() => {
    if (formGroups && formGroupName != null) {
      formGroups.registerField(finalSource, formGroupName);
    }

    return () => {
      if (formGroups && formGroupName != null) {
        formGroups.unregisterField(finalSource, formGroupName);
      }
    };
  }, [finalSource, formGroups, formGroupName]);

  useApplyInputDefaultValues({
    inputProps: { ...props, defaultValue },
    isArrayInput: true,
    fieldArrayInputControl: fieldProps,
  });

  // The SourceContext will be read by children of ArrayInput to compute their composed source and label
  //
  // <ArrayInput source="orders" /> => SourceContext is "orders"
  //   <SimpleFormIterator> => SourceContext is "orders.0"
  //     <DateInput source="date" /> => final source for this input will be "orders.0.date"
  //   </SimpleFormIterator>
  // </ArrayInput>
  //
  const sourceContext = React.useMemo<SourceContextValue>(
    () => ({
      // source is the source of the ArrayInput child
      getSource: (source: string) => {
        if (!source) {
          // SimpleFormIterator calls getSource('') to get the arraySource
          return parentSourceContext.getSource(arraySource);
        }

        // We want to support nesting and composition with other inputs (e.g. TranslatableInputs, ReferenceOneInput, etc),
        // we must also take into account the parent SourceContext
        //
        // <ArrayInput source="orders" /> => SourceContext is "orders"
        //   <SimpleFormIterator> => SourceContext is "orders.0"
        //      <DateInput source="date" /> => final source for this input will be "orders.0.date"
        //      <ArrayInput source="items" /> => SourceContext is "orders.0.items"
        //          <SimpleFormIterator> => SourceContext is "orders.0.items.0"
        //              <TextInput source="reference" /> => final source for this input will be "orders.0.items.0.reference"
        //          </SimpleFormIterator>
        //      </ArrayInput>
        //   </SimpleFormIterator>
        // </ArrayInput>
        return parentSourceContext.getSource(`${arraySource}.${source}`);
      },
      // if Array source is items, and child source is name, .0.name => resources.orders.fields.items.name
      getLabel: (source: string) =>
        parentSourceContext.getLabel(`${arraySource}.${source}`),
    }),
    [parentSourceContext, arraySource]
  );

  const id = React.useId();

  if (isPending) {
    return <Skeleton className="w-full h-9" />;
  }

  return (
    <FormField
      className={cn(
        "ra-input",
        `ra-input-${finalSource}`,
        className,
        "w-full flex flex-col gap-2"
      )}
      id={id}
      name={finalSource}
    >
      <Label className="text-muted-foreground text-sm">
        <FieldTitle
          label={label}
          source={arraySource}
          resource={resourceFromProps}
          isRequired={isRequired(validate)}
        />
      </Label>
      <ArrayInputContext.Provider value={fieldProps}>
        <OptionalResourceContextProvider value={resourceFromProps}>
          <SourceContextProvider value={sourceContext}>
            {children}
          </SourceContextProvider>
        </OptionalResourceContextProvider>
      </ArrayInputContext.Provider>

      <InputHelperText helperText={helperText} />
      <FormError />
    </FormField>
  );
};

export interface ArrayInputProps
  extends Omit<InputProps, "disabled" | "readOnly"> {
  className?: string;
  children: React.ReactNode;
  isFetching?: boolean;
  isLoading?: boolean;
  isPending?: boolean;
}
