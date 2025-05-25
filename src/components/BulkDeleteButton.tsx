import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useResourceContext,
  useDeleteMany,
  useListContext,
  useNotify,
  Translate,
} from "ra-core";

export const BulkDeleteButton = () => {
  const resource = useResourceContext();
  const [deleteMany, { isPending }] = useDeleteMany();
  const { selectedIds, onUnselectItems } = useListContext();
  const notify = useNotify();
  const handleClick = (e: React.MouseEvent) => {
    stopPropagation(e);
    deleteMany(
      resource,
      { ids: selectedIds },
      {
        mutationMode: "undoable",
        onSuccess: () => {
          onUnselectItems();
          notify(`${selectedIds.length} elements deleted`, { undoable: true });
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
