---
title: 'ListLiveUpdate'
---

`<ListLiveUpdate>` is an [Enterprise Edition](https://react-admin-ee.marmelab.com) component that refreshes its parent `ListContext` (e.g in a [`<List>`](./List.md)) when a record is created, updated, or deleted.

Once subscribed to the [Enterprise Edition](https://marmelab.com/ra-enterprise/), the instructions to configure our private repository can be found in the [React-Admin Enterprise Edition documentation](https://react-admin-ee.marmelab.com/setup).

Once you have configured our private repository, you can install the `@react-admin/ra-core-ee` with the following command:

```bash
# With NPM
npm install @react-admin/ra-core-ee

# With PNPM
pnpm add @react-admin/ra-core-ee

# With YARN
yarn add @react-admin/ra-core-ee
```

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

To trigger a refresh of `<ListLiveUpdate>`, the API has to publish an event containing at least the following data:

```js
{
    topic : '/resource/{resource}',
    event: {
        type: '{deleted || created || updated}',
        payload: { ids: [{listOfRecordIdentifiers}]},
    }
}
```

This also works with [`<ReferenceManyField>`](./ReferenceManyField.md) or [`<ReferenceArrayField>`](./ReferenceArrayField.md):

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

## Props

| Prop              | Required | Type       | Default | Description                                                                |
| ----------------- | -------- | ---------- | ------- | -------------------------------------------------------------------------- |
| `onEventReceived` | Optional | `function` | -       | A function that allows to customize side effects when an event is received |

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
