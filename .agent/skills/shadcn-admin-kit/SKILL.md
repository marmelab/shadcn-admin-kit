---
name: shadcn-admin-kit
description: This skill should be used when building, modifying, or debugging an admin application with shadcn-admin-kit — including creating resources, lists, forms, data fetching, authentication, relationships between entities, custom pages, or any CRUD admin interface built with this kit.
---

# Shadcn Admin Kit Development Guide

Shadcn Admin Kit is a component library for building admin/CRUD applications using React, TypeScript, and shadcn/ui. It provides 98+ pre-built components on top of **ra-core** (from react-admin), combining react-admin's proven data layer with modern shadcn/ui components styled via Tailwind CSS. Before writing custom code, always check if shadcn-admin-kit already provides a component or hook for the task. Full documentation: https://marmelab.com/shadcn-admin-kit/docs

**Tech Stack**: React Router v7, TanStack Query, React Hook Form, Zod, ra-core, shadcn/ui (Radix UI), Lucide icons, Tailwind CSS v4.

**Compatible with**: Vite.js, React-router, Next.js, TanStack Start, and more.

## Import Paths

Components are imported from `@/components/admin/`, while ra-core hooks and utilities come from `ra-core`:

```jsx
// Admin components
import { Admin } from "@/components/admin/admin";
import { List } from "@/components/admin/list";
import { DataTable } from "@/components/admin/data-table";
import { TextInput } from "@/components/admin/text-input";

// Ra-core (routing, hooks, utilities)
import { Resource, CustomRoutes, useGetList, useRecordContext } from "ra-core";
```

## Providers (Backend Abstraction)

Shadcn Admin Kit never calls APIs directly. All communication goes through **providers** — adapters that translate standardized calls into API-specific requests. The three main providers are:

