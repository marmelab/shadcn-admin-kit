---
title: "TextField"
---

Displays the textual value of a field inside a `<span>`.

If the value is `null` or `undefined`, it renders nothing unless you provide the `empty` prop. If `empty` is a string, it is passed to the translation function.

## Usage

```tsx
import { TextField } from 'shadcn-admin-kit';

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

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Optional* | `string` | - | Field name in the record |
| `record` | Optional | `object` | Record from context | Record to read (overrides context) |
| `defaultValue` | Optional | `any` | - | Fallback when record has no value for `source` |
| `empty` | Optional | `ReactNode` | - | Placeholder when value is `null`/`undefined` |
| `...rest` | - | `HTMLAttributes<HTMLSpanElement>` | - | DOM props passed to the `<span>` |

`*` Provide either `source` (or wrap custom children / use inside a `RecordField`).

## Translation

When `empty` is a string it is passed to `useTranslate` with `{ _: empty }` so you can localize placeholders.

## Tips

- Non‑string values are converted with `toString()`.
- To format numbers or dates, prefer `<NumberField>` or `<DateField>`.
