import { useListContext, useTranslate } from "ra-core";
import { defaultFolder } from "../types";

/** Name of the current folder, or of the current category */
export const ThreadListTitle = () => {
  const { filterValues } = useListContext();
  const translate = useTranslate();
  return (
    <>
      {filterValues.category
        ? translate(`mail.categories.${filterValues.category}`)
        : translate(`mail.folders.${filterValues.folder ?? defaultFolder}`)}
    </>
  );
};
