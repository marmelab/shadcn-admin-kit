---
title: "SortButton"
---

Opens a popover allowing the user to change current list sort field & order.

## Usage

Used in a List Context (e.g. as a descendant of `<List>`) if there is no other sort control.

```tsx {6}
import { SortButton } from '@/components/admin';

const PostList = () => (
    <List render={({ data }) => (
        <div>
            <SortButton fields={["title", "published_at"]} />
            <ul>
                {data..map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    )}>
)
<SortButton fields={["title", "published_at"]} />
```

This button lets users pick the sort field, then the sort direction (ASC/DESC).

:::tip
`<DataTable>` column headers act as sort controls, so you don't need a separate `<SortButton>` if you're using `<DataTable>`.
:::

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `fields` | Required | `string[]` | - | Whitelist of sortable field names |
| `label` | Optional | `string` | `ra.action.sort` | i18n key |
| `icon` | Optional | `ReactNode` | Sort icon | Custom icon |

Additional props are passed to the underlying `<button>` element (e.g., `className`).
