import { BellOff, Star } from "lucide-react";
import { LinkBase, useLocation, useRecordContext, useTranslate } from "ra-core";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Thread } from "../types";
import { useFormatDistance } from "./useFormatDistance";
import { fromListState, isFromList, useUpdateThread } from "./useThreadActions";

/**
 * A thread of the list: a link to the thread, next to its selection checkbox
 * and star toggle (outside the link, as a link cannot hold controls).
 */
export const ThreadListItem = ({
  selected,
  checked,
  onCheck,
  replace,
}: {
  selected: boolean;
  checked: boolean;
  /** Called with whether Shift was down, to select a range */
  onCheck: (shiftKey: boolean) => void;
  replace: boolean;
}) => {
  const thread = useRecordContext<Thread>();
  const location = useLocation();
  const translate = useTranslate();
  const formatDistance = useFormatDistance();
  if (!thread) return null;
  const isDraft = thread.folder === "drafts";
  const subject = thread.subject || translate("mail.list.no_subject");

  return (
    <div
      className={cn(
        "relative flex rounded-lg border text-sm transition-all hover:bg-accent",
        selected && "bg-muted",
        checked &&
          "border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/40",
      )}
    >
      <div className="flex flex-col items-center gap-3 py-3.5 pl-3">
        <Checkbox
          checked={checked}
          onCheckedChange={(_, { event }) =>
            onCheck((event as MouseEvent).shiftKey ?? false)
          }
          aria-label={translate("mail.list.select", { subject })}
        />
        {isDraft ? null : <StarToggle thread={thread} />}
      </div>
      <LinkBase
        // Keep the list params in the URL, so the list stays the same
        to={{ pathname: `/threads/${thread.id}/show`, search: location.search }}
        // A replaced entry stays "from the list" only if it was: a thread opened
        // from a direct link was not
        state={
          !replace || isFromList(location.state) ? fromListState : undefined
        }
        replace={replace}
        className="flex min-w-0 flex-1 flex-col gap-2 p-3 text-left"
      >
        <div className="flex w-full items-center gap-2">
          {isDraft ? (
            <span className="shrink-0 font-semibold text-destructive">
              {translate("mail.list.draft")}
            </span>
          ) : null}
          <span className="truncate font-semibold">
            {thread.name || translate("mail.list.no_recipient")}
          </span>
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
        <div className="text-xs font-medium">{subject}</div>
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
    </div>
  );
};

/**
 * Stars or unstars the thread. The update is pessimistic (see
 * useUpdateThread), so the star shows the new state while it is pending.
 */
const StarToggle = ({ thread }: { thread: Thread }) => {
  const translate = useTranslate();
  const [updateThread, { isPending }] = useUpdateThread();
  const starred = isPending ? !thread.starred : thread.starred;
  return (
    <Button
      variant="ghost"
      size="icon"
      className="-m-1.5 size-7"
      aria-pressed={starred}
      aria-label={translate(
        starred ? "mail.action.unstar" : "mail.action.star",
      )}
      title={translate(starred ? "mail.action.unstar" : "mail.action.star")}
      disabled={isPending}
      onClick={() => updateThread(thread, { starred: !thread.starred })}
    >
      <Star
        className={cn(
          "size-4",
          starred ? "fill-amber-400 text-amber-400" : "text-muted-foreground",
        )}
      />
    </Button>
  );
};
