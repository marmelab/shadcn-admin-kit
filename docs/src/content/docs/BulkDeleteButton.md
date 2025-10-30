---
title: "BulkDeleteButton"
---

Lets the user delete selected records in a list using `dataProvider.deleteMany()`. To be used in a `ListContext` (e.g., inside a `<DataTable>`).

## Usage

`<BulkDeleteButton>` is one fo the default bulk action buttons of `<DataTable>`, so you will need to use it only when you want to customize these bulk actions:

```tsx
import { DataTable, BulkDeleteButton } from '@/components/admin';

const BulkActions = () => (
  <>
    <BulkDeleteButton />
    {/* other bulk action buttons */}
  </>
);

<DataTable bulkActionsButtons={<BulkActions />}>
  {/* table content */}
</DataTable>
```

On success, the button empties the selection, and notifies the user with the key `resources.<resource>.notifications.deleted` (fallback `ra.notification.deleted`).

On error, it notifies with an error message or `ra.notification.http_error`, then refreshes list.

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `className` | Optional | `string` | - | Extra CSS classes |
| `icon` | Optional | `ReactNode` | Trash icon | Custom icon element |
| `label` | Optional | `string` | `ra.action.delete` | i18n key override |
| `mutationMode` | Optional | `MutationMode` | `undoable` | Mutation strategy (undoable/pessimistic/optimistic) |
| `mutationOptions` | Optional | `UseDeleteManyOptions & { meta?: any }` | `{}` | Extra react-query mutation options & meta |
| `resource` | Optional | `string` | inferred | Resource name (rarely needed) |

Additional props are passed to the underlying shadcn/ui `<Button>` component.

## Soft Delete

If your data provider supports soft delete (see [Soft Delete Features](./SoftDeleteFeatures.md)), you can use an alternative `BulkSoftDeleteButton` that performs a soft delete instead of a permanent delete:

```tsx
import { type RaRecord, useResourceContext, useListContext } from "ra-core";
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
        onError: (err) => {
          console.error("An error occurred while soft deleting", err);
        },
        onSuccess: () => {
          onUnselectItems();
        },
      }
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