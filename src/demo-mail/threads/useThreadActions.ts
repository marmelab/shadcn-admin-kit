import { useLocation, useNavigate, useUpdate } from "ra-core";
import type { Thread } from "../types";

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
