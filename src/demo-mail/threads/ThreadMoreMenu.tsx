import { EllipsisVertical } from "lucide-react";
import { useRecordContext, useTranslate } from "ra-core";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Label, Thread } from "../types";
import { labels } from "../types";
import { useCloseThread, useUpdateThread } from "./useThreadActions";

export const ThreadMoreMenu = () => {
  const thread = useRecordContext<Thread>();
  const translate = useTranslate();
  const updateThread = useUpdateThread();
  const closeThread = useCloseThread();
  if (!thread) return null;

  const markAsUnread = () => {
    // Like mail clients, go back to the list after marking as unread
    closeThread();
    updateThread(thread, { read: false });
  };
  const toggleLabel = (label: Label, checked: boolean) =>
    updateThread(thread, {
      labels: checked
        ? [...thread.labels, label]
        : thread.labels.filter((existing) => existing !== label),
    });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={translate("mail.action.more")}
          />
        }
      >
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={markAsUnread}>
          {translate("mail.action.mark_as_unread")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateThread(thread, { starred: !thread.starred })}
        >
          {translate(
            thread.starred ? "mail.action.unstar" : "mail.action.star",
          )}
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            {translate("mail.action.add_label")}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {labels.map((label) => (
              <DropdownMenuCheckboxItem
                key={label}
                checked={thread.labels.includes(label)}
                onCheckedChange={(checked) => toggleLabel(label, checked)}
              >
                {translate(`mail.labels.${label}`)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => updateThread(thread, { muted: !thread.muted })}
        >
          {translate(thread.muted ? "mail.action.unmute" : "mail.action.mute")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
