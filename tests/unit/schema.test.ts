import { describe, it, expect } from 'vitest';
import {
  generateHowToSchema,
  generateBreadcrumbSchema,
  generateWebSiteSchema,
} from '../../src/lib/schema';

describe('generateHowToSchema', () => {
  it('generates valid HowTo schema', () => {
    const result = generateHowToSchema({
      title: 'All-Purpose Cleaner',
      description: 'A simple cleaner',
      prepTime: 'PT2M',
      totalTime: 'PT5M',
      yield: '16 oz',
      ingredients: [
        { name: 'White vinegar', amount: '1 cup' },
        { name: 'Water', amount: '1 cup' },
      ],
      steps: ['Mix ingredients', 'Pour into bottle'],
      url: 'https://thecleanpantry.com/recipes/kitchen/all-purpose-cleaner/',
    });

    expect(result).toHaveProperty('@context', 'https://schema.org');
    expect(result).toHaveProperty('@type', 'HowTo');
    expect(result).toHaveProperty('name', 'All-Purpose Cleaner');
    expect(result).toHaveProperty('prepTime', 'PT2M');
    expect(result).toHaveProperty('totalTime', 'PT5M');
  });

  it('includes all supplies', () => {
    const result = generateHowToSchema({
      title: 'Test',
      description: 'Test',
      prepTime: 'PT1M',
      totalTime: 'PT1M',
      yield: '1 bottle',
      ingredients: [
        { name: 'Vinegar', amount: '1 cup' },
        { name: 'Water', amount: '2 cups' },
      ],
      steps: ['Mix'],
      url: 'https://example.com',
    }) as any;

    expect(result.supply).toHaveLength(2);
    expect(result.supply[0]).toEqual({
      '@type': 'HowToSupply',
      name: 'Vinegar',
      requiredQuantity: '1 cup',
    });
  });

  it('includes steps with positions', () => {
    const result = generateHowToSchema({
      title: 'Test',
      description: 'Test',
      prepTime: 'PT1M',
      totalTime: 'PT1M',
      yield: '1',
      ingredients: [],
      steps: ['Step one', 'Step two', 'Step three'],
      url: 'https://example.com',
    }) as any;

    expect(result.step).toHaveLength(3);
    expect(result.step[0].position).toBe(1);
    expect(result.step[2].position).toBe(3);
    expect(result.step[1].text).toBe('Step two');
  });
});

describe('generateBreadcrumbSchema', () => {
  it('generates valid BreadcrumbList', () => {
    const result = generateBreadcrumbSchema([
      { name: 'Home', url: 'https://thecleanpantry.com/' },
      { name: 'Recipes', url: 'https://thecleanpantry.com/recipes/' },
    ]);

    expect(result).toHaveProperty('@context', 'https://schema.org');
    expect(result).toHaveProperty('@type', 'BreadcrumbList');
  });

  it('numbers items correctly', () => {
    const result = generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Recipes', url: '/recipes/' },
      { name: 'Kitchen', url: '/categories/kitchen/' },
    ]) as any;

    expect(result.itemListElement).toHaveLength(3);
    expect(result.itemListElement[0].position).toBe(1);
    expect(result.itemListElement[2].position).toBe(3);
  });
});

describe('generateWebSiteSchema', () => {
  it('generates valid WebSite schema', () => {
    const result = generateWebSiteSchema(
      'The Clean Pantry',
      'https://thecleanpantry.com',
      'DIY home products'
    );

    expect(result).toHaveProperty('@context', 'https://schema.org');
    expect(result).toHaveProperty('@type', 'WebSite');
    expect(result).toHaveProperty('name', 'The Clean Pantry');
  });
});
