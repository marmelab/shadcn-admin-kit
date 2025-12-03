---
title: "ReferenceManyField"
---

Fetches multiple referenced records that reference the current record, and provides them through a `ListContext` to its children. Useful for displaying a list of related records via a one-to-many relationship, when the foreign key is carried by the referenced resource.

## Usage

For instance, if an `author` has many `books`, and each book resource exposes an `author_id` field:

```
┌────────────────┐       ┌──────────────┐
│ authors        │       │ books        │
│----------------│       │--------------│
│ id             │───┐   │ id           │
│ first_name     │   └──╼│ author_id    │
│ last_name      │       │ title        │
│ date_of_birth  │       │ published_at │
└────────────────┘       └──────────────┘
```

`<ReferenceManyField>` can render the titles of all the books by a given author.

```jsx {9-14}
import { Show, ReferenceManyField, DataTable, DateField, RecordField } from '@/components/admin';

const AuthorShow = () => (
  <Show>
    <div className="flex flex-col gap-4">
      <RecordField source="first_name" />
      <RecordField source="last_name" />
      <RecordField label="Books">
        <ReferenceManyField reference="books" target="author_id" label="Books">
          <DataTable>
            <DataTable.Col source="title" />
            <DataTable.Col source="published_at" field={DateField} />
          </DataTable>
        </ReferenceManyField>
      </RecordField>
    </div>
  </Show>
);
```

`<ReferenceManyField>` expects a `reference` attribute, which specifies the resource to fetch for the related record. It also expects a `source` attribute which defines the field containing the value to look for in the `target` field of the referenced resource. By default, this is the `id` of the resource (`authors.id` in the previous example).

You can also use `<ReferenceManyField>` in a list, e.g. to display the authors of the comments related to each post in a list by matching `post.id` to `comment.post_id`:

```jsx {10-14}
import { List, DataTable, BadgeField, ReferenceManyField, SingleFieldList } from '@/components/admin';

export const PostList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="title" />
            <DataTable.Col label="Comments by">
                <ReferenceManyField reference="comments" target="post_id">
                    <SingleFieldList>
                        <BadgeField source="author.name" />
                    </SingleFieldList>
                </ReferenceManyField>
            </DataTable.Col>
            <DataTable.Col>
                <EditButton />
            </DataTable.Col>
        </DataTable>
    </List>
);
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `reference` | Required | `string` | - | Target resource |
| `target` | Required | `string` | - | Foreign key in target referencing current record id |
| `children` | Optional | `ReactNode` | - | List display components |
| `debounce` | Optional | `number` | 500 | Debounce time in ms for filter changes |
| `empty` | Optional | `ReactNode` | - | Placeholder when list empty |
| `error` | Optional | `ReactNode` | - | Error element (set `false` to hide) |
| `filter` | Optional | `object` | - | Permanent filters |
| `loading` | Optional | `ReactNode` | - | Loading element (set `false` to hide) |
| `page` | Optional | `number` | 1 | Initial page |
| `pagination` | Optional | `ReactNode` | - | Pagination component |
| `perPage` | Optional | `number` | - | Page size |
| `render` | Optional | `(listCtx)=>ReactNode` | - | Custom pre-children renderer |
| `sort` | Optional | `{ field: string; order: 'ASC' \| 'DESC' }` | - | Sort order |
| `storeKey` | Optional | `string` | - | The key to use to store the records selection state |

## Tips

- Use `<ReferenceArrayField>` instead when the current record contains an array of foreign keys.
