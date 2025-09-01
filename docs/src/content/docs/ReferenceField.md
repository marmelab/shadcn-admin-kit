---
title: "ReferenceField"
---

Fetches and displays a single referenced record (foreign key lookup). Useful for displaying many-to-one and one-to-one relationships, e.g. the details of a user when rendering a post authored by that user.

## Usage

For instance, let's consider a model where a `post` has one author from the `users` resource, referenced by a `user_id` field.

```
┌──────────────┐       ┌────────────────┐
│ posts        │       │ users          │
│--------------│       │----------------│
│ id           │   ┌───│ id             │
│ user_id      │╾──┘   │ name           │
│ title        │       │ date_of_birth  │
│ published_at │       └────────────────┘
└──────────────┘
```

In that case, use `<ReferenceField>` to display the post author's as follows:

```jsx {9}
import { Show, ReferenceField, TextField, DateField } from '@/components/admin';

export const PostShow = () => (
    <Show>
        <div className="flex flex-col gap-4">
            <TextField source="id" />
            <TextField source="title" />
            <DateField source="published_at" />
            <ReferenceField source="user_id" reference="users" label="Author" />
        </div>
    </Show>
);
```

This component fetches a referenced record (`users` in this example) using the `dataProvider.getMany()` method, and renders the [`recordRepresentation`](https://marmelab.com/react-admin//Resource.md#recordrepresentation) (the record `id` field by default) wrapped in a link to the related user `<Edit>` page.

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Foreign key in current record |
| `reference` | Required | `string` | - | Target resource name |
| `children` | Optional | `ReactNode` | `<span>` representation | Custom child (can use context hooks) |
| `empty` | Optional | `ReactNode` | - | Placeholder when no id / value |
| `error` | Optional | `ReactNode` | - | Error element (set `false` to hide) |
| `link` | Optional | `LinkToType` | `edit` | Link target or false / function |
| `loading` | Optional | `ReactNode` | - | Element while loading (set `false` to hide) |
| `queryOptions` | Optional | `UseQueryOptions` | - | TanStack Query options (meta, staleTime, etc.) |
| `record` | Optional | `object` | Context record | Explicit record |
| `render` | Optional | `(ctx)=>ReactNode` | - | Custom renderer receiving reference field context |
| `translateChoice` | Optional | `boolean \| (record)=>string` | `true` | Translate referenced record representation |

## Record Representation

By default, `<ReferenceField>` renders the [`recordRepresentation`](https://marmelab.com/react-admin//Resource.md#recordrepresentation) of the related record.

So it's a good idea to configure the `<Resource recordRepresentation>` to render related records in a meaningful way. For instance, for the `users` resource, if you want the `<ReferenceField>` to display the full name of the author:

```jsx
<Resource
    name="users"
    list={UserList}
    recordRepresentation={(record) => `${record.first_name} ${record.last_name}`}
/>
```

If you pass a child component, `<ReferenceField>` will render it instead of the `recordRepresentation`. Usual child components for `<ReferenceField>` are other `<Field>` components (e.g. [`<TextField>`](./TextField.md)).

```jsx
<ReferenceField source="user_id" reference="users">
    <TextField source="name" />
</ReferenceField>
```

Alternatively to `children`, pass a `render` prop. It will receive the `ReferenceFieldContext` as its argument, and should return a React node.

This allows to inline the render logic for the list of related records.

```jsx
<ReferenceField
    source="user_id"
    reference="users"
    render={({ error, isPending, referenceRecord }) => {
        if (isPending) {
            return <p>Loading...</p>;
        }
        if (error) {
            return <p className="error">{error.message}</p>;
        }
        return <p>{referenceRecord.name}</p>;
    }}
/>
```

## Tips

- Use `link={false}` to disable navigation.
- `<ReferenceField>` uses `dataProvider.getMany()` instead of `dataProvider.getOne()` for performance reasons. When using several `<ReferenceField>` in the same page (e.g. in a `<DataTable>`), this allows to call the `dataProvider` once instead of once per row.
