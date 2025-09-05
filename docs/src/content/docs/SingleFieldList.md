---
title: "SingleFieldList"
---

Inline list layout rendering its child once per record.

## Usage

Use it inside any component creating a `ListContext` (e.g. [`<ArrayField>`](./ArrayField.md), [`<ReferenceArrayField>`](./ReferenceArrayField.md), [`<ReferenceManyField>`](./ReferenceManyField.md)).

Here is an example of a Post show page showing the list of tags for the current post:

```tsx {13}
import {
    Show,
    TextField,
    ReferenceArrayField,
    SingleFieldList
} from '@/components/admin';

const PostShow = () => (
    <Show>
        <div className="flex flex-col gap-4">
            <TextField source="title" />
            <ReferenceArrayField label="Tags" reference="tags" source="tag_ids">
                <SingleFieldList />
            </ReferenceArrayField>
        </div>
    </Show>
);
```

`<SingleFieldList>` creates one `RecordContext` per item in the list. By default, it renders each item as a badge, using [`<BadgeField>`](./BadgeField.md) and the resource [`recordRepresentation`](https://marmelab.com/ra-core/resource/#recordrepresentation).

You can customize the rendering by providing a `children` or `render` prop:

```tsx
<SingleFieldList>
    <TextField source="name" />
</SingleFieldList>

<SingleFieldList render={(record) => <>{record.name</>} />
```

## Props

| Prop        | Required | Type                                   | Default                                 | Description                                              |
|-------------|----------|----------------------------------------|-----------------------------------------|----------------------------------------------------------|
| `children`  | Optional | `ReactNode`                            | `<BadgeField>`| Content for each record |
| `className` | Optional | `string`                               | -                                       | Extra classes on wrapper div                             |
| `render`    | Optional | `(record, index) => ReactNode`         | -                                       | Custom render function per record |
