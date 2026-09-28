import {
  CreateBase,
  Form,
  required,
  useNotify,
  useRecordContext,
  useRefresh,
  useTranslate,
  useUpdate,
} from "ra-core";
import { useFormContext } from "react-hook-form";
import { BooleanInput } from "@/components/admin/boolean-input";
import { SaveButton } from "@/components/admin/form";
import { TextInput } from "@/components/admin/text-input";
import { account } from "../account";
import type { Thread } from "../types";
import { replyInputId } from "./useThreadActions";

/** Creates a message from me in the displayed thread */
export const ReplyForm = () => {
  const thread = useRecordContext<Thread>();
  const translate = useTranslate();
  if (!thread) return null;

  return (
    <CreateBase resource="messages" redirect={false}>
      <Form className="flex flex-col gap-4 p-4">
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
          <SendButton thread={thread} />
        </div>
      </Form>
    </CreateBase>
  );
};

const SendButton = ({ thread }: { thread: Thread }) => {
  const { getValues, reset } = useFormContext();
  const [update] = useUpdate<Thread>();
  const notify = useNotify();
  const refresh = useRefresh();

  return (
    <SaveButton
      type="button"
      label="mail.reply.send"
      icon={null}
      className="ml-auto"
      transform={(data) => ({
        thread_id: thread.id,
        author: "me",
        name: account.name,
        email: account.email,
        message: data.message,
        timestamp: new Date().toISOString(),
      })}
      mutationOptions={{
        onSuccess: () => {
          if (getValues("mute")) {
            update(
              "threads",
              { id: thread.id, data: { muted: true }, previousData: thread },
              { mutationMode: "optimistic" },
            );
          }
          reset();
          notify("mail.notification.sent", { type: "success" });
          // The data provider updated the thread (snippet, date): refetch it
          refresh();
        },
      }}
    />
  );
};
