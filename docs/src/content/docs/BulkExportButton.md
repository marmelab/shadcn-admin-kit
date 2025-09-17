---
title: "BulkExportButton"
---

Exports only the currently selected records using `dataProvider.getList()`. To be used in a `ListContext` (e.g., inside a `<DataTable>`).

## Usage

`<BulkExportButton>` is one fo the default bulk action buttons of `<DataTable>`, so you will need to use it only when you want to customize these bulk actions:

```tsx
import { DataTable, BulkExportButton } from '@/components/admin';

const BulkActions = () => (
  <>
    <BulkExportButton />
    {/* other bulk action buttons */}
  </>
);

<DataTable bulkActionsButtons={<BulkActions />}>
  {/* table content */}
</DataTable>
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `className` | Optional | `string` | - | Extra CSS classes |
| `exporter` | Optional | `(data: any[]) => void` | - |Custom exporter function, used to select or augment the exported data |
| `icon` | Optional | `ReactNode` | Download icon | Custom icon element |
| `label` | Optional | `string` | `ra.action.export` | i18n key |
| `meta` | Optional | `object` | - | Custom meta to pass to `dataProvider.getList()` |
| `resource` | Optional | `string` | inferred | Resource name (rarely needed) |

Additional props are passed to the underlying shadcn/ui `<Button>` component.

See the [`<List exporter>`](./List.md#exported-data) documentation for details on the `exporter` function.
