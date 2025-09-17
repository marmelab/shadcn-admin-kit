---
title: "SelectInput"
---

Dropdown selection from a list of choices.

This input allows editing record fields that are scalar values, e.g. `123`, `'admin'`, etc.

## Usage

In addition to the `source`, `<SelectInput>` requires one prop: the `choices` listing the possible values.

```tsx
import { SelectInput } from '@/components/admin';

<SelectInput source="category" choices={[
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

- [`<AutocompleteInput>`](./AutocompleteInput.md) renders a list of suggestions in an autocomplete input
- [`<RadioButtonGroupInput>`](./RadioButtonGroupInput.md) renders a list of radio buttons

:::

| Prop | Required | Type | Default | Description |
|---|---|---|---|---|
| `source` | Required* | `string` | `-` | Field name (inferred in ReferenceInput) |
| `choices` | Required* | `Object[]` | `-` | List of items to autosuggest. Required if not inside a ReferenceInput. |
| `className` | Optional | `string` | `-` | The class name to apply to the root element |
| `create` | Optional | `Element` | `-` | A React Element to render when users want to create a new choice |
| `createLabel` | Optional | `string` &#124; `ReactNode` | - | The label used as hint to let users know they can create a new choice. Displayed when the filter is empty. |
| `defaultValue` | Optional | `any` | `''` | The default value for the input |
| `disabled` | Optional | `boolean` | `false` | If true, the input is disabled |
| `disableValue` | Optional | `string` | `disabled` | Field marking disabled choices |
| `emptyText` | Optional | `string` | `''` | The text to use for the empty element |
| `emptyValue` | Optional | `any` | `''` | The value to use for the empty element |
| `format` | Optional | `Function` | `-` | Callback taking the value from the form state, and returning the input value. |
| `helperText` | Optional | `string` &#124; `ReactNode` | `-` | The helper text to display below the input |
| `label` | Optional | `string` &#124; `ReactNode` | `-` | The label to display for the input |
| `onCreate` | Optional | `Function` | `-` | A function called with the current filter value when users choose to create a new choice. |
| `optionText` | Optional | `string` &#124; `Function` &#124; `Component` | `undefined` &#124; `record Representation` | Field name of record to display in the suggestion item or function using the choice object as argument |
| `optionValue` | Optional | `string` | `id` | Field name of record containing the value to use as input value |
| `parse` | Optional | `Function` | `-` | Callback taking the value from the input, and returning the value to be stored in the form state. |
| `translateChoice` | Optional | `boolean` | `true` | Whether the choices should be translated |
| `validate` | Optional | `Function` &#124; `Function[]` | `-` | An array of validation functions or a single validation function |

`*` `source` and `choices` are optional inside `<ReferenceInput>`.

## Defining Choices

The list of choices must be an array of objects with at least two fields: one to use for the name, and the other to use for the value. By default, `<SelectInput>` will use the `id` and `name` fields.

```jsx
const choices = [
    { id: 'tech', name: 'Tech' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'people', name: 'People' },
];
<SelectInput source="category" choices={choices} />
```

If the choices have different keys, you can use `optionText` and `optionValue` to specify which fields to use for the name and value.

```jsx
const choices = [
    { _id: 'tech', label: 'Tech' },
    { _id: 'lifestyle', label: 'Lifestyle' },
    { _id: 'people', label: 'People' },
];

<SelectInput
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

If you need to *fetch* the options from another resource, you're usually editing a many-to-one or a one-to-one relationship. In this case, wrap the `<SelectInput>` in a [`<ReferenceInput>`](./ReferenceInput.md). You don't need to specify the `source` and `choices` prop in this case - the parent component injects them based on the possible values of the related resource.

```jsx
<ReferenceInput label="Author" source="author_id" reference="authors">
    <SelectInput />
</ReferenceInput>
```

You can also pass an *array of strings* for the choices:

```jsx
const categories = ['tech', 'lifestyle', 'people'];
<SelectInput source="category" choices={categories} />
// is equivalent to
const choices = categories.map(value => ({ id: value, name: value }));
<SelectInput source="category" choices={choices} />
```

## Creating New Choices On The Fly

To allow users to add new options, pass a React element as the `create` prop. `<SelectInput>` will then render a menu item at the bottom of the list, which will render the passed element when clicked.

```tsx
import { 
    Edit,
    SimpleForm, 
    ReferenceInput, 
    SelectInput, 
    TextInput, 
} from '@/components/admin';
import { useCreateSuggestionContext } from 'ra-core';

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
            <SelectInput
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
