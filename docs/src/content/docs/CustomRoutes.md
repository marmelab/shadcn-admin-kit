---

title: CustomRoutes

---

`<CustomRoutes>` lets you define custom pages in your shadcn-admin-kit application, using react-router `<Routes>` elements.

## Usage

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

:::tip
Custom routes don’t automatically appear in the menu. You have to manually customize the menu if you want custom routes to be accessible from the menu.
:::

## Props

`<CustomRoutes>` accepts the following props:

| Prop       | Required | Type        | Default | Description                                                                          |
| ---------- | -------- | ----------- | ------- | ------------------------------------------------------------------------------------ |
| `children` | Required | `ReactNode` | -       | The custom routes to render                                                          |
| `noLayout` | Optional | `boolean`   | `false` | If true, the custom routes will not be wrapped in the main layout of the application |

To learn more about these props, refer to [the `<CustomRoutes>` component documentation](https://marmelab.com/ra-core/customroutes/) on the ra-core website.