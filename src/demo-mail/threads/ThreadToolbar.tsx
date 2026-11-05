import { useState } from "react";
import {
  Archive,
  ArchiveX,
  ArrowLeft,
  Forward,
  Inbox,
  Reply,
  ReplyAll,
  Trash2,
} from "lucide-react";
import {
  useDelete,
  useGetManyReference,
  useLocaleState,
  useLocation,
  useNavigate,
  useNotify,
  useRecordContext,
  useTranslate,
} from "ra-core";
import { Confirm } from "@/components/admin/confirm";
import { IconButtonWithTooltip } from "@/components/admin/icon-button-with-tooltip";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import type { Message, Thread } from "../types";
import { formatContacts } from "./formatContacts";
import type { ReplyMode } from "./ReplyForm";
import { ThreadMoreMenu } from "./ThreadMoreMenu";
import {
  composeState,
  focusReplyInput,
  useCloseThread,
  useMoveThread,
} from "./useThreadActions";

/**
 * Each move button becomes "back to inbox" when the thread is already in the
 * target folder (Archive and Trash for the first one), and the trash button
 * deletes permanently from the trash. The reply buttons choose the recipients
 * of the reply form, Reply all being disabled when there is no one in Cc.
 * Forward opens the new message editor with the last message quoted.
 */
export const ThreadToolbar = ({
  replyMode,
  onReplyModeChange,
}: {
  replyMode: ReplyMode;
  onReplyModeChange: (mode: ReplyMode) => void;
}) => {
  const thread = useRecordContext<Thread>();
  const isMobile = useIsMobile();
  const closeThread = useCloseThread();
  const moveThread = useMoveThread();
  if (!thread) return null;
  const canReplyAll = thread.cc.length > 0;
  const activeMode = canReplyAll ? replyMode : "reply";
  const reply = (mode: ReplyMode) => {
    onReplyModeChange(mode);
    focusReplyInput();
  };

  return (
    <div className="flex items-center gap-1 p-2">
      {isMobile ? (
        <IconButtonWithTooltip label="mail.action.back" onClick={closeThread}>
          <ArrowLeft />
        </IconButtonWithTooltip>
      ) : null}
      {thread.folder === "archive" || thread.folder === "trash" ? (
        <IconButtonWithTooltip
          label="mail.action.move_to_inbox"
          onClick={() => moveThread(thread, "inbox")}
        >
          <Inbox />
        </IconButtonWithTooltip>
      ) : (
        <IconButtonWithTooltip
          label="mail.action.archive"
          onClick={() => moveThread(thread, "archive")}
        >
          <Archive />
        </IconButtonWithTooltip>
      )}
      {thread.folder === "junk" ? (
        <IconButtonWithTooltip
          label="mail.action.not_junk"
          onClick={() => moveThread(thread, "inbox")}
        >
          <Inbox />
        </IconButtonWithTooltip>
      ) : (
        <IconButtonWithTooltip
          label="mail.action.move_to_junk"
          onClick={() => moveThread(thread, "junk")}
        >
          <ArchiveX />
        </IconButtonWithTooltip>
      )}
      {thread.folder === "trash" ? (
        <DeleteForeverButton thread={thread} />
      ) : (
        <IconButtonWithTooltip
          label="mail.action.move_to_trash"
          onClick={() => moveThread(thread, "trash")}
        >
          <Trash2 />
        </IconButtonWithTooltip>
      )}
      <div className="ml-auto flex items-center gap-1">
        <IconButtonWithTooltip
          label="mail.action.reply"
          aria-pressed={activeMode === "reply"}
          className={cn(activeMode === "reply" && "bg-accent")}
          onClick={() => reply("reply")}
        >
          <Reply />
        </IconButtonWithTooltip>
        <IconButtonWithTooltip
          label="mail.action.reply_all"
          aria-pressed={activeMode === "replyAll"}
          className={cn(activeMode === "replyAll" && "bg-accent")}
          disabled={!canReplyAll}
          onClick={() => reply("replyAll")}
        >
          <ReplyAll />
        </IconButtonWithTooltip>
        <ForwardButton thread={thread} />
        <Separator orientation="vertical" className="mx-1" />
        <ThreadMoreMenu />
      </div>
    </div>
  );
};

/**
 * Opens the new message editor with the last message quoted, like mail
 * clients do. The editor is pushed in the history, so that closing it goes
 * back to the thread. The messages come from the cache of the thread display
 * (same query as its ReferenceManyField).
 */
const ForwardButton = ({ thread }: { thread: Thread }) => {
  const translate = useTranslate();
  const [locale] = useLocaleState();
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useGetManyReference<Message>("messages", {
    target: "thread_id",
    id: thread.id,
    pagination: { page: 1, perPage: 100 },
    sort: { field: "timestamp", order: "ASC" },
    filter: {},
  });
  const last = data?.at(-1);

  const forward = () => {
    if (!last) return;
    const header = [
      translate("mail.forward.header"),
      `${translate("mail.forward.from")} ${last.name} <${last.email}>`,
      `${translate("mail.forward.date")} ${new Date(last.timestamp).toLocaleString(locale)}`,
      `${translate("mail.forward.subject")} ${thread.subject}`,
      `${translate("mail.reply.to")} ${formatContacts(last.to)}`,
      ...(last.cc.length > 0
        ? [`${translate("mail.reply.cc")} ${formatContacts(last.cc)}`]
        : []),
    ];
    navigate(
      { pathname: "/threads/create", search: location.search },
      {
        state: composeState(true, {
          subject: /^fwd:/i.test(thread.subject)
            ? thread.subject
            : `Fwd: ${thread.subject}`,
          draft: `\n\n${header.join("\n")}\n\n${last.message}`,
        }),
      },
    );
  };

  return (
    <IconButtonWithTooltip
      label="mail.action.forward"
      disabled={!last}
      onClick={forward}
    >
      <Forward />
    </IconButtonWithTooltip>
  );
};

/**
 * Deletes the thread and its messages after a confirmation. Pessimistic, as
 * the deletion cannot be undone: the lists are updated once it is done.
 */
const DeleteForeverButton = ({ thread }: { thread: Thread }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteOne, { isPending }] = useDelete<Thread>();
  const notify = useNotify();
  const closeThread = useCloseThread();

  const handleConfirm = () =>
    deleteOne(
      "threads",
      { id: thread.id, previousData: thread },
      {
        onSuccess: () => {
          setIsOpen(false);
          closeThread();
          notify("mail.notification.deleted", { type: "info" });
        },
      },
    );

  return (
    <>
      <IconButtonWithTooltip
        label="mail.action.delete_forever"
        onClick={() => setIsOpen(true)}
      >
        <Trash2 />
      </IconButtonWithTooltip>
      <Confirm
        isOpen={isOpen}
        loading={isPending}
        title="mail.confirm.delete_title"
        content="mail.confirm.delete_content"
        confirm="mail.action.delete_forever"
        confirmColor="warning"
        onConfirm={handleConfirm}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
