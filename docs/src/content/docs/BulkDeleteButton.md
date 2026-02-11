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

If your data provider supports soft delete (see [Soft Delete Features](./SoftDeleteFeatures.md)), you can use an alternative [`BulkSoftDeleteButton`](./SoftDeleteFeatures.md#bulk-soft-delete-button) that performs a soft delete instead of a permanent delete.

You can then choose to either restore the records with a [`BulkRestoreButton`](./SoftDeleteFeatures.md#bulk-restore-button), or delete them permanently with a [`BulkDeletePermanentlyButton`](./SoftDeleteFeatures.md#bulk-delete-permanently-button).

:::tip
The soft delete features require an [Enterprise Edition](https://marmelab.com/ra-enterprise/) subscription. Head to the website to learn more.
:::