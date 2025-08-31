---
title: "ReferenceManyCount"
---

Displays number of related records for a `ReferenceMany` relation.

## Usage

```tsx
<ReferenceManyCount reference="comments" target="post_id" />
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `reference` | `string` | Target resource name |
| `target` | `string` | Foreign key field in target resource |
| `record` | `RaRecord` | Record providing id (from context if omitted) |
| `source` | `string` | Source field of current record (default `id`) |
| `sort` | `SortPayload` | Sort order for related fetch |
| `filter` | `object` | Extra filter values |
| `link` | `boolean` | Make count a link |
