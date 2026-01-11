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
| `format` | Optional | `function` | - | Callback to convert the value from the form state to a boolean. |
| `helperText` | Optional | `ReactNode` | - | Help text |
| `label` | Optional | `string` | Inferred | Label text |
| `parse` | Optional | `function` | - | Callback to convert the value from a boolean to the form state. |
| `validate` | Optional | `Validator \| Validator[]` | - | Validation |

## Format and Parse

`<BooleanInput>` expects the form state value to be a boolean (`true` or `false`). If you want to use it for non-boolean values, you can use the `format` and `parse` props to convert them.

The `format` prop accepts a callback taking the value from the form state, and returning the input value (which should be a boolean).

The `parse` prop accepts a callback taking the value from the input (which is a boolean), and returning the value to put in the form state.

```txt
form state value --> format --> form input value (boolean)
form input value (boolean) ---> parse ---> form state value
```

For example, you might want to store `1` and `0` in the form state instead of `true` and `false`.

```tsx
<BooleanInput
  source="is_active"
  format={(value) => value === 1}
  parse={(value) => (value ? 1 : 0)}
/>
```
