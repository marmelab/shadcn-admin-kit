---
title: "BulkExportButton"
---

Exports only the currently selected records using `dataProvider.getList()`. To be used in a `ListContext` (e.g., inside a `<DataTable>`).

## Usage

```tsx
import { DataTable, BulkExportButton } from '@/components/admin';

<DataTable bulkActionsButtons={<BulkExportButton />} />
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `exporter` | Optional | `(data: any[]) => void` | - |Custom exporter function, used to select or augment the exported data |
| `icon` | Optional | `ReactNode` | Download icon | Custom icon |
| `label` | Optional | `string` | `ra.action.export` | i18n key |
| `meta` | Optional | `object` | - | Custom meta to pass to `dataProvider.getList()` |

Additional props are passed to the underlying button (e.g., `className`).

See the [`<List exporter>`](./List.md#exported-data) documentation for details on the `exporter` function.
