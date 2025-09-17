---
title: "TextInput"
---

Single-line or multiline text input. Wraps a Shadcn `<Input>` or `<Textarea>` depending on `multiline`.

## Usage

```tsx
import { TextInput } from '@/components/admin';

<TextInput source="title" />
<TextInput source="description" multiline rows={4} />
```

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
| `multiline` | Optional | `boolean` | `false` | Use a `<textarea>` |
| `parse` | Optional | `(value:string)=>number` | - | Callback taking the value from the input, and returning the value to be stored in the form state. |
| `placeholder` | Optional | `string` | - | Placeholder text |
| `validate` | Optional | `Validator \| Validator[]` | - | Validation |

Additional props are passed to the underlying `<input>` or `<textarea>` element, e.g. `type`, `rows`, etc.

**Warning**: Do not use `type="number"`, or you'll receive a string as value (this is a [known React bug](https://github.com/facebook/react/issues/1425)). Instead, use [`<NumberInput>`](./NumberInput.md).
