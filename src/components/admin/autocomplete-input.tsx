/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useCallback, useId } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormError,
  FormField,
  FormLabel,
} from "@/components/admin/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import type {
  ChoicesProps,
  InputProps,
  SupportCreateSuggestionOptions,
} from "ra-core";
import {
  useChoices,
  useChoicesContext,
  useGetRecordRepresentation,
  useInput,
  useTranslate,
  FieldTitle,
  useEvent,
  useSupportCreateSuggestion,
} from "ra-core";
import { InputHelperText } from "./input-helper-text";

/**
 * Form control that lets users choose a value from a list using a dropdown with autocompletion.
 *
 * This input allows editing scalar values with a searchable dropdown interface. It supports creating
 * new choices on the fly and works seamlessly inside ReferenceInput for editing foreign key relationships.
 * Unless the input is required, users can empty it with the clear button next to the dropdown arrow.
 *
 * @see {@link https://marmelab.com/shadcn-admin-kit/docs/autocompleteinput/ AutocompleteInput documentation}
 *
 * @example
 * import {
 *   Create,
 *   SimpleForm,
 *   AutocompleteInput,
 *   ReferenceInput,
 * } from '@/components/admin';
 *
 * const PostCreate = () => (
 *   <Create>
 *     <SimpleForm>
 *       <AutocompleteInput
 *         source="category"
 *         choices={[
 *           { id: 'tech', name: 'Tech' },
 *           { id: 'lifestyle', name: 'Lifestyle' },
 *           { id: 'people', name: 'People' },
 *         ]}
 *       />
 *       <ReferenceInput label="Author" source="author_id" reference="authors">
 *         <AutocompleteInput />
 *       </ReferenceInput>
 *     </SimpleForm>
 *   </Create>
 * );
 */
