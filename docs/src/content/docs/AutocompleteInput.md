---
title: "AutocompleteInput"
---

Form control that tets users choose a value in a list using a dropdown with autocompletion. This input allows editing record fields that are scalar values, e.g. `123`, `'admin'`, etc. 

## Usage

In addition to the `source`, `<AutocompleteInput>` requires one prop: the `choices` listing the possible values.

```jsx
import { AutocompleteInput } from '@/components/admin';

<AutocompleteInput source="category" choices={[
    { id: 'tech', name: 'Tech' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'people', name: 'People' },
]} />
```

By default, the possible choices are built from the `choices` prop, using:
  - the `id` field as the option value,
  - the `name` field as the option text

The form value for the source must be the selected value, e.g.

```js
{
    id: 123,
    title: 'Lorem Ipsum',
    category: 'lifestyle',
}
```

:::tip
Shadcn Admin Kit includes other components to edit such values:

 - [`<SelectInput>`](./SelectInput.md) renders a dropdown
 - [`<RadioButtonGroupInput>`](./RadioButtonGroupInput.md) renders a list of radio buttons
 :::

:::tip
If you need to let users select more than one item in the list, check out the [`<AutocompleteArrayInput>`](./AutocompleteArrayInput.md) component.
:::

## Props

| Prop | Required | Type | Default | Description |
|---|---|---|---|---|
| `source` | Required* | `string` | `-` | Field name (inferred in ReferenceInput) |
| `choices` | Required* | `Object[]` | `-` | List of items to autosuggest. Required if not inside a ReferenceInput. |
| `className` | Optional | `string` | `-` | The class name to apply to the root element |
| `create` | Optional | `Element` | `-` | A React Element to render when users want to create a new choice |
| `createItemLabel` | Optional | `string` &#124; `(filter: string) => ReactNode` | `ra.action .create_item` | The label for the menu item allowing users to create a new choice. Used when the filter is not empty. |
| `createLabel` | Optional | `string` &#124; `ReactNode` | - | The label used as hint to let users know they can create a new choice. Displayed when the filter is empty. |
| `debounce` | Optional | `number` | `250` | The delay to wait before calling the setFilter function injected when used in a ReferenceInput. |
| `defaultValue` | Optional | `any` | `''` | The default value for the input |
| `disabled` | Optional | `boolean` | `false` | If true, the input is disabled |
| `emptyText` | Optional | `string` | `''` | The text to use for the empty element |
| `emptyValue` | Optional | `any` | `''` | The value to use for the empty element |
| `filterToQuery` | Optional | `string` => `Object` | `q => ({ q })` | How to transform the searchText into a parameter for the data provider |
| `format` | Optional | `Function` | `-` | Callback taking the value from the form state, and returning the input value. |
| `helperText` | Optional | `string` &#124; `ReactNode` | `-` | The helper text to display below the input |
| `inputText` | Optional | `Function` | `-` | Required if `optionText` is a custom Component, this function must return the text displayed for the current selection. |
| `isPending` | Optional | `boolean` | `false` | If `true`, the component will display a loading indicator. |
| `label` | Optional | `string` &#124; `ReactNode` | `-` | The label to display for the input |
| `matchSuggestion` | Optional | `Function` | `-` | Required if `optionText` is a React element. Function returning a boolean indicating whether a choice matches the filter. `(filter, choice) => boolean` |
| `offline` | Optional | `ReactNode` | - | What to render when there is no network connectivity when fetching the choices |
| `onChange` | Optional | `Function` | `-` | A function called with the new value, along with the selected record, when the input value changes |
| `onCreate` | Optional | `Function` | `-` | A function called with the current filter value when users choose to create a new choice. |
| `optionText` | Optional | `string` &#124; `Function` &#124; `Component` | `undefined` &#124; `record Representation` | Field name of record to display in the suggestion item or function using the choice object as argument |
| `optionValue` | Optional | `string` | `id` | Field name of record containing the value to use as input value |
| `parse` | Optional | `Function` | `-` | Callback taking the value from the input, and returning the value to be stored in the form state. |
| `setFilter` | Optional | `Function` | `null` | A callback to inform the `searchText` has changed and new `choices` can be retrieved based on this `searchText`. Signature `searchText => void`. This function is automatically set up when using `ReferenceInput`. |
| `shouldRenderSuggestions` | Optional | `Function` | `() => true` | A function that returns a `boolean` to determine whether or not suggestions are rendered. |
| `suggestionLimit` | Optional | `number` | `null` | Limits the numbers of suggestions that are shown in the dropdown list |
| `translateChoice` | Optional | `boolean` | `true` | Whether the choices should be translated |
| `validate` | Optional | `Function` &#124; `Function[]` | `-` | An array of validation functions or a single validation function |

`*` `source` and `choices` are optional inside `<ReferenceInput>`.

<style>
.sl-markdown-content :is(th, td):not(:where(.not-content *)) {
  padding: 0.5rem 0.5rem;
}
.sl-markdown-content table td:first-child {
  min-width: 120px;
  padding-left: 0;
}
.sl-markdown-content table td:last-child {
  padding-right: 0;
}
</style>

## Defining Choices

The list of choices must be an array of objects with at least two fields: one to use for the name, and the other to use for the value. By default, `<AutocompleteInput>` will use the `id` and `name` fields.

```jsx
const choices = [
    { id: 'tech', name: 'Tech' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'people', name: 'People' },
];
<AutocompleteInput source="category" choices={choices} />
```

If the choices have different keys, you can use `optionText` and `optionValue` to specify which fields to use for the name and value.

