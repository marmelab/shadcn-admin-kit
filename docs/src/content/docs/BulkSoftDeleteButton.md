---
title: BulkSoftDeleteButton
---

Soft-deletes the selected rows. To be used inside [the `<DataTable bulkActionsToolbar>` prop](./DataTable.md#bulkActionsToolbar).

This feature requires a valid [Enterprise Edition](https://marmelab.com/ra-enterprise/) subscription.

## Creating the BulkSoftDeleteButton component

As the `<BulkSoftDeleteButton />` requires an [Enterprise Edition](https://marmelab.com/ra-enterprise/) subscription, it is not included in the Shadcn Admin Kit distribution.

An example of a basic `<BulkSoftDeleteButton />` can be found below:

```tsx
// src/components/admin/bulk-soft-delete-button.tsx

import { useListContext, useResourceContext } from "ra-core";
import { Button } from "@/components/ui/button";
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

## Usage

`<BulkSoftDeleteButton>` reads the current resource from `ResourceContext`, so in general it doesn't need any property. You can use it anywhere you would use a regular [`<BulkDeleteButton>`](./BulkDeleteButton.md), for example in a `<List>` view:

```tsx
import { DataTable } from "@/components/admin/data-table";
import { List } from "@/components/admin/list";
import { BulkRestoreButton } from "@/components/admin/bulk-restore-button";

const CommentShow = () => (
  <List>
    <DataTable
      bulkActionButtons={
        <>
          <BulkSoftDeleteButton />
        </>
      }
    >
      {/* ... */}
    </DataTable>
  </List>
);
```

When pressed, it will call `dataProvider.softDeleteMany()` with the selected records' `ids`.

You can also specify a resource:

```tsx
<BulkSoftDeleteButton resource="comments" />
```

## Props

| Prop       | Required | Type     | Default | Description                           |
| ---------- | -------- | -------- | ------- | ------------------------------------- |
| `resource` | Optional | `string` | -       | Resource to soft delete, e.g. `posts` |

## `resource`

By default, `<BulkSoftDeleteButton>` reads the current resource from the `ResourceContext`. If you want to delete a record from a different resource, you can pass it as a prop:

```tsx
<BulkSoftDeleteButton resource="comments" />
```
