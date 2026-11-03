import { useState } from "react";
import { useLocaleState, useRecordContext, useTranslate } from "ra-core";
import { DateField } from "@/components/admin/date-field";
import { ReferenceManyField } from "@/components/admin/reference-many-field";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import type { Thread } from "../types";
import { Composer } from "./Composer";
import { formatContacts } from "./formatContacts";
import { getInitials } from "./getInitials";
import { MessageList } from "./MessageList";
import { type ReplyMode, ReplyForm } from "./ReplyForm";
import { ThreadToolbar } from "./ThreadToolbar";
import { useMarkAsReadOnOpen } from "./useMarkAsReadOnOpen";

/** The selected thread (inside a ShowBase), or the draft editor */
export const ThreadDisplay = () => {
  const thread = useRecordContext<Thread>();
  useMarkAsReadOnOpen(thread);
  if (!thread) return null;
  if (thread.folder === "drafts") return <Composer draft={thread} />;
  return <ThreadView thread={thread} />;
};

const ThreadView = ({ thread }: { thread: Thread }) => {
  const translate = useTranslate();
  const [locale] = useLocaleState();
  // Set by the Reply and Reply all buttons of the toolbar
  const [replyMode, setReplyMode] = useState<ReplyMode>("reply");

  return (
    <div className="flex min-h-full flex-col">
      <ThreadToolbar replyMode={replyMode} onReplyModeChange={setReplyMode} />
      <Separator />
      <div className="flex items-start gap-4 p-4 text-sm">
        <Avatar>
          <AvatarFallback>{getInitials(thread.name)}</AvatarFallback>
        </Avatar>
        <div className="grid min-w-0 gap-1">
          <div className="font-semibold">{thread.name}</div>
          <div className="text-xs">{thread.subject}</div>
          <div className="text-xs">
            <span className="font-medium">
              {translate("mail.display.reply_to")}
            </span>{" "}
            {thread.email}
          </div>
          {thread.cc.length > 0 ? (
            <div className="text-xs">
              <span className="font-medium">
                {translate("mail.display.cc")}
              </span>{" "}
              {formatContacts(thread.cc)}
            </div>
          ) : null}
        </div>
        <DateField
          source="updated_at"
          showTime
          locales={locale}
          className="ml-auto shrink-0 text-xs text-muted-foreground"
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
      <Separator className="mt-auto" />
      <ReplyForm mode={replyMode} onModeChange={setReplyMode} />
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
