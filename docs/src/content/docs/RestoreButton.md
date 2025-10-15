---
title: RestoreButton
---

## Creating the RestoreButton component

```tsx
import {
  RaRecord,
  useRecordContext,
  useResourceContext,
  useShowContext,
} from "ra-core";
import { Button } from "./button";
import { useRestoreOne } from "@react-admin/ra-core-ee";

export function RestoreButton(props: RestoreButtonProps) {
  const record = useRecordContext(props);
  const { refetch } = useShowContext();

  const [restore, { isPending }] = useRestoreOne();

  const handleRestore = () => {
    restore(
      { id: record?.id },
      {
        onError: (err) => {
          console.error("Error occurred while soft deleting", err);
        },
        onSuccess: () => {
          refetch();
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

type RestoreButtonProps = {
  resource?: string;
  record?: RaRecord;
};
```
