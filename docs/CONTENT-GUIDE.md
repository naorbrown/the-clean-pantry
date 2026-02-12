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

## Writing Guidelines

- **One action per step.** "Mix vinegar and water" is one step. Don't combine unrelated actions.
- **Use specific measurements.** "1 cup" not "some."
- **Plain language.** Write for someone who has never made a DIY product before.
- **Safety first.** Always include relevant warnings in the frontmatter `safetyWarnings` and `notSafeFor` fields.

## Categories

| Slug | Name | What goes here |
|------|------|----------------|
| `kitchen` | Kitchen Cleaning | Cleaners, degreasers, dish products |
| `bathroom` | Bathroom Cleaning | Toilet, tub, glass, grout |
| `laundry` | Laundry | Detergent, stain treatment, softener |
| `floors` | Floor Care | Mop solutions, carpet care |
| `personal-care` | Personal Care | Deodorant, toothpaste, shampoo |
| `baby-child` | Baby & Child | Nursery, toy, and gentle cleaners |
| `pest-control` | Pest Control | Ant, flea, insect solutions |
| `air-quality` | Air Quality | Room sprays, odor eliminators, air purification |
| `candles-fragrance` | Candles & Fragrance | DIY candles, wax melts, scent blends |
| `clothing-textiles` | Clothing & Textiles | Fabric care, wool wash, garment freshening |
| `water` | Water | Filtration, softening, testing |
| `home-setup` | Home Setup | Guides for home environment, lighting, EMF, mattress |

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
