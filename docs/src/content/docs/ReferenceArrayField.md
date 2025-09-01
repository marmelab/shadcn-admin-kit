---
title: "ReferenceArrayField"
---

Fetches multiple referenced records by an array of ids contained in the current record, and provides them through a `ListContext` to its children. Use it to display a list of related records, via a one-to-many relationship materialized by an array of foreign keys.

## Usage

For instance, let's consider a model where a `post` has many `tags`, materialized to a `tags_ids` field containing an array of ids:

```
┌──────────────┐       ┌────────┐
│ posts        │       │ tags   │
│--------------│       │--------│
│ id           │   ┌───│ id     │
│ title        │   │   │ name   │
│ body         │   │   └────────┘
│ is_published │   │
│ tag_ids      │╾──┘   
└──────────────┘       
```

A typical `post` record therefore looks like this:

```json
{
  "id": 1,
  "title": "Hello world",
  "body": "...",
  "tags_ids": [1, 2, 3]
}
```

In that case, use `<ReferenceArrayField>` to display the post tag names as follows:

```jsx {9}
import { List, DataTable, ReferenceArrayField } from '@/components/admin';

export const PostList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="title" />
            <DataTable.Col source="tag_ids" label="Tags">
                <ReferenceArrayField reference="tags" source="tag_ids" />
            </DataTable.Col>
            <DataTable.Col>
                <EditButton />
            </DataTable.Col>
        </DataTable>
    </List>
);
```

`<ReferenceArrayField>` fetches the `tag` resources related to each `post` resource by matching `post.tag_ids` to `tag.id` (using `dataProvider.getMany()`).

Configure the `<Resource recordRepresentation>` to render related records in a meaningful way. For instance, for the `tags` resource, if you want the `<ReferenceArrayField>` to display the tag `name`:

```jsx
<Resource name="tags" list={TagList} recordRepresentation="name" />
```

`<ReferenceArrayField>` expects a `reference` attribute, which specifies the resource to fetch for the related records. It also expects a `source` attribute, which defines the field containing the list of ids to look for in the referenced resource.

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Field with array of ids |
| `reference` | Required | `string` | - | Target resource name |
| `children` | Optional | `ReactNode` | `<SingleFieldList />` | Display component(s) |
| `className` | Optional | `string` | - | Wrapper classes |
| `empty` | Optional | `ReactNode` | - | Placeholder when no data |
| `error` | Optional | `ReactNode` | - | Error element (set `false` to hide) |
| `filter` | Optional | `object` | - | Permanent filters |
| `loading` | Optional | `ReactNode` | - | Loading element (set `false` to hide) |
| `page` | Optional | `number` | 1 | Initial page |
| `pagination` | Optional | `ReactNode` | - | Pagination component |
| `perPage` | Optional | `number` | - | Page size (default 1000 in code if unspecified) |
| `queryOptions` | Optional | `UseQueryOptions` | - | TanStack Query options |
| `render` | Optional | `(props: ListControllerResult<ReferenceRecordType>) => ReactElement` | - | A function rendering the record list, receive the list context as its argument |
| `resource` | Optional | `string` | Parent resource | Override resource name |
| `sort` | Optional | `{ field: string; order: 'ASC' \| 'DESC' }` | - | Sort order |

## Records Representation

By default, `<ReferenceArrayField>` renders one string by related record, via a [`<SingleFieldList>`](https://marmelab.com/react-admin/SingleFieldList.md) with a [`<BadgeField>`](./BadgeField.md) child using the resource [`recordRepresentation`](https://marmelab.com/react-admin//Resource.md#recordrepresentation) as source.

You can change how the list of related records is rendered by passing a custom child reading the `ListContext`.

For instance, use a `<DataTable>` to render the related records in a table:

```jsx {8-13}
import { Show, TextField, ReferenceArrayField, DataTable } from '@/components/admin';

export const PostShow = () => (
    <Show>
        <div className="flex flex-col gap-4">
            <TextField source="id" />
            <TextField source="title" />
            <ReferenceArrayField label="Tags" reference="tags" source="tag_ids">
                <DataTable>
                    <DataTable.Col source="id" />
                    <DataTable.Col source="name" />
                </DataTable>
            </ReferenceArrayField>
            <EditButton />
        </div>
    </Show>
);
```

Alternatively, you can use the `render` prop to render the related records in a custom way:

```tsx {8-19}
import { Show, SimpleShowLayout, TextField, ReferenceArrayField } from '@/components/admin';

export const PostShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="title" />
            <ReferenceArrayField
                label="Tags"
                reference="tags"
                source="tag_ids"
                render={({ data }) => (
                    <ul>
                        {data?.map(tag => (
                            <li key={tag.id}>{tag.name}</li>
                        ))}
                    </ul>
                )}
            />
            <EditButton />
        </SimpleShowLayout>
    </Show>
);
```

## Tips

- Use [`<ReferenceManyField>`](./ReferenceManyField.md) instead when you need to display records from another resource that reference the current record (inverse relationship).
