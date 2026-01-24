---
title: "InfinitePagination"
---

The default pagination component for List pages.

## Usage

The `<InfiniteList>` component already uses `<InfinitePagination>` by default. If you need to override the predefined page size options, override the `<InfiniteList pagination>` prop:

```jsx
import { InfiniteList, InfinitePagination } from '@/components/admin';    

const PostListPagination = () => (
    <InfinitePagination />
);

export const PostList = () => (
    <InfiniteList pagination={<PostListPagination />}>
        {/* ... */}
    </InfiniteList>
);
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `rowsPerPageOptions` | Optional | `number[]` | `[10, 25, 50, 100]` | Page size options |
| `className` | Optional | `string` | - | Wrapper classes |

## Custom Pagination
