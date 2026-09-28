import {
  Archive,
  ArchiveX,
  ArrowLeft,
  Inbox,
  Reply,
  ReplyAll,
  Trash2,
} from "lucide-react";
import { useRecordContext } from "ra-core";
import { IconButtonWithTooltip } from "@/components/admin/icon-button-with-tooltip";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Thread } from "../types";
import { ThreadMoreMenu } from "./ThreadMoreMenu";
import {
  focusReplyInput,
  useCloseThread,
  useDeleteThread,
  useMoveThread,
} from "./useThreadActions";

/**
 * Each move button becomes "back to inbox" when the thread is already in the
 * target folder, and the trash button deletes permanently from the trash.
 */
export const ThreadToolbar = () => {
  const thread = useRecordContext<Thread>();
  const isMobile = useIsMobile();
  const closeThread = useCloseThread();
  const moveThread = useMoveThread();
  const deleteThread = useDeleteThread();
  if (!thread) return null;

  return (
    <div className="flex items-center gap-1 p-2">
      {isMobile ? (
        <IconButtonWithTooltip label="mail.action.back" onClick={closeThread}>
          <ArrowLeft />
        </IconButtonWithTooltip>
      ) : null}
      {thread.folder === "archive" ? (
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
        <IconButtonWithTooltip
          label="mail.action.delete_forever"
          onClick={() => deleteThread(thread)}
        >
          <Trash2 />
        </IconButtonWithTooltip>
      ) : (
        <IconButtonWithTooltip
          label="mail.action.move_to_trash"
          onClick={() => moveThread(thread, "trash")}
        >
          <Trash2 />
        </IconButtonWithTooltip>
      )}
      <div className="ml-auto flex items-center gap-1">
        {thread.folder !== "drafts" ? (
          <>
            <IconButtonWithTooltip
              label="mail.action.reply"
              onClick={focusReplyInput}
            >
              <Reply />
            </IconButtonWithTooltip>
            <IconButtonWithTooltip
              label="mail.action.reply_all"
              onClick={focusReplyInput}
            >
              <ReplyAll />
            </IconButtonWithTooltip>
            <Separator orientation="vertical" className="mx-1" />
          </>
        ) : null}
        <ThreadMoreMenu />
      </div>
    </div>
  );
};
