---
title: "ExportButton"
---

Exports the current list, with filters applied, but without pagination.

It relies on [the `exporter` function](../page/List.md#exported-data) passed to the `<List>` component, via the `ListContext`. It's disabled for empty lists.

## Usage

By default, the `<ExportButton>` is included in the List actions.

You can add it to a custom actions toolbar:

```jsx {7}
import { CreateButton, ExportButton, TopToolbar } from '@/components/admin';

const PostListActions = () => (
    <>
        <FilterButton />
        <CreateButton />
        <ExportButton />
    </>
);

export const PostList = () => (
    <List actions={<PostListActions />}>
        ...
    </List>
);
```

It calls `dataProvider.getList()` with `perPage=maxResults` then invokes `exporter(data, fetchRelatedRecords, dataProvider, resource)`.

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `className` | Optional | `string` | `cursor-pointer` | Extra classes |
| `exporter` | Optional | `Exporter` | From ListContext | Custom exporter function |
| `icon` | Optional | `ReactNode` | Download icon | Custom icon |
| `label` | Optional | `string` | `ra.action.export` | i18n key |
| `maxResults` | Optional | `number` | `1000` | Max records to fetch |
| `meta` | Optional | `any` | - | Provider meta parameter |
| `onClick` | Optional | `(e)=>void` | - | Extra click handler |
