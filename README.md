# Shadcn Admin Kit

![Screenshot_20250520_171715](https://github.com/user-attachments/assets/d3bf0d2f-f075-466f-aacf-665ad3b72b19)

A component kit to build your Admin app with [shadcn/ui](https://ui.shadcn.com/).

[![Online Demo]][OnlineDemoLink] 

[Online Demo]: https://img.shields.io/badge/Online_Demo-blue?style=for-the-badge

[OnlineDemoLink]: https://marmelab.com/shadcn-admin-kit/ 'Online Demo'

## Features

- List, Show, Edit and Create pages per resource
- Data Table with sorting, filtering and pagination
- Form components with validation
- View and edit a reference record
- Login page (when used with an *authProvider*)
- Dashboard page
- Light/dark mode
- Responsive
- Accessible
- Compatible with any API, thanks to the *dataProvider* abstraction
- Automatically guess the code based on the data, using *Guessers*

## Usage

### Prerequisite: Set up shadcn/ui

If you haven't already, start by [installing shadcn/ui](https://ui.shadcn.com/docs/installation) in your project. Use the appropriate setup guide for the framework of your choice.

### Install the components

You can install the components required to build your Admin using the following command:

```bash
# pnpm
pnpm dlx shadcn@latest add https://marmelab.com/shadcn-admin-kit/r/shadcn-admin-kit-base.json
# npm
npx shadcn@latest add https://marmelab.com/shadcn-admin-kit/r/shadcn-admin-kit-base.json
# yarn
yarn dlx shadcn@latest add https://marmelab.com/shadcn-admin-kit/r/shadcn-admin-kit-base.json
# bun
bunx --bun shadcn@latest add https://marmelab.com/shadcn-admin-kit/r/shadcn-admin-kit-base.json
```

This command will download the components and add them to your project.

### Configure the `<Admin>` component

You'll need to specify the `dataProvider` to use with your `<Admin>`.

The following example uses `ra-data-simple-rest` but there are [many more](https://marmelab.com/react-admin/DataProviderList.html) you can choose from. You can even [build your own](https://marmelab.com/react-admin/DataProviderWriting.html).

```tsx
import { Admin } from "@/components/Admin";
import simpleRestProvider from 'ra-data-simple-rest';

export const App = () => (
  <Admin
    dataProvider={simpleRestProvider('http://path.to.my.api')}
  >
    {/* Resources go here */}
  </Admin>
);
```

Then, you'll need to declare the resources you want to use in your Admin. You can do this by using the `<Resource>` component from `ra-core` (which was automatically added to your dependencies).

For each resource, you can specify the **list**, **edit**, **create** and **show** components to use.

If you don't know where to start, you can use the built-in **guessers** to generate the components for you! The guessers will automatically generate the components based on the data returned by your API.

```tsx
import { Admin } from "@/components/Admin";
import { Resource } from "ra-core";
import simpleRestProvider from 'ra-data-simple-rest';
import { ListGuesser } from "@/components/ListGuesser";
import { ShowGuesser } from "@/components/ShowGuesser";
import { EditGuesser } from "@/components/EditGuesser";

export const App = () => (
  <Admin
    dataProvider={simpleRestProvider('http://path.to.my.api')}
  >
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

```
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

## Advanced usage

### Adding Authentication

You can configure authentication in your Admin by using the `authProvider` prop. There are many [authProviders](https://marmelab.com/react-admin/AuthProviderList.html) you can choose from, and you can also [build your own](https://marmelab.com/react-admin/AuthProviderWriting.html).

Once your authProvider is set up, you can pass it to the `authProvider` prop, and the `<Admin>` component will automatically display the login page when the user is not authenticated.

```tsx
import { Admin } from "@/components/Admin";
import { Resource } from "ra-core";
import simpleRestProvider from 'ra-data-simple-rest';
import { ListGuesser } from "@/components/ListGuesser";
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
import { Admin } from "@/components/Admin";
import { Resource } from "ra-core";
import simpleRestProvider from 'ra-data-simple-rest';
import { ListGuesser } from "@/components/ListGuesser";

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
import { AutocompleteInput } from "@/components/AutocompleteInput";
import { BadgeField } from "@/components/BadgeField";
import { DataTable } from "@/components/DataTable";
import { List } from "@/components/List";
import { ReferenceField } from "@/components/ReferenceField";
import { ReferenceInput } from "@/components/ReferenceInput";
import { TextInput } from "@/components/TextInput";

const filters = [
  <TextInput source="q" label="Search" />,
  <ReferenceInput
    source="category_id"
    reference="categories"
    sort={{ field: "name", order: "ASC" }}
  >
    <AutocompleteInput label="Filter by category" />
  </ReferenceInput>,
];

export const ProductList = () => {
  return (
    <List filters={filters}>
      <DataTable>
        <DataTable.Col source="reference" />
        <DataTable.Col source="category_id">
          <ReferenceField
            reference="categories"
            source="category_id"
            link="edit"
          >
            <BadgeField source="name" />
          </ReferenceField>
        </DataTable.Col>
      </DataTable>
    </List>
  );
};
```

## Local Development

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

This project is licensed under the [MIT License](./LICENSE).
