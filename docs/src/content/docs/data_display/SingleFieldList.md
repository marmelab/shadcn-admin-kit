---
title: "SingleFieldList"
---

Inline list layout displaying one badge (or custom child) per record from the current `ListContext`.

## Usage

```tsx
<ArrayField source="tags">
  <SingleFieldList />
</ArrayField>

<ReferenceArrayField source="category_ids" reference="categories">
  <SingleFieldList />
</ReferenceArrayField>

<ReferenceArrayField source="category_ids" reference="categories">
  <SingleFieldList render={(record, i) => <Badge key={i}>{record.name}</Badge>} />
</ReferenceArrayField>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | `<Badge><RecordRepresentation/></Badge>` | Content for each record if no `render` provided |
| `render` | `(record, index) => ReactNode` | - | Custom render function per record (overrides `children`) |
| `className` | `string` | - | Extra classes on wrapper div |

## Behavior

- Reads records from surrounding `ListContext` (`data`).
- For each record, provides a `RecordContext` so descendants (e.g. fields) can access it.
- Rendering precedence: `render` > `children` > default badge with `<RecordRepresentation />`.
- Layout: horizontal flex row with gap (`flex gap-2`).

## Tips

- Combine with `<ArrayField>` or `<ReferenceArrayField>` to show related items compactly.
- Use `render` for performance when you just need a simple inline element instead of composing multiple field components.
- Add wrapping container styles (e.g. `flex-wrap`) via `className` if the list may overflow.
