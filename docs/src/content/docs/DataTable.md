---
title: "DataTable"
---

Feature-rich table component with:

- Sortable headers with tooltips
- Support for custom renderers and field components
- Row click navigation (show/edit) logic
- Row selection & bulk actions toolbar
- Column visibility & reordering (via [`ColumnsButton`](./ColumnsButton.md))
- Pagination (via [`ListPagination`](./ListPagination.md))
- Conditional row and cell classes
- Sticky Headers

It leverages shadcn/ui's [Table](https://ui.shadcn.com/docs/components/table) component for the base markup and styling.

## Usage

Use `<DataTable>` inside a `ListContext` (e.g., as a descendent of [`<List>`](./List.md) or [`<ReferenceManyField>`](./ReferenceManyField.md)). Define the table columns with its children using `<DataTable.Col>` components:

```tsx
import { List, DataTable, ReferenceField, EditButton } from '@/components/admin';

export const PostList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col label="User">
                <ReferenceField source="user_id" reference="users" />
            </DataTable.Col>
            <DataTable.Col source="title" />
            <DataTable.Col>
                <EditButton />
            </DataTable.Col>
        </DataTable>
    </List>
);
```

Each `<DataTable.Col>` child defines how to label the column header, either via the `label` prop, or by humanizing the `source` prop.

`<DataTable.Col>` also defines where to get the value for each cell in that column (either via `source`, a `render` prop, or a child component). `<DataTable>` renders each row in a `RecordContext`, so any Field component can be used inside `<DataTable.Col>`.

It also accepts additional props to configure the behavior of that specific column, such as sorting, styling, etc.

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `children` | Required | `ReactNode` | - | Column definitions (`DataTable.Col` / custom) |
| `bulkActionButtons` | Optional | `ReactNode \| false` | Bulk Delete and Export | Custom bulk action buttons or disable with `false` |
| `bulkActionsToolbar` | Optional | `ReactNode` | - | Full custom toolbar (overrides default) |
| `className` | Optional | `string` | - | Wrapper classes |
| `empty` | Optional | Element | `<Empty>` | The component to render when the list is empty. |
| `hiddenColumns`| Optional | Array | `[]`| The list of columns to hide by default (to be used with `ColumnsButton`) . |
| `isRowSelectable` | Optional | Function | `() => true` | A function that returns whether a row is selectable. |
| `rowClassName` | Optional | `(record) => string` | - | Dynamic row classes |
| `rowClick` | Optional | mixed | `show` | The action to trigger when the user clicks on a row. |
| `storeKey` | Optional | `string` | `<resource>.datatable` | Persistence key for column state |

## Cell Rendering

For non-numeric values, use `<DataTable.Col>`. It lets you define how the data renders in 4 different ways:

- By passing a `source` prop and no child.

```tsx
<DataTable.Col source="firstName" />
```

- By passing child elements (e.g. `<ReferenceField>`, `<DateField>`, etc.).

```tsx
<DataTable.Col source="lastName">
    <TextField source="firstName" />{" "}<TextField source="lastName" />
</DataTable.Col>
```

- By using the `field` prop to specify a field component.

```tsx
<DataTable.Col source="createdAt" field={DateField} />
```

- By passing a `render` prop to define a custom rendering function.

```tsx
<DataTable.Col
    label="Name"
    source="lastName"
    render={(record) => `${record.firstName} ${record.lastName}`}
/>
```

Even when using `children`, `field`, or `render`, you can still pass a `source` prop to define the column label and enable sorting on that column.

`<DataTable.Col>` accepts the following additional props:

| Prop | Required | Type | Description |
|------|----------|------|-------------|
| `headerClassName` | Optional | `string` | Extra header cell classes |
| `cellClassName` | Optional | `string` | Extra body cell classes |
| `conditionalClassName` | Optional | `(record) => string` | Adds per-row class |
| `disableSort` | Optional | `boolean` | Disable sorting on this column |
| `sortByOrder` | Optional | `"ASC"\|"DESC"` | Initial sort order when first clicked |
| `label` | Optional | `ReactNode` | Header label (i18n key or node) |

For numeric values, prefer `<DataTable.NumberCol>`. It is right-aligned and uses `<NumberField>` to format the value. You can pass an `options` prop to configure the number format.

```tsx
<DataTable.NumberCol source="amount" options={{ style: 'currency', currency: 'USD' }} />
```

`<DataTable.NumberCol>` accepts the following props, in addition to those of `<DataTable.Col>`:

| Prop | Type | Description |
|------|------|-------------|
| `locales` | `string \| string[]` | Intl locales |
| `options` | `Intl.NumberFormatOptions` | Format options |

## Bulk Actions

Bulk action buttons appear when users select one or several rows. Clicking on a bulk action button affects all the selected records. This is useful for actions like mass deletion or mass edition.

You can disable this feature by setting the `bulkActionButtons` prop to `false`:

