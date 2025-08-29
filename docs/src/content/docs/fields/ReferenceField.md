---
title: "ReferenceField"
---

Fetches and displays a single referenced record (foreign key lookup). Wraps `ReferenceFieldBase` from `ra-core` and supports linking to the related record.

## Usage

```tsx
<ReferenceField source="category_id" reference="categories" />
<ReferenceField source="user_id" reference="users" link="edit" />
<ReferenceField source="author_id" reference="users" render={({ referenceRecord }) => <span>{referenceRecord.username}</span>} />
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Foreign key in current record |
| `reference` | Required | `string` | - | Target resource name |
| `link` | Optional | `LinkToType` | `show` (react‑admin default) | Link target or false / function |
| `empty` | Optional | `ReactNode` | - | Placeholder when no id / value |
| `loading` | Optional | `ReactNode` | - | Element while loading (set `false` to hide) |
| `error` | Optional | `ReactNode` | - | Error element (set `false` to hide) |
| `render` | Optional | `(ctx)=>ReactNode` | - | Custom renderer receiving reference field context |
| `queryOptions` | Optional | `UseQueryOptions` | - | TanStack Query options (meta, staleTime, etc.) |
| `record` | Optional | `object` | Context record | Explicit record |
| `translateChoice` | Optional | `boolean \| (record)=>string` | `true` | Translate referenced record representation |
| `children` | Optional | `ReactNode` | `<span>` representation | Custom child (can use context hooks) |

## Rendering Logic

If `render` is provided it takes precedence. Otherwise renders `children` or the result of `useGetRecordRepresentation(referenceRecord)` inside a `<span>`.

## Tips

- Use `link={false}` to disable navigation.
- Pass `queryOptions={{ staleTime: 5 * 60 * 1000 }}` to cache longer.
- Customize display via `render` to combine multiple fields.
