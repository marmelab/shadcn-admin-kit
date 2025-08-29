---
title: "NumberInput"
---

Numeric input with parsing & formatting support. Internally manages a local string state so users can type incomplete numbers (e.g. '-') before parsing.

## Usage

```tsx
<NumberInput source="price" />
<NumberInput source="width" parse={v => (v === '' ? null : parseFloat(v))} />
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Field name |
| `label` | Optional | `string \| false` | Inferred | Custom / hide label |
| `parse` | Optional | `(value:string)=>number` | Converts numeric strings | Convert UI string to number (return null to clear) |
| `defaultValue` | Optional | `any` | - | Initial value |
| `validate` | Optional | `Validator \| Validator[]` | - | Validation |
| `helperText` | Optional | `ReactNode` | - | Help text |
| `className` | Optional | `string` | - | Extra classes |
| `disabled` | Optional | `boolean` | - | Disable input |
| `readOnly` | Optional | `boolean` | - | Mark read-only |
| `...rest` | - | `input props` | - | Native attributes |

## Behavior

- Uses internal string state + `useEffect` to sync external value when not focused.
- Calls `field.onChange(numberValue ?? 0)`; adjust `parse` if you want nullable numbers.
