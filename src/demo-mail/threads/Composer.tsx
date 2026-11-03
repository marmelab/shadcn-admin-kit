import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useWatch } from "react-hook-form";
import {
  email,
  Form,
  required,
  useCreate,
  useDelete,
  useNotify,
  useRefresh,
  useTranslate,
  useUpdate,
} from "ra-core";
import { SaveButton } from "@/components/admin/form";
import { IconButtonWithTooltip } from "@/components/admin/icon-button-with-tooltip";
import { TextInput } from "@/components/admin/text-input";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Thread } from "../types";
import { refreshCounters } from "./threadCache";
import { useCloseThread } from "./useThreadActions";

type DraftValues = Pick<Thread, "email" | "subject" | "draft">;

const AUTOSAVE_DELAY = 1000;

/**
 * Editor of a draft, or of a new message when there is no draft yet. Changes
 * are saved to the drafts folder as the user types, the first save creating
 * the draft. Sending moves the draft to the sent folder, where the data
 * provider turns it into a message.
 */
export const Composer = ({ draft }: { draft?: Thread }) => {
  const translate = useTranslate();
  const isMobile = useIsMobile();
  const notify = useNotify();
  const refresh = useRefresh();
  const closeThread = useCloseThread();
  const { save, send, discard } = useDraftSaver(draft);
  // Frozen, so that the form is not reset when a save updates the draft
  const [initialValues] = useState<DraftValues>(() => ({
    email: draft?.email ?? "",
    subject: draft?.subject ?? "",
    draft: draft?.draft ?? "",
  }));

  const handleSend = async (values: Partial<DraftValues>) => {
    const sent = await send(values);
    if (sent == null) return;
    if (!sent) {
      notify("ra.notification.http_error", { type: "error" });
      return;
    }
    closeThread();
    notify("mail.notification.sent", { type: "success" });
    // The data provider created the message and updated the thread
    refresh();
  };

  const handleDiscard = async () => {
    const discarded = await discard();
    if (discarded == null) return;
    if (!discarded) {
      notify("ra.notification.http_error", { type: "error" });
      return;
    }
    closeThread();
    notify("mail.notification.discarded", { type: "info" });
  };

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex items-center gap-1 p-2">
        {isMobile ? (
          <IconButtonWithTooltip label="mail.action.back" onClick={closeThread}>
            <ArrowLeft />
          </IconButtonWithTooltip>
        ) : null}
        <h2 className="px-2 text-sm font-semibold">
          {translate(draft ? "mail.compose.draft" : "mail.compose.title")}
        </h2>
        <IconButtonWithTooltip
          label="mail.action.discard"
          className="ml-auto"
          onClick={handleDiscard}
        >
          <Trash2 />
        </IconButtonWithTooltip>
      </div>
      <Separator />
      <Form
        record={initialValues}
        onSubmit={handleSend}
        className="flex flex-1 flex-col gap-4 p-4"
      >
        <TextInput
          source="email"
          label="mail.compose.to"
          autoFocus={!draft}
          validate={[required(), email()]}
        />
        <TextInput source="subject" label="mail.compose.subject" />
        <TextInput
          source="draft"
          label={false}
          helperText={false}
          multiline
          // The textarea grows with its content, rows has no effect
          inputClassName="min-h-64"
          placeholder={translate("mail.compose.placeholder")}
        />
        <div className="flex items-center gap-4">
          <AutoSave save={save} initialValues={initialValues} />
          <SaveButton label="mail.reply.send" icon={null} className="ml-auto" />
        </div>
      </Form>
    </div>
  );
};

type SaveStatus = "idle" | "saving" | "saved";

/**
 * Saves the form values once the user stops typing, and when the editor
 * closes with unsaved changes.
 */
