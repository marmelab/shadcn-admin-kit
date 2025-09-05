---
title: "Notification"
---

Bridges Shadcn Admin Kit notification system with `sonner` toasts, supporting undoable actions.

## Usage

Included in `Layout`. Can be used once at root.

```tsx
<Notification />
```

## Behavior

- Listens to RA `useNotificationContext` queue.
- Displays toast with optional Undo action for undoable mutations.
- Registers `beforeunload` when undoable to prevent accidental navigation.
