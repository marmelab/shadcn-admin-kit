import { useListContext, useTranslate } from "ra-core";
import { defaultFolder } from "../types";

/** Name of the current label, category, starred view or folder */
export const ThreadListTitle = () => {
  const { filterValues } = useListContext();
  const translate = useTranslate();
  return (
    <>
      {filterValues.labels
        ? translate(`mail.labels.${filterValues.labels}`)
        : filterValues.category
          ? translate(`mail.categories.${filterValues.category}`)
          : filterValues.starred
            ? translate("mail.folders.starred")
            : translate(`mail.folders.${filterValues.folder ?? defaultFolder}`)}
    </>
  );
};
