---
title: "ReferenceInput"
---

Wrapper that fetches possible choices for a foreign key and provides them via `ReferenceInputBase` + `ChoicesContext`. Defaults to rendering `<AutocompleteInput />`.

## Usage

```tsx
<ReferenceInput source="category_id" reference="categories" />
<ReferenceInput source="user_id" reference="users">
  <SelectInput optionText="username" />
</ReferenceInput>
```

## Props

All props from `ReferenceInputBaseProps` (resource, source, reference, perPage, sort, filter, queryOptions, etc.).

| Prop | Required | Type | Description |
|------|----------|------|-------------|
| `source` | Required | `string` | Foreign key field |
| `reference` | Required | `string` | Target resource |
| `children` | Optional | `ReactElement` | Input consuming choices (default `<AutocompleteInput />`) |

## Notes

- Do NOT pass `validate` here (component throws if you do). Put it on the child input.
- Child receives choices through context; omit its own `choices` prop.
