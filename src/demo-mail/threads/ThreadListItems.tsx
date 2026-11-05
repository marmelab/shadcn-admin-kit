import { useEffect, useRef } from "react";
import { RecordContextProvider, useListContext, useTranslate } from "ra-core";
import { Skeleton } from "@/components/ui/skeleton";
import type { Thread } from "../types";
import { ThreadListItem } from "./ThreadListItem";

export const ThreadListItems = ({
  selectedId,
  replace,
}: {
  selectedId?: number;
  /** Whether a thread or the new message editor is open */
  replace: boolean;
}) => {
  const { data, isPending, selectedIds, onSelect, onToggleItem, filterValues } =
    useListContext<Thread>();
  const translate = useTranslate();
  // The last checked thread, the start of a Shift+click range
  const lastChecked = useRef<Thread["id"] | null>(null);
  const filters = JSON.stringify(filterValues);
  useEffect(() => {
    lastChecked.current = null;
  }, [filters]);

  if (isPending) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} className="h-28 w-full" />
        ))}
      </div>
    );
  }
  if (!data || data.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        {filterValues.q
          ? translate("mail.list.no_results", { q: filterValues.q })
          : translate("mail.list.empty")}
      </p>
    );
  }

  const handleCheck = (index: number, shiftKey: boolean) => {
    const thread = data[index];
    // -1 when the last checked thread left the list
    const start = data.findIndex(({ id }) => id === lastChecked.current);
    lastChecked.current = thread.id;
    if (!shiftKey || start === -1) {
      onToggleItem(thread.id);
      return;
    }
    // Like mail clients, the range takes the state of the clicked thread
    const range = data
      .slice(Math.min(start, index), Math.max(start, index) + 1)
      .map((record) => record.id);
    onSelect(
      selectedIds.includes(thread.id)
        ? selectedIds.filter((id) => !range.includes(id))
        : [...new Set([...selectedIds, ...range])],
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {data.map((thread, index) => (
        <RecordContextProvider key={thread.id} value={thread}>
          <ThreadListItem
            selected={thread.id === selectedId}
            checked={selectedIds.includes(thread.id)}
            onCheck={(shiftKey) => handleCheck(index, shiftKey)}
            // Switching from a thread or from the editor replaces the history
            // entry, so that closing the thread goes back to the list
            replace={replace}
          />
        </RecordContextProvider>
      ))}
    </div>
  );
};
