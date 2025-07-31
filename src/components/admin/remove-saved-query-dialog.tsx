import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import isEqual from "lodash/isEqual";
import { useListContext, useTranslate } from "ra-core";
import { ReactElement } from "react";

import { extractValidSavedQueries, useSavedQueries } from "./useSavedQueries";

export interface RemoveSavedQueryDialogProps {
  open: boolean;
  onClose: () => void;
}

export const RemoveSavedQueryDialog = ({
  open,
  onClose,
}: RemoveSavedQueryDialogProps): ReactElement => {
  const translate = useTranslate();
  const { resource, filterValues, sort, perPage, displayedFilters } =
    useListContext();

  const [savedQueries, setSavedQueries] = useSavedQueries(resource);

  const removeQuery = (): void => {
    const savedQueryToRemove = {
      filter: filterValues,
      sort,
      perPage,
      displayedFilters,
    };

    const newSavedQueries = extractValidSavedQueries(savedQueries);
    const index = newSavedQueries.findIndex((savedFilter) =>
      isEqual(savedFilter.value, savedQueryToRemove)
    );
    setSavedQueries([
      ...newSavedQueries.slice(0, index),
      ...newSavedQueries.slice(index + 1),
    ]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {translate("ra.saved_queries.remove_dialog_title", {
              _: "Remove saved query?",
            })}
          </DialogTitle>
          <DialogDescription>
            {translate("ra.saved_queries.remove_message", {
              _: "Are you sure you want to remove that item from your list of saved queries?",
            })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {translate("ra.action.cancel")}
          </Button>
          <Button onClick={removeQuery} autoFocus>
            {translate("ra.action.confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
