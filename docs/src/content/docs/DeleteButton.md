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
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useSoftDeleteWithUndoController } from "@react-admin/ra-core-ee";
import {
  type RaRecord,
  useRecordContext,
  useResourceContext,
  useTranslate,
} from "ra-core";

export function SoftDeleteButton(props: SoftDeleteButtonProps) {
  const { label: labelProp } = props;

  const resource = useResourceContext(props);
  const record = useRecordContext(props);

  const { isPending, handleSoftDelete } = useSoftDeleteWithUndoController({
    record,
    resource,
  });

  const translate = useTranslate();
  const label =
    labelProp == undefined || typeof labelProp === "string"
      ? translate(labelProp ?? "ra-soft-delete.action.soft_delete")
      : labelProp;

  return (
    <Button
      type="button"
      variant="destructive"
      onClick={handleSoftDelete}
      disabled={isPending}
    >
      {label}
    </Button>
  );
}

type SoftDeleteButtonProps = {
  resource?: string;
  record?: RaRecord;
  label?: ReactNode;
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

For restoring soft-deleted records, you can create a `RestoreButton` component similar to the `SoftDeleteButton`, but using the `useRestoreWithUndoController` hook from `ra-core-ee`.

```tsx
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  type DeletedRecordType,
  useRestoreWithUndoController,
} from "@react-admin/ra-core-ee";
import { useRecordContext, useTranslate } from "ra-core";

export function RestoreButton(props: RestoreButtonProps) {
  const { label: labelProp } = props;

  const record = useRecordContext(props);
  if (!record) {
    throw new Error(
      "<RestoreButton> component should be used inside a <DeletedRecordsListBase> component or provided with a record prop.",
    );
  }

  const { isPending, handleRestore } = useRestoreWithUndoController({
    record,
  });

  const translate = useTranslate();
  const label =
    labelProp == undefined || typeof labelProp === "string"
      ? translate(labelProp ?? "ra-soft-delete.action.restore")
      : labelProp;

  return (
    <Button
      type="button"
      onClick={handleRestore}
      disabled={isPending}
      size="sm"
    >
      {label}
    </Button>
  );
}

type RestoreButtonProps = {
  record?: DeletedRecordType;
  label?: ReactNode;
};
```

## Delete Permanently Button

For deleting archived records permanently, you can create a `DeletePermanentlyButton` component similar to the `RestoreButton`, but using the `useDeletePermanentlyWithUndoController` hook from `ra-core-ee`.

```tsx
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  type DeletedRecordType,
  useDeletePermanentlyWithUndoController,
} from "@react-admin/ra-core-ee";
import { useRecordContext, useTranslate } from "ra-core";

export function DeletePermanentlyButton(props: DeletePermanentlyButtonProps) {
  const { label: labelProp } = props;

  const record = useRecordContext(props);
  if (!record) {
    throw new Error(
      "<DeletePermanentlyButton> component should be used inside a <DeletedRecordsListBase> component or provided with a record prop.",
    );
  }

  const { isPending, handleDeletePermanently } =
    useDeletePermanentlyWithUndoController({
      record,
    });

  const translate = useTranslate();
  const label =
    labelProp == undefined || typeof labelProp === "string"
      ? translate(labelProp ?? "ra-soft-delete.action.delete_permanently")
      : labelProp;

  return (
    <Button
      type="button"
      variant="destructive"
      onClick={handleDeletePermanently}
      disabled={isPending}
      size="sm"
    >
      {label}
    </Button>
  );
}

type DeletePermanentlyButtonProps = {
  record?: DeletedRecordType;
  label?: ReactNode;
};
```
