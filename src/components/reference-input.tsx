import {
  ChoicesContextProvider,
  InputProps,
  ResourceContextProvider,
  UseReferenceInputControllerParams,
  useReferenceInputController,
} from "ra-core";
import { Children, ReactNode } from "react";

export const ReferenceInput = (props: ReferenceInputProps) => {
  const {
    children,
    reference,
    sort = { field: "id", order: "DESC" },
    filter = {},
  } = props;

  const controllerProps = useReferenceInputController({
    ...props,
    sort,
    filter,
  });

  if (Children.count(children) !== 1) {
    throw new Error("<ReferenceInput> only accepts a single child");
  }

  return (
    <ResourceContextProvider value={reference}>
      <ChoicesContextProvider value={controllerProps}>
        {children}
      </ChoicesContextProvider>
    </ResourceContextProvider>
  );
};

export interface ReferenceInputProps
  extends InputProps,
    UseReferenceInputControllerParams {
  children?: ReactNode;
  label?: string;
}
