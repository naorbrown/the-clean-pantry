import { test, expect } from '@playwright/test';

test.describe('Mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('mobile menu button is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#mobile-menu-open')).toBeVisible();
  });

  test('mobile menu opens and shows nav links', async ({ page }) => {
    await page.goto('/');
    await page.locator('#mobile-menu-open').click();
    const menu = page.locator('#mobile-menu');
    await expect(menu).toBeVisible();
    await expect(menu.getByRole('link', { name: 'Recipes' })).toBeVisible();
    await expect(menu.getByRole('link', { name: 'Guides' })).toBeVisible();
    await expect(menu.getByRole('link', { name: 'Ingredients' })).toBeVisible();
    await expect(menu.getByRole('link', { name: 'About' })).toBeVisible();
  });

  test('mobile menu shows categories', async ({ page }) => {
    await page.goto('/');
    await page.locator('#mobile-menu-open').click();
    const menu = page.locator('#mobile-menu');
    await expect(menu.getByText('Kitchen Cleaning')).toBeVisible();
  });

  test('mobile menu closes on close button', async ({ page }) => {
    await page.goto('/');
    await page.locator('#mobile-menu-open').click();
    await expect(page.locator('#mobile-menu')).toBeVisible();
    await page.locator('#mobile-menu-close').click();
    await expect(page.locator('#mobile-menu')).not.toBeVisible();
  });

  test('mobile nav links have correct base path', async ({ page }) => {
    await page.goto('/');
    await page.locator('#mobile-menu-open').click();
    const menu = page.locator('#mobile-menu');
    const recipesLink = menu.getByRole('link', { name: 'Recipes' });
    await expect(recipesLink).toHaveAttribute('href', /\/the-clean-pantry\/recipes\//);
  });

  test('mobile search button opens search', async ({ page }) => {
    await page.goto('/');
    await page.locator('#search-open-mobile').click();
    await expect(page.locator('#search-dialog')).toBeVisible();
  });
});
