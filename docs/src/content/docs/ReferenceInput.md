---
title: "ReferenceInput"
---

Use `<ReferenceInput>` for foreign-key values, for instance, to edit the `company_id` of a `contact` resource.

## Usage

For instance, a contact record has a `company_id` field, which is a foreign key to a company record.

```
┌──────────────┐       ┌────────────┐
│ contacts     │       │ companies  │
│--------------│       │------------│
│ id           │   ┌───│ id         │
│ first_name   │   │   │ name       │
│ last_name    │   │   │ address    │
│ company_id   │───┘   └────────────┘
└──────────────┘             
```

To make the `company_id` for a `contact` editable, use the following syntax:

```jsx
import { Edit, SimpleForm, TextInput, ReferenceInput } from '@/components/admin';

const ContactEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="first_name" />
            <TextInput source="last_name" />
            <TextInput source="title" />
            <ReferenceInput source="company_id" reference="companies" />
        </SimpleForm>
    </Edit>
);
```

`<ReferenceInput>` requires a `source` and a `reference` prop.

`<ReferenceInput>` uses the foreign key value to fetch the related record. It also grabs the list of possible choices for the field. For instance, if the `ContactEdit` component above is used to edit the following contact:

```js
{
    id: 123,
    first_name: 'John',
    last_name: 'Doe',
    company_id: 456
}
```

Then `<ReferenceInput>` will issue the following queries:

```js
dataProvider.getMany('companies', { ids: [456] });
dataProvider.getList('companies', { 
    filter: {},
    sort: { field: 'id', order: 'DESC' },
    pagination: { page: 1, perPage: 25 }
});
```

`<ReferenceInput>` renders an [`<AutocompleteInput>`](./AutocompleteInput.md) to let the user select the related record. Users can narrow down the choices by typing a search term in the input. This modifies the query sent to the `dataProvider` as follows:

```js
dataProvider.getList('companies', { 
    filter: { q: ['search term'] },
    sort: { field: 'id', order: 'DESC' },
    pagination: { page: 1, perPage: 25 }
});
```