```tsx
import { DataTable, List } from '@/components/admin';

export const PostList = () => (
    <List>
        <DataTable bulkActionButtons={false}>
            ...
        </DataTable>
    </List>
);
```

By default, all DataTables have a two bulk action buttons: bulk export and bulk delete. You can add other bulk action buttons by passing a custom element as the `<DataTable bulkActionButtons>` prop:

```tsx
import { List, DataTable, BulkDeleteButton, BulkExportButton } from '@/components/admin';

const PostBulkActionButtons = () => (
    <>
        <ResetViewsButton />
        <BulkDeleteButton />
        <BulkExportButton />
    </>
);

export const PostList = () => (
    <List>
        <DataTable bulkActionButtons={<PostBulkActionButtons />}>
            ...
        </DataTable>
    </List>
);
```

Shadcn Admin Kit provides two bulk action buttons that you can use in data tables:

- [`<BulkDeleteButton>`](./BulkDeleteButton.md) (enabled by default)
- [`<BulkExportButton>`](./BulkExportButton.md) to export only the selection

You can write a custom bulk action button components using the [`useListContext`](https://marmelab.com/ra-core/uselistcontext/.md) hook to get the following data and callbacks:

- `selectedIds`: the identifiers of the currently selected items.
- `onUnselectItems`: a callback to empty the selection.
- `resource`: the currently displayed resource (e.g., `posts`, `comments`, etc.)
- `filterValues`: the filter values. This can be useful if you want to apply your action on all items matching the filter.

Here is an example leveraging the `useUpdateMany` hook, which sets the `views` property of all posts to `0`:

```tsx
import {
    useListContext,
    useUpdateMany,
    useRefresh,
    useNotify,
    useUnselectAll,
} from 'ra-core';
import { Button } from '@/components/admin';
import { EyeOff } from 'lucide-react';

const ResetViewsButton = () => {
    const { selectedIds } = useListContext();
    const refresh = useRefresh();
    const notify = useNotify();
    const unselectAll = useUnselectAll('posts');
    const [updateMany, { isPending }] = useUpdateMany();
    const handleClick = () => {
        updateMany(
            'posts',
            { ids: selectedIds, data: { views: 0 } },
            {
                onSuccess: () => {
                    notify('Posts updated', { undoable: true });
                    unselectAll();
                },
                onError: () => {
                    notify('Error: posts not updated', { type: 'error' });
                    refresh();
                },
                mutationMode: 'undoable',
            }
        );
    }

    return (
        <Button onClick={handleClick} disabled={isPending}>
            <EyeOff /> Reset views
        </Button>
    );
};
```

:::tip
Users can select a range of rows by pressing the shift key while clicking a row checkbox.
:::

## Sorting

The column headers are buttons that allow users to change the list sort field and order. This feature requires no configuration and works out of the box.

It is possible to disable sorting for a specific `<DataTable.Col>` by passing a `sortable` property set to `false`:

```tsx {4}
export const PostList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" sortable={false} />
            <DataTable.Col source="title" />
            <DataTable.Col source="body" />
        </DataTable>
    </List>
);
```

By default, a column is sorted by the `<DataTable.Col source>` property.

For example, the following column displays the full name of a contact and is sortable by their last name:

```tsx {3}
<DataTable.Col
    label="Name"
    source="lastName"
    render={record => `${record.firstName} ${record.lastName}`}
/>
```

An action column should not be sortable, so you don't need to specify a `source`:

```tsx
<DataTable.Col>
    <EditButton />
    <DeleteButton />
</DataTable.Col>
```

You can also use a different `source` for the column and its child. This is very useful for reference fields, where users expect the column to be sortable by the reference (e.g., `author.name`) rather than the foreign key (e.g., `author_id`):

```tsx
<DataTable.Col source="authors(name)" label="Author" >
    <ReferenceField source="author_id" reference="authors" />
</DataTable.Col>
```

:::note
Support for sorting by related fields depends on the data provider.
:::

By default, when the user clicks on a column header, the list becomes sorted in ascending order. You change this behavior by setting the `sortByOrder` prop to `"DESC"` in a `<DataTable.Col>` element:

```tsx
<DataTable.Col source="published_at" sortByOrder="DESC"/>
```

## Hiding or Reordering Columns

You can let end users customize the fields displayed in the `<DataTable>` by using the [`<ColumnsButton>`](./ColumnsButton.md) in the `<List actions>`. When users click on this button, they can show / hide columns and reorder them.

```tsx
import { ColumnsButton, List, DataTable } from '@/components/admin';

const PostListActions = () => (
    <div className="flex items-center gap-2">
        <ColumnsButton />
    </div>
)

const PostList = () => (
    <List actions={<PostListActions />}>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="title" />
            <DataTable.Col source="author" />
            <DataTable.Col source="year" />
        </DataTable>
    </List>
);
```

By default, `<DataTable>` renders all `<DataTable.Col>` children. But you can also omit some of them by setting the `hiddenColumns` prop. Hidden columns are still displayed in the `<ColumnsButton>` dialog, so users can show them again.

```tsx
const PostList = () => (
    <List actions={<PostListActions />}>
        <DataTable hiddenColumns={['id', 'author']}>
            <DataTable.Col source="id" />
            <DataTable.Col source="title" />
            <DataTable.Col source="author" />
            <DataTable.Col source="year" />
        </DataTable>
    </List>
);
```

If you render more than one `<DataTable>` in the same page, you must pass a unique `storeKey` prop to each one:

```tsx
const PostList = () => (
    <List>
        <DataTable storeKey="posts.DataTable">
            ...
        </DataTable>
    </List>
);
```

If you include a [`<ColumnsButton>`](./ColumnsButton.md) in a page that has more than one `<DataTable>`, you have to link the two components by giving them the same `storeKey`:

```tsx
const PostListActions = () => (
    <TopToolbar>
        <ColumnsButton storeKey="posts.DataTable" />
    </TopToolbar>
);

const PostList = () => (
    <List actions={<PostListActions />}>
        <DataTable storeKey="posts.DataTable">
            ...
        </DataTable>
    </List>
);
```

## Conditional Formatting

You can change the style of a row based on the record values by using the `rowClassName` prop. This prop is a function that takes the current record as an argument and returns a string.

```tsx
import { DataTable, List } from '@/components/admin';

export const PostList = () => (
    <List>
        <DataTable
            rowClassName={(record) =>
                record.is_published ? 'bg-white' : 'bg-gray-50'
            }
        >
            ...
        </DataTable>
    </List>
);
```

You can also change the style of a specific cell based on the record values by using the `conditionalClassName` prop of `<DataTable.Col>`. This prop is a function that takes the current record as an argument and returns a string.

```tsx
import { DataTable, List } from '@/components/admin';

export const PostList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="title" />
            <DataTable.Col
                source="views"
                conditionalClassName={(record) =>
                    record.views > 1000 ? 'font-bold' : ''
                }
            />
        </DataTable>
    </List>
);
```

## Access Control

If you need to hide some columns based on a set of permissions, wrap these columns with `<CanAccess>`.

```tsx
import { CanAccess } from 'ra-core';

const ProductList = () => (
    <List>
        <DataTable>
            <CanAccess action="read" resource="products.thumbnail">
                <DataTable.Col source="thumbnail" field={ImageField} />
            </CanAccess>
            <CanAccess action="read" resource="products.reference">
                <DataTable.Col source="reference" />
            </CanAccess>
            <CanAccess action="read" resource="products.category_id">
                <DataTable.Col source="category_id">
                    <ReferenceField source="category_id" reference="categories" />
                </DataTable.Col>
            </CanAccess>
            <CanAccess action="read" resource="products.width">
                <DataTable.NumberCol source="width" />
            </CanAccess>
            <CanAccess action="read" resource="products.height">
                <DataTable.NumberCol source="height" />
            </CanAccess>
            <CanAccess action="read" resource="products.price">
                <DataTable.NumberCol source="price" />
            </CanAccess>
            <CanAccess action="read" resource="products.description">
                <DataTable.Col source="description" />
            </CanAccess>
            <CanAccess action="read" resource="products.stock">
                <DataTable.NumberCol source="stock" />
            </CanAccess>
            <CanAccess action="read" resource="products.sales">
                <DataTable.NumberCol source="sales" />
            </CanAccess>
        </DataTable>
    </List>
);
```

## Typescript

`<DataTable.Col>` and `<DataTable.NumberCol>` are generic components, You can pass a type parameter to get hints for the `source` prop and type safety for the `record` argument of the `render` and `rowSx` functions.

The most convenient way to benefit from this capability is to alias column components for your resource:

```tsx
import { List, DataTable, ReferenceField } from '@/components/admin';
import { type Review } from '../types';

const Column = DataTable.Col<Review>;

const ReviewList = () => (
    <List>
        <DataTable>
            <Column source="date" field={DateField} />
            <Column source="customer_id">
                <ReferenceField source="customer_id" reference="customers"/>
            </Column>
            <Column source="product_id">
                <ReferenceField source="product_id" reference="products" />
            </Column>
            <Column source="rating" field={StarRatingField} />
            <Column
                source="comment"
                render={record => record.comment.substr(0, 10) + '...'}
            />
            <Column source="status" />
        </DataTable>
    </List>
);
```

`<DataTable>` is also a generic component. You can pass a type parameter to get autocompletion and type safety for its props.

```tsx
import { List, DataTable } from '@/components/admin';
import { type Review } from '../types';

const ReviewList = () => (
    <List>
        <DataTable<Review>
            // TypeScript knows that record type is Review
            rowSx={record => ({
                backgroundColor: record.status === 'approved' ? 'green' : 'red',
            })}
        >
            ...
        </DataTable>
    </List>
);
```
