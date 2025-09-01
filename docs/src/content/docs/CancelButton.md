---
title: "CancelButton"
---

Navigates back to previous location (usually list view) without saving.

## Usage

```tsx
import { CancelButton, SaveButton, SimpleForm } from '@/components/admin';

<SimpleForm toolbar={<>
  <SaveButton />
  <CancelButton />
</>}>
  {/* inputs */}
</SimpleForm>
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `label` | Optional | `string` | `ra.action.cancel` | i18n key |
| `icon` | Optional | `ReactNode` | Ban/close icon | Custom icon |

## Behavior

- Uses `useCreatePath` + `useRedirect` (or navigate) to go back.
