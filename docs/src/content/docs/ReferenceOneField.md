---
title: 'ReferenceOneField'
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
            <ReferenceOneField
                reference="book_details"
                target="book_id"
                label="Genre"
            >
                <TextField source="genre" />
            </ReferenceOneField>
            <ReferenceOneField
                reference="book_details"
                target="book_id"
                label="ISBN"
            >
                <TextField source="ISBN" />
            </ReferenceOneField>
        </SimpleShowLayout>
    </Show>
);
```

**Tip**: As with `<ReferenceField>`, you can call `<ReferenceOneField>` as many times as you need in the same component, react-admin will only make one call to `dataProvider.getManyReference()` per reference.

## Props

| Prop           | Required | Type               | Default                 | Description                                                                       |
| -------------- | -------- | ------------------ | ----------------------- | --------------------------------------------------------------------------------- |
| `reference`    | Required | `string`           | -                       | Target resource name                                                              |
| `source`       | Required | `string`           | -                       | Foreign key in current record                                                     |
| `target`       | Required | `string`           | -                       | Target field carrying the relationship on the referenced resource, e.g. `book_id` |
| `children`     | Optional | `ReactNode`        | `<span>` representation | Custom child (can use context hooks)                                              |
| `empty`        | Optional | `ReactNode`        | -                       | Placeholder when no id / value                                                    |
| `error`        | Optional | `ReactNode`        | -                       | Error element (set `false` to hide)                                               |
| `filter`       | Optional | `object`           | -                       | Filters to apply to the query                                                     |
| `link`         | Optional | `LinkToType`       | `edit`                  | Link target or false / function                                                   |
| `loading`      | Optional | `ReactNode`        | -                       | Element while loading (set `false` to hide)                                       |
| `offline`      | Optional | `ReactNode`        | -                       | The text or element to display when there is no network connectivity              |
| `queryOptions` | Optional | `UseQueryOptions`  | -                       | TanStack Query options (meta, staleTime, etc.)                                    |
| `record`       | Optional | `object`           | Context record          | Explicit record                                                                   |
| `render`       | Optional | `(ctx)=>ReactNode` | -                       | Custom renderer receiving reference field context                                 |
| `sort`         | Optional | `SortPayload`      | -                       | Sort order to apply to the query                                                  |

## Record Representation

By default, `<ReferenceOneField>` renders the [`recordRepresentation`](https://marmelab.com/ra-core/resource/#recordrepresentation) of the related record.

So it's a good idea to configure the `<Resource recordRepresentation>` to render related records in a meaningful way. For instance, for the `book_details` resource, if you want the `<ReferenceOneField>` to display the genre:

```jsx
<Resource
    name="book_details"
    list={BookDetailsList}
    recordRepresentation={(record) => record.genre}
/>
```

If you pass a child component, `<ReferenceOneField>` will render it instead of the `recordRepresentation`. Usual child components for `<ReferenceOneField>` are other `<Field>` components (e.g. [`<TextField>`](./TextField.md)).

```jsx
<ReferenceOneField reference="book_details" target="book_id">
    <TextField source="genre" />
</ReferenceOneField>
```

Alternatively to `children`, pass a `render` prop. It will receive the `ReferenceFieldContext` as its argument, and should return a React node.

This allows to inline the render logic for the related record.

```jsx
<ReferenceOneField
    reference="book_details"
    target="book_id"
    render={({ error, isPending, referenceRecord }) => {
        if (isPending) {
            return <p>Loading...</p>;
        }
        if (error) {
            return <p className="error">{error.message}</p>;
        }
        return <p>{referenceRecord.genre}</p>;
    }}
/>
```

## Tips

- Use `link={false}` to disable navigation.
- `<ReferenceOneField>` uses `dataProvider.getManyReference()` to fetch the related record. When using several `<ReferenceOneField>` in the same page, this allows to call the `dataProvider` once instead of once per field.
- If you need to display multiple fields from the same related record, you can pass multiple child components to `<ReferenceOneField>`. However, for a better layout, you may want to use `label={false}` on the field and render each child field with its own label.
