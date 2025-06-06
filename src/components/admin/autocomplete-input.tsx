import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChoicesProps,
  InputProps,
  useChoices,
  useChoicesContext,
  useGetRecordRepresentation,
  useInput,
  useTranslate,
  FieldTitle,
} from "ra-core";
import { FormError } from "@/components/admin/form-error";

export const AutocompleteInput = (
  props: Omit<InputProps, "source"> &
    Partial<Pick<InputProps, "source">> &
    ChoicesProps & {
      className?: string;
      disableValue?: string;
      translateChoice?: boolean;
      placeholder?: string;
    }
) => {
  const {
    allChoices = [],
    source,
    resource,
    isFromReference,
  } = useChoicesContext(props);
  const { field, fieldState, isRequired } = useInput({ ...props, source });
  const translate = useTranslate();
  const { placeholder = translate("ra.action.search", { _: "Search..." }) } =
    props;

  const getRecordRepresentation = useGetRecordRepresentation(resource);
  const { getChoiceText, getChoiceValue } = useChoices({
    optionText:
      props.optionText ?? (isFromReference ? getRecordRepresentation : "name"),
    optionValue: props.optionValue ?? "id",
    disableValue: props.disableValue,
    translateChoice: props.translateChoice ?? !isFromReference,
  });

  const [open, setOpen] = React.useState(false);
  const selectedChoice = allChoices.find(
    (choice) => getChoiceValue(choice) === field.value
  );

  return (
    <FormItem className={props.className}>
      {props.label !== false && (
        <FormLabel>
          <FieldTitle
            label={props.label}
            source={props.source ?? source}
            resource={resource}
            isRequired={isRequired}
          />
        </FormLabel>
      )}
      <FormControl>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedChoice ? getChoiceText(selectedChoice) : placeholder}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search..." />
              <CommandEmpty>No matching item found.</CommandEmpty>
              <CommandGroup>
                {allChoices.map((choice) => (
                  <CommandItem
                    key={getChoiceValue(choice)}
                    value={getChoiceValue(choice)}
                    onSelect={() => {
                      if (
                        field.value === getChoiceValue(choice) &&
                        !isRequired
                      ) {
                        field.onChange("");
                        setOpen(false);
                        return;
                      }
                      field.onChange(getChoiceValue(choice));
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        field.value === getChoiceValue(choice)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {getChoiceText(choice)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </FormControl>
      {props.helperText && (
        <FormDescription>{props.helperText}</FormDescription>
      )}
      <FormError fieldState={fieldState} />
    </FormItem>
  );
};
