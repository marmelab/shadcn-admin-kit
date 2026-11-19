import type { Thread } from "../types";

/** Whether the thread has other recipients than the correspondent */
export const canReplyAll = (thread: Thread) =>
  thread.to.length > 0 || thread.cc.length > 0;
