import { ArrowLeft } from "lucide-react";
import { useRecordContext } from "ra-core";
import { IconButtonWithTooltip } from "@/components/admin/icon-button-with-tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Thread } from "../types";
import { useCloseThread } from "./useThreadActions";

export const ThreadToolbar = () => {
  const thread = useRecordContext<Thread>();
  const isMobile = useIsMobile();
  const closeThread = useCloseThread();
  if (!thread) return null;

  return (
    <div className="flex items-center gap-1 p-2">
      {isMobile ? (
        <IconButtonWithTooltip label="mail.action.back" onClick={closeThread}>
          <ArrowLeft />
        </IconButtonWithTooltip>
      ) : null}
    </div>
  );
};
