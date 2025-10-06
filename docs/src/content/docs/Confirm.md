---
title: "Confirm"
---

`<Confirm>` is a generic confirmation dialog component, used by Shadcn Admin Kit internally for destructive actions. You can use it in your own custom actions as well.

![Confirm](./images/confirm.jpg)

## Usage

`<Confirm>` is a controlled component. You must manage its `isOpen` state and provide `onClose` and `onConfirm` handlers.

For example, here is how to use it in a custom delete button with a confirmation dialog:

```tsx
import { useState } from "react";
import { useDelete, useRecordContext, useResourceContext, useRedirect } from "ra-core";
import { Button } from "@/components/ui/button";
import { Confirm } from "@/components/admin/confirm";

const DeleteButton = () => {
  const resource = useResourceContext();
  const record = useRecordContext();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteOne, { isPending }] = useDelete();
  const redirect = useRedirect();

  const handleDelete = () => {
    deleteOne(
      resource,
      { id: record?.id, previousData: record },
      {
        onSuccess: () => {
          setIsOpen(false);
          redirect("list", resource);
        },
      },
    );
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setIsOpen(true)}>
        Delete
      </Button>
      <Confirm
        isOpen={isOpen}
        title="Are you sure you want to delete this element?"
        content="This action cannot be undone."
        onConfirm={handleDelete}
        onClose={() => setIsOpen(false)}
        loading={isPending}
      />
    </>
  );
};
```

## Props

| Prop           | Required | Type                       | Default             | Description                |
|----------------|----------|----------------------------|---------------------|----------------------------|
| `isOpen`       | Required | `boolean`                  | `false`             | Whether dialog is shown    |
| `onClose`      | Required | `() => void`               | -                   | Close handler              |
| `onConfirm`    | Required | `(e) => void`              | -                   | Confirm handler            |
| `title`        | Required | `ReactNode`                | -                   | Title (i18n key or node)   |
| `content`      | Optional | `ReactNode`                | -                   | Body content               |
| `cancel`       | Optional | `string`                   | `ra.action.cancel`  | i18n key for cancel button |
| `confirm`      | Optional | `string`                   | `ra.action.confirm` | i18n key for confirm button|
| `confirmColor` | Optional | `"primary"` \| `"warning"` | `primary`           | Style variant              |
| `ConfirmIcon`  | Optional | `ComponentType`            | CheckCircle         | Icon for confirm           |
| `CancelIcon`   | Optional | `ComponentType`            | AlertCircle         | Icon for cancel            |
| `loading`      | Optional | `boolean`                  | -                   | Disable buttons while true |
