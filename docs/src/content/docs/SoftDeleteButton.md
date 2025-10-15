---
title: SoftDeleteButton
---

## Creating the SoftDeleteButton component

```tsx
import {
  RaRecord,
  useRecordContext,
  useRedirect,
  useResourceContext,
} from "ra-core";
import { Button } from "./button";
import { useSoftDelete } from "@react-admin/ra-core-ee";

export function SoftDeleteButton(props: SoftDeleteButtonProps) {
  const resource = useResourceContext(props);
  const record = useRecordContext(props);

  const [softDelete, { isPending }] = useSoftDelete();
  const redirect = useRedirect();

  const handleSoftDelete = () => {
    softDelete(
      resource,
      { id: record?.id },
      {
        onError: (err) => {
          console.error("Error occurred while soft deleting", err);
        },
        onSuccess: () => {
          redirect("list", resource);
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

type SoftDeleteButtonProps = {
  resource?: string;
  record?: RaRecord;
};
```
