import {
  useDelete,
  useLocation,
  useNavigate,
  useNotify,
  useTranslate,
  useUpdate,
} from "ra-core";
import type { Folder, Thread } from "../types";

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

/** Moves a thread to another folder, with an undo notification */
export const useMoveThread = () => {
  const [update] = useUpdate<Thread>();
  const notify = useNotify();
  const translate = useTranslate();
  const closeThread = useCloseThread();
  return (thread: Thread, folder: Folder) => {
    closeThread();
    update(
      "threads",
      { id: thread.id, data: { folder }, previousData: thread },
      {
        mutationMode: "undoable",
        onSuccess: () =>
          notify("mail.notification.moved", {
            type: "info",
            undoable: true,
            messageArgs: { folder: translate(`mail.folders.${folder}`) },
          }),
      },
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
