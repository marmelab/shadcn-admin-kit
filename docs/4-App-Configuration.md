# Application Configuration

Three core components let you configure your Shadcn Admin Kit application:

- [`<Admin>`](#admin): The root component of your application, which sets up the data provider, authentication, and other global settings.
- [`<Resource>`](#resource): Defines the CRUD routes of the application.
- [`<CustomRoutes>`](#customroutes): Allows you to define custom routes in your application, enabling you to create pages that are not directly tied to a resource.

## `<Admin>`

`<Admin>` creates a series of context providers to allow its children to access the app configuration. It renders the main routes and layout. It delegates the rendering of the content area to its `<Resource>` children.

`<Admin>` requires only a dataProvider prop, and at least one child `<Resource>` to work. Here is the most basic example:

```jsx
// in src/App.js
import { Admin } from "@/components/admin";
import { Resource } from 'ra-core';
import simpleRestProvider from 'ra-data-simple-rest';

import { PostList } from './posts';

const App = () => (
    <Admin dataProvider={simpleRestProvider('http://path.to.my.api')}>
        <Resource name="posts" list={PostList} />
    </Admin>
);

export default App;
```

`<Admin>` children can be `<Resource>` and `<CustomRoutes>` elements.

Three main props lets you configure the core features of the `<Admin>` component:

- `dataProvider` for data fetching
- `authProvider` for security and permissions
- `i18nProvider` for translations and internationalization

Here are all the props accepted by the component:

| Prop                  | Required | Type            | Default              | Description                                                         |
|---------------------- |----------|---------------- |--------------------- |-------------------------------------------------------------------- |
| `dataProvider`        | Required | `DataProvider`  | -                    | The data provider for fetching resources                            |
| `children`            | Required | `ReactNode`     | -                    | The routes to render                                                |
| `accessDenied`        | Optional | `Component`     | -                    | The component displayed when users are denied access to a page      |
| `authCallbackPage`    | Optional | `Component`     | `AuthCallback`       | The content of the authentication callback page                     |
| `authenticationError` | Optional | `Component`     | -                    | The component when an authentication error occurs                   |
| `authProvider`        | Optional | `AuthProvider`  | -                    | The authentication provider for security and permissions            |
| `basename`            | Optional | `string`        | -                    | The base path for all URLs                                          |
| `catchAll`            | Optional | `Component`     | `NotFound`           | The fallback component for unknown routes                           |
| `dashboard`           | Optional | `Component`     | -                    | The content of the dashboard page                                   |
| `darkTheme`           | Optional | `object`        | `default DarkTheme`  | The dark theme configuration                                        |
| `defaultTheme`        | Optional | `boolean`       | `false`              | Flag to default to the light theme                                  |
| `disableTelemetry`    | Optional | `boolean`       | `false`              | Set to `true` to disable telemetry collection                       |
| `error`               | Optional | `Component`     | -                    | A React component rendered in the content area in case of error     |
| `i18nProvider`        | Optional | `I18NProvider`  | -                    | The internationalization provider for translations                  |
| `layout`              | Optional | `Component`     | `Layout`             | The content of the layout                                           |
| `loginPage`           | Optional | `Component`     | `LoginPage`          | The content of the login page                                       |
| `notification`        | Optional | `Component`     | `Notification`       | The notification component                                          |
| `queryClient`         | Optional | `QueryClient`   | -                    | The react-query client                                              |
| `ready`               | Optional | `Component`     | `Ready`              | The content of the ready page                                       |
| `requireAuth`         | Optional | `boolean`       | `false`              | Flag to require authentication for all routes                       |
| `store`               | Optional | `Store`         | -                    | The Store for managing user preferences                             |
| `theme`               | Optional | `object`        | `default LightTheme` | The main (light) theme configuration                                |
| `title`               | Optional | `string`        | -                    | The error page title                                                |

To learn more about these props, refer to [the `<Admin>`component documentation](https://marmelab.com/react-admin/Admin.html) on th react-admin website.

## `<Resource>`

`<Resource>` components define the CRUD routes of a shadcn-admin-kit application.

A *resource* is a string that refers to an entity type (like ‘products’, ‘subscribers’, or ‘tags’). *Records* are objects with an `id` field, and two records of the same resource have the same field structure (e.g. all posts records have a title, a publication date, etc.).

A `<Resource>` component has 3 responsibilities:

- It defines the CRUD routes of a given resource (to display a list of records, the details of a record, or to create a new one).
- It creates a context that lets every descendant component know the current resource name (this context is called ResourceContext).
- It stores the resource definition (its name, icon, and label) inside a shared context (this context is called ResourceDefinitionContext).

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

The routes call the following dataProvider methods:

- `list` calls `getList()` on mount
- `show` calls `getOne()` on mount
- `edit` calls `getOne()` on mount, and `update()` or `delete()` on submission
- `create` calls `create()` on submission

Tip: Which API endpoint does a resource rely on? The `<Resource>` component doesn’t know this mapping - it’s the `dataProvider`’s job to define it.

`<Resource>` accepts the following props:

| Prop   | Required | Type | Default  | Description |
|--------|----------|------|----------|-------------|
| `name` | Required | `string` | - | The name of the resource, used to determine the API endpoint and the URL for the resource |
| `list` |  | `React.ComponentType` | - | The component to render for the list view |
| `create` |  | `React.ComponentType` | - | The component to render for the create view |
| `edit` |  | `React.ComponentType` | - | The component to render for the edit view |
| `show` |  | `React.ComponentType` | - | The component to render for the show view |
| `record Representation` |  | `string` or `function` or `React.ComponentType` | - | The representation of a record to use in the UI |
| `icon` |  | `React.ComponentType` | - | The component to render in the menu |
| `options` |  | `object` | - | Additional options for the resource |
| `children` |  | `Route` | - | Sub-routes for the resource |

To learn more about these props, refer to [the `<Resource>` component documentation](https://marmelab.com/react-admin/Resource.html) on the react-admin website.

## `<CustomRoutes>`

`<CustomRoutes>` Lets you define custom pages in your shadcn-admin-kit application, using react-router `<Routes>` elements.

To register your own routes, pass one or several `<CustomRoutes>` elements as children of `<Admin>`. Declare as many react-router `<Route>` as you want inside them. Alternatively, you can add your custom routes to resources. They will be available under the resource prefix.

```jsx
// in src/App.js
import { Admin } from "@/components/admin";
import { Resource, CustomRoutes } from 'ra-core';
import { Route } from "react-router";

import { dataProvider } from './dataProvider';
import posts from './posts';
import comments from './comments';
import { Settings } from './Settings';
import { Profile } from './Profile';

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="posts" {...posts} />
        <Resource name="comments" {...comments} />
        <CustomRoutes>
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
        </CustomRoutes>
    </Admin>
);

export default App;
```

Now, when a user browses to `/settings` or `/profile`, the components you defined will appear in the main part of the screen.

**Tip**: Custom routes don’t automatically appear in the menu. You have to manually customize the menu if you want custom routes to be accessible from the menu.

`<CustomRoutes>` accepts the following props:

| Prop   | Required | Type | Default  | Description |
|--------|----------|------|----------|-------------|
| `children` | Required | `ReactNode` | - | The custom routes to render |
| `noLayout` | Optional | `boolean` | `false` | If true, the custom routes will not be wrapped in the main layout of the application |

To learn more about these props, refer to [the `<CustomRoutes>` component documentation](https://marmelab.com/react-admin/CustomRoutes.html) on the react-admin website.