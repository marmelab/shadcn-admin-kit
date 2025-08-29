---
title: "EmailField"
---

Displays an email address as a `mailto:` link. Prevents row click bubbling.

## Usage

```tsx
<EmailField source="email" />
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Optional* | `string` | - | Field containing the email |
| `record` | Optional | `object` | Record from context | Explicit record |
| `defaultValue` | Optional | `any` | - | Fallback value |
| `empty` | Optional | `ReactNode` | - | Placeholder when no value |
| `...rest` | - | `AnchorHTMLAttributes<HTMLAnchorElement>` | - | Extra anchor props |

`*` Provide `source` or use inside `RecordField`.

## Tips

- Combine with `<TextField>` for plain text emails if you don’t want links.
- Provide `empty` e.g. `empty="ra.field.no_email"` for translation.
