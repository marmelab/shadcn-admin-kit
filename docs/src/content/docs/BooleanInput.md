---
title: "BooleanInput"
---

Toggle switch for boolean values, leveraging shadcn's [Switch](https://ui.shadcn.com/docs/components/switch) component.

## Usage

```tsx
import { BooleanInput } from '@/components/admin';

<BooleanInput source="is_published" />
```

:::tip
This input doesn't let users set a `null` value - only `true` or `false`. Use the [`<SelectInput>`](./SelectInput.md) component if you have to handle non-required booleans.
:::

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Field name |
| `className` | Optional | `string` | - | Wrapper classes |
| `defaultValue` | Optional | `boolean` | `false` | Initial value |
| `disabled` | Optional | `boolean` | - | Disable control |
| `format` | Optional | `function` | - | Callback taking the value from the form state, and returning the input value. |
| `helperText` | Optional | `ReactNode` | - | Help text |
| `label` | Optional | `string` | Inferred | Label text |
| `parse` | Optional | `` | - | Callback taking the value from the input, and returning the value to be stored in the form state. |
| `validate` | Optional | `Validator \| Validator[]` | - | Validation |
