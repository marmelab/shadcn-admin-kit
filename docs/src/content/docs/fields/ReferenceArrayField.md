---
title: "ReferenceArrayField"
---

Fetches multiple referenced records by an array of ids contained in the current record, and provides them through a `ListContext` to its children.

## Usage

```tsx
<ReferenceArrayField source="category_ids" reference="categories">
  <SingleFieldList>
    <ChipField source="name" />
  </SingleFieldList>
</ReferenceArrayField>

<ReferenceArrayField source="product_ids" reference="products" sort={{ field: 'name', order: 'ASC' }} perPage={25}>
  <DataTable>
    <DataTable.Col source="id" />
    <DataTable.Col source="description" />
    <DataTable.NumberCol source="price" />
  </DataTable>
</ReferenceArrayField>
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Field with array of ids |
| `reference` | Required | `string` | - | Target resource name |
| `filter` | Optional | `object` | - | Permanent filters |
| `sort` | Optional | `{ field: string; order: 'ASC' \| 'DESC' }` | - | Sort order |
| `perPage` | Optional | `number` | - | Page size (default 1000 in code if unspecified) |
| `page` | Optional | `number` | 1 | Initial page |
| `queryOptions` | Optional | `UseQueryOptions` | - | TanStack Query options |
| `children` | Optional | `ReactNode` | `<SingleFieldList />` | Display component(s) |
| `empty` | Optional | `ReactNode` | - | Placeholder when no data |
| `loading` | Optional | `ReactNode` | - | Loading element (set `false` to hide) |
| `error` | Optional | `ReactNode` | - | Error element (set `false` to hide) |
| `pagination` | Optional | `ReactNode` | - | Pagination component |
| `className` | Optional | `string` | - | Wrapper classes |

## Empty Logic

Considers list empty when total is 0 (or inferred 0 with no pages) and no filter values.

## Tips

- Combine with `<DataTable>` for tabular display.
- Use a custom `pagination` node when you set `perPage`.
