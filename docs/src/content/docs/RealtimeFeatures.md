---
title: Real-time Features
---

`@react-admin/ra-core-ee` is part of the [React-Admin Enterprise Edition](https://marmelab.com/ra-enterprise/), and hosted in a private npm registry. You need to subscribe to one of the Enterprise Edition plans to install this package.

You will need a data provider that supports real-time subscriptions. Check out the [Data Provider Requirements](./RealtimeDataProviders.md) section for more information.

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

- <a href="https://marmelab.com/ra-core/usepublish/" target="_blank" rel="noreferrer"><code>usePublish</code></a>
- <a href="https://marmelab.com/ra-core/usesubscribetorecordlist/" target="_blank" rel="noreferrer"><code>useSubscribeToRecordList</code></a>
- <a href="https://marmelab.com/ra-core/usesubscribecallback/" target="_blank" rel="noreferrer"><code>useSubscribeCallback</code></a>
- <a href="https://marmelab.com/ra-core/usesubscribetorecord/" target="_blank" rel="noreferrer"><code>useSubscribeToRecord</code></a>
- <a href="https://marmelab.com/ra-core/usesubscribetorecordlist/" target="_blank" rel="noreferrer"><code>useSubscribeToRecordList</code></a>

## Live Updates

Ra-realtime provides **live updates** via specialized hooks and components. This means that when a user edits a resource, the other users working on the same resource see the changes in real-time whether they are in a list, a show view, or an edit view.

For instance, include a `<ListLiveUpdate>` within a `<ListBase>` to have a list refreshing automatically when an element is added, updated, or deleted:

```tsx {2, 7}
import { List } from "@/components/admin/list";
import { ListLiveUpdate } from "@react-admin/ra-core-ee";

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
- <a href="https://marmelab.com/ra-core/usegetlistlive/" target="_blank" rel="noreferrer"><code>useGetListLive</code></a>
- <a href="https://marmelab.com/ra-core/usegetonelive/" target="_blank" rel="noreferrer"><code>useGetOneLive</code></a>

## Locks

And last but not least, `@react-admin/ra-core-ee` provides a **lock mechanism** to prevent two users from editing the same resource at the same time.

<video controls autoplay playsinline muted loop class="w-full aspect-600/258">
  <source src="https://react-admin-ee.marmelab.com/assets/locks-demo.mp4" type="video/mp4"/>
  Your browser does not support the video tag.
</video>

A user can lock a resource, either by voluntarily asking for a lock or by editing a resource. When a resource is locked, other users can't edit it. When the lock is released, other users can edit the resource again.

```tsx
import { Form, useCreate, useGetIdentity, useRecordContext } from "ra-core";
import { useGetLockLive } from "@react-admin/ra-core-ee";
import { TextInput, SelectInput } from "@components/admin/TextInput";

export const NewMessageForm = () => {
  const [create, { isLoading: isCreating }] = useCreate();
  const record = useRecordContext();

  const { data: lock } = useGetLockLive("tickets", { id: record.id });
  const { identity } = useGetIdentity();
  const isFormDisabled = lock && lock.identity !== identity?.id;

  const [doLock] = useLockOnCall({ resource: "tickets" });
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

- <a href="https://marmelab.com/ra-core/uselock/" target="_blank" rel="noreferrer"><code>useLock</code></a>
- <a href="https://marmelab.com/ra-core/useunlock/" target="_blank" rel="noreferrer"><code>useUnlock</code></a>
- <a href="https://marmelab.com/ra-core/usegetlock/" target="_blank" rel="noreferrer"><code>useGetLock</code></a>
- <a href="https://marmelab.com/ra-core/usegetlocklive/" target="_blank" rel="noreferrer"><code>useGetLockLive</code></a>
- <a href="https://marmelab.com/ra-core/usegetlocks/" target="_blank" rel="noreferrer"><code>useGetLocks</code></a>
- <a href="https://marmelab.com/ra-core/usegetlockslive/" target="_blank" rel="noreferrer"><code>useGetLocksLive</code></a>
- <a href="https://marmelab.com/ra-core/uselockoncall/" target="_blank" rel="noreferrer"><code>useLockOnCall</code></a>
- <a href="https://marmelab.com/ra-core/uselockonmount/" target="_blank" rel="noreferrer"><code>useLockOnMount</code></a>
