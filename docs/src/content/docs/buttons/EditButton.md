---
title: "EditButton"
---

Link button to the edit page of the current record.

## Usage

Use it inside a `RecordContext`, for example in the actions of a `<Show>` view, or in the rows of a `<DataTable>`.

```tsx {9}
import { DataTable, EditButton } from '@/components/admin';

const PostList = () => (
  <DataTable>
    <DataTable.Col source="title" />
    <DataTable.Col source="author" />
    <DataTable.Col source="published_at" />
    <DataTable.Col>
      <EditButton />
    </DataTable.Col>
  </DataTable>
);
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `label` | Optional | `string` | `ra.action.edit` | i18n key / label |
| `record` | Optional | `RaRecord` | From context | Record used for id |
| `resource` | Optional | `string` | From context | Resource name |
