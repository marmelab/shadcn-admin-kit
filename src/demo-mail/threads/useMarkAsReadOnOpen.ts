import { useEffect, useRef } from "react";
import type { Thread } from "../types";
import { useUpdateThread } from "./useThreadActions";

/**
 * Marks the displayed thread as read, like a mail client does on open.
 * Once per opened thread (the ref also absorbs the StrictMode double effect),
 * so that "Mark as unread" is not undone while the display closes.
 */
export const useMarkAsReadOnOpen = (thread?: Thread) => {
  const updateThread = useUpdateThread();
  const markedThreadId = useRef<Thread["id"] | undefined>(undefined);
  useEffect(() => {
    if (!thread || markedThreadId.current === thread.id) return;
    markedThreadId.current = thread.id;
    if (!thread.read) updateThread(thread, { read: true });
  }, [thread, updateThread]);
};
