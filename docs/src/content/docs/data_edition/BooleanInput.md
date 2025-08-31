---
title: "BooleanInput"
---

Toggle switch for boolean values.

## Usage

```tsx
<BooleanInput source="is_published" label="Published" />
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Field name |
| `label` | Optional | `string` | Inferred | Label text |
| `defaultValue` | Optional | `boolean` | `false` | Initial value |
| `helperText` | Optional | `ReactNode` | - | Help text |
| `disabled` | Optional | `boolean` | - | Disable control |
| `readOnly` | Optional | `boolean` | - | Make read only |
| `onChange` | Optional | `(value:boolean)=>void` | - | Change handler supplement |
| `validate` | Optional | `Validator \| Validator[]` | - | Validation |
| `className` | Optional | `string` | - | Wrapper classes |

## Behavior

- Calls `field.onChange(checked)` then `field.onBlur()` to mark touched.
- Uses Shadcn `<Switch>` component.
