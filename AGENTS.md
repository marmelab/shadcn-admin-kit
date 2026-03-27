# Agent Directives

## Project Overview

Shadcn Admin Kit is a component library for building admin apps using shadcn/ui. It wraps ra-core (react-admin's headless core) with shadcn/ui components, providing CRUD views, data tables, form inputs, auth, i18n, and theming. The demo app in `src/demo/` showcases all features with fake data.

## Commands

```bash
make install           # Install dependencies
make run               # Start dev server (Vite)
make test              # Run tests (Vitest + Playwright browser, headless)
make test-watch        # Run tests in watch mode
make test-browser      # Run tests in interactive browser mode
make typecheck         # TypeScript type checking
make lint              # ESLint
make storybook         # Start Storybook on port 6006
```

Run a single test file: `pnpm vitest run --browser.headless src/components/admin/some-component.spec.tsx`

## Architecture

### Core Pattern: ra-core + shadcn/ui

The library re-implements react-admin's UI layer using shadcn/ui components while keeping ra-core for headless logic (data fetching, auth, routing, i18n, state). Components in `src/components/admin/` use ra-core hooks (`useListContext`, `useRecordContext`, `useInput`, etc.) for data/state and render with shadcn/ui primitives from `src/components/ui/`.

### Key Directories

- `src/components/admin/`: All admin components (~94 files): views (List, Create, Edit, Show), fields (*-field.tsx), inputs (*-input.tsx), actions (buttons), layout, auth, guessers
- `src/components/ui/`: Base shadcn/ui primitives (button, dialog, table, sidebar, etc.)
- `src/components/rich-text-input/`: TipTap WYSIWYG editor integration
- `src/demo/`: Demo app with fake REST data provider, organized by resource (products/, orders/, customers/, categories/, reviews/)
- `src/stories/`: Storybook stories for component documentation
- `src/lib/`: Utilities (`cn()` for Tailwind class merging, i18n defaults, field types)
- `docs/`: Astro documentation site (separate pnpm workspace package)
- `website/`: Marketing site (separate Vite config)

### Component Conventions

- **Fields** (`*-field.tsx`): Display components that read from `useRecordContext()`. Used in List/Show views.
- **Inputs** (`*-input.tsx`): Form components that use `useInput()` from ra-core + React Hook Form. Used in Create/Edit views.
- **Guessers** (`*-guesser.tsx`): Auto-generate CRUD views by introspecting API responses.
- **Reference components** (`reference-*.tsx`): Handle foreign key relationships (one-to-many, many-to-one).
- Tests are co-located as `*.spec.tsx` files next to their components.

### Entry Point

`Admin` component (`src/components/admin/admin.tsx`) wraps ra-core's `CoreAdminContext` + `CoreAdminUI` with the ThemeProvider and default layout. Apps configure it with a `dataProvider`, optional `authProvider`, and `<Resource>` children.

## Tech Stack

- **Build**: Vite with `@` path alias → `./src`
- **Styling**: Tailwind CSS v4 with oklch CSS custom properties for theming (light/dark)
- **Testing**: Vitest with Playwright browser provider (Chromium), tests run in real browser
- **Forms**: React Hook Form + Zod validation
- **State/Data**: TanStack Query (via ra-core)
- **Routing**: React Router v7 (via ra-core)
- **shadcn/ui style**: `new-york` variant, CSS variables enabled
