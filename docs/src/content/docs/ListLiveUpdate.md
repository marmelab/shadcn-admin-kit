---
title: 'ListLiveUpdate'
---

`<ListLiveUpdate>` is an [Enterprise Edition](https://react-admin-ee.marmelab.com) component that refreshes its parent `ListContext` (e.g in a [`<List>`](./List.md)) when a record is created, updated, or deleted.

## Usage

Add the `<ListLiveUpdate>` in your `<List>` children:

```tsx
import { DataTable } from '@/components/admin/data-table';
import { List } from '@/components/admin/list';

import { ListLiveUpdate } from '@react-admin/ra-core-ee';

const PostList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="title" />
        </DataTable>
        <ListLiveUpdate />
    </List>
);
```

To trigger refreshes of `<ListLiveUpdate>`, the API has to publish events containing at least the followings:

```js
{
    topic : '/resource/{resource}',
    event: {
        type: '{deleted || created || updated}',
        payload: { ids: [{listOfRecordIdentifiers}]},
    }
}
```

This also works with [`<ReferenceManyField>`](https://marmelab.com/react-admin/ReferenceManyField.html) or [`<ReferenceArrayField>`](https://marmelab.com/react-admin/ReferenceArrayField.html):

```tsx
import { DataTable } from '@/components/admin/data-table';
import { List } from '@/components/admin/list';
import { TextField } from '@/components/admin/text-field';

import {
    ReferenceManyFieldBase,
    ListLiveUpdate,
} from '@react-admin/ra-core-ee';

const AuthorShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="first_name" />
            <TextField source="last_name" />
            <ReferenceManyFieldBase
                reference="books"
                target="author_id"
                label="Books"
            >
                <DataTable>
                    <DataTable.Col source="title" />
                    <DataTable.Col source="published_at" field={DateField} />
                </DataTable>
                <ListLiveUpdate />
            </ReferenceManyFieldBase>
        </SimpleShowLayout>
    </Show>
);
```

## `onEventReceived`

The `<ListLiveUpdate>` allows you to customize the side effects triggered when it receives a new event, by passing a function to the `onEventReceived` prop:

```tsx
import { DataTable } from '@/components/admin/data-table';
import { List } from '@/components/admin/list';

import { useNotify, useRefresh } from 'ra-core';
import {
    ReferenceManyFieldBase,
    ListLiveUpdate,
} from '@react-admin/ra-core-ee';

const PostList = () => {
    const notify = useNotify();
    const refresh = useRefresh();

    const handleEventReceived = (event) => {
        const count = get(event, 'payload.ids.length', 1);
        notify(`${count} items updated by another user`);
        refresh();
    };

    return (
        <List>
            <DataTable>
                <DataTable.Col source="title" />
            </DataTable>
            <ListLiveUpdate onEventReceived={handleEventReceived} />
        </List>
    );
};
```
