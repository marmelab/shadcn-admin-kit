import { useContext, useMemo } from "react";
import { ArrayInputContext, ArrayInputContextValue } from "./ArrayInputContext";

/**
 * @deprecated Use ra-core `useArrayInput` once available.
 */
export const useArrayInput = (
  props?: Partial<ArrayInputContextValue>
): ArrayInputContextValue => {
  const context = useContext(ArrayInputContext);
  const memo = useMemo(
    () =>
      ({
        append: props?.append,
        fields: props?.fields,
        insert: props?.insert,
        move: props?.move,
        prepend: props?.prepend,
        remove: props?.remove,
        replace: props?.replace,
        swap: props?.swap,
        update: props?.update,
      } as ArrayInputContextValue),
    [props]
  );

  if (props?.fields) {
    return memo;
  }
  if (!context) {
    throw new Error(
      "useArrayInput must be used inside an ArrayInputContextProvider"
    );
  }

  return context;
};
