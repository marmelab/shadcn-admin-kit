---
title: "BadgeField"
---

Displays a value inside a styled `<Badge>` (from the UI library). Useful for statuses or categories.

## Usage

```tsx
<BadgeField source="status" variant="secondary" />
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Optional* | `string` | - | Field name |
| `record` | Optional | `object` | Record from context | Explicit record |
| `defaultValue` | Optional | `any` | - | Fallback value |
| `empty` | Optional | `ReactNode` | - | Placeholder when value missing |
| `variant` | Optional | `"default" \| "outline" \| "secondary" \| "destructive"` | `outline` | Badge style |
| `...rest` | - | `Badge props` | - | Other badge props (className, etc.) |

`*` Provide `source` or use inside `RecordField`.

## Tips

- Translate placeholder by passing a translation key string to `empty`.
- To color dynamically, override with `className` based on record value in a wrapper.
