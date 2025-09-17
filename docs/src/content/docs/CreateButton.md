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
