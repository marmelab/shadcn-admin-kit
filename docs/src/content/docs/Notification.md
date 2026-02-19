---
title: "Notification"
---

A notification component based on Shadcn's `sonner` toasts, supporting undoable actions.

![Notification](./images/notification.jpg)

## Usage

The `<Notification>` component is already included in the default [`<Layout>`](./Layout.md). It will display notifications triggered with the [`useNotify`](https://marmelab.com/ra-core/usenotify/) hook.

```tsx
import { useNotify } from "ra-core";

const NotifyButton = () => {
  const notify = useNotify();
  const handleClick = () => {
    notify(`Comment approved`, { type: "success" });
  };
  return <button onClick={handleClick}>Notify</button>;
};
```

You can customize the notification component by editing the `@/components/admin/notification.tsx` file.

If you write a custom layout, make sure to include the `<Notification>` component somewhere in your component tree, preferably near the root:

```tsx
<Notification />
```

## Duration

You can control how long each notification stays visible using the `autoHideDuration` option of [`useNotify`](https://marmelab.com/ra-core/usenotify/):

```tsx
import { useNotify } from "ra-core";

const NotifyButton = () => {
  const notify = useNotify();

  const handleClick = () => {
    notify("Comment approved", {
      type: "success",
      autoHideDuration: 6000, // ms
    });
  };

  return <button onClick={handleClick}>Notify</button>;
};
```

To create a persistent notification, set `autoHideDuration` to `null`:

```tsx
notify("Connection lost", {
  type: "warning",
  autoHideDuration: null,
});
```

This maps to Sonner's persistent toast behavior (equivalent to `duration: Infinity`).

## Undoable Mutations

The mutation hooks from `ra-core`, such as [`useDelete`](https://marmelab.com/ra-core/usedelete/) and [`useUpdate`](https://marmelab.com/ra-core/useupdate/), support [undoable mode](https://marmelab.com/ra-core/actions/#optimistic-rendering-and-undo). When using undoable mutations, the notification component will display an "Undo" button in the toast message, and the actual mutation will be delayed until the undo timeout expires.

To enable the "undo" button in a notification, pass the `undoable: true` option to the `useNotify` call:

```tsx
import { useDelete, useNotify } from "ra-core";

const DeletePostButton = ({ id }) => {
  const notify = useNotify();
  const [deleteOne] = useDelete();
  const handleClick = () => {
    deleteOne(
      "posts",
      { id },
      {
        mutationMode: "undoable",
        onSuccess: () => {
          notify("Post deleted", { type: "info", undoable: true });
        },
      },
    );
  };
  return <button onClick={handleClick}>Delete</button>;
};
```
