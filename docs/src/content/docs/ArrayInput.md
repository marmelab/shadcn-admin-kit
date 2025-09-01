---
title: "ArrayInput"
---

Entry point for editing an array of values or objects. Provides nested `SourceContext` for children (usually a `<SimpleFormIterator>`).

## Usage

```tsx
<ArrayInput source="tags">
  <SimpleFormIterator>
    <TextInput />
  </SimpleFormIterator>
</ArrayInput>

<ArrayInput source="items">
  <SimpleFormIterator>
    <TextInput source="name" />
    <NumberInput source="qty" />
  </SimpleFormIterator>
</ArrayInput>
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Array field name |
| `label` | Optional | `string` | Inferred | Label text |
| `defaultValue` | Optional | `any[]` | `[]` | Initial array |
| `validate` | Optional | `Validator \| Validator[]` | - | Array-level validation |
| `helperText` | Optional | `ReactNode` | - | Help text |
| `isPending` | Optional | `boolean` | - | Show skeleton |
| `className` | Optional | `string` | - | Classes |
| `children` | Required | `ReactNode` | - | Iterator component(s) |

## `<SimpleFormIterator>`

Iterator for repeating groups inside `<ArrayInput>`. Renders each item with reorder, remove, and add controls.

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `disableAdd` | Optional | `boolean` | `false` | Hide add button |
| `disableRemove` | Optional | `boolean \| (record)=>boolean` | `false` | Disable remove globally or per record |
| `disableReordering` | Optional | `boolean` | `false` | Hide move up/down |
| `disableClear` | Optional | `boolean` | `false` | Hide clear-all button |
| `inline` | Optional | `boolean` | `false` | Arrange child inputs horizontally (responsive) |
| `getItemLabel` | Optional | `boolean \| (index)=>string\|ReactElement` | `false` | Add per-item label |
| `addButton` | Optional | `ReactElement` | Default | Custom add button |
| `removeButton` | Optional | `ReactElement` | Default | Custom remove button |
| `reOrderButtons` | Optional | `ReactElement` | Default | Custom reorder buttons |
| `className` | Optional | `string` | - | Wrapper classes |

## Behavior

- Registers as field array with custom validator wrapping.
- Provides composed sources to nested inputs (`orders.0.reference`).
