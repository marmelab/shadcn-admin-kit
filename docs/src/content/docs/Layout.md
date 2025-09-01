---
title: "Layout"
---

Application shell including sidebar, header (breadcrumb portal, locale & theme toggles, refresh, user menu) and notification area.

## Usage

Provided via the `layout` prop of `Admin`. You normally don't render it directly.

## Composition

- `AppSidebar` (navigation)
- Header with breadcrumb portal (`<div id="breadcrumb" />`)
- `LocalesMenuButton`, `ThemeModeToggle`, `RefreshButton`, `UserMenu`
- `<Notification />` toaster