```jsx
const choices = [
    { _id: 'tech', label: 'Tech' },
    { _id: 'lifestyle', label: 'Lifestyle' },
    { _id: 'people', label: 'People' },
];

<AutocompleteInput
    source="category"
    choices={choices}
    optionText="label"
    optionValue="_id"
/>
```

The choices are translated by default, so you can use translation identifiers as choices:

```jsx
const choices = [
    { id: 'tech', name: 'myroot.categories.tech' },
    { id: 'lifestyle', name: 'myroot.categories.lifestyle' },
    { id: 'people', name: 'myroot.categories.people' },
];
```

You can opt-out of this translation by setting the `translateChoice` prop to `false`.

If you need to *fetch* the options from another resource, you're usually editing a many-to-one or a one-to-one relationship. In this case, wrap the `<AutocompleteInput>` in a [`<ReferenceInput>`](./ReferenceInput.md). You don't need to specify the `source` and `choices` prop in this case - the parent component injects them based on the possible values of the related resource.

```jsx
<ReferenceInput label="Author" source="author_id" reference="authors">
    <AutocompleteInput />
</ReferenceInput>
```

You can also pass an *array of strings* for the choices:

```jsx
const categories = ['tech', 'lifestyle', 'people'];
<AutocompleteInput source="category" choices={categories} />
// is equivalent to
const choices = categories.map(value => ({ id: value, name: value }));
<AutocompleteInput source="category" choices={choices} />
```

## Using Inside `<ReferenceInput>`

When used inside a [`<ReferenceInput>`](./ReferenceInput.md), whenever users type a string in the autocomplete input, `<AutocompleteInput>` calls `dataProvider.getList()` using the string as filter, to return a filtered list of possible options from the reference resource. This filter is built using the `filterToQuery` prop.

By default, the filter is built using the `q` parameter. This means that if the user types the string 'lorem', the filter will be `{ q: 'lorem' }`.

You can customize the filter by setting the `filterToQuery` prop. It should be a function that returns a filter object. 

```jsx
const filterToQuery = searchText => ({ name_ilike: `%${searchText}%` });

<ReferenceInput label="Author" source="author_id" reference="authors">
    <AutocompleteInput filterToQuery={filterToQuery} />
</ReferenceInput>
```

## Using A Custom Element For Options

You can pass a custom element as `optionText` to have `<AutocompleteInput>` render each suggestion in a custom way.

`<AutocompleteInput>` will render the custom option element inside a [`<RecordContext>`](https://marmelab.com/ra-core/userecordcontext/), using the related choice as the `record` prop. You can use Field components there.

However, as the underlying Material UI `<Autocomplete>` component requires that the current selection is a string, you must also pass a function as the `inputText` prop. This function should return a text representation of the current selection. You should also pass a `matchSuggestion` function to filter the choices based on the current selection.

```jsx
const choices = [
   { id: 123, first_name: 'Leo', last_name: 'Tolstoi', avatar:'/penguin' },
   { id: 456, first_name: 'Jane', last_name: 'Austen', avatar:'/panda' },
];
const OptionRenderer = () => {
    const record = useRecordContext();
    return (
        <span>
            <img src={record.avatar} />
            {record.first_name} {record.last_name}
        </span>
    );
};

const optionText = <OptionRenderer />;
const inputText = choice => `${choice.first_name} ${choice.last_name}`;
const matchSuggestion = (filter, choice) => {
    return (
        choice.first_name.toLowerCase().includes(filter.toLowerCase())
        || choice.last_name.toLowerCase().includes(filter.toLowerCase())
    );
};

<AutocompleteInput
    source="author_id"
    choices={choices}
    optionText={optionText}
    inputText={inputText}
    matchSuggestion={matchSuggestion}
/>
```

:::caution
Make sure you pass stable references to the functions passed to the `inputText` and `matchSuggestion` by either declaring them outside the component render function or by wrapping them in a [`useCallback`](https://react.dev/reference/react/useCallback).

Make sure you also pass a stable reference to the element passed to the `optionText` prop by calling it outside the component render function like so:

```jsx
const OptionRenderer = () => {
    const record = useRecordContext();
    return (
        <span>
            <img src={record.avatar} />
            {record.first_name} {record.last_name}
        </span>
    );
};

const optionText = <OptionRenderer />;
```
:::

## Creating New Choices On The Fly

To allow users to add new options, pass a React element as the `create` prop. `<AutocompleteInput>` will then render a menu item at the bottom of the list, which will render the passed element when clicked.

```tsx
import { 
    Create, 
    CreateBase, 
    SimpleForm, 
    ReferenceInput, 
    AutocompleteInput, 
    TextInput, 
    useCreateSuggestionContext 
} from 'react-admin';

const CreateTag = () => {
  const { onCancel, onCreate, filter } = useCreateSuggestionContext();
  const [newTagName, setNewTagName] = React.useState(filter ?? "");

  const handleChangeTagName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTagName(event.currentTarget.value);
  };
  const saveTag = () => {
    const newTag = { label: newTagName, id: newTagName.toLowerCase() };
    tags.push(newTag);
    setNewTagName("");
    onCreate(newTag);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    saveTag();
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a tag</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">New tag name</Label>
            <Input id="name" value={newTagName} onChange={handleChangeTagName} autoFocus />
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={saveTag}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const BookCreateEdit = () => (
    <Edit>
        <SimpleForm>
            <AutocompleteInput
              source="tag_id"
              choices={tags}
              optionText="label"
              create={<CreateTag />}
              createLabel="Start typing to create a new tag"
              createItemLabel="Create %{item}"
            />
        </SimpleForm>
    </Edit>
);
```

If you want to customize the label of the "Create XXX" option, use the `createItemLabel` prop.

If you just need to ask users for a single string to create the new option, you can use the `onCreate` prop instead.
