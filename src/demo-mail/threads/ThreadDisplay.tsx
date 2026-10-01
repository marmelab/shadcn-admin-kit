import { useLocaleState, useRecordContext, useTranslate } from "ra-core";
import { DateField } from "@/components/admin/date-field";
import { ReferenceManyField } from "@/components/admin/reference-many-field";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import type { Thread } from "../types";
import { getInitials } from "./getInitials";
import { MessageList } from "./MessageList";
import { ReplyForm } from "./ReplyForm";
import { ThreadToolbar } from "./ThreadToolbar";
import { useMarkAsReadOnOpen } from "./useMarkAsReadOnOpen";

/** The selected thread (inside a ShowBase) */
export const ThreadDisplay = () => {
  const thread = useRecordContext<Thread>();
  const translate = useTranslate();
  const [locale] = useLocaleState();
  useMarkAsReadOnOpen(thread);
  if (!thread) return null;

  return (
    <div className="flex min-h-full flex-col">
      <ThreadToolbar />
      <Separator />
      <div className="flex items-start gap-4 p-4 text-sm">
        <Avatar>
          <AvatarFallback>{getInitials(thread.name)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <div className="font-semibold">{thread.name}</div>
          <div className="text-xs">{thread.subject}</div>
          <div className="text-xs">
            <span className="font-medium">
              {translate("mail.display.reply_to")}
            </span>{" "}
            {thread.email}
          </div>
        </div>
        <DateField
          source="updated_at"
          showTime
          locales={locale}
          className="ml-auto text-xs text-muted-foreground"
        />
      </div>
      <Separator />
      <ReferenceManyField
        reference="messages"
        target="thread_id"
        sort={{ field: "timestamp", order: "ASC" }}
        perPage={100}
      >
        <MessageList />
      </ReferenceManyField>
      {thread.folder !== "drafts" ? (
        <>
          <Separator className="mt-auto" />
          <ReplyForm />
        </>
      ) : null}
    </div>
  );
};

export const NoThreadSelected = () => {
  const translate = useTranslate();
  return (
    <div className="p-8 text-center text-sm text-muted-foreground">
      {translate("mail.display.no_selection")}
    </div>
  );
};
