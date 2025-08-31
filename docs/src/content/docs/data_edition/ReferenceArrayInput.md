---
title: "ReferenceArrayInput"
---

For selecting multiple related records (hasMany). Provides choices through context and defaults to `<AutocompleteArrayInput />`.

## Usage

```tsx
<ReferenceArrayInput source="tag_ids" reference="tags" />
<ReferenceArrayInput source="user_ids" reference="users">
  <SelectInput />
</ReferenceArrayInput>
```

## Props

Inherits all `UseReferenceArrayInputParams` & `InputProps` (source, reference, perPage, sort, filter, queryOptions, etc.).

| Prop | Required | Type | Description |
|------|----------|------|-------------|
| `source` | Required | `string` | Field with array of ids |
| `reference` | Required | `string` | Target resource |
| `children` | Optional | `ReactElement` | Child input (default `<AutocompleteArrayInput />`) |
| `label` | Optional | `string` | Field label |

## Notes

- Child input consumes `ChoicesContext`; don't pass its own `choices` when used here.
- Append `filter` or custom `sort` to control available choices.
