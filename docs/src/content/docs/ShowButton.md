---
title: "ShowButton"
---

Link button to the show page of the current record.

## Usage

```tsx
import { ShowButton } from '@/components/admin';

<ShowButton />
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `icon` | Optional | `ReactNode` | `<Eye />` | Icon to display |
| `label` | Optional | `string` | `ra.action.show` | i18n key / label |

Additional props are passed to the underlying `<a>` element (e.g., `className`, `target`, `rel`).

## Notes

- Uses record and resource from context; must be inside a record row / show / edit context.
