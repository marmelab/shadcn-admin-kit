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

## Before you update: switch your `components.json` style

**This is the change most likely to break your app, and it is not something the
migration skill can do for you.**

The kit's `components.json` now uses the Base UI style:

```json
{
  "style": "base-vega"
}
```

The components the kit ships (everything under `src/components/admin/`) call
Base UI APIs directly: `render`, `nativeButton={false}`, `finalFocus`. But the
primitives they build on (`button`, `dialog`, `select`, `popover`...) are
declared as `registryDependencies`, which the shadcn CLI resolves **against the
style configured in your own `components.json`**.

So if your project is still on `new-york`, installing this version gives you
Radix primitives that expect `asChild`, wired to kit components that pass
`render`. Triggers stop composing and polymorphic buttons stop rendering their
element. Switch your own `components.json` to the Base UI style first, migrate
the `src/components/ui/` files you own (see the section below), then update the
kit.

## Breaking changes in shadcn-admin-kit

These are the kit's own API changes. The official skill will not know about them,
so review these call sites by hand.

The third column matters as much as the second: in most of these rows the API
rename is mechanical, but the **behavior changes silently** if you only rename.

| Component                       | Before                                | After                                                                                                 | Consequence if you only rename                                                                                             |
| ------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `Badge`                         | `asChild`                             | `render`                                                                                              | none, children stay children                                                                                               |
| `Breadcrumb`                    | `asChild`                             | `render`                                                                                              | none                                                                                                                       |
| `Button`                        | `asChild`                             | `render`, plus `nativeButton={false}` when rendering a non-button such as a link                      | without `nativeButton={false}` a link renders as a `<button>` and loses navigation                                         |
| `SidebarMenuButton` and friends | `asChild`                             | `render`                                                                                              | none                                                                                                                       |
| `SelectContent`                 | `position="popper" \| "item-aligned"` | `alignItemWithTrigger` (boolean, defaults to `false`, which matches the previous `"popper"` behavior) | dropping the prop reverts to item-aligned positioning, which moves the popup over the trigger                              |
| `Separator`                     | `decorative`                          | kept, now mapped to `role="none"`                                                                     | none in the kit. Base UI hardcodes `role="separator"`, so a bare Base UI `Separator` is announced by screen readers        |
| `TooltipProvider`               | `delayDuration`                       | `delay`                                                                                               | **the value is not carried over**: Base UI defaults to a 600ms open delay, so mount `<TooltipProvider delay={0}>` yourself |
| `NavigationMenu`                | `viewport`                            | dropped, the positioner is always rendered                                                            | any `group-data-[viewport=false]:*` styling you added no longer matches                                                    |
| `Popover`                       | `PopoverAnchor`                       | dropped, use the `anchor` prop on `PopoverPositioner`                                                 | the import fails to resolve                                                                                                |
| `Separator`                     | `data-slot="separator-root"`          | `data-slot="separator"`                                                                               | CSS or tests selecting the old slot silently stop matching                                                                 |
| `CommandDialog`                 | wrapped its children in `<Command>`   | you wrap them yourself                                                                                | cmdk context is missing, so filtering and keyboard navigation stop working                                                 |

Two more traps worth knowing, because they bit us during this migration:

- Base UI emits most state attributes **by presence**, not by value. `data-active`,
  `data-open` and `data-checked` are set to the empty string, so `data-[active=true]:`
  never matches. Use the bare `data-active:` form instead.
- Radix's `data-motion` on navigation menu content is gone; Base UI exposes
  `data-activation-direction`.

Direct `@radix-ui/*` packages are no longer dependencies of the kit. If your app
imported them itself, add them to your own `package.json`.

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

### 4. Many `Avatar.Image` in one commit hit a React limit

Base UI's `Avatar.Image` updates its `Avatar.Root` context from a layout effect
whenever the image loading status changes. When a lot of them mount in the **same
commit**, those updates cascade and React throws:

```
Maximum update depth exceeded.
```

It is not an infinite loop: the depth grows with the number of instances, so it
is a threshold. Measured on this kit's dashboard, with the avatars mounted by a
`ReferenceField` (which renders a placeholder while its query is pending, then
swaps them all in at once):

| Instances in one commit | Result |
| ----------------------- | ------ |
| up to 25                | fine   |
| 35 and above            | throws |

Consistent with React's limit of 50 nested updates.

**What to watch for.** Any long list where each row wraps an `Avatar` in a
component that defers its children behind an async query: `ReferenceField`,
`ReferenceOneField`, or your own equivalent. A list of 30+ rows is enough.

**Workaround** until it is fixed upstream: keep the number of simultaneously
mounted avatars low, for example by paginating or capping the list. In this
repository the three dashboard cards were capped to 10 entries.

### 5. Regenerating overwrites your local deviations

This is the failure mode to watch for, and it caught us more than once.

Wherever your project had deliberately deviated from a shadcn default, the
regenerated file comes back with the **upstream** default and your deviation is
gone. No error, no type failure, no failing test: just a behavior that quietly
reverts.

In this repository it happened three times, and all three are restored in
the version that ships:

| Deviation                                            | What broke                                       |
| ---------------------------------------------------- | ------------------------------------------------ |
| `<TooltipProvider delayDuration={0}>` in the sidebar | every tooltip fell back to Base UI's 600ms delay |
| `position="popper"` on `SelectContent`               | select popups reverted to item-aligned           |
| `decorative={true}` on `Separator`                   | 13 separators became visible to screen readers   |

`shadcn info` is the quickest way to spot these. It prints the preset your
project resolves to and marks every value that no longer matches it with an
asterisk:

```
Preset
  chartColor   neutral*    <- deviates from the preset
  font         inter       <- matches the preset
```

Beyond that, when you migrate a component, diff it against the version you had
and ask what you had changed on purpose, rather than only checking that it still
compiles.
Tests and a click through the app do not catch this class of regression, because
the deviation was about defaults, not about behavior anyone asserts on.
