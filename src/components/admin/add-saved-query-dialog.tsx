import { useListContext, useTranslate } from "ra-core";
import { ChangeEvent, FormEvent, ReactElement, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { extractValidSavedQueries, useSavedQueries } from "./useSavedQueries";

export const AddSavedQueryDialog = ({
  open,
  onClose,
}: AddSavedQueryDialogProps): ReactElement => {
  const translate = useTranslate();
  const { resource, filterValues, displayedFilters, sort, perPage } =
    useListContext();

  const [savedQueries, setSavedQueries] = useSavedQueries(resource);

  // input state
  const [queryName, setQueryName] = useState("");
  const handleQueryNameChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setQueryName(event.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addQuery();
  };

  const addQuery = (): void => {
    const newSavedQuery = {
      label: queryName,
      value: {
        filter: filterValues,
        sort,
        perPage,
        displayedFilters,
      },
    };
    const newSavedQueries = extractValidSavedQueries(savedQueries);
    setSavedQueries(newSavedQueries.concat(newSavedQuery));
    setQueryName("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {translate("ra.saved_queries.new_dialog_title", {
              _: "Save current query as",
            })}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              {translate("ra.saved_queries.query_name", {
                _: "Query name",
              })}
            </Label>
            <Input
              id="name"
              value={queryName}
              onChange={handleQueryNameChange}
              autoFocus
            />
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {translate("ra.action.cancel")}
          </Button>
          <Button onClick={addQuery}>{translate("ra.action.save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export interface AddSavedQueryDialogProps {
  open: boolean;
  onClose: () => void;
}
