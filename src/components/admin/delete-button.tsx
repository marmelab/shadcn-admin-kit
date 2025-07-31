import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useDelete,
  useNotify,
  useRecordContext,
  useRedirect,
  useResourceContext,
  useTranslate,
  Translate,
} from "ra-core";
import { MouseEvent } from "react";

export const DeleteButton = ({
  size,
}: {
  size?: "default" | "sm" | "lg" | "icon";
}) => {
  const resource = useResourceContext();
  const [deleteOne, { isPending }] = useDelete();
  const record = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();
  const translate = useTranslate();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    stopPropagation(e);
    if (!record) return;
    deleteOne(
      resource,
      { id: record.id },
      {
        mutationMode: "undoable",
        onSuccess: () => {
          notify(`resources.${resource}.notifications.deleted`, {
            type: "info",
            messageArgs: {
              smart_count: 1,
              _: translate("ra.notification.deleted", {
                smart_count: 1,
                _: "Element deleted",
              }),
            },
            undoable: true,
          });
          redirect("list", resource);
        },
      }
    );
  };
  return (
    <Button
      variant="destructive"
      type="button"
      onClick={handleClick}
      disabled={isPending}
      size={size}
    >
      <Trash />
      <Translate i18nKey="ra.action.delete">Delete</Translate>
    </Button>
  );
};

// useful to prevent click bubbling in a datagrid with rowClick
const stopPropagation = (e: MouseEvent<HTMLButtonElement>) =>
  e.stopPropagation();
