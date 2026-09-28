import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdate } from "ra-core";
import type { Thread } from "../types";
import { refreshCounters } from "./threadCache";

/**
 * Marks the displayed thread as read, like a mail client does on open.
 * - Once per opened thread (the ref also absorbs the StrictMode double
 *   effect), so that "Mark as unread" is not undone while the display closes.
 * - Pessimistic, so that the lists are not refetched: the thread stays in the
 *   Unread tab until the user leaves it. Only its counters are refetched.
 */
export const useMarkAsReadOnOpen = (thread?: Thread) => {
  const queryClient = useQueryClient();
  // Hook-level onSuccess: a call-time one is lost when StrictMode remounts
  const [update] = useUpdate<Thread>(undefined, undefined, {
    onSuccess: (_data, { previousData }) => {
      if (previousData) refreshCounters(queryClient, previousData as Thread);
    },
  });
  const markedThreadId = useRef<Thread["id"] | undefined>(undefined);
  useEffect(() => {
    if (!thread || markedThreadId.current === thread.id) return;
    markedThreadId.current = thread.id;
    if (thread.read) return;
    update("threads", {
      id: thread.id,
      data: { read: true },
      previousData: thread,
    });
  }, [thread, update]);
};
