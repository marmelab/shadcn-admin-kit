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

On click, the button navigates to the `edit` route of the current resource and record (e.g., `/posts/123/edit`).

::tip
In a `<DataTable>`, you can replace a column with an `<EditButton>` by using the `rowClick` prop to make the whole row clickable and navigate to the edit page:

```tsx
<DataTable rowClick="edit">
    <DataTable.Col source="title" />
    <DataTable.Col source="author" />
    <DataTable.Col source="published_at" />
</DataTable>
```

::/tip

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `label` | Optional | `string` | `ra.action.edit` | i18n key / label |
| `record` | Optional | `RaRecord` | From context | Record used for id |
| `resource` | Optional | `string` | From context | Resource name |
