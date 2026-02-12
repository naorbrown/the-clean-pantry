# The Clean Pantry

Simple, healthy DIY recipes for your entire home. Just 4 core ingredients for 90% of your needs.

## Quick Start

```bash
pnpm install
pnpm dev        # Start dev server at localhost:4321
```

## Adding or Editing Recipes

See **[docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)** for a step-by-step guide — no coding experience required.

For a reference of all frontmatter fields, see **[docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md)**.

## Project Structure

```
src/
├── content/
│   ├── recipes/       ← Recipe MDX files (organized by category folders)
│   ├── ingredients/   ← Ingredient MDX files
│   └── pages/         ← Static pages
├── components/        ← UI components
├── layouts/           ← Page layouts
├── pages/             ← Route files (generates URLs automatically)
├── lib/               ← Utility functions
├── data/              ← YAML config files
└── styles/            ← Tailwind + custom theme
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server at localhost:4321 |
| `pnpm build` | Build production site to `./dist` |
| `pnpm preview` | Preview production build locally |
| `pnpm test` | Run unit tests |
| `pnpm test:e2e` | Run end-to-end tests |
| `pnpm check` | TypeScript type checking |

## Tech Stack

- [Astro 5](https://astro.build) — Static site framework
- [Tailwind CSS v4](https://tailwindcss.com) — Styling
- [MDX](https://mdxjs.com) — Markdown + components for content
- [Vitest](https://vitest.dev) — Unit tests
- [Playwright](https://playwright.dev) — E2E tests
