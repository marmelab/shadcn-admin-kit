---
title: DeletedRecordsList
---

Lists soft-deleted rows. To be used in place of a [`<List>`](./List.md).

This feature requires a valid [Enterprise Edition](https://marmelab.com/ra-enterprise/) subscription.

## Creating the DeletedRecordsList component

As the `<DeletedRecordsList />` requires an [Enterprise Edition](https://marmelab.com/ra-enterprise/) subscription, it is not included in the Shadcn Admin Kit distribution.

An example of a basic `<DeletedRecordsList />` can be found below:

```tsx
import {
  DeletedRecordsListBase,
  type DeletedRecordsListBaseProps,
} from "@react-admin/ra-core-ee";
import {
  RaRecord,
  Translate,
  useGetResourceLabel,
  useHasDashboard,
  useResourceContext,
  useTranslate,
} from "ra-core";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { FilterContext } from "@/hooks/filter-context";
import { ExportButton } from "@/components/admin/export-button";
import { type ListViewProps } from "@/components/admin/list";
import { FilterForm } from "@/components/admin/filter-form";
import { Breadcrumb, BreadcrumbItem, BreadcrumbPage } from "./breadcrumb";
import { ListPagination } from "./list-pagination";

export function DeletedRecordsList<RecordType extends RaRecord = RaRecord>({
  children,
  ...props
}: ListViewProps<RecordType> & DeletedRecordsListBaseProps<RecordType>) {
  return (
    <DeletedRecordsListBase {...props}>
      <DeletedRecordsListView<RecordType> {...props}>
        {children}
      </DeletedRecordsListView>
    </DeletedRecordsListBase>
  );
}

function DeletedRecordsListView<RecordType extends RaRecord = RaRecord>(
  props: ListViewProps<RecordType>,
) {
  const {
    disableBreadcrumb,
    filters,
    pagination = defaultPagination,
    title,
    children,
    actions,
  } = props;
  const translate = useTranslate();
  const resource = useResourceContext();
  if (!resource) {
    throw new Error(
      "The DeletedRecordListView component must be used within a ResourceContextProvider",
    );
  }
  const getResourceLabel = useGetResourceLabel();
  const resourceLabel = getResourceLabel(resource, 2);
  const finalTitle =
    title !== undefined
      ? title
      : translate("ra-soft-delete.deleted_records_list.title", {
          name: resourceLabel,
        });
  const hasDashboard = useHasDashboard();

  return (
    <>
      {!disableBreadcrumb && (
        <Breadcrumb>
          {hasDashboard && (
            <BreadcrumbItem>
              <Link to="/">
                <Translate i18nKey="ra.page.dashboard">Home</Translate>
              </Link>
            </BreadcrumbItem>
          )}
          <BreadcrumbPage>{resourceLabel}</BreadcrumbPage>
        </Breadcrumb>
      )}

      <FilterContext.Provider value={filters}>
        <div className="flex justify-between items-start flex-wrap gap-2 my-2">
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            {finalTitle}
          </h2>
          {actions ?? (
            <div className="flex items-center gap-2">{<ExportButton />}</div>
          )}
        </div>
        <FilterForm />

        <div className={cn("my-2", props.className)}>{children}</div>

        {pagination}
      </FilterContext.Provider>
    </>
  );
}

const defaultPagination = <ListPagination />;
```

## Usage

Here is a minimal example to display a list of users with a [`<DataTable>`](./DataTable.md):

```tsx
// in src/deleted-records-list.jsx
import { DataTable, DeletedRecordsList } from "@/components/admin";

export const DeletedRecordsListImpl = () => (
  <DeletedRecordsList>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="resource" />
      <DataTable.Col source="deleted_at" />
      <DataTable.Col source="deleted_by" />
    </DataTable>
  </DeletedRecordsList>
);

// in src/App.jsx
import { Admin } from "@/components/admin";
import { Resource } from "ra-core";
import jsonServerProvider from "ra-data-json-server";

import { DeletedRecordsListImpl } from "./deleted-records-list";

const App = () => (
  <Admin
    dataProvider={jsonServerProvider("https://jsonplaceholder.typicode.com")}
  >
    <CustomRoutes>
      <Route path="/deleted" element={<DeletedRecordsListImpl />} />
    </CustomRoutes>
  </Admin>
);

export default App;
```

That's enough to display a basic list with sorting and pagination.

## Props

| Prop                      | Required       | Type                | Default                                    | Description                                                                                      |
| ------------------------- | -------------- | ------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `authLoading`             | Optional       | `ReactElement`      | -                                          | The component to render while checking for authentication and permissions.                       |
| `actions`                 | `ReactElement` | -                   | The component to render in actions toolbar |
| `children`                | Optional       | `ReactElement`      | `<DeletedRecordsTable>`                    | The component used to render the list of deleted records.                                        |
| `debounce`                | Optional       | `number`            | `500`                                      | The debounce delay in milliseconds to apply when users change the sort or filter parameters.     |
| `disableAuthentication`   | Optional       | `boolean`           | `false`                                    | Set to `true` to disable the authentication check.                                               |
| `disableBreadcrumb`       | Optional       | `boolean`           | `false`                                    | Set to `true` to disable the breadcrumb in the header.                                           |
| `disableSyncWithLocation` | Optional       | `boolean`           | `false`                                    | Set to `true` to disable the synchronization of the list parameters with the URL.                |
| `empty`                   | Optional       | `ReactElement`      | -                                          | The component to display when the list is empty.                                                 |
| `error`                   | Optional       | `ReactElement`      | -                                          | The component to render when failing to load the list of records.                                |
| `filter`                  | Optional       | `object`            | -                                          | The permanent filter values.                                                                     |
| `filterDefaultValues`     | Optional       | `object`            | -                                          | The default filter values.                                                                       |
| `loading`                 | Optional       | `ReactElement`      | -                                          | The component to render while loading the list of records.                                       |
| `offline`                 | Optional       | `ReactElement`      | `<Offline>`                                | The component to render when there is no connectivity and there is no data in the cache          |
| `pagination`              | Optional       | `ReactElement`      | `<Pagination>`                             | The pagination component to use.                                                                 |
| `perPage`                 | Optional       | `number`            | `10`                                       | The number of records to fetch per page.                                                         |
| `queryOptions`            | Optional       | `object`            | -                                          | The options to pass to the `useQuery` hook.                                                      |
| `resource`                | Optional       | `string`            | -                                          | The resource of deleted records to fetch and display                                             |
| `sort`                    | Optional       | `object`            | `{ field: 'deleted_at', order: 'DESC' }`   | The initial sort parameters.                                                                     |
| `storeKey`                | Optional       | `string` or `false` | -                                          | The key to use to store the current filter & sort. Pass `false` to disable store synchronization |
| `title`                   | Optional       | `ReactElement`      | resource plural label                      | Page title                                                                                       |

## `authLoading`

By default, `<DeletedRecordsList>` renders `<Loading>` while checking for authentication and permissions. You can display a custom component via the `authLoading` prop:

```jsx
import { DeletedRecordsList } from "@/components/admin";

export const CustomDeletedRecords = () => (
  <DeletedRecordsList authLoading={<p>Checking for permissions...</p>} />
);
```

## `actions`

By default, `<DeletedRecordsList>` renders `<ExportButton>` in the actions toolbar. You can display a custom component via the `actions` prop:

```jsx
import { DeletedRecordsList } from "@/components/admin";

export const CustomDeletedRecords = () => (
  <DeletedRecordsList
    actions={
      <>
        <ExportButton />
      </>
    }
  />
);
```

## `children`

By default, `<DeletedRecordsList>` renders a `<DeletedRecordsTable>` component that displays the deleted records in a `<DataTable>`, with buttons to restore or permanently delete them. You can customize this table by passing custom `children`.

```tsx
import { DataTable } from "react-admin";
import { DeletedRecordsList } from "@/components/admin";

export const CustomDeletedRecords = () => (
  <DeletedRecordsList>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="resource" />
      <DataTable.Col source="deleted_at" />
      <DataTable.Col source="deleted_by" />
      <DataTable.Col source="data.title" label="Title" />
    </DataTable>
  </DeletedRecordsList>
);
```

## `debounce`

By default, `<DeletedRecordsList>` does not refresh the data as soon as the user enters data in the filter form. Instead, it waits for half a second of user inactivity (via `lodash.debounce`) before calling the dataProvider on filter change. This is to prevent repeated (and useless) calls to the API.

You can customize the debounce duration in milliseconds - or disable it completely - by passing a `debounce` prop to the `<DeletedRecordsList>` component:

```tsx
// wait 1 seconds instead of 500 milliseconds befoce calling the dataProvider
const DeletedRecordsWithDebounce = () => <DeletedRecordsList debounce={1000} />;
```

## `disableAuthentication`

By default, `<DeletedRecordsList>` requires the user to be authenticated - any anonymous access redirects the user to the login page.

If you want to allow anonymous access to the deleted records list page, set the `disableAuthentication` prop to `true`.

```tsx
const AnonymousDeletedRecords = () => (
  <DeletedRecordsList disableAuthentication />
);
```

## `disableSyncWithLocation`

By default, react-admin synchronizes the `<DeletedRecordsList>` parameters (sort, pagination, filters) with the query string in the URL (using `react-router` location) and the [Store](https://marmelab.com/react-admin/Store.html).

You may want to disable this synchronization to keep the parameters in a local state, independent for each `<DeletedRecordsList>` instance. To do so, pass the `disableSyncWithLocation` prop. The drawback is that a hit on the "back" button doesn't restore the previous parameters.

```tsx
const DeletedRecordsWithoutSyncWithLocation = () => (
  <DeletedRecordsList disableSyncWithLocation />
);
```

:::tip
`disableSyncWithLocation` also disables the persistence of the deleted records list parameters in the Store by default. To enable the persistence of the deleted records list parameters in the Store, you can pass a custom `storeKey` prop.
:::

```tsx
const DeletedRecordsSyncWithStore = () => (
  <DeletedRecordsList
    disableSyncWithLocation
    storeKey="deletedRecordsListParams"
  />
);
```

## `error`

By default, `<DeletedRecordsList>` renders the children when an error happens while loading the list of deleted records. You can render an error component via the `error` prop:

```jsx
import { DeletedRecordsList } from "@/components/admin";

export const CustomDeletedRecords = () => (
  <DeletedRecordsList
    error={<p>Something went wrong while loading your posts!</p>}
  />
);
```

## `filter`: Permanent Filter

You can choose to always filter the list, without letting the user disable this filter - for instance to display only published posts. Write the filter to be passed to the data provider in the `filter` prop:

```tsx
const DeletedPostsList = () => (
  <DeletedRecordsList filter={{ resource: "posts" }} />
);
```

The actual filter parameter sent to the data provider is the result of the combination of the _user_ filters (the ones set through the `filters` component form), and the _permanent_ filter. The user cannot override the permanent filters set by way of `filter`.

## `filterDefaultValues`

To set default values to filters, you can pass an object literal as the `filterDefaultValues` prop of the `<DeletedRecordsList>` element.

```tsx
const CustomDeletedRecords = () => (
  <DeletedRecordsList filterDefaultValues={{ resource: "posts" }} />
);
```

:::tip
The `filter` and `filterDefaultValues` props have one key difference: the `filterDefaultValues` can be overridden by the user, while the `filter` values are always sent to the data provider. Or, to put it otherwise:
:::

```js
const filterSentToDataProvider = {
  ...filterDefaultValues,
  ...filterChosenByUser,
  ...filter,
};
```

## `loading`

By default, `<DeletedRecordsList>` renders the children while loading the list of deleted records. You can display a component during this time via the `loading` prop:

```jsx
import { Loading } from "react-admin";
import { DeletedRecordsList } from "@/components/admin";

export const CustomDeletedRecords = () => (
  <DeletedRecordsList loading={<Loading />} />
);
```

## `mutationMode`

The `<DeletedRecordsList>` list exposes restore and delete permanently buttons, which perform "mutations" (i.e. they alter the data). React-admin offers three modes for mutations. The mode determines when the side effects (redirection, notifications, etc.) are executed:

- `pessimistic`: The mutation is passed to the dataProvider first. When the dataProvider returns successfully, the mutation is applied locally, and the side effects are executed.
- `optimistic`: The mutation is applied locally and the side effects are executed immediately. Then the mutation is passed to the dataProvider. If the dataProvider returns successfully, nothing happens (as the mutation was already applied locally). If the dataProvider returns in error, the page is refreshed and an error notification is shown.
- `undoable` (default): The mutation is applied locally and the side effects are executed immediately. Then a notification is shown with an undo button. If the user clicks on undo, the mutation is never sent to the dataProvider, and the page is refreshed. Otherwise, after a 5 seconds delay, the mutation is passed to the dataProvider. If the dataProvider returns successfully, nothing happens (as the mutation was already applied locally). If the dataProvider returns in error, the page is refreshed and an error notification is shown.

By default, `<DeletedRecordsList>` uses the `undoable` mutation mode. This is part of the "optimistic rendering" strategy of react-admin; it makes user interactions more reactive.

You can change this default by setting the `mutationMode` prop - and this affects all buttons in deleted records table. For instance, to remove the ability to undo the changes, use the `optimistic` mode:

```tsx
const OptimisticDeletedRecords = () => (
  <DeletedRecordsList mutationMode="optimistic" />
);
```

And to make the actions blocking, and wait for the dataProvider response to continue, use the `pessimistic` mode:

```tsx
const PessimisticDeletedRecords = () => (
  <DeletedRecordsList mutationMode="pessimistic" />
);
```

:::tip
When using any other mode than `undoable`, the `<DeletePermanentlyButton>` and `<RestoreButton>` display a confirmation dialog before calling the dataProvider.
:::

## `offline`

By default, `<DeletedRecordsList>` renders the `<Offline>` component when there is no connectivity and there are no records in the cache yet for the current parameters (page, sort, etc.). You can provide your own component via the `offline` prop:

```jsx
import { DeletedRecordsList } from "@/components/admin";
import { Alert } from "@mui/material";

const offline = (
  <Alert severity="warning">No network. Could not load the posts.</Alert>
);

export const CustomDeletedRecords = () => (
  <DeletedRecordsList offline={offline} />
);
```

## `pagination`

By default, the `<DeletedRecordsList>` view displays a set of pagination controls at the bottom of the list.

The `pagination` prop allows to replace the default pagination controls by your own.

```tsx
import { Pagination } from "react-admin";
import { DeletedRecordsList } from "@/components/admin";

const DeletedRecordsPagination = () => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
);

export const DeletedRecordsWithCustomPagination = () => (
  <DeletedRecordsList pagination={<DeletedRecordsPagination />} />
);
```

See [Paginating the List](https://marmelab.com/react-admin/ListTutorial.html#building-a-custom-pagination) for details.

## `perPage`

By default, the deleted records list paginates results by groups of 10. You can override this setting by specifying the `perPage` prop:

```tsx
const DeletedRecordsWithCustomPagination = () => (
  <DeletedRecordsList perPage={25} />
);
```

:::note
The default pagination component's `rowsPerPageOptions` includes options of 5, 10, 25 and 50. If you set your deleted records list `perPage` to a value not in that set, you must also customize the pagination so that it allows this value, or else there will be an error.
:::

```diff
const DeletedRecordsWithCustomPagination = () => (
-   <DeletedRecordsList perPage={6} />
+   <DeletedRecordsList perPage={6} pagination={<Pagination rowsPerPageOptions={[6, 12, 24, 36]} />} />
);
```

## `queryOptions`

`<DeletedRecordsList>` accepts a `queryOptions` prop to pass query options to the react-query client. Check [react-query's useQuery documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery) for the list of available options.

This can be useful e.g. to pass a custom `meta` to the `dataProvider.getListDeleted()` call.

```tsx
import { DeletedRecordsList } from "@/components/admin";

const CustomDeletedRecords = () => (
  <DeletedRecordsList queryOptions={{ meta: { foo: "bar" } }} />
);
```

With this option, react-admin will call `dataProvider.getListDeleted()` on mount with the `meta: { foo: 'bar' }` option.

You can also use the `queryOptions` prop to override the default error side effect. By default, when the `dataProvider.getListDeleted()` call fails, react-admin shows an error notification. Here is how to show a custom notification instead:

```tsx
import { useNotify, useRedirect } from "react-admin";
import { DeletedRecordsList } from "@/components/admin";

const CustomDeletedRecords = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  const onError = (error) => {
    notify(`Could not load list: ${error.message}`, { type: "error" });
    redirect("/dashboard");
  };

  return <DeletedRecordsList queryOptions={{ onError }} />;
};
```

The `onError` function receives the error from the dataProvider call (`dataProvider.getListDeleted()`), which is a JavaScript Error object (see [the dataProvider documentation for details](https://marmelab.com/react-admin/DataProviderWriting.html#error-format)).

## `resource`

`<DeletedRecordsList>` fetches the deleted records from the data provider using the `dataProvider.getListDeleted()` method. When no resource is specified, it will fetch all deleted records from all resources and display a filter.

If you want to display only the deleted records of a specific resource, you can pass the `resource` prop:

```tsx
const DeletedPosts = () => <DeletedRecordsList resource="posts" />;
```

When a resource is specified, the filter will not be displayed, and the list will only show deleted records of that resource.

The title is also updated accordingly. Its translation key is `ra-soft-delete.deleted_records_list.resource_title`.

## `sort`

Pass an object literal as the `sort` prop to determine the default `field` and `order` used for sorting:

```tsx
const PessimisticDeletedRecords = () => (
  <DeletedRecordsList sort={{ field: "id", order: "ASC" }} />
);
```

`sort` defines the _default_ sort order ; the list remains sortable by clicking on column headers.

For more details on list sort, see the [Sorting The List](https://marmelab.com/react-admin/ListTutorial.html#sorting-the-list) section.

## `storeKey`

By default, react-admin stores the list parameters (sort, pagination, filters) in localStorage so that users can come back to the list and find it in the same state as when they left it.
The `<DeletedRecordsList>` component uses a specific identifier to store the list parameters under the key `ra-soft-delete.listParams`.

If you want to use multiple `<DeletedRecordsList>` and keep distinct store states for each of them (filters, sorting and pagination), you must give each list a unique `storeKey` property. You can also disable the persistence of list parameters and selection in the store by setting the `storeKey` prop to `false`.

In the example below, the deleted records lists store their list parameters separately (under the store keys `'deletedBooks'` and `'deletedAuthors'`). This allows to use both components in the same app, each having its own state (filters, sorting and pagination).

```tsx
import { Admin, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import { DeletedRecordsList } from "@/components/admin";

const Admin = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <CustomRoutes>
        <Route
          path="/books/deleted"
          element={
            <DeletedRecordsList
              filter={{ resource: "books" }}
              storeKey="deletedBooks"
            />
          }
        />
        <Route
          path="/authors/deleted"
          element={
            <DeletedRecordsList
              filter={{ resource: "authors" }}
              storeKey="deletedAuthors"
            />
          }
        />
      </CustomRoutes>
      <Resource name="books" />
    </Admin>
  );
};
```

:::tip
The `storeKey` is actually passed to the underlying `useDeletedRecordsListController` hook, which you can use directly for more complex scenarios. See the [`useDeletedRecordsListController` doc](./useDeletedRecordsListController.md) for more info.
:::

:::note
_Selection state_ will remain linked to a global key regardless of the specified `storeKey` string. This is a design choice because if row selection is not stored globally, then when a user permanently deletes or restores a record it may remain selected without any ability to unselect it. If you want to allow custom `storeKey`'s for managing selection state, you will have to implement your own `useDeletedRecordsListController` hook and pass a custom key to the `useRecordSelection` hook. You will then need to implement your own delete buttons to manually unselect rows when deleting or restoring records. You can still opt out of all store interactions including selection if you set it to `false`.
:::

## `title`

The default title for a list view is the translation key `ra-soft-delete.deleted_records_list.title`.

You can also customize this title by specifying a custom `title` prop:

```tsx
const DeletedRecordsWithTitle = () => (
  <DeletedRecordsList title="Beautiful Trash" />
);
```

The title can be a string, a React element, or `false` to disable the title.

:::tip
The `<DeletedRecordsList>` component `classes` can also be customized for all instances of the component with its global css name `RaDeletedRecordsList` as [described here](https://marmelab.com/blog/2019/12/18/react-admin-3-1.html#theme-overrides).
:::
