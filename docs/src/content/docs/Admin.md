---

title: Admin

---

`<Admin>` is the root component of a `shadcn-admin-kit` application. It creates a series of context providers to allow its children to access the app configuration. It renders the main routes and layout. It delegates the rendering of the content area to its `<Resource>` children.

## Usage

`<Admin>` requires only a dataProvider prop, and at least one child `<Resource>` to work. Here is the most basic example:

```tsx
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

## Props

Here are all the props accepted by the component:

| Prop                  | Required | Type           | Default              | Description                                                     |
| --------------------- | -------- | -------------- | -------------------- | --------------------------------------------------------------- |
| `dataProvider`        | Required | `DataProvider` | -                    | The data provider for fetching resources                        |
| `children`            | Required | `ReactNode`    | -                    | The routes to render                                            |
| `accessDenied`        | Optional | `Component`    | -                    | The component displayed when users are denied access to a page  |
| `authCallbackPage`    | Optional | `Component`    | `AuthCallback`       | The content of the authentication callback page                 |
| `authenticationError` | Optional | `Component`    | -                    | The component when an authentication error occurs               |
| `authProvider`        | Optional | `AuthProvider` | -                    | The authentication provider for security and permissions        |
| `basename`            | Optional | `string`       | -                    | The base path for all URLs                                      |
| `catchAll`            | Optional | `Component`    | `NotFound`           | The fallback component for unknown routes                       |
| `dashboard`           | Optional | `Component`    | -                    | The content of the dashboard page                               |
| `darkTheme`           | Optional | `object`       | `default DarkTheme`  | The dark theme configuration                                    |
| `defaultTheme`        | Optional | `boolean`      | `false`              | Flag to default to the light theme                              |
| `disableTelemetry`    | Optional | `boolean`      | `false`              | Set to `true` to disable telemetry collection                   |
| `error`               | Optional | `Component`    | -                    | A React component rendered in the content area in case of error |
| `i18nProvider`        | Optional | `I18NProvider` | -                    | The internationalization provider for translations              |
| `layout`              | Optional | `Component`    | `Layout`             | The content of the layout                                       |
| `loginPage`           | Optional | `Component`    | `LoginPage`          | The content of the login page                                   |
| `notification`        | Optional | `Component`    | `Notification`       | The notification component                                      |
| `queryClient`         | Optional | `QueryClient`  | -                    | The react-query client                                          |
| `ready`               | Optional | `Component`    | `Ready`              | The content of the ready page                                   |
| `requireAuth`         | Optional | `boolean`      | `false`              | Flag to require authentication for all routes                   |
| `store`               | Optional | `Store`        | -                    | The Store for managing user preferences                         |
| `theme`               | Optional | `object`       | `default LightTheme` | The main (light) theme configuration                            |
| `title`               | Optional | `string`       | -                    | The error page title                                            |

To learn more about these props, refer to [the `<Admin>`component documentation](https://marmelab.com/react-admin/Admin.html) on th react-admin website.

