import { test, expect } from '@playwright/test';

test.describe('Content', () => {
  test('homepage has stats section', async ({ page }) => {
    await page.goto('/');
    // Should show recipe/guide/category counts
    await expect(page.getByText('Recipes', { exact: true }).first()).toBeVisible();
  });

  test('homepage has "How it works" section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('How it works')).toBeVisible();
    await expect(page.getByText('Pick a recipe')).toBeVisible();
    await expect(page.getByText('Grab ingredients')).toBeVisible();
    await expect(page.getByText('Mix and use')).toBeVisible();
  });

  test('homepage has core ingredients section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('The Core Four Ingredients')).toBeVisible();
  });

  test('recipes page groups by category', async ({ page }) => {
    await page.goto('/recipes/');
    // Should have category section headers
    await expect(page.getByRole('heading', { name: 'Kitchen Cleaning' })).toBeVisible();
  });

  test('category page shows recipe and guide counts', async ({ page }) => {
    await page.goto('/categories/');
    // Category cards should be present
    const categoryCards = page.locator('a[href*="/categories/"]');
    expect(await categoryCards.count()).toBeGreaterThan(0);
  });

  test('ingredients page has three tiers', async ({ page }) => {
    await page.goto('/ingredients/');
    await expect(page.getByText('Core')).toBeVisible();
    await expect(page.getByText('Secondary')).toBeVisible();
  });

  test('dark mode is always on', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const hasDark = await html.evaluate((el) => el.classList.contains('dark'));
    expect(hasDark).toBe(true);
  });

  test('no theme toggle button exists', async ({ page }) => {
    await page.goto('/');
    const toggleBtn = page.locator('#theme-toggle');
    expect(await toggleBtn.count()).toBe(0);
  });

  test('no about page links exist in navigation', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header');
    const aboutLinks = header.locator('a[href*="/about"]');
    expect(await aboutLinks.count()).toBe(0);
  });

  test('no Dr. Wilson or Dr. Eck references on homepage', async ({ page }) => {
    await page.goto('/');
    const text = await page.textContent('body');
    expect(text).not.toContain('Wilson');
    expect(text).not.toContain('Eck');
  });

  test('recipe page has standard section headings', async ({ page }) => {
    await page.goto('/recipes/kitchen/all-purpose-cleaner/');
    await expect(page.locator('h2', { hasText: 'Steps' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Why It Works' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Tips' })).toBeVisible();
  });

  test('previously fixed recipe uses ## Steps not ## How to Make It', async ({ page }) => {
    await page.goto('/recipes/sleep-wellness/mattress-freshener/');
    await expect(page.locator('h2', { hasText: 'Steps' })).toBeVisible();
    const body = await page.textContent('body');
    expect(body).not.toContain('How to Make It');
  });
});
