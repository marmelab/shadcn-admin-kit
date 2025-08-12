import React from "react";
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
  UseDeleteOptions,
} from "ra-core";

export type DeleteButtonProps = {
  size?: "default" | "sm" | "lg" | "icon";
  mutationOptions?: UseDeleteOptions;

  redirect?: boolean;
  resource?: string;
};

export const DeleteButton = ({
  size,
  mutationOptions,
  redirect: doRedirect = true,
  resource: resourceOverride,
}: DeleteButtonProps) => {
  const resource = useResourceContext();
  const [deleteOne, { isPending }] = useDelete(
    resource,
    undefined,
    mutationOptions,
  );
  const record = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();
  const translate = useTranslate();
  const handleClick = (e: React.MouseEvent) => {
    stopPropagation(e);
    if (!record) return;
    deleteOne(
      resourceOverride ?? resource,
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

          if (!doRedirect) return;
          redirect("list", resource);
        },
      },
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
const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();
