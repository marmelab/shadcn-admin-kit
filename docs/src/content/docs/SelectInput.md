---
title: "SelectInput"
---

Dropdown selection from a list of choices. Supports dynamic loading via `ChoicesContext` (e.g. inside `ReferenceInput`) or static `choices` prop.

## Usage

```tsx
<SelectInput source="gender" choices={[{ id: 'M', name: 'Male' }, { id: 'F', name: 'Female' }]} />
<ReferenceInput source="category_id" reference="categories">
  <SelectInput optionText="title" />
</ReferenceInput>
```

## Props

Key props from `ChoicesProps`, `InputProps`, and component-specific options.

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Optional* | `string` | - | Field name (inferred in ReferenceInput) |
| `choices` | Required (when not in ReferenceInput) | `any[]` | - | Available options |
| `optionText` | Optional | `string \| function \| ReactElement` | `name` or record repr | How to render each option |
| `optionValue` | Optional | `string` | `id` | Value extractor field |
| `disableValue` | Optional | `string` | `disabled` | Property marking a disabled choice |
| `translateChoice` | Optional | `boolean` | `!isFromReference` | Translate option text |
| `emptyText` | Optional | `string \| ReactElement` | "" | Placeholder display |
| `emptyValue` | Optional | `any` | "" | Value used for empty selection |
| `create` | Optional | `boolean` | - | Enable create new suggestion flow |
| `createLabel` | Optional | `string` | - | Translation key for create item |
| `onCreate` | Optional | `(value:string)=>void` | - | Async create handler |
| `helperText` | Optional | `ReactNode` | - | Help text |
| `className` | Optional | `string` | - | Classes |

`*` Provide `source` unless inside a `ReferenceInput`.

## Create Support

When `create` or `onCreate` is set, an extra pseudo-choice is appended and handled by `useSupportCreateSuggestion`.

## Reset Button

Displays an inline reset icon (X) when a value is selected; clicking resets to `emptyValue`.
