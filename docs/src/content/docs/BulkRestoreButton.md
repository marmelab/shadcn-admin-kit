---
title: BulkRestoreButton
---

Restore the selected rows. To be used inside [the `<DataTable bulkActionsToolbar>` prop](./DataTable.md#bulkActionsToolbar).

This feature requires a valid [Enterprise Edition](https://marmelab.com/ra-enterprise/) subscription.

## Creating the BulkRestoreButton component

As the `<BulkRestoreButton />` requires an [Enterprise Edition](https://marmelab.com/ra-enterprise/) subscription, it is not included in the Shadcn Admin Kit distribution.

An example of a basic `<BulkRestoreButton />` can be found below:

```tsx
// src/components/admin/bulk-restore-button.tsx

import { useListContext } from "ra-core";
import { Button } from "@/components/ui/button";
import { useRestoreMany } from "@react-admin/ra-core-ee";

export function BulkRestoreButton(props: BulkRestoreButtonProps) {
  const { selectedIds, onUnselectItems } = useListContext();

  const [restoreMany, { isPending }] = useRestoreMany();

  const handleRestore = () => {
    restoreMany(
      {
        ids: selectedIds,
      },
      {
        onSuccess: async () => {
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

## Usage

`<BulkRestoreButton>` reads the current resource from `ResourceContext`, so in general it doesn't need any property. You can use it anywhere you would use a regular [`<BulkExportButton>`](./BulkExportButton.md), for example in a [`<DeletedRecordsList>`](./DeletedRecordsList.md) view:

```tsx
import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/deleted-records-list";
import { BulkRestoreButton } from "@/components/admin/bulk-restore-button";

const CommentShow = () => (
  <DeletedRecordsList>
    <DataTable
      bulkActionButtons={
        <>
          <BulkRestoreButton />
        </>
      }
    >
      {/* ... */}
    </DataTable>
  </DeletedRecordsList>
);
```

When pressed, it will call `dataProvider.restoreMany()` with the selected records' `ids`.
