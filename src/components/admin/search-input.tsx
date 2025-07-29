import { Search } from "lucide-react";
import { useTranslate } from "ra-core";

import { TextInput, type TextInputProps } from "./text-input";

export const SearchInput = (inProps: SearchInputProps) => {
  const { label, className, ...rest } = inProps;

  const translate = useTranslate();

  if (label) {
    throw new Error(
      "<SearchInput> isn't designed to be used with a label prop. Use <TextInput> if you need a label."
    );
  }

  return (
    <div className="flex flex-grow relative mt-0">
      <TextInput
        label={false}
        helperText={false}
        placeholder={translate("ra.action.search")}
        className={className}
        {...rest}
      />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  );
};

export type SearchInputProps = TextInputProps;
