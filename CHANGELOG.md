## Unreleased

### 💥 Breaking Changes

- **shadcn-admin-kit now builds on [Base UI](https://base-ui.com/) instead of Radix UI**, and its `components.json` uses the `base-vega` style.

  **Before updating, switch your own `components.json` to the Base UI style.** The components the kit ships call Base UI APIs (`render`, `nativeButton={false}`), but the primitives they depend on are resolved by the shadcn CLI against the style configured in _your_ project. Staying on `new-york` gives you Radix primitives expecting `asChild` wired to kit components passing `render`, and triggers stop composing.

  See the [Radix UI to Base UI Migration guide](./radix-to-base-ui-migration.md) for the full list of API changes, their behavioral consequences, and how to migrate the `src/components/ui/` files you own.

- `Button`, `Badge`, `Breadcrumb` and `SidebarMenuButton` replace `asChild` with `render`. Rendering a link also needs `nativeButton={false}`.
- `SelectContent` replaces `position` with `alignItemWithTrigger`.
- `Separator` keeps its `decorative` prop, now mapped to `role="none"`, but its `data-slot` is `separator`, not `separator-root`.
- `NavigationMenu` drops `viewport`. `PopoverAnchor` is removed.
- `CommandDialog` no longer wraps its children in `<Command>`.
- `TooltipProvider` renames `delayDuration` to `delay`. Base UI defaults to a 600ms open delay, so mount `<TooltipProvider delay={0}>` if you want tooltips to appear instantly.
- Direct `@radix-ui/*` packages are no longer dependencies of the kit.

## v1.5.0 (Feb. 2026)

### 🚀 Features

- Add `<TextArrayInput>` component for handling arrays of text values.
- Add `<DateTimeInput>` component for date and time input support.
- Add `<ImageField>` component for displaying images. Can also be used inside `<FileInput>` for image preview.
- Add `<SelectAllButton>` to bulk actions toolbar.
- Add `<NotFound>` component for unmatched routes.
- Add ability to use `<ExportButton>` in every List Context (including references)
- Add ability to set `<Notification>` hide duration.
- Add reusable empty list state and improved empty state handling in guessers.
- Add support for loading and error states in layout.
- Add soft delete support and documentation for enterprise users.
- Add `<AutoPersistInStoreBase>` component and documentation.
- Add clearable prop to `<SearchInput>`.

### 🐛 Bug Fixes

- Fix `<FileInput>` no longer submits the form when deleting a file.
- Fix Ready screen text color.
- Fix `<DateInput>` icon placement
- Fix `<SimpleFormIterator>` compatibility with RA 5.13.
- Fix Undoable notifications called in series.
- Fix Menu links styles.
- Fix Console warnings warnings.
- Fix `<SingleFieldList>` class override.
- Fix `<AutocompleteInput>` popper width on mobile.
- Fix Search icon position in columns selector.
- Fix `<EditView>` when empty is false in guessers.
- Fix `<SaveButton>` disabled state with React Hook Form proxy subscriptions.
- Fix `<ListPagination>` doesn't disable prev/next buttons when necessary.
- Fix `<ReferenceField>` now works correctly when offline.

### 📝 Documentation

- Add tutorials on how to setup TanStack Start, and React Router.
- Add new components (`<DateInput>`, `<ImageField>`, `<TextArrayInput>`, etc.) doc.
- Add `<Breadcrumb>` and `<Confirm>` components
- Add: `<FileInput>` image preview example.
- Add User Menu documentation.
- Add I18n configuration page
- Add real-time & locking documentation and examples
  - `<ListLiveUpdate>`
  - `<RecordLiveUpdate>`
  - `<EditLiveUpdate>`
  - useGetListLive
  - useGetOneLive
  - useLockOnCall
  - useLockOnMount
  - usePublish
  - useSubscribe
  - useSubscribeCallback
- Add many-to-many relationship documentation and examples
  - `<ReferenceManyInputBase>`
  - `<ReferenceManyToManyFieldBase>`
  - `<ReferenceManyToManyInputBase>`
  - `<ReferenceOneInputBase>`
- Add Soft Delete documentation and examples
  - `<SoftDeleteButton>`
  - `<SoftDeleteField>`
  - useSoftDelete
- Add Form persistence documentation and examples
  - `<AutoPersistInStoreBase>`
  - useAutoPersistInStore
- Add `<ReferenceArrayInput>` validation documentation.
- Add reference to Context7 in MCP documentation
- Update installation instructions for Next.js
- Update Quick Start tutorial with variants depending on the stack used (Next.js, TanStack Start, etc).
- Update BooleanInput documentation, added doc on format and parse prop
- Update Inputs, ThemeModeToggle, Relationship, Appsidebar, layout, notification, loading, and error documentation.
- Update inputs, layout, loading, and error components.
- Update custom routes, relationships, and reference inputs.
- Update landing page to include Atomic CRM as a demo.
- Fix Broken links.

### 🧰 Chore & Maintenance

- Add Pull request template
- Add ability to create release from tag in Build process.
- Upgrade dependencies
  - react-router: 7.5.3 => 7.12.0
  - ra-core: 5.10.0 => 5.14.0
  - Shadcn/ui: 3.2 => 3.8
- Upgrade dev dependencies
  - Storybook
  - Vite
  - Astro
  - Playwright
- Fix linter warnings
- Fix duplicate dependencies
- Fix registry.json generation
- Fix various bugs in the e-commerce demo
- Remove headless logic that is now provided by ra-core.

For the full list of changes, see the [commit history](https://github.com/marmelab/shadcn-admin-kit/compare/v1.0.0...v1.5.0).

## v1.0.0 (Sept. 2025)

Initial release
