---
title: "BadgeField"
---

Displays a value inside a styled shadcn [`<Badge>`](https://ui.shadcn.com/docs/components/badge). Useful for statuses or categories.

## Usage

```tsx
import { BadgeField } from '@/components/admin';

<BadgeField source="status" variant="secondary" />
```

This field type is especially useful for one-to-many relationships, e.g. to display a list of books for a given author:

```jsx
<ReferenceManyField reference="books" target="author_id">
    <SingleFieldList>
        <BadgeField source="title" />
    </SingleFieldList>
</ReferenceManyField>
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `source` | Required | `string` | - | Field name |
| `record` | Optional | `object` | Record from context | Explicit record |
| `defaultValue` | Optional | `any` | - | Fallback value |
| `empty` | Optional | `ReactNode` | - | Placeholder when value missing |
| `variant` | Optional | `"default" \| "outline" \| "secondary" \| "destructive"` | `outline` | Badge style |

Remaining props are passed to the underlying `<Badge>` component (e.g., `className`).
