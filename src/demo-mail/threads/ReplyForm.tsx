import { useState } from "react";
import {
  CreateBase,
  Form,
  required,
  useNotify,
  useRecordContext,
  useRefresh,
  useTranslate,
} from "ra-core";
import { BooleanInput } from "@/components/admin/boolean-input";
import { SaveButton } from "@/components/admin/form";
import { TextInput } from "@/components/admin/text-input";
import { account } from "../account";
import type { Thread } from "../types";
import { replyInputId } from "./useThreadActions";

/**
 * Creates a message from me in the displayed thread. The data provider mutes
 * the thread when asked, so that the reply and the mute are a single request.
 */
export const ReplyForm = () => {
  const thread = useRecordContext<Thread>();
  const translate = useTranslate();
  const notify = useNotify();
  const refresh = useRefresh();
  // Remounting the form clears it once the reply is sent
  const [formKey, setFormKey] = useState(0);
  if (!thread) return null;

  return (
    <CreateBase
      resource="messages"
      redirect={false}
      transform={(data) => ({
        thread_id: thread.id,
        author: "me",
        name: account.name,
        email: account.email,
        message: data.message,
        mute: !!data.mute,
        timestamp: new Date().toISOString(),
      })}
      // Hook-level, so that it still runs when another thread is opened while
      // the reply is being sent
      mutationOptions={{
        onSuccess: () => {
          setFormKey((key) => key + 1);
          notify("mail.notification.sent", { type: "success" });
          // The data provider updated the thread (snippet, date): refetch it
          refresh();
        },
      }}
    >
      <Form key={formKey} className="flex flex-col gap-4 p-4">
        <TextInput
          source="message"
          id={replyInputId}
          label={false}
          helperText={false}
          multiline
          rows={4}
          placeholder={translate("mail.reply.placeholder", {
            name: thread.name,
          })}
          validate={required()}
        />
        <div className="flex items-center gap-4">
          <BooleanInput
            source="mute"
            label="mail.reply.mute"
            helperText={false}
          />
          <SaveButton label="mail.reply.send" icon={null} className="ml-auto" />
        </div>
      </Form>
    </CreateBase>
  );
};
