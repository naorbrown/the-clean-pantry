import { describe, it, expect } from 'vitest';
import { formatDuration, categoryLabel, getCategoryIcon, getCategories, capitalize } from '../../src/lib/utils';

describe('formatDuration', () => {
  it('formats minutes only', () => {
    expect(formatDuration('PT15M')).toBe('15 min');
  });

  it('formats hours only', () => {
    expect(formatDuration('PT2H')).toBe('2 hrs');
  });

  it('formats hours and minutes', () => {
    expect(formatDuration('PT1H30M')).toBe('1 hr 30 min');
  });

  it('formats single hour', () => {
    expect(formatDuration('PT1H')).toBe('1 hr');
  });

  it('formats single minute', () => {
    expect(formatDuration('PT1M')).toBe('1 min');
  });

  it('returns "< 1 min" for zero duration', () => {
    expect(formatDuration('PT0M')).toBe('< 1 min');
  });

  it('returns original string for invalid format', () => {
    expect(formatDuration('invalid')).toBe('invalid');
  });

  it('formats 12 hours', () => {
    expect(formatDuration('PT12H')).toBe('12 hrs');
  });
});

describe('categoryLabel', () => {
  it('returns label for all 21 categories', () => {
    expect(categoryLabel('kitchen')).toBe('Kitchen Cleaning');
    expect(categoryLabel('kitchen-food-contact')).toBe('Kitchen & Food Contact');
    expect(categoryLabel('bathroom')).toBe('Bathroom Cleaning');
    expect(categoryLabel('personal-care')).toBe('Personal Care');
    expect(categoryLabel('beauty-cosmetics')).toBe('Beauty & Cosmetics');
    expect(categoryLabel('baby-child')).toBe('Baby & Child');
    expect(categoryLabel('laundry')).toBe('Laundry');
    expect(categoryLabel('floors')).toBe('Floor Care');
    expect(categoryLabel('clothing-textiles')).toBe('Clothing & Textiles');
    expect(categoryLabel('air-quality')).toBe('Air Quality');
    expect(categoryLabel('candles-fragrance')).toBe('Candles & Fragrance');
    expect(categoryLabel('water')).toBe('Water');
    expect(categoryLabel('home-setup')).toBe('Home Setup');
    expect(categoryLabel('pest-control')).toBe('Pest Control');
    expect(categoryLabel('pet-care')).toBe('Pet Care');
    expect(categoryLabel('outdoor-garden')).toBe('Outdoor & Garden');
    expect(categoryLabel('car-care')).toBe('Car Care');
    expect(categoryLabel('deep-cleaning')).toBe('Deep Cleaning');
    expect(categoryLabel('fitness-wellness')).toBe('Fitness & Wellness');
    expect(categoryLabel('home-office')).toBe('Home Office');
    expect(categoryLabel('seasonal')).toBe('Seasonal');
  });

  it('returns slug for unknown category', () => {
    expect(categoryLabel('unknown')).toBe('unknown');
  });
});

describe('getCategoryIcon', () => {
  it('returns icon for known categories', () => {
    expect(getCategoryIcon('kitchen')).toBe('🍽️');
    expect(getCategoryIcon('pet-care')).toBe('🐾');
    expect(getCategoryIcon('seasonal')).toBe('🍂');
  });

  it('returns fallback for unknown category', () => {
    expect(getCategoryIcon('unknown')).toBe('📋');
  });
});

describe('getCategories', () => {
  it('returns all 21 categories sorted by order', () => {
    const cats = getCategories();
    expect(cats).toHaveLength(21);
    expect(cats[0].slug).toBe('kitchen');
    expect(cats[20].slug).toBe('seasonal');
  });

  it('each category has slug, name, description, icon, and order', () => {
    const cats = getCategories();
    for (const cat of cats) {
      expect(cat.slug).toBeTruthy();
      expect(cat.name).toBeTruthy();
      expect(cat.description).toBeTruthy();
      expect(cat.icon).toBeTruthy();
      expect(cat.order).toBeGreaterThan(0);
    }
  });
});

describe('capitalize', () => {
  it('capitalizes first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('handles empty string', () => {
    expect(capitalize('')).toBe('');
  });

  it('handles already capitalized', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });
});
