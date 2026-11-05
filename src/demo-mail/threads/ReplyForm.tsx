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
import { Button } from "@/components/ui/button";
import { account } from "../account";
import type { Thread } from "../types";
import { formatContacts } from "./formatContacts";
import { focusReplyInput, replyInputId } from "./useThreadActions";

export type ReplyMode = "reply" | "replyAll";

/**
 * Creates a message from me in the displayed thread, to the correspondent
 * only or to every recipient. The data provider mutes the thread when asked,
 * so that the reply and the mute are a single request.
 */
export const ReplyForm = ({
  mode,
  onModeChange,
}: {
  mode: ReplyMode;
  onModeChange: (mode: ReplyMode) => void;
}) => {
  const thread = useRecordContext<Thread>();
  const translate = useTranslate();
  const notify = useNotify();
  const refresh = useRefresh();
  // Remounting the form clears it once the reply is sent
  const [formKey, setFormKey] = useState(0);
  if (!thread) return null;
  const canReplyAll = thread.cc.length > 0;
  const replyAll = canReplyAll && mode === "replyAll";
  const to = [{ name: thread.name, email: thread.email }];
  const cc = replyAll ? thread.cc : [];

  const switchMode = () => {
    onModeChange(replyAll ? "reply" : "replyAll");
    focusReplyInput();
  };

  return (
    <CreateBase
      resource="messages"
      redirect={false}
      transform={(data) => ({
        thread_id: thread.id,
        author: "me",
        ...account,
        to,
        cc,
        message: data.message,
        mute: !!data.mute,
        timestamp: new Date().toISOString(),
      })}
      // Hook-level, so that it still runs when another thread is opened while
      // the reply is being sent
      mutationOptions={{
        onSuccess: () => {
          setFormKey((key) => key + 1);
          onModeChange("reply");
          notify("mail.notification.sent", { type: "success" });
          // The data provider updated the thread (snippet, date): refetch it
          refresh();
        },
      }}
    >
      <Form key={formKey} className="flex flex-col gap-4 p-4">
        <div className="flex flex-wrap items-center gap-x-2 text-xs">
          <span>
            <span className="font-medium">{translate("mail.reply.to")}</span>{" "}
            {formatContacts(to)}
          </span>
          {cc.length > 0 ? (
            <span>
              <span className="font-medium">{translate("mail.reply.cc")}</span>{" "}
              {formatContacts(cc)}
            </span>
          ) : null}
          {canReplyAll ? (
            <Button
              type="button"
              variant="link"
              size="sm"
              className="ml-auto h-auto p-0 text-xs"
              onClick={switchMode}
            >
              {translate(
                replyAll ? "mail.reply.sender_only" : "mail.action.reply_all",
              )}
            </Button>
          ) : null}
        </div>
        <TextInput
          source="message"
          id={replyInputId}
          label={false}
          helperText={false}
          multiline
          // The textarea grows with its content, rows has no effect
          inputClassName="min-h-24"
          placeholder={
            replyAll
              ? translate("mail.reply.placeholder_all")
              : translate("mail.reply.placeholder", { name: thread.name })
          }
          validate={required()}
        />
        <div className="flex items-center gap-4">
          <BooleanInput
            source="mute"
            label="mail.reply.mute"
            helperText={false}
          />
          <SaveButton
            label={replyAll ? "mail.reply.send_all" : "mail.reply.send"}
            icon={null}
            className="ml-auto"
          />
        </div>
      </Form>
    </CreateBase>
  );
};
