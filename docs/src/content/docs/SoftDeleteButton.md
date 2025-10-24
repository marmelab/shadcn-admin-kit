---
title: SoftDeleteButton
---

A button that soft-deletes the current record. By default, its label is "Archive" instead of "Delete", to reflect the fact that the record is not permanently deleted.

This feature requires a valid [Enterprise Edition](https://marmelab.com/ra-enterprise/) subscription.

## Creating the SoftDeleteButton component

As the `<SoftDeleteButton />` requires an [Enterprise Edition](https://marmelab.com/ra-enterprise/) subscription, it is not included in the Shadcn Admin Kit distribution.

An example of a basic `<SoftDeleteButton />` can be found below:

```tsx
// src/components/admin/soft-delete-button.tsx

import {
  RaRecord,
  useRecordContext,
  useRedirect,
  useResourceContext,
} from "ra-core";
import { Button } from "@/components/ui/button";
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
      Archive
    </Button>
  );
}

type SoftDeleteButtonProps = {
  resource?: string;
  record?: RaRecord;
};
```

## Usage

`<SoftDeleteButton>` reads the current record from `RecordContext`, and the current resource from `ResourceContext`, so in general it doesn't need any property. You can use it anywhere you would use a regular [`<DeleteButton>`](./DeleteButton.md), for example in a `<Show>` view:

```tsx
import { Show } from "@/components/admin/show";
import { SoftDeleteButton } from "@/components/admin/soft-delete-button";

const CommentShow = () => (
  <Show>
    <SoftDeleteButton />
  </Show>
);
```

When pressed, it will call `dataProvider.softDelete()` with the current record's `id`.

You can also specify a record and a resource:

```tsx
<SoftDeleteButton
  record={{ id: 123, author: "John Doe" }}
  resource="comments"
/>
```

## Props

| Prop       | Required | Type       | Default | Description                                          |
| ---------- | -------- | ---------- | ------- | ---------------------------------------------------- |
| `record`   | Optional | `RaRecord` | -       | Record to soft delete, e.g. `{ id: 12, foo: 'bar' }` |
| `resource` | Optional | `string`   | -       | Resource to soft delete, e.g. `posts`                |

## `record`

By default, `<SoftDeleteButton>` reads the current record from the `RecordContext`. If you want to delete a different record, you can pass it as a prop:

```tsx
<SoftDeleteButton record={{ id: 123, author: "John Doe" }} />
```

## `resource`

By default, `<SoftDeleteButton>` reads the current resource from the `ResourceContext`. If you want to delete a record from a different resource, you can pass it as a prop:

```tsx
<SoftDeleteButton
  record={{ id: 123, author: "John Doe" }}
  resource="comments"
/>
```
