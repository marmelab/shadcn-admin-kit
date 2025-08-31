---
title: "ColumnsButton"
---

Lets the user choose the visible columns in a `<DataTable>`, and reorder them.

## Usage

Use it in conjunction with a `<DataTable>` inside a `<List>`:

```tsx {6}
import { List, DataTable, EditButton, CreateButton, ExportButton, ColumnsButton } from '@/components/admin';

const PostsList = () => (
    <List
        actions={<>
            <ColumnsButton />
            <CreateButton />
            <ExportButton />
        </>}
    >
        <DataTable>
            <DataTable.Col source="title" />
            <DataTable.Col source="body" />
            <DataTable.Col source="updated_at" />
            <EditButton />
        </DataTable>
    </List>
);
```

It persists the user choices in the Store (usually in `localStorage`).

If yoa page has multiple `<DataTable>` components, use the `storeKey` prop to associate each button with its data table:

```tsx {3,8}
<List
    actions={<>
        <ColumnsButton storeKey="posts-list" />
        <CreateButton />
        <ExportButton />
    </>}
>
    <DataTable storeKey="posts-list">
        ...
    </DataTable>
</List>
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `icon` | Optional | `ReactNode` | Columns icon | Custom icon |
| `label` | Optional | `string` | `ra.action.columns` | Button label key |
| `resource` | Optional | `string` | inferred | Resource name for i18n |
| `storeKey` | Optional | `string` | - | Key for persisted column visibility state |
