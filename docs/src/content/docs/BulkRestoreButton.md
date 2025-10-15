---
title: BulkRestoreButton
---

## Creating the BulkRestoreButton component

```tsx
import { useListContext, useRecordContext, useResourceContext } from "ra-core";
import { Button } from "./button";
import { useRestoreMany } from "@react-admin/ra-core-ee";
import { useQueryClient } from "@tanstack/react-query";

export function BulkRestoreButton(props: BulkRestoreButtonProps) {
  const resource = useResourceContext(props);
  const queryClient = useQueryClient();
  const { refetch, selectedIds, onUnselectItems } = useListContext();

  const [restoreMany, { isPending }] = useRestoreMany();

  const handleRestore = () => {
    restoreMany(
      {
        ids: selectedIds,
      },
      {
        onError: (err) => {
          console.error("Error occurred while restoring", err);
        },
        onSuccess: async () => {
          await Promise.all([
            queryClient.invalidateQueries({
              queryKey: [resource],
            }),
            refetch(),
          ]);
          onUnselectItems();
        },
      },
    );
  };

  return (
    <Button type="button" onClick={handleRestore} disabled={isPending}>
      Restore
    </Button>
  );
}

type BulkRestoreButtonProps = {
  resource?: string;
};
```
