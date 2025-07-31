import isEqual from "lodash/isEqual";
import { Bookmark, BookmarkMinus, BookmarkPlus, Filter, X } from "lucide-react";
import { stringify } from "query-string";
import { useListContext, useResourceContext, useTranslate } from "ra-core";
import * as React from "react";
import {
  useCallback,
  useContext,
  useState,
  type HtmlHTMLAttributes,
} from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { AddSavedQueryDialog } from "./add-saved-query-dialog";
import { FilterButtonMenuItem } from "./filter-button-item-menu";
import { FilterContext } from "./filter-context";
import { RemoveSavedQueryDialog } from "./remove-saved-query-dialog";
import { extractValidSavedQueries, useSavedQueries } from "./useSavedQueries";

export const FilterButton = (props: FilterButtonProps) => {
  const {
    filters: filtersProp,
    className,
    disableSaveQuery,
    size,
    variant = "outline",
    ...rest
  } = props;
  const filters = useContext(FilterContext) || filtersProp;
  const resource = useResourceContext(props);
  const translate = useTranslate();
  if (!resource && !disableSaveQuery) {
    throw new Error(
      "<FilterButton> must be called inside a ResourceContextProvider, or must provide a resource prop"
    );
  }
  const [savedQueries] = useSavedQueries(resource || "");
  const navigate = useNavigate();
  const {
    displayedFilters = {},
    filterValues,
    perPage,
    setFilters,
    showFilter,
    hideFilter,
    sort,
  } = useListContext();
  const hasFilterValues = !isEqual(filterValues, {});
  const validSavedQueries = extractValidSavedQueries(savedQueries);
  const hasSavedCurrentQuery = validSavedQueries.some((savedQuery) =>
    isEqual(savedQuery.value, {
      filter: filterValues,
      sort,
      perPage,
      displayedFilters,
    })
  );
  const [open, setOpen] = useState(false);

  if (filters === undefined) {
    throw new Error(
      "The <FilterButton> component requires the <List filters> prop to be set"
    );
  }

  const allTogglableFilters = filters.filter(
    (filterElement: React.ReactElement<any>) => !filterElement.props.alwaysOn
  );

  const handleShow = useCallback(
    ({ source, defaultValue }: { source: string; defaultValue: any }) => {
      showFilter(source, defaultValue === "" ? undefined : defaultValue);
      // We have to fallback to imperative code because the new FilterFormInput
      // has no way of knowing it has just been displayed (and thus that it should focus its input)
      setTimeout(() => {
        const inputElement = document.querySelector(
          `input[name='${source}']`
        ) as HTMLInputElement;
        if (inputElement) {
          inputElement.focus();
        }
      }, 50);
      setOpen(false);
    },
    [showFilter, setOpen]
  );

  const handleRemove = useCallback(
    ({ source }: { source: string }) => {
      hideFilter(source);
      setOpen(false);
    },
    [hideFilter, setOpen]
  );

  // add query dialog state
  const [addSavedQueryDialogOpen, setAddSavedQueryDialogOpen] = useState(false);
  const hideAddSavedQueryDialog = (): void => {
    setAddSavedQueryDialogOpen(false);
  };
  const showAddSavedQueryDialog = (): void => {
    setOpen(false);
    setAddSavedQueryDialogOpen(true);
  };

  // remove query dialog state
  const [removeSavedQueryDialogOpen, setRemoveSavedQueryDialogOpen] =
    useState(false);
  const hideRemoveSavedQueryDialog = (): void => {
    setRemoveSavedQueryDialogOpen(false);
  };
  const showRemoveSavedQueryDialog = (): void => {
    setOpen(false);
    setRemoveSavedQueryDialogOpen(true);
  };

  if (
    allTogglableFilters.length === 0 &&
    validSavedQueries.length === 0 &&
    !hasFilterValues
  ) {
    return null;
  }
  return (
    <div className={cn("inline-block", className)} {...sanitizeRestProps(rest)}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            className="add-filter"
            variant={variant}
            size={size}
            aria-haspopup="true"
          >
            <Filter className="h-4 w-4" />
            {translate("ra.action.add_filter")}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {allTogglableFilters.map(
            (filterElement: React.ReactElement<any>, index: number) => (
              <FilterButtonMenuItem
                key={filterElement.props.source}
                filter={filterElement}
                displayed={!!displayedFilters[filterElement.props.source]}
                resource={resource}
                onShow={handleShow}
                onHide={handleRemove}
                autoFocus={index === 0}
              />
            )
          )}
          {(hasFilterValues || validSavedQueries.length > 0) && (
            <DropdownMenuSeparator />
          )}
          {validSavedQueries.map((savedQuery: any, index: number) =>
            isEqual(savedQuery.value, {
              filter: filterValues,
              sort,
              perPage,
              displayedFilters,
            }) ? (
              <DropdownMenuItem
                onClick={showRemoveSavedQueryDialog}
                key={index}
              >
                <BookmarkMinus className="h-4 w-4 mr-2" />
                {translate("ra.saved_queries.remove_label_with_name", {
                  _: 'Remove query "%{name}"',
                  name: savedQuery.label,
                })}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={(): void => {
                  navigate({
                    search: stringify({
                      filter: JSON.stringify(savedQuery.value.filter),
                      sort: savedQuery.value.sort?.field,
                      order: savedQuery.value.sort?.order,
                      page: 1,
                      perPage: savedQuery.value.perPage,
                      displayedFilters: JSON.stringify(
                        savedQuery.value.displayedFilters
                      ),
                    }),
                  });
                  setOpen(false);
                }}
                key={index}
              >
                <Bookmark className="h-4 w-4 mr-2" />
                {savedQuery.label}
              </DropdownMenuItem>
            )
          )}
          {hasFilterValues && !hasSavedCurrentQuery && !disableSaveQuery && (
            <DropdownMenuItem onClick={showAddSavedQueryDialog}>
              <BookmarkPlus className="h-4 w-4 mr-2" />
              {translate("ra.saved_queries.new_label", {
                _: "Save current query...",
              })}
            </DropdownMenuItem>
          )}
          {hasFilterValues && (
            <DropdownMenuItem
              onClick={() => {
                setFilters({}, {});
                setOpen(false);
              }}
            >
              <X className="h-4 w-4 mr-2" />
              {translate("ra.action.remove_all_filters", {
                _: "Remove all filters",
              })}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {!disableSaveQuery && (
        <>
          <AddSavedQueryDialog
            open={addSavedQueryDialogOpen}
            onClose={hideAddSavedQueryDialog}
          />
          <RemoveSavedQueryDialog
            open={removeSavedQueryDialogOpen}
            onClose={hideRemoveSavedQueryDialog}
          />
        </>
      )}
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-unused-vars */
const sanitizeRestProps = ({
  displayedFilters = null,
  filterValues = null,
  showFilter = null,
  ...rest
}) => rest;

export interface FilterButtonProps extends HtmlHTMLAttributes<HTMLDivElement> {
  className?: string;
  disableSaveQuery?: boolean;
  filters?: React.ReactElement<any>[];
  resource?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}
