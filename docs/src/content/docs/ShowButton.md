---
title: "ShowButton"
---

Link button to the show page of the current record.

## Usage

Use the button without form when in a ResourceContext (e.g., inside an `<Edit>`):

```tsx {6}
import { ShowButton, DeleteButton, Edit } from '@/components/admin';

const PostEdit = () => (
    <Edit
        actions={<>
            <ShowButton />
            <DleteButton />
        </>}
    >
        ...
    </Edit>
);
```

Clicking on the button navigates to the `show` route of the current resource (e.g., `/posts/123/show`).

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `icon` | Optional | `ReactNode` | `<Eye />` | Icon to display |
| `label` | Optional | `string` | `ra.action.show` | i18n key / label |
| `record` | Optional | `RaRecord` | From context | Record used for id and representation |
| `resource` | Optional | `string` | From context | Resource name |

Additional props are passed to the underlying `<a>` element (e.g., `className`, `target`, `rel`).

## `label`

By default, the label is the translation of the `ra.action.show` key, which reads "Show".

You can customize the label for a specific resource by adding a `resources.{resource}.action.show` key to your translation messages. It receives `%{name}` (singular resource name) and `%{recordRepresentation}` (string representation of the current record):

```js
const messages = {
    resources: {
        posts: {
            action: {
                show: 'View %{recordRepresentation}',
            },
        },
    },
};
```

You can also pass a custom string or translation key directly via the `label` prop:

```tsx
<ShowButton label="View details" />
<ShowButton label="resources.posts.action.show" />
```
