---
title: "FileField"
---

Renders one or multiple files as links. Supports arrays of file objects or a single value. For arrays, each file is rendered in a `<ul>` of `<li>` items.

## Usage

```tsx
<FileField source="file" title="title" />
<FileField source="attachments" src="url" title="name" target="_blank" />
```

If `source` contains an array, each element can be an object; use `src` to define the path to the file URL and `title` to define the display text.

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Optional* | `string` | - | Field name (string or array) |
| `record` | Optional | `object` | Record from context | Explicit record |
| `defaultValue` | Optional | `any` | - | Fallback when no value |
| `empty` | Optional | `ReactNode` | - | Placeholder when empty |
| `src` | Optional | `string` | - | Path within each file object to URL |
| `title` | Optional | `string` | - | Field used for link text (or literal) |
| `target` | Optional | `string` | - | Anchor target |
| `download` | Optional | `string` | - | Download attribute |
| `className` | Optional | `string` | - | Extra CSS classes |
| `...rest` | - | `HTMLAttributes<HTMLElement>` | - | DOM props |

`*` Provide `source` or use inside `RecordField`.

## Handling Empty Values

If the field is `null`, `undefined`, or an empty array, renders `empty` (translated if string) or nothing.

## Tips

- Stops click propagation to avoid triggering row navigation.
- Provide `download` to suggest a filename: `<FileField source="manual" download="Manual.pdf" />`.
