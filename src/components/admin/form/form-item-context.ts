import { createContext } from "react";

export type FormItemContextValue = {
  id: string;
  name: string;
};

export const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);
