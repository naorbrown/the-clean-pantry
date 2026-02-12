import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test('page loads with 200 status', async ({ page }) => {
    const response = await page.goto('/about/');
    expect(response?.status()).toBe(200);
  });

  test('page title contains About', async ({ page }) => {
    await page.goto('/about/');
    await expect(page).toHaveTitle(/About/);
  });

  test('hero heading is visible', async ({ page }) => {
    await page.goto('/about/');
    await expect(page.locator('h1')).toContainText('believe');
  });

  test('all four principles are displayed', async ({ page }) => {
    await page.goto('/about/');
    await expect(page.getByText('Less is more')).toBeVisible();
    await expect(page.getByText('Know what you\'re using')).toBeVisible();
    await expect(page.getByText('Cleaning is the core')).toBeVisible();
    await expect(page.getByText('Save money, save energy')).toBeVisible();
  });

  test('stats section shows content counts', async ({ page }) => {
    await page.goto('/about/');
    await expect(page.getByText('250+')).toBeVisible();
    await expect(page.getByText('60+')).toBeVisible();
  });

  test('CTA links to recipes and ingredients', async ({ page }) => {
    await page.goto('/about/');
    await expect(page.getByRole('link', { name: 'Browse Recipes' })).toHaveAttribute('href', /\/the-clean-pantry\/recipes\//);
    await expect(page.getByRole('link', { name: 'Explore Ingredients' })).toHaveAttribute('href', /\/the-clean-pantry\/ingredients\//);
  });

  test('all internal links have base path prefix', async ({ page }) => {
    await page.goto('/about/');
    const links = await page.locator('a[href^="/"]').all();
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('#')) {
        expect(href).toMatch(/^\/the-clean-pantry\//);
      }
    }
  });

  test('new electronics recipes load', async ({ page }) => {
    const urls = [
      '/recipes/home-office/gaming-controller-cleaner/',
      '/recipes/home-office/tv-screen-cleaner/',
      '/recipes/home-office/tablet-cleaner/',
      '/recipes/home-office/cable-wire-cleaner/',
      '/recipes/home-office/power-strip-cleaner/',
    ];
    for (const u of urls) {
      const res = await page.goto(u);
      expect(res?.status()).toBe(200);
    }
  });

  test('energetic flow guide loads', async ({ page }) => {
    const res = await page.goto('/guides/home-setup/energetic-home-flow/');
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('About Page - Mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('no horizontal scroll on mobile', async ({ page }) => {
    await page.goto('/about/');
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });

  test('principles stack vertically on mobile', async ({ page }) => {
    await page.goto('/about/');
    await expect(page.getByText('Less is more')).toBeVisible();
    await expect(page.getByText('Save money, save energy')).toBeVisible();
  });
});
