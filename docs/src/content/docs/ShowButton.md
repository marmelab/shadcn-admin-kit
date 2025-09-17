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

Additional props are passed to the underlying `<a>` element (e.g., `className`, `target`, `rel`).
