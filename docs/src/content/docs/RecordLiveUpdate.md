---
title: 'RecordLiveUpdate'
---

`<RecordLiveUpdate>` is a component that refreshes its parent `RecordContext` in a [`<Show>`](./Show.md) view when a record is updated.

This feature requires a valid [Enterprise Edition](https://marmelab.com/ra-enterprise/) subscription.

## Creating the Component

The `LiveRecordUpdate` component can be created using the <a href="https://marmelab.com/ra-core/usesubscribetorecord/" target="_blank" rel="noreferrer">`useSubscribeToRecord</a> from `@react-admin/ra-core-ee`. Here is an example of such a `RecordLiveUpdate` component:

```tsx
// src/components/admin/record-live-update.tsx

import { useSubscribeToRecord } from '@react-admin/ra-core-ee';
import { Identifier, useShowContext } from 'ra-core';
import { useCallback } from 'react';

export const RecordLiveUpdate = (props: RecordLiveUpdateProps) => {
    const { refetch } = useShowContext();
    const handleUpdate = useCallback(() => {
        refetch();
    }, [refetch]);

    useSubscribeToRecord(handleUpdate, props.resource, props.id);

    return null;
};

type RecordLiveUpdateProps = {
    resource?: string;
    id?: Identifier;
};
```

## Usage

Add the `<RecordLiveUpdate>` in your `<Show>` children:

```tsx
import { TextField } from '@/components/admin/data-table';
import { RecordLiveUpdate } from '@/components/admin/record-live-update';
import { Show } from '@/components/admin/show';

const PostList = () => (
    <Show>
        <TextField source="title" />
        <RecordLiveUpdate />
    </Show>
);
```

To trigger refreshes of `<RecordLiveUpdate>`, the API has to publish events containing at least the followings:

```js
{
    topic : '/resource/{resource}/{id}',
    event: {
        type: 'updated',
        payload: { ids: [{listOfRecordIdentifiers}]},
    }
}
```
