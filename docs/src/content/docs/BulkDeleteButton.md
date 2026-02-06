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
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useBulkSoftDeleteWithUndoController } from "@react-admin/ra-core-ee";
import { useResourceContext, useTranslate } from "ra-core";

export function BulkSoftDeleteButton(props: BulkSoftDeleteButtonProps) {
  const { label: labelProp } = props;

  const resource = useResourceContext(props);

  const { ids, isPending, handleSoftDeleteMany } =
    useBulkSoftDeleteWithUndoController({
      resource,
    });

  const translate = useTranslate();
  const label =
    labelProp == undefined || typeof labelProp === "string"
      ? translate(labelProp ?? "ra-soft-delete.action.soft_delete", {
          smart_count: ids.length,
        })
      : labelProp;

  return (
    <Button
      type="button"
      variant="destructive"
      onClick={handleSoftDeleteMany}
      disabled={isPending}
    >
      {label}
    </Button>
  );
}

type BulkSoftDeleteButtonProps = {
  resource?: string;
  label?: ReactNode;
};
```

## Restore Button

For restoring soft deleted records, you can create a `BulkRestoreButton` component similar to `BulkSoftDeleteButton`, but using `useBulkRestoreWithUndoController` hook from `ra-core-ee`:

```tsx
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useBulkRestoreWithUndoController } from "@react-admin/ra-core-ee";
import { useTranslate } from "ra-core";

export function BulkRestoreButton(props: BulkRestoreButtonProps) {
  const { label: labelProp } = props;

  const { ids, isPending, handleBulkRestore } =
    useBulkRestoreWithUndoController({});

  const translate = useTranslate();
  const label =
    labelProp == undefined || typeof labelProp === "string"
      ? translate(labelProp ?? "ra-soft-delete.action.restore", {
          smart_count: ids.length,
        })
      : labelProp;

  return (
    <Button
      type="button"
      onClick={handleBulkRestore}
      disabled={isPending}
      size="sm"
    >
      {label}
    </Button>
  );
}

export interface BulkRestoreButtonProps {
  label?: ReactNode;
}
```

## Delete Permanently Button

For deleting archived records permanently, you can create a `BulkDeletePermanentlyButton` component similar to `BulkRestoreButton`, but using `useBulkDeletePermanentlyWithUndoController` hook from `ra-core-ee`:

```tsx
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useBulkDeletePermanentlyWithUndoController } from "@react-admin/ra-core-ee";
import { useTranslate } from "ra-core";

export function BulkDeletePermanentlyButton(
  props: BulkDeletePermanentlyButtonProps,
) {
  const { label: labelProp } = props;

  const { ids, isPending, handleDeleteManyPermanently } =
    useBulkDeletePermanentlyWithUndoController({});

  const translate = useTranslate();
  const label =
    labelProp == undefined || typeof labelProp === "string"
      ? translate(labelProp ?? "ra-soft-delete.action.delete_permanently", {
          smart_count: ids.length,
        })
      : labelProp;

  return (
    <Button
      type="button"
      variant="destructive"
      onClick={handleDeleteManyPermanently}
      disabled={isPending}
      size="sm"
    >
      {label}
    </Button>
  );
}

export interface BulkDeletePermanentlyButtonProps {
  label?: ReactNode;
}
```
