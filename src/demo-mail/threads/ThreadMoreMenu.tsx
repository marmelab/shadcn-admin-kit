import { EllipsisVertical } from "lucide-react";
import { useRecordContext, useTranslate } from "ra-core";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Category, Label, Thread } from "../types";
import { categories, labels } from "../types";
import { useCloseThread, useUpdateThread } from "./useThreadActions";

export const ThreadMoreMenu = () => {
  const thread = useRecordContext<Thread>();
  const translate = useTranslate();
  // The toggles are built from the displayed thread, so they wait for the
  // previous update to land
  const [updateThread, { isPending }] = useUpdateThread();
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
          disabled={isPending}
          onClick={() => updateThread(thread, { starred: !thread.starred })}
        >
          {translate(
            thread.starred ? "mail.action.unstar" : "mail.action.star",
          )}
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            {translate("mail.action.labels")}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {labels.map((label) => (
              <DropdownMenuCheckboxItem
                key={label}
                checked={thread.labels.includes(label)}
                disabled={isPending}
                onCheckedChange={(checked) => toggleLabel(label, checked)}
              >
                {translate(`mail.labels.${label}`)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            {translate("mail.action.category")}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={thread.category}
              // Called for the checked item too
              onValueChange={(category: Category) => {
                if (category !== thread.category) {
                  updateThread(thread, { category });
                }
              }}
            >
              {categories.map((category) => (
                <DropdownMenuRadioItem
                  key={category}
                  value={category}
                  disabled={isPending}
                >
                  {translate(`mail.categories.${category}`)}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isPending}
          onClick={() => updateThread(thread, { muted: !thread.muted })}
        >
          {translate(thread.muted ? "mail.action.unmute" : "mail.action.mute")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
