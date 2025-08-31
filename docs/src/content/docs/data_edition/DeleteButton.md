---
title: "DeleteButton"
---

Lets the user delete the current record.

## Usage

```tsx {4}
import { DeleteButton, Edit } from '@/components/admin';

const PostEdit = () => (
    <Edit actions={<DeleteButton />}>
        ...
    </Edit>
);
```

It reads the resource from `ResourceContext` and record from `RecordContext`.

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `className` | Optional | `string` | destructive styles | Additional classes |
| `label` | Optional | `string` | i18n computed | i18n key / custom label (includes record name) |
| `mutationOptions` | Optional | `UseDeleteOptions` | - | Mutation options (onSuccess, etc.) |
| `redirect` | Optional | `RedirectionSideEffect` | `list` | Where to redirect after delete |
| `size` | Optional | `"default" \| "sm" \| "lg" \| "icon"` | - | Size variant |
| `successMessage` | Optional | `string` | - | Custom success i18n key |
| `variant` | Optional | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `outline` | Button style |
