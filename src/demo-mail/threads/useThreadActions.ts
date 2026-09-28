import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useTranslate, useUpdate } from "ra-core";
import { toast } from "sonner";
import type { Folder, Thread } from "../types";
import { removeFromStaleLists } from "./threadCache";

export const replyInputId = "reply-message";

export const focusReplyInput = () => {
  document.getElementById(replyInputId)?.focus();
};

/** Closes the displayed thread, keeping the list params */
export const useCloseThread = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return () => navigate({ pathname: "/threads", search: location.search });
};

/**
 * Updates thread flags (read, starred, labels, muted) without waiting.
 * The mode is set on the hook rather than on each call: ra-core resets a
 * call-time mode when effects re-run (React StrictMode), which drops the call.
 */
export const useUpdateThread = () => {
  const [update] = useUpdate<Thread>(undefined, undefined, {
    mutationMode: "optimistic",
  });
  return (thread: Thread, data: Partial<Thread>) =>
    update("threads", { id: thread.id, data, previousData: thread });
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
