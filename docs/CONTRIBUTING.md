# Contributing Recipes and Guides

This guide explains how to add or edit recipes and guides. No coding experience needed.

## How Content Works

Content lives in the `src/content/` folder, organized by type:

```
src/content/
├── recipes/
│   ├── kitchen/
│   │   ├── all-purpose-cleaner.mdx
│   │   └── degreaser.mdx
│   ├── bathroom/
│   │   ├── toilet-bowl-cleaner.mdx
│   │   └── tub-shower-scrub.mdx
│   ├── laundry/
│   │   └── ...
│   └── ...
├── guides/
│   ├── home-setup/
│   │   ├── ozonator-guide.mdx
│   │   ├── natural-lighting.mdx
│   │   └── ...
│   ├── air-quality/
│   │   └── ...
│   └── ...
└── ingredients/
    └── ...
```

Each file has two parts:
1. **Frontmatter** (the settings at the top, between `---` markers)
2. **Body content** (the instructions or prose written in Markdown)

---

## Adding a New Recipe

### Step 1: Create the file

Create a new `.mdx` file in the right category folder. Use lowercase with hyphens for the filename:

```
src/content/recipes/kitchen/my-new-recipe.mdx
```

The filename becomes part of the URL: `thecleanpantry.com/recipes/kitchen/my-new-recipe/`

### Step 2: Add the frontmatter

Copy this template and fill in the values:

```yaml
---
title: "Your Recipe Title"
description: "A short description (max 160 characters) for search results"
category: kitchen
difficulty: beginner
prepTime: PT5M
totalTime: PT10M
yield: "16 oz spray bottle"
ingredients:
  - name: "White vinegar"
    amount: "1 cup"
  - name: "Water"
    amount: "1 cup"
tags: [quick, beginner-friendly]
safetyWarnings: []
notSafeFor: []
featured: false
draft: false
publishDate: 2026-02-12
---
```

### Step 3: Write the body

After the closing `---`, write the recipe content in Markdown:

```markdown
## Steps

1. Pour vinegar into a spray bottle.
2. Add water and swirl gently to mix.
3. Spray surface and let sit for 1-2 minutes.
4. Wipe clean with a cloth.

## Why It Works

White vinegar contains acetic acid (pH 2.0), which disrupts bacteria
cell membranes and dissolves mineral deposits and grease.

## Alternative

For a scented version, add 10-15 drops of tea tree or lemon essential oil.

## Tips

- Shake before each use.
- Replace every 2-3 months.
```

### Step 4: Preview

Run `pnpm dev` and visit `http://localhost:4321/recipes/kitchen/my-new-recipe/` to see your recipe.

---

## Editing an Existing Recipe

1. Open the `.mdx` file you want to edit
2. Change the frontmatter values or body content
3. Save the file — the dev server will auto-reload

---

## Adding a Guide

Guides are informational articles that go alongside recipes. They cover topics like home setup, product comparisons, and how-to explanations that do not fit the recipe format.

### Step 1: Create the file

Create a new `.mdx` file in the appropriate category folder under `src/content/guides/`:

```
src/content/guides/home-setup/my-new-guide.mdx
```

The filename becomes part of the URL: `thecleanpantry.com/guides/home-setup/my-new-guide/`

### Step 2: Add the frontmatter

Guide frontmatter is simpler than recipe frontmatter. Copy this template:

```yaml
---
title: "Your Guide Title"
description: "A short description (max 160 characters) for search results"
category: home-setup
tags: [relevant, tags]
draft: false
publishDate: 2026-02-12
---
```

| Field | Required | Type | Example |
|-------|----------|------|---------|
| `title` | Yes | Text (max 80 chars) | `"Choosing a Non-Toxic Mattress"` |
| `description` | Yes | Text (max 160 chars) | `"How to avoid flame retardants..."` |
| `category` | Yes | One of the 12 categories | `home-setup` |
| `tags` | No | List of text | `[mattress, sleep]` |
| `draft` | No | `true` or `false` | `false` |
| `publishDate` | Yes | Date | `2026-02-12` |

### Step 3: Write the body

Guides are prose with `##` section headings. No special structure is required -- just clear, well-organized writing. Use bullet lists, bold text, and subheadings as needed to make the content scannable.

### Step 4: Preview

Run `pnpm dev` and visit the guide URL to verify it renders correctly.

---

## Frontmatter Field Reference

| Field | Required | Type | Example |
|-------|----------|------|---------|
| `title` | Yes | Text (max 80 chars) | `"All-Purpose Cleaner"` |
| `description` | Yes | Text (max 160 chars) | `"A simple spray..."` |
| `category` | Yes | One of: `kitchen`, `bathroom`, `laundry`, `floors`, `personal-care`, `baby-child`, `pest-control`, `air-quality`, `candles-fragrance`, `clothing-textiles`, `water`, `home-setup` | `kitchen` |
| `difficulty` | Yes | One of: `beginner`, `intermediate`, `advanced` | `beginner` |
| `prepTime` | Yes | Duration (ISO 8601) | `PT5M` (5 min), `PT1H` (1 hr) |
| `totalTime` | Yes | Duration (ISO 8601) | `PT10M` |
| `yield` | Yes | Text | `"16 oz spray bottle"` |
| `ingredients` | Yes | List of `{name, amount}` | See template above |
| `tags` | No | List of text | `[quick, kitchen]` |
| `safetyWarnings` | No | List of text | `["Keep away from children"]` |
| `notSafeFor` | No | List of text | `[marble, granite]` |
| `featured` | No | `true` or `false` | `false` |
| `draft` | No | `true` or `false` | `false` |
| `publishDate` | Yes | Date | `2026-02-12` |

### Time Format Cheat Sheet

| Duration | Format |
|----------|--------|
| 1 minute | `PT1M` |
| 5 minutes | `PT5M` |
| 30 minutes | `PT30M` |
| 1 hour | `PT1H` |
| 1 hour 30 minutes | `PT1H30M` |
| 12 hours (overnight) | `PT12H` |

---

## Adding an Ingredient

Create a new `.mdx` file in `src/content/ingredients/`:

```yaml
---
name: "Ingredient Name"
slug: "ingredient-slug"
description: "Short description (max 160 chars)"
category: core
scienceSummary: "Why this ingredient works."
safetyNotes: []
storageInstructions: "How to store it"
shelfLife: "How long it lasts"
publishDate: 2026-02-12
---

Write detailed content here about the ingredient.
```

The `category` field should be one of:
- `core` — The Core Four (water, vinegar, baking soda, castile soap)
- `secondary` — Useful additions (washing soda, hydrogen peroxide)
- `specialty` — Specific use cases (borax, soap nuts)
