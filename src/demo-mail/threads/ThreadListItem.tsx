import { BellOff, Star } from "lucide-react";
import { LinkBase, useLocation, useRecordContext, useTranslate } from "ra-core";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Thread } from "../types";
import { useFormatDistance } from "./useFormatDistance";

export const ThreadListItem = ({ selected }: { selected: boolean }) => {
  const thread = useRecordContext<Thread>();
  const location = useLocation();
  const translate = useTranslate();
  const formatDistance = useFormatDistance();
  if (!thread) return null;

  return (
    <LinkBase
      // Keep the list params in the URL, so the list stays the same
      to={{ pathname: `/threads/${thread.id}/show`, search: location.search }}
      className={cn(
        "flex flex-col gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
        selected && "bg-muted",
      )}
    >
      <div className="flex w-full items-center gap-2">
        <span className="truncate font-semibold">{thread.name}</span>
        {/* The icons are decorative, screen readers get the sr-only text */}
        {!thread.read ? (
          <>
            <span
              className="size-2 shrink-0 rounded-full bg-blue-600"
              aria-hidden
            />
            <span className="sr-only">{translate("mail.list.unread")}</span>
          </>
        ) : null}
        {thread.starred ? (
          <>
            <Star className="size-3.5 shrink-0 fill-current" aria-hidden />
            <span className="sr-only">{translate("mail.list.starred")}</span>
          </>
        ) : null}
        {thread.muted ? (
          <>
            <BellOff
              className="size-3.5 shrink-0 text-muted-foreground"
              aria-hidden
            />
            <span className="sr-only">{translate("mail.list.muted")}</span>
          </>
        ) : null}
        <span
          className={cn(
            "ml-auto shrink-0 text-xs",
            selected ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {formatDistance(thread.updated_at)}
        </span>
      </div>
      <div className="text-xs font-medium">{thread.subject}</div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {thread.snippet}
      </div>
      {thread.labels.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {thread.labels.map((label) => (
            <Badge key={label} variant="secondary">
              {translate(`mail.labels.${label}`)}
            </Badge>
          ))}
        </div>
      ) : null}
    </LinkBase>
  );
};
