import {
  RecordContextProvider,
  useListContext,
  useLocaleState,
  useRecordContext,
  useTranslate,
} from "ra-core";
import { DateField } from "@/components/admin/date-field";
import { Separator } from "@/components/ui/separator";
import type { Message } from "../types";
import { formatContacts } from "./formatContacts";

/** Messages of the thread, oldest first (inside a ReferenceManyField) */
export const MessageList = () => {
  const { data, isPending } = useListContext<Message>();
  if (isPending || !data) return null;
  return (
    <div className="flex flex-col">
      {data.map((message, index) => (
        <RecordContextProvider key={message.id} value={message}>
          {index > 0 ? <Separator /> : null}
          <MessageItem />
        </RecordContextProvider>
      ))}
    </div>
  );
};

const MessageItem = () => {
  const message = useRecordContext<Message>();
  const [locale] = useLocaleState();
  const translate = useTranslate();
  if (!message) return null;
  return (
    <div className="flex flex-col gap-2 p-4 text-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold">{message.name}</span>
        <span className="text-xs text-muted-foreground">{message.email}</span>
        <DateField
          source="timestamp"
          showTime
          locales={locale}
          className="ml-auto text-xs text-muted-foreground"
        />
      </div>
      <div className="-mt-1 text-xs text-muted-foreground">
        {translate("mail.reply.to")} {formatContacts(message.to)}
        {message.cc.length > 0
          ? ` · ${translate("mail.reply.cc")} ${formatContacts(message.cc)}`
          : null}
      </div>
      <div className="whitespace-pre-wrap">{message.message}</div>
    </div>
  );
};
