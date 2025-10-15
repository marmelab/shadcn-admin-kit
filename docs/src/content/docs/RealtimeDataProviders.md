---
title: Real-time Data Providers
---

To enable real-time features, the `dataProvider` must implement three new methods:

- `subscribe(topic, callback)`
- `unsubscribe(topic, callback)`
- `publish(topic, event)` (optional - publication is often done server-side)

These methods should return an empty Promise resolved when the action was acknowledged by the real-time bus.

In addition, to support the lock features, the `dataProvider` must implement 4 more methods:

- `lock(resource, { id, identity, meta })`
- `unlock(resource, { id, identity, meta })`
- `getLock(resource, { id, meta })`
- `getLocks(resource, { meta })`

#### Supabase Adapter

The `@react-admin/ra-core-ee` package contains a function augmenting a regular (API-based) `dataProvider` with real-time methods based on the capabilities of [Supabase](https://supabase.com/docs/guides/realtime).

This adapter subscribes to [Postgres Changes](https://supabase.com/docs/guides/realtime/extensions/postgres-changes), and transforms the events into the format expected by `@react-admin/ra-core-ee`.

```tsx
import {
  addRealTimeMethodsBasedOnSupabase,
  ListLiveUpdate,
} from "@react-admin/ra-core-ee";
import { supabaseDataProvider } from "ra-supabase";
import { createClient } from "@supabase/supabase-js";
import { CoreAdmin, Resource, ListBase } from "ra-core";

const supabaseClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

const dataProvider = supabaseDataProvider({
  instanceUrl: process.env.SUPABASE_URL,
  apiKey: process.env.SUPABASE_ANON_KEY,
  supabaseClient,
});

const realTimeDataProvider = addRealTimeMethodsBasedOnSupabase({
  dataProvider,
  supabaseClient,
});

export const App = () => {
  return (
    <CoreAdmin dataProvider={realTimeDataProvider}>
      <Resource name="sales" list={SaleList} />
    </CoreAdmin>
  );
};

const SaleList = () => (
  <List>
    {/* List view */}
    <ListLiveUpdate />
  </List>
);
```

:::tip
Realtime features are not enabled in Supabase by default, you need to enable them. This can be done either from the [Replication](https://app.supabase.com/project/_/database/replication) section of your Supabase Dashboard, or by running the following SQL query with the [SQL Editor](https://app.supabase.com/project/_/sql):
:::

```sql
begin;

-- remove the supabase_realtime publication
drop
  publication if exists supabase_realtime;

-- re-create the supabase_realtime publication with no tables
create publication supabase_realtime;

commit;

-- add a table to the publication
alter
  publication supabase_realtime add table sales;
alter
  publication supabase_realtime add table contacts;
alter
  publication supabase_realtime add table contactNotes;
```

Have a look at the Supabase [Replication Setup](https://supabase.com/docs/guides/realtime/extensions/postgres-changes#replication-setup) documentation section for more info.

`addRealTimeMethodsBasedOnSupabase` accepts the following parameters:

| Prop             | Required | Type             | Default | Description                                            |
| ---------------- | -------- | ---------------- | ------- | ------------------------------------------------------ |
| `dataProvider`   | Required | `DataProvider`   | -       | The base dataProvider to augment with realtime methods |
| `supabaseClient` | Required | `SupabaseClient` | -       | The Supabase JS Client                                 |

##### Custom Tokens

You may choose to sign your own tokens to customize claims that can be checked in your RLS policies. In order to use these custom tokens with `addRealTimeMethodsBasedOnSupabase`, you must pass `apikey` in both Realtime's `headers` and `params` when creating the `supabaseClient`.

Please follow the instructions from the [Supabase documentation](https://supabase.com/docs/guides/realtime/extensions/postgres-changes#custom-tokens) for more information about how to do so.

#### API-Platform Adapter

The `@react-admin/ra-core-ee` package contains a function augmenting a regular (API-based) `dataProvider` with real-time methods based on the capabilities of [API-Platform](https://api-platform.com/). Use it as follows:

```tsx
import { ListBase } from "ra-core";
import {
  HydraAdmin,
  ResourceGuesser,
  FieldGuesser,
  hydraDataProvider,
} from "@api-platform/admin";
import {
  ListLiveUpdate,
  addRealTimeMethodsBasedOnApiPlatform,
} from "@react-admin/ra-core-ee";

const dataProvider = hydraDataProvider({
  entrypoint: "https://localhost",
});
const realTimeDataProvider = addRealTimeMethodsBasedOnApiPlatform(
  // The original dataProvider (should be a hydra data provider passed by API-Platform)
  dataProvider,
  // The API-Platform Mercure Hub URL
  "https://localhost/.well-known/mercure",
  // JWT token to authenticate against the API-Platform Mercure Hub
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdfX0.obDjwCgqtPuIvwBlTxUEmibbBf0zypKCNzNKP7Op2UM",
  // The topic URL used by API-Platform (without a slash at the end)
  "https://localhost",
);

const App = () => {
  return (
    <HydraAdmin
      entrypoint="https://localhost"
      dataProvider={realTimeDataProvider}
    >
      <ResourceGuesser name="greetings" list={GreetingsList} />
    </HydraAdmin>
  );
};

// Example for connecting a list of greetings
const GreetingsList = () => <ListBase>{/* List view */}</ListBase>;
```

The `addRealTimeMethodsBasedOnApiPlatform` function also accepts an optional 5th argument allowing to customize the `transformTopicFromRaRealtime` function (responsible for transforming the `topic` argument from the `Admin` into a valid Mercure topic for Api Platform).

```ts
import { hydraDataProvider } from "@api-platform/admin";
import { addRealTimeMethodsBasedOnApiPlatform } from "@react-admin/ra-core-ee";

const dataProvider = hydraDataProvider({
  entrypoint: "https://localhost",
});

function myTransformTopicFromRaRealtime(topic: string): string {
  const [_basename, _resourcePrefix, resource, ...id] = topic.split("/");
  if (!id || id.length === 0) {
    return `/${resource}/{id}`;
  }
  const originId = id[2];
  return `/${resource}/${originId}`;
}

const realTimeDataProvider = addRealTimeMethodsBasedOnApiPlatform(
  dataProvider,
  "https://localhost/.well-known/mercure",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdfX0.obDjwCgqtPuIvwBlTxUEmibbBf0zypKCNzNKP7Op2UM",
  "https://localhost",
  // Pass the custom transformTopicFromRaRealtime function here
  myTransformTopicFromRaRealtime,
);
```

#### Mercure Adapter

The `@react-admin/ra-core-ee` package contains a function augmenting a regular (API-based) `dataProvider` with real-time methods based on [a Mercure hub](https://mercure.rocks/). Use it as follows:

```tsx
import { addRealTimeMethodsBasedOnMercure } from "@react-admin/ra-core-ee";
import { CoreAdmin } from "ra-core";

const realTimeDataProvider = addRealTimeMethodsBasedOnMercure(
  // original dataProvider
  dataProvider,
  // Mercure hub URL
  "http://path.to.my.api/.well-known/mercure",
  // JWT token to authenticate against the Mercure Hub
  "eyJhbGciOiJIUzI1NiJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdLCJzdWJzY3JpYmUiOlsiKiJdfX0.SWKHNF9wneXTSjBg81YN5iH8Xb2iTf_JwhfUY5Iyhsw",
);

const App = () => (
  <CoreAdmin dataProvider={realTimeDataProvider}>{/* ... */}</CoreAdmin>
);
```

#### Writing a Custom Adapter

If you're using another transport for real-time messages (WebSockets, long polling, GraphQL subscriptions, etc.), you'll have to implement `subscribe`, `unsubscribe`, and `publish` yourself in your `dataProvider`. As an example, here is an implementation using a local variable, that `@react-admin/ra-core-ee` uses in tests:

```ts
let subscriptions = [];

const dataProvider = {
  // regular dataProvider methods like getList, getOne, etc,
  // ...
  subscribe: async (topic, subscriptionCallback) => {
    subscriptions.push({ topic, subscriptionCallback });
    return Promise.resolve({ data: null });
  },

  unsubscribe: async (topic, subscriptionCallback) => {
    subscriptions = subscriptions.filter(
      (subscription) =>
        subscription.topic !== topic ||
        subscription.subscriptionCallback !== subscriptionCallback,
    );
    return Promise.resolve({ data: null });
  },

  publish: (topic, event) => {
    if (!topic) {
      return Promise.reject(new Error("missing topic"));
    }
    if (!event.type) {
      return Promise.reject(new Error("missing event type"));
    }
    subscriptions.map(
      (subscription) =>
        topic === subscription.topic &&
        subscription.subscriptionCallback(event),
    );
    return Promise.resolve({ data: null });
  },
};
```

You can check the behavior of the real-time components by using the default console logging provided in `addRealTimeMethodsInLocalBrowser`.

#### Topic And Event Format

You've noticed that all the `dataProvider` real-time methods expect a `topic` as the first argument. A `topic` is just a string, identifying a particular real-time channel. Topics can be used e.g. to dispatch messages to different rooms in a chat application or to identify changes related to a particular record.

Most realtime components deal with CRUD logic, so `@react-admin/ra-core-ee` subscribes to special topics named `resource/[name]` and `resource/[name]/[id]`. For your own events, use any `topic` you want.

The `event` is the name of the message sent from publishers to subscribers. An `event` should be a JavaScript object with a `type` and a `payload` field.

Here is an example event:

```js
{
    type: 'created',
    payload: 'New message',
}
```

For CRUD operations, `@react-admin/ra-core-ee` expects events to use the types 'created', 'updated', and 'deleted'.

#### CRUD Events

Realtime features have deep integration with Shadcn Admin Kit, where most of the logic concerns Creation, Update or Deletion (CRUD) of records. To enable this integration, your real-time backend should publish the following events:

- when a new record is created:

```js
{
    topic: `resource/${resource}`,
    event: {
        type: 'created',
        payload: { ids: [id]},
    },
}
```

- when a record is updated:

```js
{
    topic: `resource/${resource}/id`,
    event: {
        type: 'updated',
        payload: { ids: [id]},
    },
}
{
    topic: `resource/${resource}`,
    event: {
        type: 'updated',
        payload: { ids: [id]},
    },
}
```

- when a record is deleted:

```js
{
    topic: `resource/${resource}/id`,
    event: {
        type: 'deleted',
        payload: { ids: [id]},
    },
}
{
    topic: `resource/${resource}`,
    event: {
        type: 'deleted',
        payload: { ids: [id]},
    },
}
```

#### Lock Format

A `lock` stores the record that is locked, the identity of the locker, and the time at which the lock was acquired. It is used to prevent concurrent editing of the same record. A typical lock looks like this:

```js
{
    resource: 'posts',
    recordId: 123,
    identity: 'julien',
    createdAt: '2023-01-02T21:36:35.133Z',
}
```

The `dataProvider.getLock()` and `dataProvider.getLocks()` methods should return these locks.

As for the mutation methods (`dataProvider.lock()`, `dataProvider.unlock()`), they expect the following parameters:

- `resource`: the resource name (e.g. `'posts'`)
- `params`: an object containing the following
  - `id`: the record id (e.g. `123`)
  - `identity`: an identifier (string or number) corresponding to the identity of the locker (e.g. `'julien'`). This could be an authentication token for instance.
  - `meta`: an object that will be forwarded to the dataProvider (optional)

#### Locks Based On A Lock Resource

The `@react-admin/ra-core-ee` package offers a function augmenting a regular (API-based) `dataProvider` with locks methods based on a `locks` resource.

It will translate a `dataProvider.getLocks()` call to a `dataProvider.getList('locks')` call, and a `dataProvider.lock()` call to a `dataProvider.create('locks')` call.

The `lock` resource should contain the following fields:

```json
{
  "id": 123,
  "identity": "Toad",
  "resource": "people",
  "recordId": 18,
  "createdAt": "2020-09-29 10:20"
}
```

Please note that the `identity` and the `createdAt` formats depend on your API.

Here is how to use it in your Shadcn Admin Kit application:

```tsx
import { CoreAdmin } from "ra-core";
import { addLocksMethodsBasedOnALockResource } from "@react-admin/ra-core-ee";

const dataProviderWithLocks = addLocksMethodsBasedOnALockResource(
  dataProvider, // original dataProvider
);

const App = () => (
  <CoreAdmin dataProvider={dataProviderWithLocks}>{/* ... */}</CoreAdmin>
);
```

#### Calling the `dataProvider` Methods Directly

Once you've set a real-time `dataProvider`, you can call the real-time methods in your React components via the `useDataProvider` hook.

For instance, here is a component displaying messages posted to the 'messages' topic in real time:

```tsx
import React, { useState } from "react";
import { useDataProvider, useNotify } from "ra-core";

const MessageList = () => {
  const notify = useNotify();
  const [messages, setMessages] = useState([]);
  const dataProvider = useDataProvider();

  useEffect(() => {
    const callback = (event) => {
      // event is like
      // {
      //     topic: 'messages',
      //     type: 'created',
      //     payload: 'New message',
      // }
      setMessages((messages) => [...messages, event.payload]);
      notify("New message");
    };
    // subscribe to the 'messages' topic on mount
    dataProvider.subscribe("messages", callback);
    // unsubscribe on unmount
    return () => dataProvider.unsubscribe("messages", callback);
  }, [setMessages, notify, dataProvider]);

  return (
    <ul>
      {messages.map((message, index) => (
        <li key={index}>{message}</li>
      ))}
    </ul>
  );
};
```

And here is a button for publishing an event to the `messages` topic. All the subscribers to this topic will execute their callback:

```tsx
import React from "react";
import { useDataProvider, useNotify } from "ra-core";

const SendMessageButton = () => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const handleClick = () => {
    dataProvider
      .publish("messages", { type: "created", payload: "New message" })
      .then(() => notify("Message sent"));
  };

  return <button onClick={handleClick}>Send new message</button>;
};
```

**Tip**: You should not need to call `publish()` directly very often. Most real-time backends publish events in reaction to a change in the data. So the previous example is fictive. In reality, a typical `<SendMessageButton>` would simply call `dataProvider.create('messages')`, and the API would create the new message AND publish the 'created' event to the real-time bus.

### Hooks

#### `usePublish`

Get a callback to publish an event on a topic. The callback returns a promise that resolves when the event is published.

`usePublish` calls `dataProvider.publish()` to publish the event. It leverages react-query's `useMutation` hook to provide a callback.

**Note**: Events should generally be published by the server, in reaction to an action by an end user. They should seldom be published directly by the client. This hook is provided mostly for testing purposes, but you may use it in your own custom components if you know what you're doing.

##### Usage

`usePublish` returns a callback with the following signature:

```tsx
const publish = usePublish();
publish(topic, event, options);
```

For instance, in a chat application, when a user is typing a message, the following component publishes a `typing` event to the `chat/[channel]` topic:

```tsx
import { useInput, useGetIdentity } from "ra-core";
import { usePublish } from "@react-admin/ra-core-ee";

const MessageInput = ({ channel }) => {
  const [publish, { isLoading }] = usePublish();
  const { id, field, fieldState } = useInput({ source: "message" });
  const { identity } = useGetIdentity();

  const handleUserInput = (event) => {
    publish(`chat/${channel}`, {
      type: "typing",
      payload: { user: identity },
    });
  };

  return (
    <label htmlFor={id}>
      Type your message
      <input id={id} {...field} onInput={handleUserInput} />
    </label>
  );
};
```

The event format is up to you. It should at least contain a `type` property and may contain a `payload` property. The `payload` property can contain any data you want to send to the subscribers.

Some hooks and components in this package are specialized to handle "CRUD" events, which are events with a `type` property set to `created`, `updated` or `deleted`. For instance:

```js
{
    topic: `resource/${resource}/id`,
    event: {
        type: 'deleted',
        payload: { ids: [id]},
    },
}
```

See the [CRUD events](#crud-events) section for more details.

##### Return Value

`usePublish` returns an array with the following values:

- `publish`: The callback to publish an event to a topic.
- `state`: The state of the mutation ([see react-query documentation](https://react-query-v3.tanstack.com/reference/useMutation)). Notable properties:
  - `isLoading`: Whether the mutation is loading.
  - `error`: The error if the mutation failed.
  - `data`: The published event if the mutation succeeded.

```tsx
const [publish, { isLoading, error, data }] = usePublish();
```

##### Callback Parameters

The `publish` callback accepts the following parameters:

- `topic`: The topic to publish the event on.
- `event`: The event to publish. It must contain a `type` property.
- `options`: `useMutation` options ([see react-query documentation](https://react-query-v3.tanstack.com/reference/useMutation)). Notable properties:
  - `onSuccess`: A callback to call when the event is published. It receives the published event as its first argument.
  - `onError`: A callback to call when the event could not be published. It receives the error as its first argument.
  - `retry`: Whether to retry on failure. Defaults to `0`.

```tsx
const [publish] = usePublish();
publish(
  "chat/general",
  {
    type: "message",
    payload: { user: "John", message: "Hello!" },
  },
  {
    onSuccess: (event) => console.log("Event published", event),
    onError: (error) => console.log("Could not publish event", error),
    retry: 3,
  },
);
```
