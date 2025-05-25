import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useDelete,
  useNotify,
  useRecordContext,
  useRedirect,
  useResourceContext,
  Translate,
} from "ra-core";

export const DeleteButton = () => {
  const resource = useResourceContext();
  const [deleteOne, { isPending }] = useDelete();
  const record = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();
  const handleClick = (e: React.MouseEvent) => {
    stopPropagation(e);
    if (!record) return;
    deleteOne(
      resource,
      { id: record.id },
      {
        mutationMode: "undoable",
        onSuccess: () => {
          notify("Element deleted", { undoable: true });
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
    >
      <Trash />
      <Translate i18nKey="ra.action.delete">Delete</Translate>
    </Button>
  );
};

// useful to prevent click bubbling in a datagrid with rowClick
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stopPropagation = (e: any) => e.stopPropagation();
