import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResourceContext, useDeleteMany, useListContext } from "ra-core";

export const BulkDeleteButton = () => {
  const resource = useResourceContext();
  const [deleteMany, { isPending }] = useDeleteMany();
  const { selectedIds, onUnselectItems } = useListContext();
  const handleClick = (e: React.MouseEvent) => {
    stopPropagation(e);
    deleteMany(
      resource,
      { ids: selectedIds },
      {
        onSuccess: () => {
          onUnselectItems();
        },
      }
    );
  };
  return (
    <Button variant="destructive" onClick={handleClick} disabled={isPending}>
      <Trash />
      Delete
    </Button>
  );
};

// useful to prevent click bubbling in a datagrid with rowClick
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stopPropagation = (e: any) => e.stopPropagation();
