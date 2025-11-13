# Project Instructions

## Rules for Using shadcn MCP server

1. **Always Check Registry First**
   - Before creating custom components, search the registries for existing solutions
   - Use `mcp_shadcn_search_items_in_registries` to find relevant components
   - Check `mcp_shadcn_list_items_in_registries` to see all available options

2. **Component Discovery Workflow**
   - Start with semantic search using `mcp_shadcn_search_items_in_registries`
   - View detailed component info with `mcp_shadcn_view_items_in_registries`
   - Get usage examples with `mcp_shadcn_get_item_examples_from_registries`
   - Use `mcp_shadcn_get_add_command_for_items` to get installation commands

3. **Component Installation**
   - Use the provided add commands from the registry
   - Ensure components are properly imported and configured
   - Do not install example- components directly, use them as reference to create your components.
   - Follow the component's usage examples for proper implementation
   - Do not overwrite ui or registry/ui components unless the user has specifically asked for it

## Rules for using the shadcn-admin-kit registry

- The shadcn-admin-kit registry mainly consists of a single block component called `admin`, which will install the `<Admin>` component along with all the necessary components to create an admin (such as `<List>`, `<Edit>`, `<DataTable>`, `<TextField>`, `<TextInput>`, etc.).
- The shadcn-admin-kit registry contains only the UI components, and relies on `ra-core`, a headless admin framework for React, to provide the logic and data fetching capabilities. For instance, the `<Resource>` component comes from `ra-core`.
- If asked to bootstrap a new Admin, you can use the `example-admin` component from the shadcn-admin-kit registry to get a working example, configured with a sample dataProvider, which you can use as basis.
- Shadcn Admin Kit requires a specific TS config to work: the `verbatimModuleSyntax` option must be set to `false`. See below for more details.

### Fixing the TS config

When you initialize a new Admin:

Set the `verbatimModuleSyntax` option to `false` in the `tsconfig.app.json` file.

```json
{
  // ...
  "compilerOptions": {
    // ...
    // (keep the other options)
    // ...
    "verbatimModuleSyntax": false
  }
}
```

## Rules for using the `<Admin>` component from shadcn-admin-kit

### `<Admin>` Is A Client-Side Component

The `<Admin>` component from `shadcn-admin-kit` is a client-side component. Therefore, it must be either:

- Used in a Single Page Application (SPA), for instance created with Vite
- Marked with the `"use client"` directive if used in a Server-Side Rendered (SSR) application, for instance a Next.js app.

### Use `<Admin>` As Root Component For the Admin Page

The entry point of the admin page is the `<Admin>` component.

You'll need to specify a Data Provider to let the Admin know how to fetch data from the API.

If no Data Provider was specified, simply use `ra-data-json-server`, and typicode's JSONPlaceholder as endpoint: https://jsonplaceholder.typicode.com/.

You will need to install the `ra-data-json-server` package first:

```bash
npm install ra-data-json-server
```

Here is an example showing how to use it:

```tsx
"use client";

import { Admin } from "@/components/admin/admin";
import jsonServerProvider from "ra-data-json-server";

const dataProvider = jsonServerProvider(
  "https://jsonplaceholder.typicode.com/",
);

export const App = () => (
  <Admin dataProvider={dataProvider}>{/* Resources go here */}</Admin>
);
```

### Declare Resources

Then, you'll need to declare the routes of the application. `<Admin>` allows to define CRUD routes (list, edit, create, show) for each resource. Use the `<Resource>` component from `ra-core` (which was automatically added to your dependencies) to define CRUD routes.

For each resource, you have to specify a `name` (which will map to the resources exposed by the API endpoint) and the `list`, `edit`, `create` and `show` components to use.

If you used JSONPlaceholder at the previous step, you can pick among the following 6 resources:

- posts
- comments
- albums
- photos
- todos
- users

If no instruction was given on what component to use for the CRUD routes, you can use the built-in guessers for the list, show and edit views. The guessers will automatically generate code based on the data returned by the API.

Here is an example of how to use the guessers with a resource named `posts`:

```tsx
"use client";

import { Resource } from "ra-core";
import jsonServerProvider from "ra-data-json-server";
import { Admin } from "@/components/admin/admin";
import { ListGuesser } from "@/components/admin/list-guesser";
import { ShowGuesser } from "@/components/admin/show-guesser";
import { EditGuesser } from "@/components/admin/edit-guesser";

const dataProvider = jsonServerProvider(
  "https://jsonplaceholder.typicode.com/",
);

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

Use the example above to generate the component code and adapt the resources to your needs.
