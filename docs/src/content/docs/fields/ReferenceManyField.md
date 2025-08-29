---
title: "ReferenceManyField"
---

Displays records from another resource that reference the current record (inverse relationship). Wraps `ReferenceManyFieldBase` and exposes a `ListContext` for its children.

## Usage

```tsx
// For a post show view: list comments referencing the post id
<ReferenceManyField target="post_id" reference="comments">
  <DataTable>
    <DataTable.Col source="id" />
    <DataTable.Col source="body" />
  </DataTable>
</ReferenceManyField>
```

Use `render` to customize before children:

```tsx
<ReferenceManyField target="post_id" reference="comments" render={({ total }) => <h3>{total} comments</h3>} />
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `reference` | Required | `string` | - | Target resource |
| `target` | Required | `string` | - | Foreign key in target referencing current record id |
| `filter` | Optional | `object` | - | Permanent filters |
| `sort` | Optional | `{ field: string; order: 'ASC' \| 'DESC' }` | - | Sort order |
| `perPage` | Optional | `number` | - | Page size |
| `page` | Optional | `number` | 1 | Initial page |
| `children` | Optional | `ReactNode` | - | List display components |
| `empty` | Optional | `ReactNode` | - | Placeholder when list empty |
| `loading` | Optional | `ReactNode` | - | Loading element (set `false` to hide) |
| `error` | Optional | `ReactNode` | - | Error element (set `false` to hide) |
| `pagination` | Optional | `ReactNode` | - | Pagination component |
| `render` | Optional | `(listCtx)=>ReactNode` | - | Custom pre-children renderer |

## Empty Logic

Mirrors the logic of `ReferenceArrayField` for empty detection (checks `total`, pages, data length, filters).

## Tips

- Add informative headers with `render={({ total }) => ... }`.
- Combine with `queryOptions` (passed through controller props) for caching.
