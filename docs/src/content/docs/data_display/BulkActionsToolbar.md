---
title: "BulkActionsToolbar"
---

Floating bar showing actions for currently selected rows in a list or DataTable.

## Usage

Automatically rendered by `DataTable` when `hasBulkActions` and selection exists, unless you pass a custom `bulkActionsToolbar` prop.

```tsx
<DataTable bulkActionButtons={<BulkDeleteButton />} />

{/* Full override */}
<DataTable bulkActionsToolbar={<BulkActionsToolbar><MyCustom /></BulkActionsToolbar>} />
```

## Components

- `BulkActionsToolbar`: container; hidden when no selection.
- `BulkActionsToolbarChildren`: default children (`BulkExportButton` + `BulkDeleteButton`).

## Behavior

- Appears fixed at bottom when `selectedIds.length > 0`.
- Unselect All button (X) clears selection.
- Translated count (`ra.action.bulk_actions`).

## Customization

Provide your own children:

```tsx
<BulkActionsToolbar>
  <BulkExportButton exporter={myExporter} />
  <BulkDeleteButton mutationMode="pessimistic" />
  <Button variant="outline">Archive</Button>
</BulkActionsToolbar>
```
