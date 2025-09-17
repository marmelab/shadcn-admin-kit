---
title: "ReferenceArrayInput"
---

Use `<ReferenceArrayInput>` to edit an array of reference values, i.e. to let users choose a list of values (usually foreign keys) from another REST endpoint.

## Usage

For instance, a post record has a `tag_ids` field, which is an array of foreign keys to tags record.

```
┌──────────────┐       ┌────────────┐
│ post         │       │ tags       │
│--------------│       │------------│
│ id           │   ┌───│ id         │
│ title        │   │   │ name       │
│ body         │   │   └────────────┘
│ tag_ids      │───┘
└──────────────┘             
```

To make the `tag_ids` for a `post` editable, use the following:

```jsx
import { Edit, SimpleForm, TextInput, ReferenceArrayInput } from '@/components/admin';

const PostEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="title" />
            <ReferenceArrayInput source="tags_ids" reference="tags" />
        </SimpleForm>
    </Edit>
);
```

`<ReferenceArrayInput>` requires a `source` and a `reference` prop.

`<ReferenceArrayInput>` uses the array of foreign keys to fetch the related records. It also grabs the list of possible choices for the field. For instance, if the `PostEdit` component above is used to edit the following post:

```js
{
    id: 1234,
    title: "Lorem Ipsum",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    tag_ids: [1, 23, 4]
}
```

Then `<ReferenceArrayInput>` will issue the following queries:

```js
dataProvider.getMany('tags', { ids: [1, 23, 4] });
dataProvider.getList('tags', { 
    filter: {},
    sort: { field: 'id', order: 'DESC' },
    pagination: { page: 1, perPage: 25 }
});
```

`<ReferenceArrayInput>` renders an [`<AutocompleteArrayInput>`](./AutocompleteArrayInput.md) to let the user select the related record. Users can narrow down the choices by typing a search term in the input. This modifies the query sent to the `dataProvider` as follows:

```js
dataProvider.getList('tags', { 
    filter: { q: ['search term'] },
    sort: { field: 'id', order: 'DESC' },
    pagination: { page: 1, perPage: 25 }
});
```

See [Customizing the filter query](#customizing-the-filter-query) below for more information about how to change `filter` prop based on the `<AutocompleteArrayInput>` search term.

You can tweak how `<ReferenceArrayInput>` fetches the possible values using the `page`, `perPage`, `sort`, and `filter` props.

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | Field with array of ids |
| `reference` | Required | `string` | Target resource |
| `children` | Optional | `ReactNode` | Reference selector element (default `<AutocompleteArrayInput />`) |
| `filter` | Optional | `Object` | `{}` | Permanent filters to use for getting the suggestion list |
| `label` | Optional | `string` | -  | Useful only when `ReferenceArrayInput` is in a Filter array, the label is used as the Filter label. |
| `page` | Optional | `number` | 1  | The current page number |
| `perPage` | Optional | `number` | 25  | Number of suggestions to show |
| `queryOptions` | Optional | [`UseQueryOptions`](https://tanstack.com/query/v5/docs/react/reference/useQuery) | `{}` | `react-query` client options |
| `sort` | Optional | `{ field: String, order: 'ASC' or 'DESC' }` | `{ field: 'id', order: 'DESC' }` | How to order the list of suggestions |

## `format`

If you want to format the input value before displaying it, you have to pass a custom `format` prop to the `<ReferenceArrayInput>` *child component*, because  **`<ReferenceArrayInput>` doesn't have a `format` prop**. It is the responsibility of the child component to format the input value.

For instance, if you want to transform an option value before rendering, and the selection control is an `<AutocompleteArrayInput>` (the default), set [the `<AutocompleteArrayInput format>` prop](./AutocompleteArrayInput.md) as follows:

```jsx
import { ReferenceArrayInput, AutocompleteArrayInput } from '@/components/admin';

<ReferenceArrayInput source="tags_ids" reference="tags">
    <AutocompleteArrayInput format={value => value == null ? 'not defined' : value} />
</ReferenceArrayInput>
```

## `label`

In an `<Edit>` or `<Create>` view, the `label` prop has no effect. `<ReferenceArrayInput>` has no label, it simply renders its child (an `<AutocompleteArrayInput>` by default). If you need to customize the label, set the `label` prop on the child element:

```jsx
import { ReferenceArrayInput, AutocompleteArrayInput } from '@/components/admin';

<ReferenceArrayInput source="tags_ids" reference="tags">
    <AutocompleteArrayInput label="Post tags" />
</ReferenceArrayInput>
```

In a Filter form, Shadcn Admin Kit uses the `label` prop to set the Filter label. So in this case, the `label` prop is not ignored, but you also have to set it on the child input.

```jsx
const filters = [
    <ReferenceArrayInput label="Post tags" source="tags_ids" reference="tags">
        <AutocompleteArrayInput label="Post tags" />
    </ReferenceArrayInput>,
];
```

## `parse`

By default, children of `<ReferenceArrayInput>` transform the empty form value (an empty string) into `null` before passing it to the `dataProvider`.

If you want to change this behavior, you have to pass a custom `parse` prop to the `<ReferenceArrayInput>` *child component*, because  **`<ReferenceArrayInput>` doesn't have a `parse` prop**. It is the responsibility of the child component to parse the input value.

For instance, if you want to transform an option value before submission, and the selection control is an `<AutocompleteArrayInput>` (the default), set [the `<AutocompleteArrayInput parse>` prop](./AutocompleteArrayInput.md) as follows:

```jsx
import { ReferenceArrayInput, AutocompleteArrayInput } from '@/components/admin';

<ReferenceArrayInput source="tags_ids" reference="tags">
    <AutocompleteArrayInput parse={value => value === 'not defined' ? null : value} />
</ReferenceArrayInput>
```

## Customizing The Filter Query

By default, `<ReferenceArrayInput>` renders an `<AutocompleteArrayInput>`, which lets users type a search term to filter the possible values. `<ReferenceArrayInput>` calls `dataProvider.getList()` using the search term as filter, using the format `filter: { q: [search term] }`.

If you want to customize the conversion between the search term and the query filter to match the filtering capabilities of your API, use the [`<AutocompleteArrayInput filterToQuery>`](./AutocompleteArrayInput.md) prop.

```jsx
const filterToQuery = searchText => ({ name_ilike: `%${searchText}%` });

<ReferenceArrayInput source="tags_ids" reference="tags">
    <AutocompleteArrayInput filterToQuery={filterToQuery} />
</ReferenceArrayInput>
```
