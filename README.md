# Shadcn Admin Kit

![Screenshot](./public/shadcn-admin-kit.webp)

A component kit to build your Admin app with [shadcn/ui](https://ui.shadcn.com/).

[![Online Demo]][OnlineDemoLink]
[![Documentation]][DocumentationLink]

[Online Demo]: https://img.shields.io/badge/Online_Demo-blue?style=for-the-badge
[Documentation]: https://img.shields.io/badge/Documentation-blueviolet?style=for-the-badge

[OnlineDemoLink]: https://marmelab.com/shadcn-admin-kit/ 'Online Demo'
[DocumentationLink]: ./docs/1-Install.md 'Documentation'

## Features

- CRUD: working List, Show, Edit and Create pages
- Data Table with sorting, filtering, export, bulk actions, and pagination
- Form components with data binding and validation
- View and edit references (one-to-many, many-to-one)
- Sidebar menu
- Login page (compatible with any authentication backend)
- Dashboard page
- Automatically guess the code based on the data, using *Guessers*
- i18n support
- Light/dark mode
- Responsive
- Accessible
- Compatible with any API (REST, GraphQL, etc.)

## Tech Stack

- UI: [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- Icons: [Lucide](https://lucide.dev/)
- Routing: [React Router](https://reactrouter.com/)
- API calls: [TanStack Query](https://tanstack.com/query/latest/)
- Forms & Validation: [React Hook Form](https://react-hook-form.com/)
- Admin Framework: [React Admin](https://marmelab.com/react-admin/)
- Type safety: [TypeScript](https://www.typescriptlang.org/)
- Build tool: [Vite](https://vitejs.dev/) (SPA mode)

## Getting started

Check the [Quick Start Guide](./docs/2-Quick-Start-Guide.md) for a step-by-step guide to set up your first Admin app with `shadcn-admin-kit`.

## Usage

Read the [documentation](./docs/1-Install.md) to learn how to use `shadcn-admin-kit` in your project. The following sections provide a brief overview of the main concepts.

### Use `<Admin>` As Root Component

The entry point of your application is the `<Admin>` component. It allows to configure the application adapters, routes, and UI.

You'll need to specify a Data Provider to let the Admin know how to fetch data from your API. A Data Provider is an abstraction that allows you to connect your Admin to any API, whether it's REST, GraphQL, or any other protocol. You can choose from any of the [50+ Data Providers](https://marmelab.com/react-admin/DataProviderList.html), and you can even [build your own](https://marmelab.com/react-admin/DataProviderWriting.html).

The following example uses a simple REST adapter called `ra-data-simple-rest`:

```tsx
import { Admin } from "@/components/admin/admin";
import simpleRestProvider from 'ra-data-simple-rest';

const dataProvider = simpleRestProvider('http://path.to.my.api');

export const App = () => (
  <Admin dataProvider={dataProvider}>
    {/* Resources go here */}
  </Admin>
);
```

### Declare Resources

Then, you'll need to declare the routes of the application. `shadcn-admin-kit` allows to define CRUD routes (list, edit, create, show), and custom routes. Use the `<Resource>` component from `ra-core` (which was automatically added to your dependencies) to define CRUD routes.

For each resource, you can specify a `name` (which will map to the API endpoint) and the `list`, `edit`, `create` and `show` components to use.

If you don't know where to start, you can use the built-in **guessers** to configure the admin for you! The guessers will automatically generate code based on the data returned by your API.

```tsx
import { Resource } from "ra-core";
import simpleRestProvider from 'ra-data-simple-rest';
import { Admin } from "@/components/admin/admin";
import { ListGuesser } from "@/components/admin/list-guesser";
import { ShowGuesser } from "@/components/admin/show-guesser";
import { EditGuesser } from "@/components/admin/edit-guesser";

const dataProvider = simpleRestProvider('http://path.to.my.api');

export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="posts"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
  </Admin>
);
```

The guessers will print out the guessed component code in the console. You can then copy and paste it into your code to create the components to use as list, edit and show view.

```jsx
// Example output
Guessed List:

import { DataTable } from "@/components/DataTable";
import { List } from "@/components/List";

export const CategoryList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="name" />
        </DataTable>
    </List>
);
```

### Adding Authentication

You can configure authentication in your Admin by using the `authProvider` prop. There are many [authProviders](https://marmelab.com/react-admin/AuthProviderList.html) you can choose from, and you can also [build your own](https://marmelab.com/react-admin/AuthProviderWriting.html).

Once your authProvider is set up, you can pass it to the `authProvider` prop, and the `<Admin>` component will automatically display the login page when the user is not authenticated.

```tsx
import { Resource } from "ra-core";
import simpleRestProvider from 'ra-data-simple-rest';
import { Admin } from "@/components/admin/admin";
import { ListGuesser } from "@/components/admin/list-guesser";
import { authProvider } from './authProvider';

export const App = () => (
  <Admin
    dataProvider={simpleRestProvider('http://path.to.my.api')}
    authProvider={authProvider}
  >
    <Resource
      name="posts"
      list={ListGuesser}
    />
  </Admin>
);
```

### Adding a Dashboard

You can add a dashboard to your Admin by using the `dashboard` prop. The dashboard can be any React component.

```tsx
import { Resource } from "ra-core";
import simpleRestProvider from 'ra-data-simple-rest';
import { Admin } from "@/components/admin/admin";
import { ListGuesser } from "@/components/admin/list-guesser";

const Dashboard = () => (
  <div>
    <h1>My Dashboard</h1>
  </div>
);

export const App = () => (
  <Admin
    dataProvider={simpleRestProvider('http://path.to.my.api')}
    dashboard={Dashboard}
  >
    <Resource
      name="posts"
      list={ListGuesser}
    />
  </Admin>
);
```

### Filtering the list

You can filter the list of records by using the `filters` prop on the `<List>` component. The `filters` prop needs to be an array of input components.

```tsx
import { AutocompleteInput } from "@/components/admin/autocomplete-input";
import { List } from "@/components/admin/list";
import { ReferenceInput } from "@/components/admin/reference-input";
import { TextInput } from "@/components/admin/text-input";

const filters = [
  <TextInput source="q" placeholder="Search products..." label={false} />,
  <ReferenceInput
    source="category_id"
    reference="categories"
    sort={{ field: "name", order: "ASC" }}
  >
    <AutocompleteInput placeholder="Filter by category" label={false} />
  </ReferenceInput>,
];

export const ProductList = () => {
  return (
    <List filters={filters}>
      ...
    </List>
  );
};
```

### Adding Custom Routes

To register your own routes, pass one or several [`<CustomRoutes>`](https://marmelab.com/react-admin/CustomRoutes.html) elements as children of `<Admin>`. Declare as many [react-router-dom](https://reactrouter.com/en/6/start/concepts#defining-routes) `<Route>` as you want inside them.

```tsx
// in src/App.tsx
import { Resource, CustomRoutes } from 'ra-core';
import { Route } from "react-router-dom";
import { Admin } from "@/components/admin/admin";

import { dataProvider } from './dataProvider';
import posts from './posts';
import comments from './comments';
import { Settings } from './Settings';
import { Profile } from './Profile';

export const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="posts" {...posts} />
        <Resource name="comments" {...comments} />
        <CustomRoutes>
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
        </CustomRoutes>
    </Admin>
);
```

Now, when a user browses to `/settings` or `/profile`, the components you defined will appear in the main part of the screen.

**Tip:** Custom routes don’t automatically appear in the menu. You'll need to customize the [`<AppSidebar>` component](https://github.com/marmelab/shadcn-admin-kit/blob/main/src/components/admin/app-sidebar.tsx) if you want custom routes to be accessible from the menu.

## Contributing

This project requires [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/).

To install the dependencies, run:

```bash
make install
```

To serve the demo locally, run:

```bash
make run
```

To build the project, run:

```bash
make build
```

To test the UI registry, run:

```bash
make test-registry
```

## License

This project is licensed under the [MIT License](./LICENSE), courtesy of [Marmelab](https://marmelab.com/).
