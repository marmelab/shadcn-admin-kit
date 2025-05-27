import { useListContext, Translate } from "ra-core";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BulkDeleteButton } from "@/components//bulk-delete-button";
import { X } from "lucide-react";

export const BulkActionsToolbar = () => {
  const { selectedIds, onUnselectItems } = useListContext();
  if (!selectedIds?.length) {
    return null;
  }
  const handleUnselectAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUnselectItems();
  };
  return (
    <Card className="flex flex-row items-center p-2 px-4 w-fit mx-auto sticky bottom-10 z-10 bg-zinc-100 dark:bg-zinc-900">
      <Button
        variant="ghost"
        className="has-[>svg]:px-0"
        onClick={handleUnselectAll}
      >
        <X />
      </Button>

      <span className="text-sm text-muted-foreground">
        <Translate
          i18nKey="ra.action.bulk_actions"
          options={{ smart_count: selectedIds.length }}
        >
          {selectedIds.length} rows selected
        </Translate>
      </span>
      <BulkDeleteButton />
    </Card>
  );
};
