import { useEffect } from "react";
import type { Thread } from "../types";
import { useUpdateThread } from "./useThreadActions";

/**
 * Marks the displayed thread as read, like a mail client does on open.
 * Only when a thread opens, not when its read flag changes, so that
 * "Mark as unread" is not undone while the display closes.
 */
export const useMarkAsReadOnOpen = (thread?: Thread) => {
  const updateThread = useUpdateThread();
  useEffect(() => {
    if (thread && !thread.read) {
      updateThread(thread, { read: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thread?.id]);
};
