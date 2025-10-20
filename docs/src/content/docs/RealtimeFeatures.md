---
title: Real-time Features
---

`@react-admin/ra-core-ee` provides hooks and UI components for collaborative applications where several people work in parallel. It allows publishing and subscribing to real-time events, updating views when another user pushes a change, notifying end users of events, and preventing data loss when two editors work on the same resource concurrently with locks.

You will need a data provider that supports real-time subscriptions. Check out the [Data Provider Requirements](./RealtimeDataProviders.md) section for more information.

This feature requires a valid [Enterprise Edition](https://marmelab.com/ra-enterprise/) subscription. Once subscribed, the instructions to configure our private repository can be found in the [React-Admin Enterprise Edition documentation](https://react-admin-ee.marmelab.com/setup).

Once you have configured our private repository, you can install the `@react-admin/ra-core-ee` with the following command:

```bash
# With NPM
npm install @react-admin/ra-core-ee

# With PNPM
pnpm add @react-admin/ra-core-ee

# With YARN
yarn add @react-admin/ra-core-ee
```

## Installation

```sh
npm install --save @react-admin/ra-core-ee
# or
yarn add @react-admin/ra-core-ee
```

## Publish/Subscribe

At its core, `@react-admin/ra-core-ee` provides a **pub/sub mechanism** to send and receive real-time events. Events are sent to a topic, and all subscribers to this topic receive the event.

```tsx
// on the publisher side
const [publish] = usePublish();
publish(topic, event);

// on the subscriber side
useSubscribe(topic, callback);
```

This package supports various realtime infrastructures ([Mercure](https://mercure.rocks/), [API Platform](https://api-platform.com/docs/admin/real-time-mercure/#real-time-updates-with-mercure), [supabase](https://supabase.com/), [Socket.IO](https://socket.io/), [Ably](https://ably.com/), and many more) thanks to the same _adapter_ approach as for CRUD methods. In fact, the `dataProvider` is used to send and receive events (see the [Data Provider Requirements](#data-provider-requirements) section for more information).

`@react-admin/ra-core-ee` provides a set of high-level hooks to make it easy to work with real-time events:

- [`usePublish`](https://marmelab.com/ra-core/usepublish/)
- [`useSubscribeToRecordList`](https://marmelab.com/ra-core/usesubscribetorecordlist/)
- [`useSubscribeCallback`](https://marmelab.com/ra-core/usesubscribecallback/)
- [`useSubscribeToRecord`](https://marmelab.com/ra-core/usesubscribetorecord/)
- [`useSubscribeToRecordList`](https://marmelab.com/ra-core/usesubscribetorecordlist/)

## Live Updates

Ra-realtime provides **live updates** via specialized hooks and components. This means that when a user edits a resource, the other users working on the same resource see the changes in real-time whether they are in a list, a show view, or an edit view.

For instance, include a `<ListLiveUpdate>` within a `<ListBase>` to have a list refreshing automatically when an element is added, updated, or deleted:

```tsx {2, 7}
import { List } from '@/components/admin/list';
import { ListLiveUpdate } from '@react-admin/ra-core-ee';

const PostList = () => (
    <List>
        ...other children
        <ListLiveUpdate />
    </List>
);
```

<video controls autoplay playsinline muted loop class="w-full aspect-600/220">
  <source src="https://react-admin-ee.marmelab.com/assets/useSubscribeToRecordList.mp4" type="video/mp4"/>
  Your browser does not support the video tag.
</video>

This feature leverages the following components and hooks:

- [`<ListLiveUpdate>`](./ListLiveUpdate.md)
- [`<RecordLiveUpdate>`](./RecordLiveUpdate.md)
- [`useGetListLive`](https://marmelab.com/ra-core/usegetlistlive/)
- [`useGetOneLive`](https://marmelab.com/ra-core/usegetonelive/)

## Locks

And last but not least, `@react-admin/ra-core-ee` provides a **lock mechanism** to prevent two users from editing the same resource at the same time.

<video controls autoplay playsinline muted loop class="w-full aspect-600/258">
  <source src="https://react-admin-ee.marmelab.com/assets/locks-demo.mp4" type="video/mp4"/>
  Your browser does not support the video tag.
</video>

A user can lock a resource, either by voluntarily asking for a lock or by editing a resource. When a resource is locked, other users can't edit it. When the lock is released, other users can edit the resource again.

```tsx
import { Form, useCreate, useGetIdentity, useRecordContext } from 'ra-core';
import { useGetLockLive } from '@react-admin/ra-core-ee';
import { TextInput, SelectInput } from '@components/admin/TextInput';

export const NewMessageForm = () => {
    const [create, { isLoading: isCreating }] = useCreate();
    const record = useRecordContext();

    const { data: lock } = useGetLockLive('tickets', { id: record.id });
    const { identity } = useGetIdentity();
    const isFormDisabled = lock && lock.identity !== identity?.id;

    const [doLock] = useLockOnCall({ resource: 'tickets' });
    const handleSubmit = (values: any) => {
        /* ... */
    };

    return (
        <Form onSubmit={handleSubmit}>
            <TextInput
                source="message"
                multiline
                onFocus={() => {
                    doLock();
                }}
                disabled={isFormDisabled}
            />
            <SelectInput
                source="status"
                choices={statusChoices}
                disabled={isFormDisabled}
            />
            <button type="submit" disabled={isCreating || isFormDisabled}>
                Submit
            </button>
        </Form>
    );
};
```

This feature leverages the following hooks:

- [`useLock`](https://marmelab.com/ra-core/uselock/)
- [`useUnlock`](https://marmelab.com/ra-core/useunlock/)
- [`useGetLock`](https://marmelab.com/ra-core/usegetlock/)
- [`useGetLockLive`](https://marmelab.com/ra-core/usegetlocklive/)
- [`useGetLocks`](https://marmelab.com/ra-core/usegetlocks/)
- [`useGetLocksLive`](https://marmelab.com/ra-core/usegetlockslive/)
- [`useLockOnCall`](https://marmelab.com/ra-core/uselockoncall/)
- [`useLockOnMount`](https://marmelab.com/ra-core/uselockonmount/)
