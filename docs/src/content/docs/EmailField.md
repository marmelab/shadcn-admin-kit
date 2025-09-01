---
title: "EmailField"
---

Displays an email address as a `mailto:` link. Prevents row click bubbling.

## Usage

```tsx
import { EmailField } from '@/components/admin';

<EmailField source="email" />
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Field containing the email |
| `defaultValue` | Optional | `any` | - | Fallback value |
| `empty` | Optional | `ReactNode` | - | Placeholder when no value |
| `record` | Optional | `object` | Record from context | Explicit record |

Remaining props are passed to the underlying `<a>` element (e.g., `target`, `rel`, `className`).
