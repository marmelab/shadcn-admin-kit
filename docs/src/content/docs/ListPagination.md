---
title: "ListPagination"
---

The default pagination component for List pages.

## Usage

The `<List>` component already uses `<ListPagination>` by default. If you need to override the predefined page size options, override the `<List pagination>` prop:

```jsx
import { List, ListPagination } from '@/components/admin';    

const PostListPagination = () => (
    <ListPagination rowsPerPageOptions={[5, 10, 25]} />
);

export const PostList = () => (
    <List pagination={<PostListPagination />}>
        {/* ... */}
    </List>
);
```

Other components that create a `ListContext`, like [`<ReferenceManyField>`](./ReferenceManyField.md), don't include pagination by default. You can use `<ListPagination>` to add pagination to them:

```tsx {13}
import { Show, TextField, ReferenceManyField, DataTable, ListPagination } from '@/components/admin';

export const UserShow = () => (
    <Show>
        <div className="flex flex-col gap-4">
            <TextField source="name" />
            <ReferenceManyField reference="posts" target="user_id">
                <DataTable>
                    <DataTable.Col source="id" />
                    <DataTable.Col source="title" />
                    <DataTable.Col source="published" type="boolean" />
                </DataTable>
                <ListPagination />
            </ReferenceManyField>
        </div>
    </Show>
);
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `rowsPerPageOptions` | Optional | `number[]` | `[10, 25, 50, 100]` | Page size options |
| `className` | Optional | `string` | - | Wrapper classes |

## Custom Pagination
