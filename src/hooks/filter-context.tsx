import * as React from "react";
import { useContext } from "react";

export interface FilterElementProps {
  alwaysOn?: boolean;
  context?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
  resource?: string;
  record?: object;
  source: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Allow any other prop
}

export type FilterContextType =
  | React.ReactElement<FilterElementProps>[]
  | undefined;

/**
 * Make filters accessible to sub components
 * @deprecated Use FilterContext from `ra-core` once available.
 */
export const FilterContext = React.createContext<FilterContextType>(undefined);

/**
 * @deprecated Use useFilterContext from `ra-core` once available.
 */
export const useFilterContext = (): FilterContextType => {
  return useContext(FilterContext);
};
