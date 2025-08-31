---
title: "Filter Button / Form Combo"
---

Live form for list filters with dynamic add/remove & saved query support.

## Usage

```tsx
<List filters={<>
  <TextInput source="q" alwaysOn />
  <SelectInput source="status" choices={...} />
</>}>
  <FilterForm />
</List>
```

## Related

- `FilterButton` (menu to toggle filters & manage saved queries)
- `FilterButtonMenuItem`
