---
title: "NumberInput"
---

Input component for numeric values (integers, floats) rendering an `<input type="number">` with parsing & formatting support.

## Usage

```tsx
import { NumberInput } from '@/components/admin';

<NumberInput source="price" />
<NumberInput source="price" step={0.1} min={0} max={100} placeholder="Enter a price" />
```

Internally manages a local string state so users can type incomplete numbers (e.g. '-') before parsing.

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Field name |
| `className` | Optional | `string` | - | CSS classes |
| `defaultValue` | Optional | `boolean` | - | Default value |
| `disabled` | Optional | `boolean` | - | Disable input |
| `format` | Optional | `function` | - | Callback taking the value from the form state, and returning the input value. |
| `helperText` | Optional | `ReactNode` | - | Help text |
| `label` | Optional | `string \| false` | Inferred | Custom / hide label |
| `min` | Optional | `number` | - | The minimum value allowed for the input |
| `max` | Optional | `number` | - | The maximum value allowed for the
| `parse` | Optional | `(value:string)=>number` | - | Callback taking the value from the input, and returning the value to be stored in the form state. |
| `placeholder` | Optional | `string` | - | Placeholder text |
| `step` | Optional | `number \| 'any'` | - | The step attribute to use. Use 'any' to allow any float value. |
| `validate` | Optional | `Validator \| Validator[]` | - | Validation |

Additional props are passed to the underlying [`<input type="number">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/number) element, e.g. `min`, `max`, etc.

## Format and Parse

It's common to need to transform the value from the form state before passing it to the input, and vice-versa. You can achieve this by using the `format` and `parse` props.

```
form state value   --> format -->   html input value
   (typed)         <-- parse  <--      (string)
```

For example, you may want to store an amount in cents in the form state, but display it in dollars in the input:

```tsx
{/* Unit Price is stored in cents, i.e. 123 means 1.23 */}
<NumberInput 
    source="unit_price"
    format={v => String(v * 100)}
    parse={v => parseFloat(v) / 100}
/>
```
