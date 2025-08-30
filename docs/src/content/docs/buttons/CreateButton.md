---
title: "CreateButton"
---

Navigates to the create page for the current (or specified) resource.

## Usage

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

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `label` | Optional | `string` | `ra.action.create` | i18n key / custom label |
| `resource` | Optional | `string` | From context | Target resource for create route |
