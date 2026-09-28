import { createElement } from "react";
import {
  useDelete,
  useLocation,
  useNavigate,
  useNotify,
  useUpdate,
} from "ra-core";
import type { Folder, Thread } from "../types";
import { MovedNotification } from "./MovedNotification";

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

/** Updates thread flags (read, starred, labels, muted) without waiting */
export const useUpdateThread = () => {
  const [update] = useUpdate<Thread>();
  return (thread: Thread, data: Partial<Thread>) =>
    update(
      "threads",
      { id: thread.id, data, previousData: thread },
      { mutationMode: "optimistic" },
    );
};

/**
 * Moves a thread to another folder, with an undo notification.
 * The move is optimistic rather than undoable: it reaches the data provider
 * right away, so a refetch during the undo delay (opening the next thread,
 * searching) cannot bring the thread back. Undo moves it back.
 */
export const useMoveThread = () => {
  const [update] = useUpdate<Thread>();
  const notify = useNotify();
  const closeThread = useCloseThread();
  return (thread: Thread, folder: Folder) => {
    const moveTo = (target: Folder, previousData: Thread) =>
      update(
        "threads",
        { id: thread.id, data: { folder: target }, previousData },
        { mutationMode: "optimistic" },
      );
    closeThread();
    moveTo(folder, thread);
    notify(
      createElement(MovedNotification, {
        folder,
        onUndo: () => moveTo(thread.folder, { ...thread, folder }),
      }),
      { type: "info" },
    );
  };
};

/** Deletes a thread and its messages, with an undo notification */
export const useDeleteThread = () => {
  const [deleteOne] = useDelete<Thread>();
  const notify = useNotify();
  const closeThread = useCloseThread();
  return (thread: Thread) => {
    closeThread();
    deleteOne(
      "threads",
      { id: thread.id, previousData: thread },
      {
        mutationMode: "undoable",
        onSuccess: () =>
          notify("mail.notification.deleted", { type: "info", undoable: true }),
      },
    );
  };
};
