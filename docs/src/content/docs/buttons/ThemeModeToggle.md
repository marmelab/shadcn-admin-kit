---
title: "ThemeModeToggle"
---

Switches between light and dark UI themes. The user preference is saved in local storage and applied on next visit.

## Usage

The default layout contains a `<ThemeModeToggle>` in the top right corner.

You can use it for your custom layouts:

```tsx
import { ThemeModeToggle } from '@/components/admin';

<ThemeModeToggle />
```

## Props

| Prop | Required | Type | Default | Description |
|------|----------|------|---------|-------------|
| `className` | Optional | `string` | - | Extra CSS classes |
