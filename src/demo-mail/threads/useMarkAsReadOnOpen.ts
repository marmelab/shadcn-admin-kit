import { useEffect } from "react";
import type { Thread } from "../types";
import { useUpdateThread } from "./useThreadActions";

/** Marks the displayed thread as read, like a mail client does on open */
export const useMarkAsReadOnOpen = (thread?: Thread) => {
  const updateThread = useUpdateThread();
  useEffect(() => {
    if (thread && !thread.read) {
      updateThread(thread, { read: true });
    }
    // Only react to the thread changing, not to the updater identity
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thread?.id, thread?.read]);
};
