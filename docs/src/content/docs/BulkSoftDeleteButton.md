---
title: BulkSoftDeleteButton
---

## Creating the BulkSoftDeleteButton component

```tsx
import { useListContext, useResourceContext } from "ra-core";
import { Button } from "./button";
import { useSoftDeleteMany } from "@react-admin/ra-core-ee";

export function BulkSoftDeleteButton(props: BulkSoftDeleteButtonProps) {
  const resource = useResourceContext(props);
  const { selectedIds, onUnselectItems } = useListContext();

  const [softDeleteMany, { isPending }] = useSoftDeleteMany();

  const handleSoftDelete = () => {
    softDeleteMany(
      resource,
      { ids: selectedIds },
      {
        onError: (err) => {
          console.error("Error occurred while soft deleting", err);
        },
        onSuccess: () => {
          onUnselectItems();
        },
      },
    );
  };

  return (
    <Button
      type="button"
      variant="destructive"
      onClick={handleSoftDelete}
      disabled={isPending}
    >
      Delete
    </Button>
  );
}

type BulkSoftDeleteButtonProps = {
  resource?: string;
};
```
