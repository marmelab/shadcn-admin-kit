---
title: "RadioButtonGroupInput"
---

Single-select input rendered as a list (column or row) of radio buttons.

![RadioButtonGroupInput](./images/radio-button-group-input.png)

## Usage

In addition to the `source`, `<RadioButtonGroupInput>` requires one prop: the `choices` listing the possible values.

```tsx
import { RadioButtonGroupInput } from '@/components/admin';

<RadioButtonGroupInput source="category" choices={[
  { id: "tech", name: "Tech" },
  { id: "lifestyle", name: "Lifestyle" },
  { id: "people", name: "People" },
]} />
```

By default, the possible choices are built from the `choices` prop, using:

- the `id` field as the option value,
- the `name` field as the option text

The form value for the source must be the selected value, e.g.

```js
const record = {
  id: 1,
  name: "Hello, World",
  category: "lifestyle",
};
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required* | `string` | `-` | Field name (inferred in ReferenceInput) |
| `choices` | Required* | `Object[]` | `-` | List of items to autosuggest. Required if not inside a ReferenceInput. |
| `className` | Optional | `string` | - | Wrapper classes |
| `defaultValue` | Optional | `any` | `''` | The default value for the input |
| `disabled` | Optional | `boolean` | `false` | If true, the input is disabled |
| `disableValue` | Optional | `string` | `disabled` | Field marking disabled choices |
| `format` | Optional | `Function` | `-` | Callback taking the value from the form state, and returning the input value. |
| `helperText` | Optional | `string` &#124; `ReactNode` | `-` | The helper text to display below the input |
| `label` | Optional | `string` &#124; `ReactNode` | `-` | The label to display for the input |
| `optionText` | Optional | `string` &#124; `Function` &#124; `Component` | `undefined` &#124; `record Representation` | Field name of record to display in the suggestion item or function using the choice object as argument |
| `optionValue` | Optional | `string` | `id` | Field name of record containing the value to use as input value |
| `parse` | Optional | `Function` | `-` | Callback taking the value from the input, and returning the value to be stored in the form state. |
| `row` | Optional | `boolean` | `false` | Horizontal layout |
| `translateChoice` | Optional | `boolean` | `true` | Whether the choices should be translated |
| `validate` | Optional | `Function` &#124; `Function[]` | `-` | An array of validation functions or a single validation function |

`*` `source` and `choices` are optional inside `<ReferenceInput>`.

## Inline Choices

Use the `rows` prop to display the radio buttons in a row instead of a column:

```tsx
<RadioButtonGroupInput row source="category" choices={choices} />
```

## Defining Choices

The list of choices must be an array of objects with at least two fields: one to use for the name, and the other to use for the value. By default, `<RadioButtonGroupInput>` will use the `id` and `name` fields.

```jsx
const choices = [
    { id: 'tech', name: 'Tech' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'people', name: 'People' },
];
<RadioButtonGroupInput source="category" choices={choices} />
```

If the choices have different keys, you can use `optionText` and `optionValue` to specify which fields to use for the name and value.

```jsx
const choices = [
    { _id: 'tech', label: 'Tech' },
    { _id: 'lifestyle', label: 'Lifestyle' },
    { _id: 'people', label: 'People' },
];

<RadioButtonGroupInput
    source="category"
    choices={choices}
    optionText="label"
    optionValue="_id"
/>
```

The choices are translated by default, so you can use translation identifiers as choices:

```jsx
const choices = [
    { id: 'tech', name: 'myroot.categories.tech' },
    { id: 'lifestyle', name: 'myroot.categories.lifestyle' },
    { id: 'people', name: 'myroot.categories.people' },
];
```

You can opt-out of this translation by setting the `translateChoice` prop to `false`.

If you need to *fetch* the options from another resource, you're usually editing a many-to-one or a one-to-one relationship. In this case, wrap the `<RadioButtonGroupInput>` in a [`<ReferenceInput>`](./ReferenceInput.md). You don't need to specify the `source` and `choices` prop in this case - the parent component injects them based on the possible values of the related resource.

```jsx
<ReferenceInput label="Author" source="author_id" reference="authors">
    <RadioButtonGroupInput />
</ReferenceInput>
```

You can also pass an *array of strings* for the choices:

```jsx
const categories = ['tech', 'lifestyle', 'people'];
<RadioButtonGroupInput source="category" choices={categories} />
// is equivalent to
const choices = categories.map(value => ({ id: value, name: value }));
<RadioButtonGroupInput source="category" choices={choices} />
```

## Alternatives

Consider the following alternatives for choosing a single value from a list:

- [`<SelectInput>`](./SelectInput.md) for a dropdown select input
- [`<AutocompleteInput>`](./AutocompleteInput.md) for an autocomplete input
