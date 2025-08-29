---
title: "ArrayField"
---

Renders an embedded array of objects. Creates a `ListContext` with the data so you can reuse list-aware child components (e.g. `<SingleFieldList>`, `<DataTable>`).

## Usage

`<ArrayField>` is ideal for collections of objects, e.g. `tags` and `backlinks` in the following `post` object:

```js
{
    id: 123,
    title: 'Lorem Ipsum Sit Amet',
    tags: [{ name: 'dolor' }, { name: 'sit' }, { name: 'amet' }],
    backlinks: [
        {
            uuid: '34fdf393-f449-4b04-a423-38ad02ae159e',
            date: '2012-08-10T00:00:00.000Z',
            url: 'https://example.com/foo/bar.html',
        },
        {
            uuid: 'd907743a-253d-4ec1-8329-404d4c5e6cf1',
            date: '2012-08-14T00:00:00.000Z',
            url: 'https://blog.johndoe.com/2012/08/12/foobar.html',
        }
    ]
}
```

Leverage `<ArrayField>` e.g. in a Show view, to display the `tags` as a `<SingleFieldList>` and the `backlinks` as a `<DataTable>`:

```tsx
import { 
    ArrayField,
    BadgeField,
    DataTable,
    Show,
    SingleFieldList,
    TextField
} from '@/components/admin';

const PostShow = () => (
    <Show>
        <div className="flex flex-col gap-4">
            <TextField source="title" />
            <ArrayField source="tags">
                <SingleFieldList linkType={false}>
                    <BadgeField source="name" size="small" />
                </SingleFieldList>
            </ArrayField>
            <ArrayField source="backlinks">
                <DataTable bulkActionButtons={false}>
                    <DataTable.Col source="uuid" />
                    <DataTable.Col source="date" />
                    <DataTable.Col source="url" />
                </DataTable>
            </ArrayField>
        </div>
    </Show>
)
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Array field name |
| `children` | Required | `ReactNode` | - | List-aware components |
| `defaultValue` | Optional | `any[]` | `[]` | Fallback when record has no value for `source` |
| `filter` | Optional | `object` | - | Permanent filters |
| `perPage` | Optional | `number` | - | Pagination size |
| `resource` | Optional | `string` | Parent resource | Override resource name |
| `sort` | Optional | `{ field: string; order: 'ASC' \| 'DESC' }` | - | Sort order |

## Rendering An Array Of Strings

If you need to render a custom collection (e.g. an array of tags `['dolor', 'sit', 'amet']`), it's often simpler to write your own component:

```jsx
import { useRecordContext } from 'ra-core';

const TagsField = () => {
    const record = useRecordContext();
    return (
        <ul>
            {record.tags.map(item => (
                <li key={item.name}>{item.name}</li>
            ))}
        </ul>
    )
};
```