const AutoSave = ({
  save,
  initialValues,
}: {
  save: (values: DraftValues) => Promise<boolean>;
  initialValues: DraftValues;
}) => {
  const translate = useTranslate();
  const values = useWatch() as DraftValues;
  const [status, setStatus] = useState<SaveStatus>("idle");
  const lastSaved = useRef(JSON.stringify(initialValues));
  const pending = useRef<DraftValues | null>(null);

  const saveNow = useCallback(
    async (toSave: DraftValues) => {
      pending.current = null;
      lastSaved.current = JSON.stringify(toSave);
      setStatus("saving");
      const saved = await save(toSave);
      setStatus(saved ? "saved" : "idle");
    },
    [save],
  );

  useEffect(() => {
    const snapshot = {
      email: values.email ?? "",
      subject: values.subject ?? "",
      draft: values.draft ?? "",
    };
    if (JSON.stringify(snapshot) === lastSaved.current) {
      // An edit undone before the autosave has nothing left to save
      pending.current = null;
      return;
    }
    pending.current = snapshot;
    const timeout = setTimeout(() => saveNow(snapshot), AUTOSAVE_DELAY);
    return () => clearTimeout(timeout);
  }, [values.email, values.subject, values.draft, saveNow]);

  // Changes typed less than a second before closing the editor
  useEffect(
    () => () => {
      if (pending.current) saveNow(pending.current);
    },
    [saveNow],
  );

  return (
    <span className="text-xs text-muted-foreground" aria-live="polite">
      {status === "saving"
        ? translate("mail.compose.saving")
        : status === "saved"
          ? translate("mail.compose.saved")
          : null}
    </span>
  );
};

/**
 * Saves a draft, one request at a time: a save waits for the previous one, so
 * that the first save creates the draft and the next ones update it.
 */
const useDraftSaver = (draft?: Thread) => {
  const queryClient = useQueryClient();
  const [create] = useCreate<Thread>();
  const [update] = useUpdate<Thread>();
  const [deleteOne] = useDelete<Thread>();
  const record = useRef<Thread | undefined>(draft);
  const queue = useRef<Promise<unknown>>(Promise.resolve());

  const enqueue = useCallback(<T,>(task: () => Promise<T>) => {
    const result = queue.current.then(task);
    // A failed save must not block the next ones
    queue.current = result.catch(() => undefined);
    return result;
  }, []);

  // The hooks return the record only with returnPromise, which their types
  // do not tell
  const write = useCallback(
    async (data: Partial<Thread>) => {
      let current = record.current;
      if (!current) {
        // Created as a draft even when sent right away, as the data provider
        // turns drafts into messages
        current = (await create(
          "threads",
          { data: { ...data, folder: "drafts" } },
          { returnPromise: true },
        )) as Thread;
        record.current = current;
        refreshCounters(queryClient, current);
        // Shows the new draft in the drafts list
        queryClient.invalidateQueries({
          queryKey: ["threads", "getInfiniteList"],
        });
        if (data.folder !== "sent") return;
      }
      record.current = (await update(
        "threads",
        { id: current.id, data, previousData: current },
        { mutationMode: "pessimistic", returnPromise: true },
      )) as Thread;
    },
    [create, update, queryClient],
  );

  // Set once the draft is sent or discarded, so that the autosave does not
  // write it again
  const isClosed = useRef(false);

  /** Runs a task after the pending ones, resolves to whether it succeeded */
  const run = useCallback(
    (task: () => Promise<unknown>) =>
      enqueue(task).then(
        () => true,
        () => false,
      ),
    [enqueue],
  );

  const save = useCallback(
    (values: Partial<Thread>) =>
      isClosed.current ? Promise.resolve(false) : run(() => write(values)),
    [run, write],
  );

  /**
   * Closes the draft with a last task, reopens it if the task fails. Resolves
   * to undefined when the draft is already closing (sent or discarded).
   */
  const close = useCallback(
    async (task: () => Promise<unknown>) => {
      if (isClosed.current) return undefined;
      isClosed.current = true;
      const succeeded = await run(task);
      isClosed.current = succeeded;
      return succeeded;
    },
    [run],
  );

  const send = useCallback(
    (values: Partial<Thread>) =>
      close(() => write({ ...values, folder: "sent" })),
    [close, write],
  );

  const discard = useCallback(
    () =>
      close(async () => {
        const previousData = record.current;
        if (!previousData) return;
        await deleteOne(
          "threads",
          { id: previousData.id, previousData },
          { mutationMode: "pessimistic", returnPromise: true },
        );
        refreshCounters(queryClient, previousData);
      }),
    [close, deleteOne, queryClient],
  );

  return { save, send, discard };
};
