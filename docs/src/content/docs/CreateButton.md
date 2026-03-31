---
title: "CreateButton"
---

Navigates to the create page for the curren resource.

## Usage

Use the button without form when in a ResourceContext (e.g., inside a `<List>`):

```tsx {6}
import { CreateButton, List, ExportButton } from '@/components/admin';

const PostList = () => (
    <List
        actions={<>
            <CreateButton />
            <ExportButton />
        </>}
    >
        ...
    </List>
);
```

Clicking on the button navigates to the `create` route of the current resource (e.g., `/posts/create`).

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `label` | Optional | `string` | `ra.action.create` | i18n key / custom label |
| `resource` | Optional | `string` | From context | Target resource for create route |

## `label`

By default, the label is the translation of the `ra.action.create` key, which reads "Create".

You can customize the label for a specific resource by adding a `resources.{resource}.action.create` key to your translation messages. It receives the `%{name}` interpolation variable (the singular resource name):

```js
const messages = {
    resources: {
        posts: {
            action: {
                create: 'New %{name}',
            },
        },
    },
};
```

You can also pass a custom string or translation key directly via the `label` prop:

```tsx
<CreateButton label="New article" />
<CreateButton label="resources.articles.action.create" />
```
