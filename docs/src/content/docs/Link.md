---
title: "Link"
---

A router-agnostic navigation component that wraps ra-core's `LinkBase`. It provides a routing abstraction layer so that admin components are not directly coupled to a specific router package (like `react-router`).

## Usage

Use `<Link>` anywhere you need to navigate to a route within your admin app:

```tsx
import { Link } from "@/components/admin";

const MyComponent = () => (
    <Link to="/posts">Go to Posts</Link>
);
```

`<Link>` works exactly like a standard anchor element, but delegates the actual routing to the router configured via ra-core's `RouterProvider`. This means your components will work regardless of the underlying routing library.

## Why Not Import `Link` From `react-router` Directly?

Importing `Link` from `react-router` directly in UI components creates a tight coupling between your component layer and a specific routing implementation. This has several drawbacks:

- **Portability**: Components can't be reused in apps that use a different router (e.g., TanStack Router).
- **Consistency**: react-admin's core layer already provides a router abstraction via `RouterProvider`. Bypassing it means some links go through the abstraction while others don't.
- **Future-proofing**: If the project ever switches routers, every direct import must be found and updated.

The `<Link>` component solves this by delegating to ra-core's `LinkBase`, which reads the router from context. This is the same approach react-admin uses in its MUI layer ([`ra-ui-materialui/Link`](https://github.com/marmelab/react-admin/blob/master/packages/ra-ui-materialui/src/Link.tsx)).

**Instead of:**

```tsx
// ❌ Couples the component to react-router
import { Link } from "react-router";

<Link to="/posts">Posts</Link>
```

**Use:**

```tsx
// ✅ Router-agnostic
import { Link } from "@/components/admin";

<Link to="/posts">Posts</Link>
```

## Use With Breadcrumb

When building custom breadcrumbs, use `<Link>` for the intermediate items:

```tsx
import { Edit, Breadcrumb, Link, SimpleForm } from "@/components/admin";
import { RecordRepresentation } from "ra-core";

const PostEdit = () => (
    <Edit disableBreadcrumb>
        <Breadcrumb>
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/posts">Articles</Link></Breadcrumb.Item>
            <Breadcrumb.PageItem>
                Edit Article "<RecordRepresentation />"
            </Breadcrumb.PageItem>
        </Breadcrumb>
        <SimpleForm>
            ...
        </SimpleForm>
    </Edit>
);
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `to` | Required | `string \| Partial<Location>` | - | The target route |
| `replace` | Optional | `boolean` | `false` | Replace the current history entry instead of pushing |
| `state` | Optional | `any` | - | State to pass to the target route |
| `className` | Optional | `string` | - | CSS class name |
| `children` | Optional | `ReactNode` | - | Link content |

`<Link>` also accepts any additional HTML anchor attributes (e.g., `onClick`, `aria-label`).

## `to`

The target route. Can be a string path or a location object:

```tsx
// String path
<Link to="/posts">Posts</Link>

// Location object
<Link to={{ pathname: "/posts", search: "?sort=name" }}>
    Posts
</Link>
```
