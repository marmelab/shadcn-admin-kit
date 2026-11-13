import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useWatch } from "react-hook-form";
import {
  email,
  Form,
  type Identifier,
  required,
  useCreate,
  useDelete,
  useGetList,
  useLocation,
  useNavigate,
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
import { getComposeState, useCloseThread } from "./useThreadActions";

/** The form values: the recipients are typed as lists of addresses */
interface DraftValues {
  email: string;
  cc: string;
  subject: string;
  draft: string;
}

const parseAddresses = (value?: string) =>
  (value ?? "").split(/[\s,;]+/).filter(Boolean);

const validateAddress = email();

/** Each address must be valid */
const validateAddresses = (value?: string) =>
  parseAddresses(value)
    .map((address) => validateAddress(address, {}))
    .find(Boolean);

const toContacts = (addresses: string[]) =>
  addresses.map((address) => ({ name: address, email: address }));

/**
 * The first To address is the thread correspondent. The data provider
 * resolves the names of known correspondents.
 */
const toThreadData = (values: Partial<DraftValues>): Partial<Thread> => {
  const [email = "", ...to] = parseAddresses(values.email);
  return {
    email,
    to: toContacts(to),
    cc: toContacts(parseAddresses(values.cc)),
    subject: values.subject ?? "",
    draft: values.draft ?? "",
  };
};

const joinAddresses = (contacts: { email: string }[]) =>
  contacts
    .map((contact) => contact.email)
    .filter(Boolean)
    .join(", ");

const AUTOSAVE_DELAY = 1000;

/** The draft saved by each new message editor, by compose id */
const composeDrafts = new Map<number, Identifier>();

/**
 * Editor of a draft, or of a new message when there is no draft yet. Changes
 * are saved to the drafts folder as the user types, the first save creating
 * the draft. Sending moves the draft to the sent folder, where the data
 * provider turns it into a message.
 */
export const Composer = ({
  draft,
  composeId,
}: {
  draft?: Thread;
  /** Id of a new message editor (see composeState) */
  composeId?: number;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const savedDraftId =
    !draft && composeId != null ? composeDrafts.get(composeId) : undefined;
  useEffect(() => {
    if (savedDraftId == null) return;
    // Back to an editor through the history: its draft holds the latest
    // changes, a new editor would save a second draft
    navigate(
      { pathname: `/threads/${savedDraftId}/show`, search: location.search },
      { replace: true, state: location.state },
    );
  }, [savedDraftId, navigate, location.search, location.state]);
  if (savedDraftId != null) return null;
  return <ComposerForm draft={draft} composeId={composeId} />;
};

const ComposerForm = ({
  draft,
  composeId,
}: {
  draft?: Thread;
  composeId?: number;
}) => {
  const translate = useTranslate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const notify = useNotify();
  const refresh = useRefresh();
  const closeThread = useCloseThread();
  const { save, send, discard } = useDraftSaver(draft, composeId);
  // Frozen, so that the form is not reset when a save updates the draft.
  // A forward prefills a new message until its draft is saved.
  const [initialValues] = useState<DraftValues>(() => {
    const forwarded = draft ? {} : getComposeState(location.state)?.values;
    return {
      email: draft ? joinAddresses([draft, ...draft.to]) : "",
      cc: draft ? joinAddresses(draft.cc) : "",
      subject: draft?.subject ?? forwarded?.subject ?? "",
      draft: draft?.draft ?? forwarded?.draft ?? "",
    };
  });
  const [isForward] = useState(
    () =>
      !draft &&
      initialValues.subject !== "" &&
      initialValues.subject === getComposeState(location.state)?.values.subject,
  );
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
          {translate(
            draft
              ? "mail.compose.draft"
              : isForward
                ? "mail.compose.forward"
                : "mail.compose.title",
          )}
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
        <ContactOptions />
        <TextInput
          source="email"
          label="mail.compose.to"
          helperText="mail.compose.addresses_help"
          // A multiple email input suggests the contacts for the last address
          type="email"
          multiple
          list={contactListId}
          autoComplete="off"
          // Chrome adds a dropdown arrow to the inputs with suggestions
          inputClassName="[&::-webkit-calendar-picker-indicator]:hidden!"
          autoFocus={!draft}
          validate={[required(), validateAddresses]}
        />
        <TextInput
          source="cc"
          label="mail.compose.cc"
          helperText="mail.compose.addresses_help"
          validate={validateAddresses}
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

const contactListId = "compose-contacts";

/** Suggestions for the To field: the known correspondents */
const ContactOptions = () => {
  const { data } = useGetList<Thread>("threads", {
    pagination: { page: 1, perPage: 1000 },
    sort: { field: "id", order: "ASC" },
  });
  const contacts = new Map(
    (data ?? [])
      .flatMap((thread) => [thread, ...thread.to, ...thread.cc])
      .filter((contact) => contact.email && contact.name !== contact.email)
      .map((contact) => [contact.email, contact.name]),
  );
  return (
    <datalist id={contactListId}>
      {[...contacts].map(([email, name]) => (
        <option key={email} value={email}>
          {name}
        </option>
      ))}
    </datalist>
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
  save: (values: DraftValues) => Promise<boolean | undefined>;
  initialValues: DraftValues;
}) => {
  const translate = useTranslate();
  const notify = useNotify();
  const values = useWatch() as DraftValues;
  const [status, setStatus] = useState<SaveStatus>("idle");
  const lastSaved = useRef(JSON.stringify(initialValues));
  const pending = useRef<DraftValues | null>(null);

  const saveNow = useCallback(
    async (toSave: DraftValues) => {
      const snapshot = JSON.stringify(toSave);
      const previous = lastSaved.current;
      pending.current = null;
      lastSaved.current = snapshot;
      setStatus("saving");
      const saved = await save(toSave);
      setStatus(saved ? "saved" : "idle");
      // Unless the draft is closed or a newer save started, a failed save is
      // retried with the next edit, or when the editor closes
      if (saved !== false || lastSaved.current !== snapshot) return;
      lastSaved.current = previous;
      pending.current ??= toSave;
      notify("ra.notification.http_error", { type: "error" });
    },
    [save, notify],
  );

  useEffect(() => {
    const snapshot = {
      email: values.email ?? "",
      cc: values.cc ?? "",
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
  }, [values.email, values.cc, values.subject, values.draft, saveNow]);

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
const useDraftSaver = (draft?: Thread, composeId?: number) => {
  const queryClient = useQueryClient();
  const [create] = useCreate<Thread>();
  const [update] = useUpdate<Thread>();
  const [deleteOne] = useDelete<Thread>();
  const record = useRef<Thread | undefined>(draft);
  const queue = useRef<Promise<boolean>>(Promise.resolve(true));

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
        if (composeId != null) composeDrafts.set(composeId, current.id);
        refreshCounters(queryClient, [current]);
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
    [create, update, queryClient, composeId],
  );

  // Set once the draft is sent or discarded, so that the autosave does not
  // write it again
  const isClosed = useRef(false);

  /**
   * Runs a task after the pending ones, resolves to whether it succeeded. The
   * queue never rejects: a failed save must not block the next ones.
   */
  const run = useCallback((task: () => Promise<unknown>) => {
    const result = queue.current.then(task).then(
      () => true,
      () => false,
    );
    queue.current = result;
    return result;
  }, []);

  /** Resolves to undefined when the draft is closed (sent or discarded) */
  const save = useCallback(
    (values: Partial<DraftValues>) =>
      isClosed.current
        ? Promise.resolve(undefined)
        : run(() => write(toThreadData(values))),
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
    (values: Partial<DraftValues>) =>
      close(() => write({ ...toThreadData(values), folder: "sent" })),
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
        if (composeId != null) composeDrafts.delete(composeId);
        refreshCounters(queryClient, [previousData]);
      }),
    [close, deleteOne, queryClient, composeId],
  );

  return { save, send, discard };
};
