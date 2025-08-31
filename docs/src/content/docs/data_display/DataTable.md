---
title: "DataTable"
---

Feature-rich table component built on top of `DataTableBase` (ra-core) with:

- Column visibility (via ColumnsButton / selector)
- Column reordering (persisted ranks)
- Bulk selection & actions toolbar
- Row click navigation (show/edit) logic
- Sortable headers with tooltips
- Support for custom renderers and field components

## Usage

```tsx
<DataTable storeKey="posts.datatable" rowClick="show">
  <DataTable.Col source="title" />
  <DataTable.NumberCol source="views" />
  <DataTable.Col source="status" />
</DataTable>
```

## Props

Inherits `Partial<DataTableBaseProps>` plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Column definitions (`DataTable.Col` / custom) |
| `className` | `string` | - | Wrapper classes |
| `rowClassName` | `(record) => string` | - | Dynamic row classes |
| `bulkActionButtons` | `ReactNode \| false` | `<BulkActionsToolbarChildren />` | Custom bulk action buttons or disable with `false` |
| `bulkActionsToolbar` | `ReactNode` | - | Full custom toolbar (overrides default) |
| `storeKey` | `string` | `<resource>.datatable` | Persistence key for column state |

## Column Components

### DataTable.Col

Generic column, accepts either:

- `children`: custom cell content (inside record context)
- `render(record)`: render function
- `field`: a Field component type (e.g. `NumberField`)
- `source`: path in record

Additional props:

| Prop | Type | Description |
|------|------|-------------|
| `headerClassName` | `string` | Extra header cell classes |
| `cellClassName` | `string` | Extra body cell classes |
| `conditionalClassName` | `(record) => string` | Adds per-row class |
| `disableSort` | `boolean` | Disable sorting on this column |
| `sortByOrder` | `"ASC"\|"DESC"` | Initial sort order when first clicked |
| `label` | `ReactNode` | Header label (i18n key or node) |

### DataTable.NumberCol

Specialized numeric column (right aligned) rendering a `NumberField`.

| Prop | Type | Description |
|------|------|-------------|
| `source` | `string` | Required record path |
| `locales` | `string \| string[]` | Intl locales |
| `options` | `Intl.NumberFormatOptions` | Format options |
| (others) | From `DataTable.Col` | Inherited |

## Behavior Details

- Sorting: clicking header cycles ASC/DESC; tooltip shows next action.
- Hidden Columns: maintained via store key using `useStore`.
- Column Reorder: uses stored rank array `<storeKey>_columnRanks`.
- Bulk Selection: head checkbox toggles all visible row ids.
- Row Click: if `rowClick` prop provided via `DataTableBaseProps`, resolves link (async allowed) and navigates.
- Empty State: displays alert "No results found.".

## Tips

- Provide stable `storeKey` per resource view to keep user preferences.
- Use `conditionalClassName` for row-level highlighting (e.g. status colors).
- Combine with `ColumnsButton`, `SortButton`, `ToggleFilterButton` for full UX.
