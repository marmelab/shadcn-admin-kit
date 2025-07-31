import { createContext, useContext } from "react";

/**
 * A React context that provides access to a SimpleFormIterator data (the total number of items) and mutators (add, reorder and remove).
 * Useful to create custom array input iterators.
 * @see {SimpleFormIterator}
 * @see {ArrayInput}
 */
export const SimpleFormIteratorContext = createContext<
  SimpleFormIteratorContextValue | undefined
>(undefined);

export type SimpleFormIteratorContextValue = {
  add: (item?: any) => void;
  remove: (index: number) => void;
  reOrder: (index: number, newIndex: number) => void;
  source: string;
  total: number;
};

export const useSimpleFormIterator = () => {
  const context = useContext(SimpleFormIteratorContext);
  if (!context) {
    throw new Error(
      "useSimpleFormIterator must be used inside a SimpleFormIterator"
    );
  }
  return context;
};
