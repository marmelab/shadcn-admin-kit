---
title: "AutocompleteArrayInput"
---

Multi-select autocomplete with token badges. Manages an array of scalar values (ids) stored at `source`.

## Usage

```tsx
<AutocompleteArrayInput source="tag_ids" choices={tags} />
<ReferenceArrayInput source="tag_ids" reference="tags">
  <AutocompleteArrayInput />
</ReferenceArrayInput>
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Optional* | `string` | - | Field name (inferred in ReferenceArrayInput) |
| `choices` | Required (when not in ReferenceArrayInput) | `any[]` | - | Options list |
| `optionText` | Optional | `string \| function` | `name` or record repr | Option label getter |
| `optionValue` | Optional | `string` | `id` | Option value field |
| `filterToQuery` | Optional | `(text:string)=>object` | `{ q: text }` | Server filter mapping |
| `translateChoice` | Optional | `boolean` | `!isFromReference` | Translate labels |
| `placeholder` | Optional | `string` | Search… | Input placeholder |
| `inputText` | Optional | `ReactNode \| (choice)=>ReactNode` | Choice text | Token renderer |
| `helperText` | Optional | `ReactNode` | - | Help text |
| `className` | Optional | `string` | - | Classes |

`*` Provide `source` unless inside `ReferenceArrayInput`.

## Behavior

- Displays selected choices as outline badges with remove buttons.
- Filters available choices excluding selected values.
- Backspace deletes last value when input empty.
