import {
  InputProps,
  ReferenceInputBase,
  UseReferenceInputControllerParams,
} from "ra-core";
import { ReactNode } from "react";
import { AutocompleteInput } from "./autocomplete-input";

const defaultChildren = <AutocompleteInput />;

export const ReferenceInput = (props: ReferenceInputProps) => {
  const { children = defaultChildren, ...rest } = props;

  if (props.validate && process.env.NODE_ENV !== "production") {
    throw new Error(
      "<ReferenceInput> does not accept a validate prop. Set the validate prop on the child instead."
    );
  }

  return <ReferenceInputBase {...rest}>{children}</ReferenceInputBase>;
};

export interface ReferenceInputProps
  extends InputProps,
    UseReferenceInputControllerParams {
  children?: ReactNode;
  label?: string;
}
