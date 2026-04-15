# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Toolchain: Vite+

This project uses **Vite+** (`vp`), a unified CLI wrapping Vite, Rolldown, Vitest, Oxlint, and Oxfmt. Always use `vp` — never invoke `npm`, `pnpm`, or the underlying tools (oxlint, vitest, etc.) directly.

```bash
vp dev          # start dev server
vp build        # type-check + production build
vp check        # format + lint + type-check (run before committing)
vp lint         # lint only
vp fmt          # format only
vp test         # run tests
vp test <file>  # run a single test file
vp add <pkg>    # add a dependency
vp install      # install dependencies (after pulling)
```

- Import from `vite-plus` (not `vite`): `import { defineConfig } from 'vite-plus'`
- Import test utilities from `vite-plus/test` (not `vitest`)
- Pre-commit hook runs `vp check --fix` on staged files automatically

## Architecture

### Entry & Routing

`src/main.tsx` is the entry point. It mounts `<App>` (which wraps everything in `QueryClientProvider` + `ThemeProvider` + `Layout`) and defines all routes via React Router v7 inside `App`'s children:

```
/          → src/routes/home.tsx
/dashboard → src/routes/dashboard.tsx
/login     → src/routes/login.tsx
/signup    → src/routes/signup.tsx
```

Route components are barrel-exported from `src/routes/index.tsx`.

### Data Fetching

API calls live in `src/services/handlers.tsx` (plain `fetch` wrappers), and TanStack Query query objects are defined in `src/services/queries.tsx`. The pattern is:

1. `handlers.tsx` — async service functions (reads env vars for base URL/API key)
2. `queries.tsx` — query factory functions that return `{ queryKey, queryFn }` objects for `useQuery`

Environment variables required: `VITE_TMDB_API_KEY`, `VITE_TMDB_BASE_URL`, `VITE_TMDB_IMAGE_BASE_URL` (see `.env`).

Types are defined in `src/types/` and re-exported from `src/types/index.tsx`.

### UI Component System

The project has two layers of UI components:

1. **Base shadcn/ui components** — `src/components/ui/*.tsx` (button, card, input, sidebar, etc.)
2. **Glass UI layer** — `src/components/ui/glass/` — wraps base components with glassmorphism effects

The Glass system is driven by:

- `src/lib/glass-utils.ts` — `GlassCustomization` interface + `getGlassStyles()` / `getGlassCSSVars()` helpers that convert glass props to inline CSS
- `src/lib/hover-effects.ts` — `cva`-based hover effect variants (`glow`, `shimmer`, `ripple`, `lift`, `scale`)

Glass components (e.g. `src/components/ui/glass/button.tsx`) accept a `glass?: GlassCustomization` prop and an `effect?: HoverEffect` prop on top of the base component's props.

### Theme

`src/components/theme-provider.tsx` manages dark/light/system theme via React context, persisting to `localStorage` under the key `vite-ui-theme`. Use the `useTheme()` hook to read/set the theme. The `AnimatedThemeToggler` in the navbar triggers this.

### Path Alias

`@` maps to `src/` — use `@/components/...`, `@/lib/...`, etc. throughout the codebase.
