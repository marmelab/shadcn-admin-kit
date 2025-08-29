---
title: "ArrayField"
---

Creates a `ListContext` from an array field of the current record so you can reuse list-aware child components (e.g. `<SingleFieldList>`, `<DataTable>`).

## Usage

```tsx
<ArrayField source="tags">
  <SingleFieldList>
    <ChipField source="name" />
  </SingleFieldList>
</ArrayField>

<ArrayField source="items" perPage={25} sort={{ field: 'name', order: 'ASC' }}>
  <DataTable>
    <DataTable.Col source="id" />
    <DataTable.Col source="name" />
  </DataTable>
</ArrayField>
```

## Props

All list controller options from `useList` plus `useFieldValue` options.

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Array field name |
| `perPage` | Optional | `number` | - | Pagination size |
| `page` | Optional | `number` | 1 | Initial page |
| `sort` | Optional | `{ field: string; order: 'ASC' \| 'DESC' }` | - | Sort order |
| `filter` | Optional | `object` | - | Permanent filters |
| `resource` | Optional | `string` | Parent resource | Override resource name |
| `children` | Optional | `ReactNode` | - | List-aware components |

## Behavior

- Uses `useFieldValue` to read the array; falls back to an empty array if missing.
- Provides pagination, sorting, filtering scoped to this local list.

## Tips

- Great for embedded arrays in documents (e.g., order lines).
- Combine with `<ReferenceField>` inside to fetch related records for each item.
