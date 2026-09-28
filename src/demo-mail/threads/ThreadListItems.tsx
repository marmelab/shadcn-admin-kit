import { RecordContextProvider, useListContext, useTranslate } from "ra-core";
import { Skeleton } from "@/components/ui/skeleton";
import type { Thread } from "../types";
import { ThreadListItem } from "./ThreadListItem";

export const ThreadListItems = ({ selectedId }: { selectedId?: number }) => {
  const { data, isPending } = useListContext<Thread>();
  const translate = useTranslate();

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
        {translate("mail.list.empty")}
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {data.map((thread) => (
        <RecordContextProvider key={thread.id} value={thread}>
          <ThreadListItem selected={thread.id === selectedId} />
        </RecordContextProvider>
      ))}
    </div>
  );
};
