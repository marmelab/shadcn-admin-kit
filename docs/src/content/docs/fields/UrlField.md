---
title: "UrlField"
---

Renders a record field as a clickable hyperlink (`<a>`). Prevents row click bubbling in tables.

If the value is missing, renders nothing unless `empty` is provided.

## Usage

```tsx
<UrlField source="website" target="_blank" rel="noopener" />
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Optional* | `string` | - | Field containing the URL |
| `record` | Optional | `object` | Record from context | Explicit record |
| `defaultValue` | Optional | `any` | - | Fallback when no value |
| `empty` | Optional | `ReactNode` | - | Placeholder when no value |
| `...rest` | - | `AnchorHTMLAttributes<HTMLAnchorElement>` | - | Anchor props (target, rel, etc.) |

`*` Provide `source` or use inside `RecordField`.

## Tips

- Adds `underline` styling by default; override with `className`.
- Clicks call `stopPropagation` so row click handlers aren’t triggered.
