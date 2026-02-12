import { test, expect } from '@playwright/test';

test.describe('Search', () => {
  test('search button is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#search-open')).toBeVisible();
  });

  test('search dialog opens on button click', async ({ page }) => {
    await page.goto('/');
    await page.locator('#search-open').click();
    await expect(page.locator('#search-dialog')).toBeVisible();
  });

  test('search dialog opens with Cmd+K', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Meta+k');
    await expect(page.locator('#search-dialog')).toBeVisible();
  });

  test('search dialog closes on close button', async ({ page }) => {
    await page.goto('/');
    await page.locator('#search-open').click();
    await expect(page.locator('#search-dialog')).toBeVisible();
    await page.locator('#search-close').click();
    await expect(page.locator('#search-dialog')).not.toBeVisible();
  });

  test('search dialog has no blur backdrop', async ({ page }) => {
    await page.goto('/');
    await page.locator('#search-open').click();
    // Verify the backdrop does NOT use blur
    const backdropFilter = await page.locator('#search-dialog').evaluate((el) => {
      return window.getComputedStyle(el, '::backdrop').backdropFilter;
    });
    expect(backdropFilter).not.toContain('blur');
  });
});
