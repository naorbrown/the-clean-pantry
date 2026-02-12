# The Clean Pantry

> Replace toxic household products with simple, safe DIY alternatives.

**Live site:** [naorbrown.github.io/the-clean-pantry](https://naorbrown.github.io/the-clean-pantry)

---

## What Is This?

The Clean Pantry is a free, open-source collection of **250+ DIY recipes** and **65+ guides** for non-toxic home care. Four pantry staples handle 90% of your cleaning needs: **vinegar, baking soda, castile soap, and water**.

## Highlights

- **25 categories** across 6 groups — from kitchen cleaning to sleep wellness
- **Full-text search** powered by Pagefind
- **Dark theme** optimized for comfortable reading
- **Mobile-first** responsive design
- **Zero JavaScript frameworks** — pure Astro static HTML
- **Brand illustrations** — unique SVG art per category on every card

## Categories

| Group | Categories |
|-------|-----------|
| **Family & Pets** | Baby, Child & Teen · Elderly & Accessibility · Pet Care |
| **Home Cleaning** | Bathroom · Deep Cleaning · Entertaining & Guests · Floors · Kitchen · Laundry |
| **Living Spaces** | Air Quality · Candles & Fragrance · Clothing & Textiles · Daily Habits · Home Office · Home Setup · Sleep & Wellness · Water |
| **Outdoor & Auto** | Car Care · Outdoor & Garden · Pest Control |
| **Personal & Beauty** | Beauty & Cosmetics · Fitness & Wellness · Personal Care |
| **Seasonal & Specialty** | Kitchen & Food Contact · Seasonal |

## Quick Start

```bash
pnpm install
pnpm dev        # localhost:4321
```

## Commands

| Command | What it does |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build + Pagefind index |
| `pnpm preview` | Preview production build |
| `pnpm test` | Unit tests (Vitest) |
| `pnpm test:e2e` | End-to-end tests (Playwright) |
| `pnpm check` | TypeScript type checking |

## Testing

Unit tests cover utility functions, category metadata, and structured data schemas. E2E tests cover the full user experience:

| Spec | Coverage |
|------|----------|
| `navigation.spec.ts` | Page loads, nav links, breadcrumbs, footer, base path prefixing |
| `content.spec.ts` | Homepage sections, category grouping, dark mode, content validation |
| `search.spec.ts` | Search dialog, keyboard shortcut (Cmd+K), backdrop |
| `mobile.spec.ts` | Mobile menu, nav links, category listing, search button |

## Project Structure

```
src/
  content/
    recipes/        # 250+ MDX recipe files (by category folder)
    guides/         # 65+ MDX guide files (by category folder)
    ingredients/    # 6 core ingredient profiles
  components/       # Astro UI components
  layouts/          # Page layouts (recipe, guide, base)
  pages/            # Route files (auto-generates URLs)
  lib/              # Utility functions + category metadata
  data/             # YAML config (categories)
  styles/           # Tailwind v4 theme + global styles
tests/
  unit/             # Vitest unit tests
  e2e/              # Playwright E2E tests
```

## Tech Stack

- [Astro 5](https://astro.build) — Static site framework
- [Tailwind CSS v4](https://tailwindcss.com) — Utility-first styling
- [MDX](https://mdxjs.com) — Markdown + components for content
- [Pagefind](https://pagefind.app) — Static search index
- [Vitest](https://vitest.dev) — Unit tests
- [Playwright](https://playwright.dev) — E2E browser tests

## Contributing

See **[docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)** for a step-by-step guide to adding recipes and guides — no coding experience required.

For frontmatter fields and writing style, see **[docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md)**.
