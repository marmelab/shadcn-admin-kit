---
title: "RadioButtonGroupInput"
---

Single-select inputs rendered as a list (column or row) of radio buttons.

## Usage

```tsx
<RadioButtonGroupInput source="status" choices={[
  { id: 'draft', name: 'Draft' },
  { id: 'published', name: 'Published' },
]} />
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Optional* | `string` | - | Field name (inferred in ReferenceInput wrappers) |
| `choices` | Required (when not in ReferenceInput) | `any[]` | - | Options list |
| `optionText` | Optional | `string \| function` | - | Label renderer / field |
| `optionValue` | Optional | `string` | `id` | Value field |
| `disableValue` | Optional | `string` | `disabled` | Field marking disabled choices |
| `translateChoice` | Optional | `boolean` | - | Translate labels |
| `row` | Optional | `boolean` | `false` | Horizontal layout |
| `helperText` | Optional | `ReactNode` | - | Help text |
| `className` | Optional | `string` | - | Wrapper classes |

`*` Provide `source` unless inside wrappers like `ReferenceInput`.

## Behavior

- Disabled state merges parent `disabled`/`readOnly` + per-choice `disableValue`.
