import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Archive, ArchiveX, Inbox, Mail, MailOpen, Trash2 } from "lucide-react";
import {
  useDeleteMany,
  useListContext,
  useNotify,
  useTranslate,
} from "ra-core";
import { Confirm } from "@/components/admin/confirm";
import { IconButtonWithTooltip } from "@/components/admin/icon-button-with-tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import type { Folder, Thread } from "../types";
import { refreshCounters } from "./threadCache";
import {
  useCloseThread,
  useMoveThreads,
  useUpdateThreads,
} from "./useThreadActions";

/**
 * Select all checkbox and actions on the checked threads, sticky above the
 * list. The actions follow the thread toolbar: each move becomes "back to
 * inbox" when every checked thread is already in the target folder.
 */
export const ThreadBulkActions = ({ selectedId }: { selectedId?: number }) => {
  const { data, selectedIds, onSelect, onUnselectItems, filterValues } =
    useListContext<Thread>();
  const translate = useTranslate();
  const closeThread = useCloseThread();
  const moveThreads = useMoveThreads();
  const [updateThreads, { isPending }] = useUpdateThreads();

  // A new folder or search starts with no selection
  const filters = JSON.stringify(filterValues);
  useEffect(() => {
    onUnselectItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  if (!data || data.length === 0) return null;
  const checked = data.filter((thread) => selectedIds.includes(thread.id));
  const allChecked = checked.length === data.length;
  // Drafts stay in their folder: a selection mixing drafts and other threads
  // (label, starred or search views) moves the other threads only
  const movable = checked.filter((thread) => thread.folder !== "drafts");
  const every = (folders: Folder[]) =>
    movable.every((thread) => folders.includes(thread.folder));

  /** Runs an action that removes the checked threads from the list */
  const leave = (action: () => void, threads = checked) => {
    if (selectedId != null && threads.some(({ id }) => id === selectedId)) {
      closeThread();
    }
    action();
    onUnselectItems();
  };
  const move = (folder: Folder) =>
    leave(() => moveThreads(movable, folder), movable);
  const markAs = (read: boolean) => {
    updateThreads(checked, { read });
    onUnselectItems();
  };

  return (
    <div className="sticky top-0 z-10 -mx-1 mb-2 flex h-11 items-center gap-1 bg-background px-1">
      <Checkbox
        // The kit checkbox has no indeterminate icon: a dash replaces the check
        className="mx-2 data-indeterminate:border-primary data-indeterminate:bg-primary data-indeterminate:text-primary-foreground data-indeterminate:[&_svg]:hidden data-indeterminate:before:h-0.5 data-indeterminate:before:w-2 data-indeterminate:before:rounded-full data-indeterminate:before:bg-current data-indeterminate:before:content-['']"
        checked={allChecked}
        indeterminate={checked.length > 0 && !allChecked}
        onCheckedChange={() =>
          allChecked
            ? onUnselectItems()
            : onSelect(data.map((thread) => thread.id))
        }
        aria-label={translate("mail.list.select_all")}
      />
      {checked.length === 0 ? null : (
        <>
          <span className="mr-auto text-sm text-muted-foreground">
            {translate("mail.list.selected", { smart_count: checked.length })}
          </span>
          {movable.length === 0 ? (
            <DeleteButton
              threads={checked}
              label="mail.action.discard_many"
              onDone={() => leave(() => undefined)}
            />
          ) : (
            <>
              {every(["archive", "trash"]) ? (
                <IconButtonWithTooltip
                  label="mail.action.move_to_inbox"
                  onClick={() => move("inbox")}
                >
                  <Inbox />
                </IconButtonWithTooltip>
              ) : (
                <IconButtonWithTooltip
                  label="mail.action.archive"
                  onClick={() => move("archive")}
                >
                  <Archive />
                </IconButtonWithTooltip>
              )}
              {every(["junk"]) ? (
                <IconButtonWithTooltip
                  label="mail.action.not_junk"
                  onClick={() => move("inbox")}
                >
                  <Inbox />
                </IconButtonWithTooltip>
              ) : (
                <IconButtonWithTooltip
                  label="mail.action.move_to_junk"
                  onClick={() => move("junk")}
                >
                  <ArchiveX />
                </IconButtonWithTooltip>
              )}
              {every(["trash"]) ? (
                <DeleteButton
                  threads={checked}
                  label="mail.action.delete_forever"
                  onDone={() => leave(() => undefined)}
                />
              ) : (
                <IconButtonWithTooltip
                  label="mail.action.move_to_trash"
                  onClick={() => move("trash")}
                >
                  <Trash2 />
                </IconButtonWithTooltip>
              )}
              {checked.some((thread) => !thread.read) ? (
                <IconButtonWithTooltip
                  label="mail.action.mark_as_read"
                  disabled={isPending}
                  onClick={() => markAs(true)}
                >
                  <MailOpen />
                </IconButtonWithTooltip>
              ) : (
                <IconButtonWithTooltip
                  label="mail.action.mark_as_unread"
                  disabled={isPending}
                  onClick={() => markAs(false)}
                >
                  <Mail />
                </IconButtonWithTooltip>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

/**
 * Deletes the threads and their messages permanently (a discarded draft has
 * no undo either), after a confirmation.
 */
const DeleteButton = ({
  threads,
  label,
  onDone,
}: {
  threads: Thread[];
  label: string;
  onDone: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteMany, { isPending }] = useDeleteMany<Thread>();
  const queryClient = useQueryClient();
  const notify = useNotify();
  const isDraft = threads[0]?.folder === "drafts";

  const handleConfirm = () =>
    deleteMany(
      "threads",
      { ids: threads.map((thread) => thread.id) },
      {
        mutationMode: "pessimistic",
        onSuccess: () => {
          setIsOpen(false);
          threads.forEach((thread) => refreshCounters(queryClient, thread));
          onDone();
          notify(
            isDraft
              ? "mail.notification.discarded_many"
              : "mail.notification.deleted_many",
            { type: "info", messageArgs: { smart_count: threads.length } },
          );
        },
      },
    );

  return (
    <>
      <IconButtonWithTooltip label={label} onClick={() => setIsOpen(true)}>
        <Trash2 />
      </IconButtonWithTooltip>
      <Confirm
        isOpen={isOpen}
        loading={isPending}
        title={
          isDraft
            ? "mail.confirm.discard_many_title"
            : "mail.confirm.delete_many_title"
        }
        content={
          isDraft
            ? "mail.confirm.discard_many_content"
            : "mail.confirm.delete_many_content"
        }
        translateOptions={{ smart_count: threads.length }}
        confirm={label}
        confirmColor="warning"
        onConfirm={handleConfirm}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};
