# Content Guide

Detailed reference for writing content on The Clean Pantry.

## Recipe Body Structure

Every recipe should follow this structure in the body (after the frontmatter):

```markdown
## Steps

1. First action.
2. Second action.
3. Third action.

## Why It Works

2-3 sentences explaining the science. Keep it accessible — no jargon.

## Alternative

1-2 alternate approaches (e.g., different ingredients, different method).

## Tips

- Practical tips for best results.
- Storage notes, shelf life, etc.
```

**Section order matters.** Always use this exact order: Steps, Why It Works, Alternative, Tips. The Alternative section is optional, but if present it must come before Tips.

## Writing Guidelines

- **One action per step.** "Mix vinegar and water" is one step. Don't combine unrelated actions.
- **Use specific measurements.** "1 cup" not "some."
- **Plain language.** Write for someone who has never made a DIY product before.
- **Safety first.** Always include relevant warnings in the frontmatter `safetyWarnings` and `notSafeFor` fields.
- **Bold for emphasis.** Use `**bold**` to highlight critical instructions, warnings, or key action words within steps.

## Categories

| Slug | Name | What goes here |
|------|------|----------------|
| `kitchen` | Kitchen Cleaning | Cleaners, degreasers, dish products |
| `kitchen-food-contact` | Kitchen & Food Contact | Cookware, utensils, cutting boards, water bottles |
| `bathroom` | Bathroom Cleaning | Toilet, tub, glass, grout |
| `personal-care` | Personal Care | Deodorant, toothpaste, shampoo |
| `beauty-cosmetics` | Beauty & Cosmetics | Makeup brushes, nail care, face masks, hair treatments |
| `baby-child` | Baby, Child & Teen | Nursery, toys, teen gear, and gentle cleaners |
| `laundry` | Laundry | Detergent, stain treatment, softener |
| `floors` | Floor Care | Mop solutions, carpet care |
| `clothing-textiles` | Clothing & Textiles | Fabric care, wool wash, garment freshening |
| `air-quality` | Air Quality | Room sprays, odor eliminators, air purification |
| `candles-fragrance` | Candles & Fragrance | DIY candles, wax melts, scent blends |
| `water` | Water | Filtration, softening, testing |
| `home-setup` | Home Setup | Guides for home environment, lighting, EMF, mattress |
| `pest-control` | Pest Control | Ant, flea, insect solutions |
| `pet-care` | Pet Care | Pet shampoo, bedding, bowl cleaning, flea treatment |
| `outdoor-garden` | Outdoor & Garden | Deck, patio, grill, garden tools, insect repellent |
| `car-care` | Car Care | Interior, exterior, air fresheners, dashboard |
| `deep-cleaning` | Deep Cleaning | Grout, mold, rust, adhesive removal, garage |
| `fitness-wellness` | Fitness & Wellness | Yoga mats, gym equipment, sports bottles |
| `home-office` | Home Office | Monitor, keyboard, desk, and chair cleaning |
| `seasonal` | Seasonal | Holiday, spring cleaning, back-to-school, weather-specific |
| `entertaining` | Entertaining & Guests | Hosting prep, dinner parties, guest bedrooms, cleanup |
| `sleep-wellness` | Sleep & Wellness | EMF, circadian rhythms, bedroom plants, sleep optimization |
| `daily-habits` | Daily Habits | Shoe policies, medicine storage, receipt handling |
| `elderly-accessibility` | Elderly & Accessibility | Grab bars, non-slip, medication management |

## Ingredient Body Structure

Ingredient files use structured `##` sections in the body (after frontmatter):

```markdown
## What It Does

2-4 sentences. Warm, accessible summary of the ingredient and why it belongs in a cleaning kit.

## How to Use It

Where this ingredient appears in recipes and how it works. Include key interactions and warnings. Bullet lists welcome.

## Buying & Storage

Brand notes, bulk buying, storage tips. Keep it under 80 words.

## Enhance It

Optional. Essential oil pairings, alternative forms, bonus uses beyond basic cleaning.
```

## Guide Body Structure

Guides are informational articles that use a simpler structure than recipes. There is no required template -- just clear prose organized with `##` headings.

```markdown
## First Section

Introduce the topic. Explain what the reader needs to know and why it matters.

## Second Section

Go deeper. Provide practical steps, comparisons, or recommendations.

## Third Section

Additional details, alternatives, or considerations.
```

Guidelines for guides:
- Use `##` headings to break content into scannable sections.
- Write in plain language. Assume the reader has no prior knowledge of the topic.
- Use bullet lists for options, comparisons, and action items.
- Include practical, actionable advice -- not just theory.
- Reference specific Clean Pantry recipes where relevant (e.g., "use your all-purpose cleaner" rather than "use a cleaning spray").

## Tags

Tags are freeform. Use lowercase, hyphenated. Common tags:

- `quick` -- Takes under 5 minutes
- `beginner-friendly` -- No special skills needed
- `deep-clean` -- Heavy-duty cleaning
- `overnight` -- Leave to work while you sleep
- `pet-safe` -- Safe around animals
- `baby-safe` -- Safe for nurseries and children
- `air-quality` -- Related to indoor air
- `candles` -- Candle and wax melt recipes
- `water` -- Water filtration and treatment
- `home-setup` -- Home environment and setup guides

## Markdown Features

Standard Markdown works in the body:

- `**bold**` for **bold**
- `*italic*` for *italic*
- `[link text](url)` for links
- `> blockquote` for quotes
- `- item` for bullet lists
- `1. item` for numbered lists
- `## Heading` for section headings
