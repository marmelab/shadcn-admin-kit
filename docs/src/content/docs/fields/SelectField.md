---
title: "SelectField"
---

Displays the text for a value from a predefined list of `choices`.

Internally uses `useChoices` from `ra-core` to resolve `optionText` and `optionValue`, and optionally translate the choice text.

## Usage

```tsx
const genderChoices = [
  { id: 'M', name: 'myapp.gender.male' },
  { id: 'F', name: 'myapp.gender.female' },
];

<SelectField source="gender" choices={genderChoices} />
<SelectField source="author_id" choices={authors} optionText="full_name" optionValue="_id" />
```

You can pass a function or a React element to `optionText` for custom rendering.

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `choices` | Required | `Array<any>` | - | List of selectable choices |
| `source` | Optional* | `string` | - | Field name |
| `record` | Optional | `object` | Record from context | Explicit record |
| `defaultValue` | Optional | `any` | - | Fallback value |
| `empty` | Optional | `ReactNode` | - | Placeholder when no match or empty |
| `optionText` | Optional | `string \| function \| ReactElement` | `name` | Property / renderer for display |
| `optionValue` | Optional | `string` | `id` | Property used to match the value |
| `translateChoice` | Optional | `boolean \| (record)=>string` | `true` | Translate choice text |
| `...rest` | - | `HTMLAttributes<HTMLSpanElement>` | - | DOM props |

`*` Provide `source` or use inside `RecordField`.

## Custom Renderer Example

```tsx
const FullName = () => {
  const record = useRecordContext();
  return <>{record.first_name} {record.last_name}</>;
};

<SelectField source="author_id" choices={authors} optionText={<FullName />} />
```

## Tips

- In a `<ReferenceField>` context you often want `translateChoice={false}`.
- Provide `empty` to display a placeholder for unmatched values.
