---

title: Changelog

---

## v1.5.0

### 🚀 Features
- Add TextArrayInput component for handling arrays of text values.
- Add DateTimeInput component for date and time input support.
- Add ImageField component for displaying images.
- Add SelectAllButton to bulk actions toolbar.
- Add reusable empty list state and improved empty state handling in guessers.
- Add support for loading and error states in layout.
- Add live update support: ListLiveUpdate, RecordLiveUpdate, and EditLiveUpdate components and documentation.
- Add soft delete support and documentation for enterprise users.
- Add <AutoPersistInStoreBase> component and documentation.
- Add clearable prop to SearchInput.
- Add support for uploading release assets to Cloudflare (test version).

### 🛠️ Improvements
- Refactor: Move admin logic to ra-core.
- Refactor: Split theme hook and stabilize dependencies.
- Refactor: ArrayInput and SimpleFormIterator now use base components.
- Refactor: Inline GuesserEmpty base and add empty state to guessers.
- Improve: FileInput no longer submits the form when deleting a file.
- Improve: DataTable select-all checkbox and bulk actions.
- Improve: ExportButton uses ListContext.getData.
- Improve: SearchInput and columns selector UI/UX.
- Improve: Onboarding, quick start guide, and landing page.
- Improve: Notification and user menu documentation.
- Improve: i18n configuration and documentation.
- Improve: Documentation for inputs, layout, loading, and error components.
- Improve: Documentation for custom routes, relationships, and reference inputs.
- Improve: Documentation for TanStack Start, Next.js, and React Router integration.
- Improve: Documentation for soft delete, live updates, and enterprise modules.
- Improve: Add logos of supported platforms in install docs.
- Improve: MCP setup and instructions.
- Improve: Add Atomic CRM as a demo on the landing page.
- Removed: FilterContext it is now provided by ra-core

### 🐛 Bug Fixes
- Fix: Remove hooks and components brought by ra-core 5.11.
- Fix: Multiple ra-core imports.
- Fix: registry.json generation.
- Fix: Ready screen text color.
- Fix: <DateInput> icon placement and stories.
- Fix: <SimpleFormIterator> compatibility with RA 5.13.
- Fix: Undoable notifications called in series.
- Fix: Menu links styles.
- Fix: Console warnings and linter warnings.
- Fix: Duplicate packages and type imports.
- Fix: Quick start table layout.
- Fix: Table formatting in docs.
- Fix: Broken links in documentation.
- Fix: Layout of reference fields.
- Fix: FileInput submits form when deleting a file.
- Fix: SingleFieldList class override.
- Fix: Autocomplete input popper width on mobile.
- Fix: Search icon position in columns selector.
- Fix: EditView when empty is false in guessers.
- Fix: SaveButton disabled state with React Hook Form proxy subscriptions.
- Fix: ListPagination disables prev/next buttons when necessary.
- Fix: ReferenceField now works correctly when offline.

### 📝 Documentation
- Improve: Inputs, ThemeModeToggle, Relationship, Appsidebar, layout, notification, loading, and error documentation.
- Improve: Tutorial for Next.js
- Improve: MCP documentation, add a section on context7.
- Improve: BooleanInput documentation, added doc on format and parse prop
- Add: Documentation on ra-enterprise hooks and components
    - ReferenceManyInputBase
    - ReferenceManyToManyFieldBase
    - ReferenceManyToManyInputBase
    - ReferenceOneInputBase
    - useGetListLive
    - useGetOneLive
    - useLockOnCall
    - useLockOnMount
    - usePublish
    - useSubscribe
    - useSubscribeCallback
- Add: Documentation for enterprise features (soft delete, live update, locking).
- Add: chapter on real time
- Add: Documentation for new components (DateInput, ImageField, TextArrayInput, etc.).
- Add: Documentation on Breadcrumb, Confirm components
- Add: Tutorials on how to setup TanStack Start, and React Router.
- Add: FileInput image preview example.
- Add: UserMenu documentation.
- Add: ReferenceArrayInput validation documentation.
- Add: i18n configuration page

### 🧰 Chore & Maintenance
- Upgrade: Tailwind CSS, Storybook, Vite, Astro, Playwright, react-router, and other dependencies.
- Add: Pull request template.
- Fix: linter warnings.
- Improve: Build process and allow to create release from tag.
- Deduplicate: Dependencies.

For the full list of changes, see the [commit history](https://github.com/marmelab/shadcn-admin-kit/compare/v1.0.0...v1.5.0).

## v1.0.0

Initial release
