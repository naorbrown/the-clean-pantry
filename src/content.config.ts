import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const categoryEnum = z.enum([
  'kitchen',
  'kitchen-food-contact',
  'bathroom',
  'personal-care',
  'beauty-cosmetics',
  'baby-child',
  'laundry',
  'floors',
  'clothing-textiles',
  'air-quality',
  'candles-fragrance',
  'water',
  'home-setup',
  'pest-control',
  'pet-care',
  'outdoor-garden',
  'car-care',
  'deep-cleaning',
  'fitness-wellness',
  'home-office',
  'seasonal',
  'entertaining',
  'sleep-wellness',
  'daily-habits',
  'elderly-accessibility',
  'condiments',
  'travel',
]);

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/recipes' }),
  schema: z.object({
    title: z.string().max(80),
    description: z.string().max(160),
    category: categoryEnum,
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    prepTime: z.string(),
    totalTime: z.string(),
    yield: z.string(),
    ingredients: z.array(
      z.object({
        name: z.string(),
        amount: z.string(),
        notes: z.string().optional(),
      })
    ),
    tags: z.array(z.string()).default([]),
    relatedRecipes: z.array(z.string()).default([]),
    safetyWarnings: z.array(z.string()).default([]),
    notSafeFor: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/guides' }),
  schema: z.object({
    title: z.string().max(80),
    description: z.string().max(160),
    category: categoryEnum,
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
  }),
});

const ingredients = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/ingredients' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string().max(160),
    category: z.enum(['core', 'secondary', 'specialty']),
    scienceSummary: z.string(),
    safetyNotes: z.array(z.string()).default([]),
    storageInstructions: z.string().optional(),
    shelfLife: z.string().optional(),
    publishDate: z.coerce.date(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { recipes, guides, ingredients, pages };
