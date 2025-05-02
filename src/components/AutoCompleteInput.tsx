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
} from "ra-core";
import { FormError } from "./FormError";

export const AutoCompleteInput = (
  props: Omit<InputProps, "source"> &
    Partial<Pick<InputProps, "source">> &
    ChoicesProps & {
      disableValue?: string;
      translateChoice?: boolean;
    }
) => {
  const translate = useTranslate();
  const {
    allChoices = [],
    source,
    resource,
    isFromReference,
  } = useChoicesContext(props);
  const { field, fieldState } = useInput({ ...props, source });

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
    <FormItem>
      <FormLabel>
        {typeof props.label === "string"
          ? translate(props.label, { _: props.label })
          : props.label}
      </FormLabel>
      <FormControl>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedChoice ? getChoiceText(selectedChoice) : ""}
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
      <FormDescription>{props.helperText}</FormDescription>
      <FormError fieldState={fieldState} />
    </FormItem>
  );
};
