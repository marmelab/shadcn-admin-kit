import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useLocation,
  useNavigate,
  useNotify,
  useTranslate,
  useUpdate,
  useUpdateMany,
} from "ra-core";
import { toast } from "sonner";
import type { Folder, Thread } from "../types";
import {
  refreshCounters,
  removeFromStaleLists,
  seedRecordCache,
} from "./threadCache";

export const replyInputId = "reply-message";

export const focusReplyInput = () => {
  document.getElementById(replyInputId)?.focus();
};

/** Marks the navigation from the list to a thread (see useCloseThread) */
export const fromListState = { _fromList: true };

/** Whether the current history entry was opened from the list */
export const isFromList = (state: unknown) =>
  !!(state as typeof fromListState | null)?._fromList;

/** Prefilled fields of a new message, when forwarding */
export interface ComposeValues {
  subject?: string;
  draft?: string;
}

/**
 * History state opening the new message editor. Its id gives a new editor to
 * each New message or Forward click, even from the editor.
 */
export const composeState = (
  fromList: boolean,
  values: ComposeValues = {},
) => ({
  ...(fromList ? fromListState : {}),
  _compose: { id: Date.now(), values },
});

export const getComposeState = (state: unknown) =>
  (state as ReturnType<typeof composeState> | null)?._compose;

/**
 * Closes the displayed thread, keeping the list params. The thread leaves the
 * history, so that the browser Back button does not reopen it.
 */
export const useCloseThread = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return () => {
    if (isFromList(location.state)) {
      navigate(-1);
    } else {
      navigate(
        { pathname: "/threads", search: location.search },
        { replace: true },
      );
    }
  };
};

/**
 * Updates thread flags (read, starred, labels, category, muted).
 * Pessimistic, so that the lists are not refetched: the thread stays in the
 * Unread tab while it is displayed. Only the counters are refetched, and a
 * thread whose category or labels changed leaves the lists it no longer
 * belongs to.
 * The thread is updated once the server replies: isPending tells when a new
 * update would be built from the old values.
 * The callback is set on the hook: a call-time one is lost when StrictMode
 * remounts.
 */
export const useUpdateThread = () => {
  const queryClient = useQueryClient();
  const notify = useNotify();
  const translate = useTranslate();
  const [update, { isPending }] = useUpdate<Thread>(undefined, undefined, {
    onSuccess: (result, { data, previousData }) => {
      if (previousData) refreshCounters(queryClient, previousData as Thread);
      refreshCounters(queryClient, result);
      if (data?.category || data?.labels || data?.starred != null) {
        removeFromStaleLists(queryClient, result);
      }
      if (data?.category) {
        notify("mail.notification.moved", {
          messageArgs: {
            folder: translate(`mail.categories.${data.category}`),
          },
        });
      }
    },
  });
  const updateThread = useCallback(
    (thread: Thread, data: Partial<Thread>) =>
      update("threads", { id: thread.id, data, previousData: thread }),
    [update],
  );
  return [updateThread, { isPending }] as const;
};

/**
 * Updates the flags of several threads (read, starred), like useUpdateThread.
 * The threads leave the lists they no longer belong to (the Unread tab).
 */
export const useUpdateThreads = () => {
  const queryClient = useQueryClient();
  const [updateMany, { isPending }] = useUpdateMany<Thread>();
  const updateThreads = useCallback(
    (threads: Thread[], data: Partial<Thread>) => {
      seedRecordCache(queryClient, threads);
      return updateMany(
        "threads",
        { ids: threads.map((thread) => thread.id), data },
        {
          mutationMode: "pessimistic",
          onSuccess: () =>
            threads.forEach((thread) => {
              refreshCounters(queryClient, thread);
              refreshCounters(queryClient, { ...thread, ...data });
              removeFromStaleLists(queryClient, { ...thread, ...data });
            }),
        },
      );
    },
    [updateMany, queryClient],
  );
  return [updateThreads, { isPending }] as const;
};

/**
 * Moves threads to another folder, with an Undo button in the notification.
 * The move is optimistic rather than undoable: it reaches the data provider
 * right away, so a refetch during the undo delay (opening the next thread,
 * searching) cannot bring the threads back. Undo moves each thread back to
 * its own folder (a label view shows threads of several folders).
 */
export const useMoveThreads = () => {
  const [updateMany] = useUpdateMany<Thread>(undefined, undefined, {
    mutationMode: "optimistic",
  });
  const queryClient = useQueryClient();
  const translate = useTranslate();
  return (threads: Thread[], folder: Folder) => {
    const moveTo = (moved: Thread[], target: Folder) => {
      seedRecordCache(queryClient, moved);
      updateMany("threads", {
        ids: moved.map((thread) => thread.id),
        data: { folder: target },
      });
      moved.forEach((thread) =>
        removeFromStaleLists(queryClient, { ...thread, folder: target }),
      );
    };
    const undo = () => {
      const moved = threads.map((thread) => ({ ...thread, folder }));
      new Set(threads.map((thread) => thread.folder)).forEach((original) =>
        moveTo(
          moved.filter((_, index) => threads[index].folder === original),
          original,
        ),
      );
    };
    moveTo(threads, folder);
    // Sonner (the kit notification library) dismisses only this toast on
    // Undo, whereas useCloseNotification() would dismiss every toast
    toast.info(
      translate(
        threads.length > 1
          ? "mail.notification.moved_many"
          : "mail.notification.moved",
        {
          folder: translate(`mail.folders.${folder}`),
          smart_count: threads.length,
        },
      ),
      { action: { label: translate("ra.action.undo"), onClick: undo } },
    );
  };
};

/** Moves the displayed thread to another folder, and closes it */
export const useMoveThread = () => {
  const moveThreads = useMoveThreads();
  const closeThread = useCloseThread();
  return (thread: Thread, folder: Folder) => {
    closeThread();
    moveThreads([thread], folder);
  };
};
