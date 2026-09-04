---
title: Migrating to 2.0
description: What changed in shadcn-admin-kit when it moved from Radix UI to Base UI, and how to adapt your own code.
---

# Migration to 2.0

In 2.0, shadcn-admin-kit builds on Base UI instead of Radix UI. This changes almost nothing in the UI (almost the Base UI components aren't perfectly aligned with their Radix counterparts), but it does change the API of the components, and the way they are composed.

## Switching Shadcn/ui to Base UI

Update your `components.json` to use the Base UI style:

```json
{
  "style": "base-vega"
}
```

Then, reinstall shadcn-admin-kit:

```shell
npx shadcn@latest add https://marmelab.com/shadcn-admin-kit/r/admin.json
```

Confirm to overwrite all the kit's components. 

The `components/ui` components are now Base UI-first.

## Migrating your own components to BaseUI

Shadcn ships an agent skill to migrate your code from Radix UI to Base UI. It is not a codemod, precisely because you own your component files and have likely edited them. Install it once:

```bash
pnpm dlx skills add shadcn/ui
```

Then ask your coding agent, one component at a time:

```
migrate accordion to base-ui
```

It works with Claude Code, Cursor, or any agent that supports skills, migrates progressively, and writes a report per component under `.migration/`.

Shadcn's [Base UI as the Default](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default) changelog entry covers this in full, including why they shipped a skill rather than a codemod: you own your component files, and a codemod would drop the variants, classes and props you added to them.

Direct `@radix-ui/*` packages are no longer dependencies of the kit. If your app
imported them itself, add them to your own `package.json`.

## Known Limitation: Radix Is Still In The Bundle, Through cmdk

`command.tsx` builds on [cmdk](https://github.com/pacocoursey/cmdk), which shadcn/ui has not migrated, and cmdk depends on Radix's dialog, portal and presence primitives. Any build that includes `<AutocompleteInput>`, `<AutocompleteArrayInput>` or another `<Command>` consumer therefore ships both libraries: cmdk weighs 45 kB minified, 21 kB of which is Radix.

There is nothing to do on your side, and nothing to gain from removing the `@radix-ui/*` packages by hand: they come in as transitive dependencies of cmdk. It is tracked upstream in [shadcn-ui/ui#9191](https://github.com/shadcn-ui/ui/issues/9191).
