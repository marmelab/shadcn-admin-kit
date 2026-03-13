---
title: Radix UI to Base UI Migration
description: Internal migration notes for moving shadcn-admin-kit from Radix UI to Base UI.
---

# Radix UI to Base UI Migration

This is an internal migration guide based on the `shadcn-admin-kit` migration from `Radix UI` to `Base UI`.

It is **not** an official shadcn migration guide. At the time of writing, shadcn documents both primitive libraries, but does not provide a single official "Radix to Base UI migration" document.

This guide is based on:

- the official shadcn documentation and changelog
- the official Base UI component docs
- the concrete changes we had to make in this repository

## What Changed

The migration was not just a dependency swap.

The main differences we hit were:

- `asChild` patterns had to move to `render`
- some wrappers and consumers assumed Radix-specific props or behavior
- some Base UI parts have stricter structure requirements
- some generated registry apps failed because the block expected local helpers or local wrapper behavior

## Main Migration Patterns

### 1. `asChild` to `render`

Radix-oriented code often uses:

```tsx
<Button asChild>
  <Link to="/profile">Profile</Link>
</Button>
```

In Base UI-first code, the equivalent pattern is:

```tsx
<Button render={<Link to="/profile" />}>
  Profile
</Button>
```

In this repository, the long-term direction was to prefer `render` instead of keeping `asChild` compatibility everywhere.

### 2. Some Base UI parts are structurally stricter

A common example is menus:

- Base UI `Menu.GroupLabel` must be used inside `Menu.Group`

That means some Radix-era wrapper assumptions no longer hold. If a component only needs a visual label, a plain styled `div` may be a better fit than forcing a Base UI group part.

This does **not** work:

```tsx
<Menu.GroupLabel>Account</Menu.GroupLabel>
```

This does work:

```tsx
<Menu.Group>
  <Menu.GroupLabel>Account</Menu.GroupLabel>
  <Menu.Item>Profile</Menu.Item>
</Menu.Group>
```

## References

- shadcn CLI: https://ui.shadcn.com/docs/cli
- shadcn January 2026 Base UI documentation: https://ui.shadcn.com/docs/changelog/2026-01-base-ui
- shadcn changelog: https://ui.shadcn.com/docs/changelog
- Base UI Menu docs: https://base-ui.com/react/components/menu
- Base UI Popover docs: https://base-ui.com/react/components/popover

## Community / Unofficial References

- shadcn-ui community discussion about migrating from Radix UI to Base UI: https://github.com/shadcn-ui/ui/discussions/9562
