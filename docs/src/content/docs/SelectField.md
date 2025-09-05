---
title: "SelectField"
---

Displays the text for a value from a predefined list of `choices`.

## Usage

For instance, if the `gender` field can take values "M" and "F", here is how to display it as either "Male" or "Female":

```jsx
import { SelectField } from '@/components/admin';

<SelectField source="gender" choices={[
   { id: 'M', name: 'Male' },
   { id: 'F', name: 'Female' },
]} />
```

You can pass a function or a React element to `optionText` for custom rendering.

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `choices` | Required | `Array<any>` | - | List of selectable choices |
| `source` | Required | `string` | - | Field name |
| `defaultValue` | Optional | `any` | - | Fallback value |
| `empty` | Optional | `ReactNode` | - | Placeholder when no match or empty |
| `optionText` | Optional | `string \| function \| ReactElement` | `name` | Property / renderer for display |
| `optionValue` | Optional | `string` | `id` | Property used to match the value |
| `record` | Optional | `object` | Record from context | Explicit record |
| `translateChoice` | Optional | `boolean \| (record)=>string` | `true` | Translate choice text |

Additional props are passed to the underlying `<span>` element (e.g., `className`).

## Custom Renderer

You can customize the property to use for the lookup text instead of `name` using the `optionText` prop.

```jsx
const currencies = [
   // ...
   {
      id: 'USD',
      name: 'US Dollar',
      namePlural: 'US dollars',
      symbol: '$',
      symbolNative: '$',
   },
   {
      id: 'RUB',
      name: 'Russian Ruble',
      namePlural: 'Russian rubles',
      symbol: 'RUB',
      symbolNative: '₽.',
   },
   // ...
];
<SelectField source="currency" choices={choices} optionText="symbol" />
```

`optionText` also accepts a function, so you can shape the option text at will:

```jsx
const authors = [
   { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
   { id: 456, first_name: 'Jane', last_name: 'Austen' },
];
const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
<SelectField source="author" choices={authors} optionText={optionRenderer} />
```

`optionText` also accepts a React Element. Shadcn Admin Kit renders it once per choice, within a [`RecordContext`](https://marmelab.com/ra-core/userecordcontext/) containing the related choice. You can use Field components there.

```jsx
const choices = [
   { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
   { id: 456, first_name: 'Jane', last_name: 'Austen' },
];
const FullNameField = () => {
   const record = useRecordContext();
   return record ? (
      <Badge>{record.first_name} {record.last_name}</Badge>
   ) : null;
};

<SelectField source="author_id" choices={choices} optionText={<FullNameField />}/>
```

## Tips

- If you need to fetch the choices, you probably need a [`<ReferenceField>`](./ReferenceField.md) instead.
- Inside a `<ReferenceField>`, you probably need to set the `translateChoice` prop to `false` to disable choice translation.
- Provide `empty` to display a placeholder for unmatched values.
