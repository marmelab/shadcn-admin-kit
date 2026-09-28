import { useCloseNotification, useTranslate } from "ra-core";
import { Button } from "@/components/ui/button";
import type { Folder } from "../types";

/** Content of the toast shown after a move, with a button to move it back */
export const MovedNotification = ({
  folder,
  onUndo,
}: {
  folder: Folder;
  onUndo: () => void;
}) => {
  const translate = useTranslate();
  const closeNotification = useCloseNotification();
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <span>
        {translate("mail.notification.moved", {
          folder: translate(`mail.folders.${folder}`),
        })}
      </span>
      <Button
        size="sm"
        onClick={() => {
          onUndo();
          closeNotification();
        }}
      >
        {translate("ra.action.undo")}
      </Button>
    </div>
  );
};
