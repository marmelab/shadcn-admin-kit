---

title: Resource

---

`<Resource>` components define the CRUD routes of a shadcn-admin-kit application.

A *resource* is a string that refers to an entity type (like ‘products’, ‘subscribers’, or ‘tags’). *Records* are objects with an `id` field, and two records of the same resource have the same field structure (e.g. all posts records have a title, a publication date, etc.).

A `<Resource>` component has 3 responsibilities:

- It defines the CRUD routes of a given resource (to display a list of records, the details of a record, or to create a new one).
- It creates a context that lets every descendant component know the current resource name (this context is called ResourceContext).
- It stores the resource definition (its name, icon, and label) inside a shared context (this context is called ResourceDefinitionContext).

## Usage

`<Resource>` components can only be used as children of the `<Admin>` component.

For instance, the following admin app offers an interface to the resources exposed by the JSONPlaceholder API (posts, users, comments, and tags):

```jsx
import { Admin, ListGuesser, EditGuesser, ShowGuesser } from "@/components/admin";
import { Resource } from 'ra-core';
import jsonServerProvider from 'ra-data-json-server';

import { PostCreate, PostIcon } from './posts';
import { CommentIcon } from './comments';

const App = () => (
    <Admin dataProvider={jsonServerProvider('https://jsonplaceholder.typicode.com')}>
        {/* complete CRUD pages for posts */}
        <Resource name="posts" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} create={PostCreate} icon={PostIcon} />
        {/* read-only user list */}
        <Resource name="users" list={ListGuesser} />
        {/* no show page for the comments resource */}
        <Resource name="comments" list={ListGuesser} edit={EditGuesser} icon={CommentIcon} />
    </Admin>
);
```

:::note
`<Resource>` is a headless component, and must be imported from `ra-core` rather than `@/components/admin`.
:::

The routes call the following dataProvider methods:

- `list` calls `getList()` on mount
- `show` calls `getOne()` on mount
- `edit` calls `getOne()` on mount, and `update()` or `delete()` on submission
- `create` calls `create()` on submission

Tip: Which API endpoint does a resource rely on? The `<Resource>` component doesn’t know this mapping - it’s the `dataProvider`’s job to define it.

## Props

| Prop                    | Required | Type                                            | Default | Description                                                                               |
| ----------------------- | -------- | ----------------------------------------------- | ------- | ----------------------------------------------------------------------------------------- |
| `name`                  | Required | `string`                                        | -       | The name of the resource, used to determine the API endpoint and the URL for the resource |
| `list`                  |          | `React.ComponentType`                           | -       | The component to render for the list view                                                 |
| `create`                |          | `React.ComponentType`                           | -       | The component to render for the create view                                               |
| `edit`                  |          | `React.ComponentType`                           | -       | The component to render for the edit view                                                 |
| `show`                  |          | `React.ComponentType`                           | -       | The component to render for the show view                                                 |
| `record Representation` |          | `string` or `function` or `React.ComponentType` | -       | The representation of a record to use in the UI                                           |
| `icon`                  |          | `React.ComponentType`                           | -       | The component to render in the menu                                                       |
| `options`               |          | `object`                                        | -       | Additional options for the resource                                                       |
| `children`              |          | `Route`                                         | -       | Sub-routes for the resource                                                               |

To learn more about these props, refer to [the `<Resource>` component documentation](https://marmelab.com/ra-core/resource/) on the ra-core website.

## Lazy Loading

If you need to speed up the initial loading of your application, you may want to enable code splitting using [`React.lazy()`](https://react.dev/reference/react/lazy). The default Shadcn Admin Kit layout uses [`Suspense`](https://react.dev/reference/react/Suspense), so there is no special setup required to use lazy loaded components in `<Resource>`.

```tsx
// in src/App.js
import * as React from 'react';
import { Admin } from "@/components/admin";
import { Resource } from "ra-core";

import { dataProvider } from './dataProvider';

const OrderList = React.lazy(() => import('./orders/OrderList'));
const OrderEdit = React.lazy(() => import('./orders/OrderEdit'));

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="orders" list={OrderList} edit={OrderEdit} />
        ...
    </Admin>
);
```

When users navigate to the `/orders` route, Shadcn Admin Kit will display the [`<Loading>`](./Loading.md) component while the `OrderList` component is being loaded.

![Loading](./images/loading.png)
