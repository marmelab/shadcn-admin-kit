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

If your data provider supports soft delete (see [Soft Delete Features](./SoftDeleteFeatures.md)), you can use an alternative `SoftDeleteButton` that performs a soft delete instead of a permanent delete:

```tsx
import {
  type RaRecord,
  useRecordContext,
  useRedirect,
  useResourceContext,
} from "ra-core";
import { useSoftDelete } from "@react-admin/ra-core-ee";
import { Button } from "@/components/ui/button";

export function SoftDeleteButton(props: SoftDeleteButtonProps) {
  const resource = useResourceContext(props);
  const record = useRecordContext(props);
  const redirect = useRedirect();
  const [softDelete, { isPending }] = useSoftDelete();

  const handleSoftDelete = () => {
    softDelete(
      resource,
      { id: record?.id },
      {
        onError: (err) => {
          console.error("An error occurred while soft deleting", err);
        },
        onSuccess: () => {
          redirect("list", resource);
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

type SoftDeleteButtonProps = {
  resource?: string;
  record?: RaRecord;
};
```

Then, replace `DeleteButton` with `SoftDeleteButton` in your edit view:

```tsx
import { Edit } from '@/components/admin';
import { SoftDeleteButton } from './SoftDeleteButton';

const PostEdit = () => (
    <Edit actions={<SoftDeleteButton />}>
        ...
    </Edit>
);
```

## Restore Button

For restoring soft-deleted records, you can create a `RestoreButton` component similar to the `SoftDeleteButton`, but using the `useRestore` hook from `ra-core-ee`.

```tsx
export function RestoreButton(props: RestoreButtonProps) {
  const record = useRecordContext(props);
  const { refetch } = useShowContext();

  const [restore, { isPending }] = useRestoreOne();

  const handleRestore = () => {
    restore(
      { id: record?.id },
      {
        onError: (err) => {
          console.error("An error occurred while restoring", err);
        },
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  return (
    <Button type="button" onClick={handleRestore} disabled={isPending}>
      Restore
    </Button>
  );
}

type RestoreButtonProps = {
  record?: RaRecord;
};
```