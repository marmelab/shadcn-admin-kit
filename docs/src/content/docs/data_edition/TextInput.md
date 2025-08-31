---
title: "TextInput"
---

Single-line or multiline text input. Wraps a Shadcn `<Input>` or `<Textarea>` depending on `multiline`.

## Usage

```tsx
<TextInput source="title" />
<TextInput source="description" multiline rows={4} />
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Field name |
| `label` | Optional | `string \| false` | Inferred | Override label; set `false` to hide |
| `multiline` | Optional | `boolean` | `false` | Use a `<textarea>` |
| `defaultValue` | Optional | `any` | - | Initial value |
| `validate` | Optional | `Validator \| Validator[]` | - | Validation logic |
| `helperText` | Optional | `ReactNode` | - | Below control help text |
| `className` | Optional | `string` | - | Extra classes |
| `...rest` | - | `input/textarea props` | - | Native props (placeholder, rows, etc.) |

## Notes

- `format`/`parse` props are accepted by `useInput` but currently unused (ignored in component destructure) so supply transformations at form level if needed.
