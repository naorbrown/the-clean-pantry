/**
 * Prefix a path with the configured Astro base path.
 */
export function url(path: string): string {
  const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');
  return `${base}${path}`;
}

/**
 * Format an ISO 8601 duration string (e.g., "PT15M") to human-readable form.
 */
export function formatDuration(iso: string): string {
  const match = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return iso;

  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours} hr${hours !== 1 ? 's' : ''}`);
  if (minutes > 0) parts.push(`${minutes} min`);
  if (parts.length === 0) parts.push('< 1 min');

  return parts.join(' ');
}

/**
 * Category metadata — must stay in sync with src/data/categories.yaml.
 */
const categories: Record<string, { name: string; description: string; icon: string; order: number }> = {
  kitchen:                { name: 'Kitchen Cleaning',      description: 'All-purpose cleaners, degreasers, and oven solutions using simple pantry ingredients',        icon: '🍽️', order: 1 },
  'kitchen-food-contact': { name: 'Kitchen & Food Contact', description: 'Non-toxic cookware, food storage, utensils, cutting boards, and water bottles',              icon: '🍳', order: 2 },
  bathroom:               { name: 'Bathroom Cleaning',     description: 'Toilet cleaners, tub scrubs, and glass sprays without harsh chemicals',                      icon: '🚿', order: 3 },
  'personal-care':        { name: 'Personal Care',         description: 'Simple deodorants, toothpaste, shampoo, and skincare from natural ingredients',               icon: '🧴', order: 4 },
  'beauty-cosmetics':     { name: 'Beauty & Cosmetics',    description: 'Safer makeup choices, natural nail care, hair dye alternatives, and brush cleaning',          icon: '💄', order: 5 },
  'baby-child':           { name: 'Baby, Child & Teen',    description: 'Extra-gentle cleaners for nurseries, toys, teen gear, and sensitive skin',                    icon: '👶', order: 6 },
  laundry:                { name: 'Laundry',               description: 'Gentle, effective detergents, stain removers, and fabric softeners',                          icon: '👕', order: 7 },
  floors:                 { name: 'Floor Care',            description: 'Safe cleaners for hardwood, tile, and carpet — with material-specific guidance',               icon: '🏠', order: 8 },
  'clothing-textiles':    { name: 'Clothing & Textiles',   description: 'Healthier socks, house shoes, bedding, carpet materials, and fabric care',                    icon: '🧶', order: 9 },
  'air-quality':          { name: 'Air Quality',           description: 'Natural air freshening, ozonators, purifiers, and healthier indoor air',                      icon: '🌬️', order: 10 },
  'candles-fragrance':    { name: 'Candles & Fragrance',   description: 'Safer candle choices, DIY beeswax candles, and essential oil guidance',                       icon: '🕯️', order: 11 },
  water:                  { name: 'Water',                 description: 'Shower filters, drinking water filtration, and water quality guidance',                       icon: '💧', order: 12 },
  'home-setup':           { name: 'Home Setup',            description: 'Mattress selection, natural lighting, ozonators, and healthier living spaces',                icon: '🔧', order: 13 },
  'pest-control':         { name: 'Pest Control',          description: 'Non-toxic solutions for ants, fleas, mosquitoes, and other common household pests',           icon: '🐜', order: 14 },
  'pet-care':             { name: 'Pet Care',              description: 'Natural pet shampoo, flea treatment, safe litter, bowls, and bedding',                        icon: '🐾', order: 15 },
  'outdoor-garden':       { name: 'Outdoor & Garden',      description: 'Lawn care, garden solutions, insect repellent, pool maintenance, and deck cleaning',          icon: '🌿', order: 16 },
  'car-care':             { name: 'Car Care',              description: 'Non-toxic car interior cleaning, air fresheners, car wash, and off-gassing reduction',        icon: '🚗', order: 17 },
  'deep-cleaning':        { name: 'Deep Cleaning',         description: 'Grout restoration, mold removal, rust treatment, adhesive removal, and garage cleaning',      icon: '🧽', order: 18 },
  'fitness-wellness':     { name: 'Fitness & Wellness',    description: 'Yoga mat cleaner, gym equipment sanitizer, sports bottle care, and workout gear',             icon: '🏋️', order: 19 },
  'home-office':          { name: 'Home Office',           description: 'Non-toxic desk, chair, keyboard, and monitor cleaning — safer workspace setup',               icon: '💻', order: 20 },
  seasonal:               { name: 'Seasonal',              description: 'Holiday candle safety, de-icing alternatives, spring cleaning checklists, and back-to-school', icon: '🍂', order: 21 },
  entertaining:           { name: 'Entertaining & Guests', description: 'Hosting prep, dinner parties, guest bedrooms, and after-party cleanup',                      icon: '🥂', order: 22 },
  'sleep-wellness':       { name: 'Sleep & Wellness',      description: 'EMF reduction, circadian rhythms, bedroom plants, window treatments, and sleep optimization', icon: '🌙', order: 23 },
  'daily-habits':         { name: 'Daily Habits',          description: 'Shoe policies, medicine storage, receipt handling, and overlooked household best practices',   icon: '📋', order: 24 },
  'elderly-accessibility':{ name: 'Elderly & Accessibility',description: 'Grab bars, non-slip solutions, medication management, and elder-proofing your home',         icon: '♿', order: 25 },
};

/**
 * Get the category display name from a slug.
 */
export function categoryLabel(slug: string): string {
  return categories[slug]?.name ?? slug;
}

/**
 * Get the emoji icon for a category.
 */
export function getCategoryIcon(slug: string): string {
  return categories[slug]?.icon ?? '📋';
}

/**
 * Get all categories sorted by order.
 */
export function getCategories(): Array<{ slug: string; name: string; description: string; icon: string; order: number }> {
  return Object.entries(categories)
    .map(([slug, info]) => ({ slug, ...info }))
    .sort((a, b) => a.order - b.order);
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Super-category groupings — 6 top-level categories containing 21 subcategories.
 */
export interface SuperCategory {
  slug: string;
  name: string;
  icon: string;
  description: string;
  subcategories: string[]; // subcategory slugs, alphabetized
}

const superCategories: SuperCategory[] = [
  {
    slug: 'family-pets',
    name: 'Family & Pets',
    icon: '👶',
    description: 'Baby-safe cleaners, pet care, elderly accessibility, and gentle solutions for the whole family',
    subcategories: ['baby-child', 'elderly-accessibility', 'pet-care'],
  },
  {
    slug: 'home-cleaning',
    name: 'Home Cleaning',
    icon: '🏠',
    description: 'Kitchen, bathroom, floors, laundry, and deep cleaning for every room',
    subcategories: ['bathroom', 'deep-cleaning', 'entertaining', 'floors', 'kitchen', 'laundry'],
  },
  {
    slug: 'living-spaces',
    name: 'Living Spaces',
    icon: '🏡',
    description: 'Air quality, fragrance, textiles, water, and home office — your daily environment',
    subcategories: ['air-quality', 'candles-fragrance', 'clothing-textiles', 'daily-habits', 'home-office', 'home-setup', 'sleep-wellness', 'water'],
  },
  {
    slug: 'outdoor-auto',
    name: 'Outdoor & Auto',
    icon: '🌍',
    description: 'Garden, car care, and pest control for everything outside your front door',
    subcategories: ['car-care', 'outdoor-garden', 'pest-control'],
  },
  {
    slug: 'personal-beauty',
    name: 'Personal & Beauty',
    icon: '🌿',
    description: 'Skincare, hair care, fitness gear, and personal wellness — naturally',
    subcategories: ['beauty-cosmetics', 'fitness-wellness', 'personal-care'],
  },
  {
    slug: 'seasonal-specialty',
    name: 'Seasonal & Specialty',
    icon: '📅',
    description: 'Holiday prep, seasonal cleaning, and food-safe kitchen solutions',
    subcategories: ['kitchen-food-contact', 'seasonal'],
  },
];

/**
 * Get all super-categories.
 */
export function getSuperCategories(): SuperCategory[] {
  return superCategories;
}

/**
 * Get the super-category that contains a given subcategory slug.
 */
export function getSuperCategoryForSub(slug: string): SuperCategory | undefined {
  return superCategories.find((sc) => sc.subcategories.includes(slug));
}
