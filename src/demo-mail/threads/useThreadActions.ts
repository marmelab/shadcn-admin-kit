import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useTranslate, useUpdate } from "ra-core";
import { toast } from "sonner";
import type { Folder, Thread } from "../types";
import { refreshCounters, removeFromStaleLists } from "./threadCache";

export const replyInputId = "reply-message";

export const focusReplyInput = () => {
  document.getElementById(replyInputId)?.focus();
};

/** Marks the navigation from the list to a thread (see useCloseThread) */
export const fromListState = { _fromList: true };

/**
 * Closes the displayed thread, keeping the list params. The thread leaves the
 * history, so that the browser Back button does not reopen it.
 */
export const useCloseThread = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return () => {
    if ((location.state as typeof fromListState | null)?._fromList) {
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
 * Updates thread flags (read, starred, labels, muted).
 * Pessimistic, so that the lists are not refetched: the thread stays in the
 * Unread tab while it is displayed. Only the counters are refetched.
 * The callback is set on the hook: a call-time one is lost when StrictMode
 * remounts.
 */
export const useUpdateThread = () => {
  const queryClient = useQueryClient();
  const [update] = useUpdate<Thread>(undefined, undefined, {
    onSuccess: (result, { previousData }) => {
      if (previousData) refreshCounters(queryClient, previousData as Thread);
      refreshCounters(queryClient, result);
    },
  });
  return useCallback(
    (thread: Thread, data: Partial<Thread>) =>
      update("threads", { id: thread.id, data, previousData: thread }),
    [update],
  );
};

/**
 * Moves a thread to another folder, with an Undo button in the notification.
 * The move is optimistic rather than undoable: it reaches the data provider
 * right away, so a refetch during the undo delay (opening the next thread,
 * searching) cannot bring the thread back. Undo moves it back.
 */
export const useMoveThread = () => {
  const [update] = useUpdate<Thread>(undefined, undefined, {
    mutationMode: "optimistic",
  });
  const queryClient = useQueryClient();
  const translate = useTranslate();
  const closeThread = useCloseThread();
  return (thread: Thread, folder: Folder) => {
    const moveTo = (target: Folder, previousData: Thread) => {
      update("threads", {
        id: thread.id,
        data: { folder: target },
        previousData,
      });
      removeFromStaleLists(queryClient, { ...previousData, folder: target });
    };
    closeThread();
    moveTo(folder, thread);
    // Sonner (the kit notification library) dismisses only this toast on
    // Undo, whereas useCloseNotification() would dismiss every toast
    toast.info(
      translate("mail.notification.moved", {
        folder: translate(`mail.folders.${folder}`),
      }),
      {
        action: {
          label: translate("ra.action.undo"),
          onClick: () => moveTo(thread.folder, { ...thread, folder }),
        },
      },
    );
  };
};
