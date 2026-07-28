---
title: Radix UI to Base UI Migration
description: What changed in shadcn-admin-kit when it moved from Radix UI to Base UI, and how to adapt your own code.
---

# Radix UI to Base UI Migration

shadcn-admin-kit builds on Base UI instead of Radix UI, which shadcn has supported [since January 2026](https://ui.shadcn.com/docs/changelog/2026-01-base-ui) and made the default in July. This page lists what that changes **in your own code**, and points to shadcn's official migration path for the components you own.

## Migrating your own components

shadcn ships an agent skill for this, not a codemod, precisely because you own your component files and have likely edited them. Install it once:

```bash
pnpm dlx skills add shadcn/ui
```

Then ask your coding agent, one component at a time:

```
migrate accordion to base-ui
```

It works with Claude Code, Cursor, or any agent that supports skills, migrates progressively, and writes a report per component under `.migration/`.

shadcn's [Base UI as the Default](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default) changelog entry covers this in full, including why they shipped a skill rather than a codemod: you own your component files, and a codemod would drop the variants, classes and props you added to them.

## Breaking changes in shadcn-admin-kit

These are the kit's own API changes. The official skill will not know about them, so review these call sites by hand.

| Component                       | Before                                | After                                                                                                 |
| ------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `Badge`                         | `asChild`                             | `render`                                                                                              |
| `Breadcrumb`                    | `asChild`                             | `render`                                                                                              |
| `Button`                        | `asChild`                             | `render`, plus `nativeButton={false}` when rendering a non-button such as a link                      |
| `SidebarMenuButton` and friends | `asChild`                             | `render`                                                                                              |
| `SelectContent`                 | `position="popper" \| "item-aligned"` | `alignItemWithTrigger` (boolean, defaults to `false`, which matches the previous `"popper"` behavior) |
| `Separator`                     | `decorative`                          | dropped, Base UI has no equivalent                                                                    |
| `TooltipProvider`               | `delayDuration`                       | `delay`                                                                                               |

Direct `@radix-ui/*` packages are no longer dependencies of the kit. If your app imported them itself, add them to your own `package.json`.

## Main migration patterns

### 1. `asChild` becomes `render`

Radix-oriented code often uses:

```tsx
<Button asChild>
  <Link to="/profile">Profile</Link>
</Button>
```

In Base UI-first code, the polymorphic element moves into a prop and the children stay children:

```tsx
<Button render={<Link to="/profile" />}>Profile</Button>
```

In this repository, the long-term direction was to prefer `render` instead of keeping `asChild` compatibility everywhere.

### 2. Some Base UI parts are structurally stricter

A common example is [menus](https://base-ui.com/react/components/menu):

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

### 3. Some props only apply to mouse input

Base UI documents `alignItemWithTrigger` as applying to mouse input only. Opening a `Select` with the keyboard positions the popup below the trigger whichever value the prop holds, so verify this kind of behavior with the pointer, not just with tests driven by key presses.

Base UI's own [Popover documentation](https://base-ui.com/react/components/popover) shows the same `Portal > Positioner > Popup` anatomy, which most overlay primitives now follow.