- **dataProvider**: All CRUD operations (`getList`, `getOne`, `create`, `update`, `delete`, `getMany`, `getManyReference`, `updateMany`, `deleteMany`). See [DataProviders](https://marmelab.com/react-admin/DataProviders.html) and [50+ existing adapters](https://marmelab.com/react-admin/DataProviderList.html).
- **authProvider**: Authentication and authorization. See [Authentication](https://marmelab.com/react-admin/Authentication.html).
- **i18nProvider**: Translations (`translate`, `changeLocale`, `getLocale`).

**Critical rule**: Never use `fetch`, `axios`, or direct HTTP calls in components. Always use data provider hooks. This ensures proper caching, loading states, error handling, authentication, and optimistic rendering.

## Composition (Not God Components)

Shadcn Admin Kit uses composition over configuration. Override behavior by passing child components, not by setting dozens of props:

```jsx
<Edit actions={<MyCustomActions />}>
  <SimpleForm>
    <TextInput source="title" />
  </SimpleForm>
</Edit>
```

To customize the layout, pass a custom layout component to `<Admin layout={MyLayout}>`. To customize the sidebar, pass it to `<Layout sidebar={MySidebar}>`. This chaining is by design.

## Context: Pull, Don't Push

Components expose data to descendants via React contexts. Access data using hooks rather than passing props down:

- `useRecordContext()` — current record in Show/Edit/Create views. See [useRecordContext](https://marmelab.com/react-admin/useRecordContext.html).
- `useListContext()` — list data, filters, pagination, sort in List views. See [useListContext](https://marmelab.com/react-admin/useListContext.html).
- `useShowContext()`, `useEditContext()`, `useCreateContext()` — page-level state for detail views.
- `useTranslate()` — translation function from i18nProvider.
- `useGetIdentity()` — current user from authProvider.

## Hooks Over Custom Components

When a component's UI doesn't fit, use the underlying hook instead of building from scratch. Controller hooks (named `use*Controller`) provide all the logic without the UI:

- `useListController()` — list fetching, filtering, pagination logic
- `useEditController()` — edit form fetching and submission logic
- `useShowController()` — show page data fetching logic

## Routing

`<Resource>` declares CRUD routes automatically (`/posts`, `/posts/create`, `/posts/:id/edit`, `/posts/:id/show`). Use `<CustomRoutes>` for non-CRUD pages. Use `useCreatePath()` to build resource URLs and `<Link>` from react-router for navigation. The router is React Router v7. See [Routing](https://marmelab.com/ra-core/routing/).

```jsx
import { Resource, CustomRoutes } from "ra-core";
import { Route } from "react-router";
import { Admin } from "@/components/admin/admin";

export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="posts" list={PostList} edit={PostEdit} />
    <CustomRoutes>
      <Route path="/settings" element={<Settings />} />
    </CustomRoutes>
  </Admin>
);
```

**Note:** Custom routes don't appear in the sidebar automatically. Customize `<AppSidebar>` to add menu items for custom routes.

## Data Fetching

### Query Hooks (Reading Data)

```jsx
const { data, total, isPending, error } = useGetList("posts", {
  pagination: { page: 1, perPage: 25 },
  sort: { field: "created_at", order: "DESC" },
  filter: { status: "published" },
});

const { data: record, isPending } = useGetOne("posts", { id: 123 });
const { data: records } = useGetMany("posts", { ids: [1, 2, 3] });
const { data, total } = useGetManyReference("comments", {
  target: "post_id",
  id: 123,
  pagination: { page: 1, perPage: 25 },
});
```

See [useGetList](https://marmelab.com/ra-core/usegetlist/), [useGetOne](https://marmelab.com/ra-core/usegetone/).

### Mutation Hooks (Writing Data)

All mutations return `[mutate, state]`. They support three **mutation modes**:

- **pessimistic** (default): Wait for server response, then update UI.
- **optimistic**: Update UI immediately, revert on server error.
- **undoable**: Update UI, show undo notification, commit after delay.

```jsx
const [create, { isPending }] = useCreate();
const [update] = useUpdate();
const [deleteOne] = useDelete();

// Call with resource and params
create("posts", { data: { title: "Hello" } });
update("posts", { id: 1, data: { title: "Updated" }, previousData: record });
deleteOne("posts", { id: 1, previousData: record });
```

Pass `mutationMode: 'optimistic'` or `'undoable'` for instant UI feedback. See [useCreate](https://marmelab.com/ra-core/usecreate/), [useUpdate](https://marmelab.com/ra-core/useupdate/).

## Authentication & Authorization

```typescript
const authProvider = {
  login: ({ username, password }) => Promise<void>,
  logout: () => Promise<void>,
  checkAuth: () => Promise<void>, // Verify credentials are valid
  checkError: (error) => Promise<void>, // Detect auth errors from API responses
  getIdentity: () => Promise<{ id; fullName; avatar }>,
  getPermissions: () => Promise<any>,
  canAccess: ({ resource, action, record }) => Promise<boolean>, // RBAC
};
```

Each auth provider method has a corresponding hook (e.g. `useGetIdentity()`, `useCanAccess()`).

- **Custom routes are public by default.** Wrap them with `<Authenticated>` or call `useAuthenticated()` to require login. See [Authenticated](https://marmelab.com/ra-core/authenticated/).
- Centralize authorization in `authProvider.canAccess()`, not in individual components. Use `useCanAccess()` to check permissions. See [useCanAccess](https://marmelab.com/ra-core/usecanaccess/) and [Access Control]https://marmelab.com/ra-core/permissions/#access-control).
- The dataProvider must include credentials (Bearer token, cookies) in requests — authProvider handles login, but dataProvider handles API calls. Configure `httpClient` in data provider setup.

## Relationships Between Entities

Fetching all the data (including relationships) upfront for a given page is an anti-pattern. Instead, fetch related records on demand using reference fields and inputs.

### Displaying Related Records (Fields)

```jsx
{
  /* Show the company of the current record based on its company_id */
}
<ReferenceField source="company_id" reference="companies" />;

{
  /* Show a list of related records (reverse FK) */
}
<ReferenceManyField reference="comments" target="post_id">
  <DataTable>
    <TextField source="body" />
    <DateField source="created_at" />
  </DataTable>
</ReferenceManyField>;

{
  /* Show multiple referenced records (array of IDs) */
}
<ReferenceArrayField source="tag_ids" reference="tags">
  <SingleFieldList>
    <ChipField source="name" />
  </SingleFieldList>
</ReferenceArrayField>;
```

See [ReferenceField](https://marmelab.com/shadcn-admin-kit/docs/referencefield/), [ReferenceManyField](https://marmelab.com/shadcn-admin-kit/docs/referencemanyfield/), [ReferenceArrayField](https://marmelab.com/shadcn-admin-kit/docs/referencearrayfield/).

### Editing Related Records (Inputs)

```jsx
{
  /* Select from another resource (FK) */
}
<ReferenceInput source="company_id" reference="companies" />;

{
  /* Multi-select from another resource (array of IDs) */
}
<ReferenceArrayInput source="tag_ids" reference="tags" />;
```

See [ReferenceInput](https://marmelab.com/shadcn-admin-kit/docs/referenceinput/), [ReferenceArrayInput](https://marmelab.com/shadcn-admin-kit/docs/referencearrayinput/).

## Forms

Forms are built on React Hook Form with Zod validation. Use `<SimpleForm>` for single-column layouts. See [SimpleForm](https://marmelab.com/shadcn-admin-kit/docs/simpleform/).

Pass validators to input components: `required()`, `minLength(min)`, `maxLength(max)`, `minValue(min)`, `maxValue(max)`, `number()`, `email()`, `regex(pattern, message)`, or a custom function returning an error string.

```jsx
<TextInput source="title" validate={[required(), minLength(3)]} />
```

Use React Hook Form's `useWatch()` to create dynamic forms that react to field values.

## List Filters

Add filters to lists using the `filters` prop with an array of input components:

```jsx
import { List } from "@/components/admin/list";
import { TextInput } from "@/components/admin/text-input";
import { ReferenceInput } from "@/components/admin/reference-input";
import { AutocompleteInput } from "@/components/admin/autocomplete-input";

const filters = [
  <TextInput source="q" placeholder="Search..." label={false} />,
  <ReferenceInput source="category_id" reference="categories">
    <AutocompleteInput placeholder="Filter by category" label={false} />
  </ReferenceInput>,
];

export const ProductList = () => (
  <List filters={filters}>
    <DataTable>{/* columns */}</DataTable>
  </List>
);
```

## Resource Definition

Encapsulate resource components in index files for clean imports:

```jsx
// posts/index.ts
export default {
  list: PostList,
  create: PostCreate,
  edit: PostEdit,
  show: PostShow,
  icon: FileText, // Lucide icon
  recordRepresentation: (record) => record.title, // How records appear in references
};
```

See [Resource](https://marmelab.com/shadcn-admin-kit/docs/resource/), [RecordRepresentation](https://marmelab.com/ra-core/recordrepresentation/).

## Key Components

### Page Components

- `<List>` — Full list page with breadcrumbs, pagination, filters, create button
- `<Create>` — Page wrapper for create forms
- `<Edit>` — Page wrapper for edit forms with show/delete buttons
- `<Show>` — Read-only detail page

### Data Display

- `<DataTable>` — Powerful data table with sorting, selection, column customization, bulk actions
- `<TextField>`, `<NumberField>`, `<DateField>`, `<EmailField>` — Display fields
- `<ImageField>`, `<FileField>` — Media fields
- `<BadgeField>` — Badge/status display
- `<RecordField>` — Flexible field with label (inline or stacked)
- `<ArrayField>`, `<SingleFieldList>` — Array iteration

### Form Inputs

- `<TextInput>`, `<NumberInput>`, `<BooleanInput>` — Basic inputs
- `<SelectInput>`, `<RadioButtonGroupInput>` — Choice inputs
- `<DateInput>`, `<DateTimeInput>` — Date pickers
- `<AutocompleteInput>` — Searchable dropdown with create-on-fly
- `<FileInput>` — File upload
- `<ArrayInput>`, `<TextArrayInput>` — Array inputs
- `<AutocompleteArrayInput>` — Multi-select autocomplete
- `<SearchInput>` — Full-text search filter

### Actions & Buttons

- `<SaveButton>`, `<CancelButton>` — Form actions
- `<CreateButton>`, `<EditButton>`, `<ShowButton>`, `<DeleteButton>` — Navigation
- `<RefreshButton>`, `<ExportButton>` — List actions
- `<BulkDeleteButton>`, `<BulkExportButton>` — Bulk actions
- `<ColumnsButton>`, `<SortButton>`, `<FilterButton>` — Table controls

### Layout

- `<Admin>` — Root component combining all providers
- `<Layout>` — Main layout with sidebar, header, breadcrumbs
- `<AppSidebar>` — Collapsible navigation sidebar
- `<SimpleForm>` — Vertical form layout with toolbar
- `<FormToolbar>` — Sticky Save/Cancel toolbar

## Guessers (Code Generation)

Guessers auto-generate CRUD components from API responses and log the generated code to the console for copy-paste:

```jsx
// Temporarily use guessers during development
<Resource
  name="products"
  list={ListGuesser}
  edit={EditGuesser}
  show={ShowGuesser}
/>
```

- `<ListGuesser>` — Generates DataTable configuration from first record
- `<EditGuesser>` — Generates form inputs from record schema
- `<ShowGuesser>` — Generates show page layout

Check the browser console for the generated code, then copy it into your own components.

## Styling

All components use Tailwind CSS classes. Override styles via the `className` prop or by customizing the shadcn/ui theme variables in your CSS:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... */
}
```

Use the `cn()` utility from `@/lib/utils` to merge class names:

```jsx
import { cn } from "@/lib/utils";
<div className={cn("base-class", condition && "conditional-class")} />;
```

## Custom Data Provider Methods

Extend the dataProvider with domain-specific methods:

```jsx
const dataProvider = {
  ...baseDataProvider,
  archivePost: async (id) => {
    /* custom logic */
  },
};
// Call via useDataProvider and useQuery:
// const dp = useDataProvider();
// const { data } = useQuery(['archivePost', id], () => dp.archivePost(id));
```

## Persistent Client State (Store)

Use `useStore()` for persistent user preferences (theme, column visibility, saved filters):

```jsx
const [theme, setTheme] = useStore("theme", "light");
```

See [Store](https://marmelab.com/ra-core/store/).

## Notification, Redirect, Refresh

```jsx
const notify = useNotify();
const redirect = useRedirect();
const refresh = useRefresh();

notify("Record saved", { type: "success" });
redirect("list", "posts"); // Navigate to /posts
redirect("edit", "posts", 123); // Navigate to /posts/123
refresh(); // Invalidate all queries
```

Notifications use [Sonner](https://sonner.emilkowal.ski/) for toast messages.

## Differences from React-Admin

Shadcn Admin Kit shares the same **ra-core** foundation as react-admin but differs in:

| Aspect        | React-Admin         | Shadcn Admin Kit        |
| ------------- | ------------------- | ----------------------- |
| UI Framework  | Material-UI         | shadcn/ui (Radix)       |
| Styling       | CSS-in-JS (Emotion) | Tailwind CSS            |
| Customization | MUI theme overrides | Tailwind classes        |
| Bundle Size   | Larger              | Smaller, tree-shakeable |
| Look & Feel   | Material Design     | Modern, minimal         |

The data layer, providers, hooks, and resource architecture are identical.
