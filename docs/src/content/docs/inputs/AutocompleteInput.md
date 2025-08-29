---
title: "AutocompleteInput"
---

Single-select autocomplete using a popover + command palette UI. Filters server choices (when from a reference) via `setFilters(filterToQuery(text))`.

## Usage

```tsx
<AutocompleteInput source="author_id" choices={authors} />
<ReferenceInput source="user_id" reference="users">
  <AutocompleteInput />
</ReferenceInput>
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Optional* | `string` | - | Field name (inferred in ReferenceInput) |
| `choices` | Required (when not in ReferenceInput) | `any[]` | - | Options list |
| `optionText` | Optional | `string \| function` | `name` or record repr | Option label getter |
| `optionValue` | Optional | `string` | `id` | Option value field |
| `filterToQuery` | Optional | `(search:string)=>object` | `{ q: text }` | Map search text to filter object |
| `translateChoice` | Optional | `boolean` | `!isFromReference` | Translate labels |
| `placeholder` | Optional | `string` | Search… | Placeholder text |
| `inputText` | Optional | `ReactNode \| (choice)=>ReactNode` | Choice text | Button content renderer |
| `helperText` | Optional | `ReactNode` | - | Help text |
| `className` | Optional | `string` | - | Classes |

`*` Provide `source` unless wrapped in `ReferenceInput`.

## Behavior

- Maintains controlled Radix combobox state (`open`).
- Clicking selected item again clears value if not required.
- Resets server filters when closing popover.
