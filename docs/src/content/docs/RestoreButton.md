---
title: RestoreButton
---

A button that restores a soft-deleted record.

This feature requires a valid [Enterprise Edition](https://marmelab.com/ra-enterprise/) subscription.

## Creating the RestoreButton component

As the `<RestoreButton />` requires an [Enterprise Edition](https://marmelab.com/ra-enterprise/) subscription, it is not included in the Shadcn Admin Kit distribution.

An example of a basic `<RestoreButton />` can be found below:

```tsx
// src/components/admin/restore-button.tsx

import { RaRecord, useRecordContext, useResourceContext } from "ra-core";
import { Button } from "@/components/ui/button";
import { useRestoreOne } from "@react-admin/ra-core-ee";

export function RestoreButton(props: RestoreButtonProps) {
  const record = useRecordContext(props);

  const [restore, { isPending }] = useRestoreOne();

  const handleRestore = () => {
    restore({ id: record?.id });
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

## Usage

`<RestoreButton>` reads the current record from `RecordContext`, so in general it doesn't need any property. You can use it anywhere you would use a regular [`<SoftDeleteButton>`](./SoftDeleteButton.md), for example in a `<Show>` view:

```tsx
import { Show } from "@/components/admin/show";
import { RestoreButton } from "@/components/admin/restore-button";

const CommentShow = () => (
  <Show>
    <RestoreButton />
  </Show>
);
```

When pressed, it will call `dataProvider.restoreOne()` with the current record's `id`.

You can also specify a record and a resource:

```tsx
<RestoreButton record={{ id: 123, author: "John Doe" }} />
```

## Props

| Prop     | Required | Type       | Default | Description                                          |
| -------- | -------- | ---------- | ------- | ---------------------------------------------------- |
| `record` | Optional | `RaRecord` | -       | Record to soft delete, e.g. `{ id: 12, foo: 'bar' }` |

## `record`

By default, `<RestoreButton>` reads the current record from the `RecordContext`. If you want to delete a different record, you can pass it as a prop:

```tsx
<RestoreButton record={{ id: 123, author: "John Doe" }} />
```