export const AutocompleteInput = (
  props: Omit<InputProps, "source"> &
    Omit<SupportCreateSuggestionOptions, "handleChange" | "filter"> &
    Partial<Pick<InputProps, "source">> &
    ChoicesProps & {
      className?: string;
      disableValue?: string;
      filterToQuery?: (searchText: string) => any;
      translateChoice?: boolean;
      placeholder?: string;
      inputText?:
        | React.ReactNode
        | ((option: any | undefined) => React.ReactNode);
    } & Pick<PopoverPrimitive.Root.Props, "modal">,
) => {
  const {
    filterToQuery = DefaultFilterToQuery,
    inputText,
    create,
    createValue,
    createLabel,
    createHintValue,
    createItemLabel,
    onCreate,
    optionText,
    modal,
  } = props;
  const {
    allChoices = [],
    source,
    resource,
    isFromReference,
    setFilters,
  } = useChoicesContext(props);
  const { id, field, isRequired } = useInput({ ...props, source });
  const uniqueId = useId();
  const translate = useTranslate();
  const { placeholder = translate("ra.action.search", { _: "Search..." }) } =
    props;
  const hasLabel = props.label !== false;
  const accessibleName =
    !hasLabel && props.placeholder ? placeholder : undefined;
  const isClearable = !isRequired && field.value != null && field.value !== "";

  const getRecordRepresentation = useGetRecordRepresentation(resource);
  const { getChoiceText, getChoiceValue } = useChoices({
    optionText:
      props.optionText ?? (isFromReference ? getRecordRepresentation : "name"),
    optionValue: props.optionValue ?? "id",
    disableValue: props.disableValue,
    translateChoice: props.translateChoice ?? !isFromReference,
  });

  const [filterValue, setFilterValue] = React.useState("");
  const listRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);
  const selectedChoice = allChoices.find(
    (choice) => getChoiceValue(choice) === field.value,
  );

  const getInputText = useCallback(
    (selectedChoice: any) => {
      if (typeof inputText === "function") {
        return inputText(selectedChoice);
      }
      if (inputText !== undefined) {
        return inputText;
      }
      return getChoiceText(selectedChoice);
    },
    [inputText, getChoiceText],
  );

  const handleOpenChange = useEvent((isOpen: boolean) => {
    setOpen(isOpen);
    // Reset the filter when the popover is closed
    if (!isOpen) {
      setFilters(filterToQuery(""));
    }
  });

  const handleReset = useEvent(() => {
    field.onChange("");
    setFilterValue("");
    if (isFromReference) {
      setFilters(filterToQuery(""));
    }
    setOpen(false);
  });

  const handleChange = useCallback(
    (choice: any) => {
      if (field.value === getChoiceValue(choice) && !isRequired) {
        handleReset();
        return;
      }
      field.onChange(getChoiceValue(choice));
      setOpen(false);
    },
    [field, getChoiceValue, isRequired, handleReset, setOpen],
  );

  const {
    getCreateItem,
    handleChange: handleChangeWithCreateSupport,
    createElement,
    getOptionDisabled,
  } = useSupportCreateSuggestion({
    create,
    createLabel,
    createValue,
    createHintValue,
    createItemLabel,
    onCreate,
    handleChange,
    optionText,
    filter: filterValue,
  });

  const createItem =
    (create || onCreate) && (filterValue !== "" || createLabel)
      ? getCreateItem(filterValue)
      : null;
  let finalChoices = allChoices;
  if (createItem) {
    finalChoices = [...finalChoices, createItem];
  }

  return (
    <>
      <FormField className={props.className} id={id} name={field.name}>
        {hasLabel && (
          <FormLabel id={uniqueId}>
            <FieldTitle
              label={props.label}
              source={props.source ?? source}
              resource={resource}
              isRequired={isRequired}
            />
          </FormLabel>
        )}
        <FormControl>
          <Popover open={open} onOpenChange={handleOpenChange} modal={modal}>
            <div className="relative">
              <PopoverTrigger
                render={
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    aria-label={accessibleName}
                    aria-labelledby={hasLabel ? uniqueId : undefined}
                    className="w-full justify-between h-auto py-1.75 font-normal"
                  />
                }
              >
                <div
                  className={cn(
                    "min-w-0 flex flex-1 items-center gap-2 overflow-hidden text-left",
                    isClearable && "pr-6",
                  )}
                >
                  {selectedChoice ? (
                    getInputText(selectedChoice)
                  ) : (
                    <span className="text-muted-foreground">{placeholder}</span>
                  )}
                </div>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </PopoverTrigger>
              {isClearable && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="absolute right-7 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full p-0 text-muted-foreground"
                  aria-label={translate("ra.action.clear_input_value", {
                    _: "Clear value",
                  })}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            <PopoverContent className="w-full max-w-(--anchor-width) p-0">
              {/* We handle the filtering ourselves */}
              <Command shouldFilter={!isFromReference}>
                <CommandInput
                  placeholder="Search..."
                  value={filterValue}
                  onValueChange={(filter) => {
                    setFilterValue(filter);
                    requestAnimationFrame(() => {
                      listRef.current?.scrollTo(0, 0);
                    });
                    // We don't want the ChoicesContext to filter the choices if the input
                    // is not from a reference as it would also filter out the selected values
                    if (isFromReference) {
                      setFilters(filterToQuery(filter));
                    }
                  }}
                />
                <CommandList ref={listRef}>
                  <CommandEmpty>No matching item found.</CommandEmpty>
                  <CommandGroup>
                    {finalChoices.map((choice) => {
                      const isCreateItem =
                        !!createItem && choice?.id === createItem.id;
                      const disabled = getOptionDisabled(choice);

                      const choiceText = getChoiceText(
                        isCreateItem ? createItem : choice,
                      );

                      return (
                        <CommandItem
                          key={getChoiceValue(choice)}
                          keywords={
                            isCreateItem || React.isValidElement(choiceText)
                              ? undefined
                              : [choiceText]
                          }
                          value={
                            isCreateItem
                              ? // if it's the create option, include the filter value so it is shown in the command input
                                // characters before and after the filter value are required
                                // to show the option when the filter value starts or ends with a space
                                `?${filterValue}?`
                              : getChoiceValue(choice)
                          }
                          onSelect={() => handleChangeWithCreateSupport(choice)}
                          disabled={disabled}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === getChoiceValue(choice)
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {choiceText}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormControl>
        <InputHelperText helperText={props.helperText} />
        <FormError />
      </FormField>
      {createElement}
    </>
  );
};

const DefaultFilterToQuery = (searchText: string) => ({ q: searchText });
