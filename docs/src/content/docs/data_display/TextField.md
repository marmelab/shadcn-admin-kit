---
title: "TextField"
---

Displays the textual value of a field inside a `<span>`.

## Usage

```tsx {8}
import { List, DataTable, TextField } from '@/components/admin';

export const UserList = () => (
  <List>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col>
        <TextField source="name" empty="resources.users.fields.name.empty" />
      </DataTable.Col>
    </DataTable>
  </List>
);
```

If the value is `null` or `undefined`, it renders nothing unless you provide the `empty` prop. If `empty` is a string, it is passed to the translation function.

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Field name in the record |
| `defaultValue` | Optional | `any` | - | Fallback when record has no value for `source` |
| `empty` | Optional | `ReactNode` | - | Placeholder when value is `null`/`undefined` |
| `record` | Optional | `object` | Record from context | Record to read (overrides context) |

Remaining props are passed to the underlying `<span>` element (e.g., `className`).

## Tips

- `<TextField>` is the default child for `<DataTable.Col>`.
- `<TextField>` is the default child for `<RecordField>`.
- Non‑string values are converted with `toString()`.
- To format numbers or dates, prefer [`<NumberField>`](./NumberField.md) or [`<DateField>`](./DateField.md).
