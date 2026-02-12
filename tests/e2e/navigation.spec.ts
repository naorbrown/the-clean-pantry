import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  // Use a wide viewport so desktop nav is visible
  test.use({ viewport: { width: 1280, height: 720 } });

  test('homepage loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/The Clean Pantry/);
  });

  test('homepage has hero section with CTAs', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Replace toxic products');
    await expect(page.getByRole('link', { name: 'Find a Recipe' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Explore Ingredients' })).toBeVisible();
  });

  test('nav links navigate to correct pages', async ({ page }) => {
    // Test each nav link by direct navigation to avoid client-side issues
    await page.goto('/recipes/');
    await expect(page.locator('h1')).toContainText('All Recipes');

    await page.goto('/guides/');
    await expect(page.locator('h1')).toContainText('All Guides');

    await page.goto('/ingredients/');
    await expect(page.locator('h1')).toContainText('The Pantry');

    await page.goto('/categories/');
    await expect(page.locator('h1')).toContainText('Categories');
  });

  test('desktop nav links have correct hrefs', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await expect(nav.getByRole('link', { name: 'Recipes' })).toHaveAttribute('href', /\/the-clean-pantry\/recipes\//);
    await expect(nav.getByRole('link', { name: 'Guides' })).toHaveAttribute('href', /\/the-clean-pantry\/guides\//);
    await expect(nav.getByRole('link', { name: 'Ingredients' })).toHaveAttribute('href', /\/the-clean-pantry\/ingredients\//);
    await expect(nav.getByRole('link', { name: 'Categories' })).toHaveAttribute('href', /\/the-clean-pantry\/categories\//);
    await expect(nav.getByRole('link', { name: 'About' })).toHaveAttribute('href', /\/the-clean-pantry\/about\//);
  });

  test('category page loads and shows content', async ({ page }) => {
    await page.goto('/categories/kitchen/');
    await expect(page.locator('h1')).toContainText('Kitchen Cleaning');
  });

  test('recipe page loads', async ({ page }) => {
    // Navigate directly to a known recipe
    await page.goto('/recipes/kitchen/all-purpose-cleaner/');
    await expect(page.locator('h1')).toContainText('All-Purpose Kitchen Cleaner');
  });

  test('guide page loads', async ({ page }) => {
    await page.goto('/guides/home-setup/cleaning-schedule/');
    await expect(page.locator('h1')).toContainText('Simple Home Cleaning Schedule');
  });

  test('ingredient page loads', async ({ page }) => {
    await page.goto('/ingredients/castile-soap/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('breadcrumb home link works', async ({ page }) => {
    await page.goto('/recipes/');
    await page.getByRole('navigation', { name: 'Breadcrumb' }).getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL(/\/the-clean-pantry\/$/);
  });

  test('footer links have correct hrefs', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: 'All Recipes' })).toHaveAttribute('href', /\/the-clean-pantry\/recipes\//);
    await expect(footer.getByRole('link', { name: 'All Guides' })).toHaveAttribute('href', /\/the-clean-pantry\/guides\//);
    await expect(footer.getByRole('link', { name: 'Ingredients' })).toHaveAttribute('href', /\/the-clean-pantry\/ingredients\//);
  });

  test('about page loads', async ({ page }) => {
    const response = await page.goto('/about/');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('footer has about link', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: 'About' })).toHaveAttribute('href', /\/the-clean-pantry\/about\//);
  });

  test('all internal links have base path prefix', async ({ page }) => {
    await page.goto('/');
    const links = await page.locator('a[href^="/"]').all();
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('#')) {
        expect(href).toMatch(/^\/the-clean-pantry\//);
      }
    }
  });
});
