---
title: "BulkDeleteButton"
---

Lets the user delete selected records in a list using `dataProvider.deleteMany()`. To be used in a `ListContext` (e.g., inside a `<DataTable>`).

## Usage

```tsx
import { DataTable, BulkDeleteButton } from '@/components/admin';

<DataTable bulkActionsButtons={<BulkDeleteButton />} />
```

It uses the `selectedIds` from `ListContext`.

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
