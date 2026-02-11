---
title: "DeleteButton"
---

Lets the user delete the current record.

## Usage

```tsx {4}
import { DeleteButton, Edit } from '@/components/admin';

const PostEdit = () => (
    <Edit actions={<DeleteButton />}>
        ...
    </Edit>
);
```

By default, it reads the resource from `ResourceContext` and record from `RecordContext`.

Upon success, the button redirects to the list view, and notifies the user with the key `resources.<resource>.notifications.deleted` (fallback `ra.notification.deleted`).

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `className` | Optional | `string` | destructive styles | Additional classes |
| `label` | Optional | `string` | i18n computed | i18n key / custom label (includes record name) |
| `mutationOptions` | Optional | `UseDeleteOptions` | - | Mutation options (onSuccess, etc.) |
| `redirect` | Optional | `RedirectionSideEffect` | `list` | Where to redirect after delete |
| `size` | Optional | `"default" \| "sm" \| "lg" \| "icon"` | - | Size variant |
| `successMessage` | Optional | `string` | - | Custom success i18n key |
| `variant` | Optional | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `outline` | Button style |

## Soft Delete

If your data provider supports soft delete (see [Soft Delete Features](./SoftDeleteFeatures.md)), you can use an alternative [`SoftDeleteButton`](./SoftDeleteFeatures.md#soft-delete-button) that performs a soft delete instead of a permanent delete.

You can then choose to either restore the record with a [`RestoreButton`](./SoftDeleteFeatures.md#restore-button), or delete it permanently with a [`DeletePermanentlyButton`](./SoftDeleteFeatures.md#delete-permanently-button).

:::tip
The soft delete features require an [Enterprise Edition](https://marmelab.com/ra-enterprise/) subscription. Head to the website to learn more.
:::