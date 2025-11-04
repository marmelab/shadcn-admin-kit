---
title: "ReferenceOneField"
---

This field fetches a one-to-one relationship, e.g. the details of a book, when using a foreign key on the distant resource.

```
┌──────────────┐       ┌──────────────┐
│ books        │       │ book_details │
│--------------│       │--------------│
│ id           │───┐   │ id           │
│ title        │   └──╼│ book_id      │
│ published_at │       │ genre        │
└──────────────┘       │ ISBN         │
                       └──────────────┘
```

`<ReferenceOneField>` behaves like `<ReferenceManyField>`: it uses the current `record` (a book in this example) to build a filter for the book details with the foreign key (`book_id`). Then, it uses `dataProvider.getManyReference('book_details', { target: 'book_id', id: book.id })` to fetch the related details, and takes the first one.

`<ReferenceOneField>` renders the [`recordRepresentation`](https://marmelab.com/ra-core/resource/#recordrepresentation) of the related record. It also creates a `RecordContext` with the reference record, so you can use any component relying on this context (`<TextField>`, `<SimpleShowLayout>`, etc.) as child.

For the inverse relationships (the book linked to a book_detail), you can use a [`<ReferenceField>`](./ReferenceField.md).

## Usage

Here is how to render a field of the `book_details` resource inside e Show view for the `books` resource:


```jsx
const BookShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="title" />
            <DateField source="published_at" />
            <ReferenceField source="authorId" reference="authors" />
            <ReferenceOneField reference="book_details" target="book_id">
                <RecordField label="Genre" source="genre" />
            </ReferenceOneField>
            <ReferenceOneField reference="book_details" target="book_id">
                <RecordField label="ISBN" source="ISBN" />
            </ReferenceOneField>
        </SimpleShowLayout>
    </Show>
);
```

**Tip**: As with `<ReferenceField>`, you can call `<ReferenceOneField>` as many times as you need in the same component, react-admin will only make one call to `dataProvider.getManyReference()` per reference.

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Foreign key in current record |
| `reference` | Required | `string` | - | Target resource name |
| `target` | Required | `string` | - | Target field carrying the relationship on the referenced resource, e.g. `book_id` |
| `children` | Optional | `ReactNode` | `<span>` representation | Custom child (can use context hooks) |
| `empty` | Optional | `ReactNode` | - | Placeholder when no id / value |
| `error` | Optional | `ReactNode` | - | Error element (set `false` to hide) |
| `loading` | Optional | `ReactNode` | - | Element while loading (set `false` to hide) |
| `queryOptions` | Optional | `UseQueryOptions` | - | TanStack Query options (meta, staleTime, etc.) |
| `record` | Optional | `object` | Context record | Explicit record |
| `render` | Optional | `(ctx)=>ReactNode` | - | Custom renderer receiving reference field context |
| `link` | Optional | `LinkToType` | `edit` | Link target or false / function |


## Record Representation

[See `ReferenceField`](./ReferenceField.md#record-representation)

## Tips

[See `ReferenceField`](./ReferenceField.md#tips)