See [Customizing the filter query](#customizing-the-filter-query) below for more information about how to change `filter` prop based on the `<AutocompleteInput>` search term.

You can tweak how `<ReferenceInput>` fetches the possible values using the `page`, `perPage`, `sort`, and `filter` props.

You can replace the default `<AutocompleteInput>` by another choice input. To do so, pass the choice input component as `<ReferenceInput>` child. For instance, to use a [`<SelectInput>`](./SelectInput.md):

```jsx
import { ReferenceInput, SelectInput } from '@/components/admin';

<ReferenceInput source="company_id" reference="companies">
    <SelectInput />
</ReferenceInput>
```

## Props

| Prop | Required | Type | Default |  Description |
|------|----------|------|---------|--------------|
| `source` | Required | `string` | Foreign key field |
| `reference` | Required | `string` | Target resource |
| `children` | Optional | `ReactElement` | Input consuming choices (default `<AutocompleteInput />`) |
| `filter` | Optional | `Object` | `{}` | Permanent filters to use for getting the suggestion list |
| `label` | Optional | `string` | - | Useful only when `ReferenceInput` is in a Filter array, the label is used as the Filter label. |
| `page`  | Optional | `number` | 1 | The current page number |
| `perPage` | Optional | `number` | 25  | Number of suggestions to show |
| `queryOptions` | Optional | [`UseQueryOptions`](https://tanstack.com/query/v5/docs/react/reference/useQuery)  | `{}` | `react-query` client options |
| `sort`  | Optional | `{ field: String, order: 'ASC' or 'DESC' }` | `{ field:'id', order:'DESC' }` | How to order the list of suggestions |

## `children`

By default, `<ReferenceInput>` renders an [`<AutocompleteInput>`](./AutocompleteInput.md) to let end users select the reference record.

You can pass a child component to customize the way the reference selector is displayed.

For instance, to customize the input label, set the `label` prop on the child component:

```jsx
import { ReferenceInput, AutocompleteInput } from '@/components/admin';

<ReferenceInput source="company_id" reference="companies">
    <AutocompleteInput label="Employer" />
</ReferenceInput>
```

You can also use [`<SelectInput>`](./SelectInput.md) or [`<RadioButtonGroupInput>`](./RadioButtonGroupInput.md) instead of [`<AutocompleteInput>`](./AutocompleteInput.md).

```jsx
import { ReferenceInput, SelectInput } from '@/components/admin';

<ReferenceInput source="company_id" reference="companies">
    <SelectInput />
</ReferenceInput>
```

You can even use a component of your own as child, provided it detects a `ChoicesContext` is available and gets their choices from it.

## `format`

By default, children of `<ReferenceInput>` transform `null` values from the `dataProvider` into empty strings.

If you want to change this behavior, you have to pass a custom `format` prop to the `<ReferenceInput>` *child component*, because `<ReferenceInput>` doesn't have a `format` prop. It is the responsibility of the child component to format the input value.

For instance, if you want to transform an option value before rendering, and the selection control is an `<AutocompleteInput>` (the default), set [the `<AutocompleteInput format>` prop](./AutocompleteInput.md) as follows:

```jsx
import { ReferenceInput, AutocompleteInput } from '@/components/admin';

<ReferenceInput source="company_id" reference="companies">
    <AutocompleteInput format={value => value == null ? 'not defined' : value} />
</ReferenceInput>
```

The same goes if the child is a `<SelectInput>`:

```jsx
import { ReferenceInput, SelectInput } from '@/components/admin';

<ReferenceInput source="company_id" reference="companies">
    <SelectInput format={value => value === undefined ? 'not defined' : null} />
</ReferenceInput>
```

## `parse`

By default, children of `<ReferenceInput>` transform the empty form value (an empty string) into `null` before passing it to the `dataProvider`.

If you want to change this behavior, you have to pass a custom `parse` prop to the `<ReferenceInput>` *child component*, because  **`<ReferenceInput>` doesn't have a `parse` prop**. It is the responsibility of the child component to parse the input value.

For instance, if you want to transform an option value before submission, and the selection control is an `<AutocompleteInput>` (the default), set [the `<AutocompleteInput parse>` prop](./AutocompleteInput.md) as follows:

```jsx
import { ReferenceInput, AutocompleteInput } from '@/components/admin';

<ReferenceInput source="company_id" reference="companies">
    <AutocompleteInput parse={value => value === 'not defined' ? null : value} />
</ReferenceInput>
```

The same goes if the child is a `<SelectInput>`:

```jsx
import { ReferenceInput, SelectInput } from '@/components/admin';

<ReferenceInput source="company_id" reference="companies">
    <SelectInput parse={value => value === 'not defined' ? undefined : null} />
</ReferenceInput>
```

## `reference`

The name of the reference resource. For instance, in a contact form, if you want to edit the contact employer, the reference should be "companies".

```jsx
<ReferenceInput source="company_id" reference="companies" />
```

`<ReferenceInput>` will use the reference resource [`recordRepresentation`](https://marmelab.com/ra-core/resource/#recordrepresentation) to display the selected record and the list of possible records. So for instance, if the `companies` resource is defined as follows:

```jsx
<Resource name="companies" recordRepresentation="name" />
```

Then `<ReferenceInput>` will display the company name in the input and in the list of possible values.

You can override this default by specifying the `optionText` prop in the child component. For instance, for an `<AutocompleteInput>`:

```jsx
<ReferenceInput source="company_id" reference="companies">
    <AutocompleteInput optionText="reference" />
</ReferenceInput>
```

## `validate`

You can pass a validation function to `<ReferenceInput>` *child component*, because **`<ReferenceInput>` doesn't have a `validate` prop**. It is the responsibility of the child component to validate the input value.

For instance, to make the reference required, and the selection control is an `<AutocompleteInput>` (the default), set [the `<AutocompleteInput validate>` prop](./AutocompleteInput.md) as follows:

```jsx
import { ReferenceInput, AutocompleteInput, required } from '@/components/admin';

<ReferenceInput source="company_id" reference="companies">
    <AutocompleteInput validate={required()} />
</ReferenceInput>
```

## Customizing The Filter Query

By default, `<ReferenceInput>` renders an `<AutocompleteInput>`, which lets users type a search term to filter the possible values. `<ReferenceInput>` calls `dataProvider.getList()` using the search term as filter, using the format `filter: { q: [search term] }`.

If you want to customize the conversion between the search term and the query filter to match the filtering capabilities of your API, use the [`<AutocompleteInput filterToQuery>`](./AutocompleteInput.md) prop.

```jsx
const filterToQuery = searchText => ({ name_ilike: `%${searchText}%` });

<ReferenceInput source="company_id" reference="companies">
    <AutocompleteInput filterToQuery={filterToQuery} />
</ReferenceInput>
```

## Creating a New Reference

When users don't find the reference they are looking for in the list of possible values, they need to create a new reference. If they have to quit the current form to create the reference, they may lose the data they have already entered. So a common feature for `<ReferenceInput>` is to let users create a new reference on the fly.

Children of `<ReferenceInput>` (`<AutocompleteInput>`, `<SelectInput>`, etc.) allow the creation of new choices via the `onCreate` prop. This displays a new "Create new" option in the list of choices. You can leverage this capability to create a new reference record.

The following example is a contact edition form using a `<ReferenceInput>` to select the contact company. Its child `<AutocompleteInput onCreate>` allows to create a new company on the fly if it doesn't exist yet.

```tsx
export const ContactEdit = () => {
    const [create] = useCreate();
    const notify = useNotify();
    const handleCreateCompany = async (companyName?: string) => {
        if (!companyName) return;
        try {
            const newCompany = await create(
                'companies',
                { data: { name: companyName } },
                { returnPromise: true }
            );
            return newCompany;
        } catch (error) {
            notify('An error occurred while creating the company', {
                type: 'error',
            });
            throw(error);
        }
    };
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="first_name" />
                <TextInput source="last_name" />
                <ReferenceInput source="company_id" reference="companies">
                    <AutocompleteInput onCreate={handleCreateCompany} />
                </ReferenceInput>
            </SimpleForm>
        </Edit>
    );
};
```

In the example above, the `handleCreateCompany` function creates a new company with the name provided by the user, and returns it so that `<AutocompleteInput>` selects it.

If you need to ask the user for more details about the new reference, you display a custom element (e.g. a dialog) when the user selects the "Create" option. Use the `create` prop for that instead of `onCreate`.
