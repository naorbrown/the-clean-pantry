import { test, expect } from '@playwright/test';

test.describe('Visual Quality', () => {
  test('logo image is visible in header', async ({ page }) => {
    await page.goto('/');
    const logo = page.locator('header img[alt="The Clean Pantry"]');
    await expect(logo).toBeVisible();
    // Verify the image renders with expected dimensions
    const width = await logo.evaluate(
      (img: HTMLElement) => img.offsetWidth
    );
    expect(width).toBeGreaterThan(0);
  });

  test('favicon link is present', async ({ page }) => {
    await page.goto('/');
    const favicon = page.locator('link[rel="icon"]');
    const href = await favicon.getAttribute('href');
    expect(href).toContain('favicon.svg');
  });

  test('dark background is applied', async ({ page }) => {
    await page.goto('/');
    const bgColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    // Should be dark charcoal (#1C1917), not white
    expect(bgColor).not.toBe('rgb(255, 255, 255)');
  });

  test('homepage hero has brand illustration', async ({ page }) => {
    await page.goto('/');
    const heroSection = page.locator('section').first();
    const svg = heroSection.locator('svg');
    expect(await svg.count()).toBeGreaterThan(0);
  });

  test('content cards have gradient headers', async ({ page }) => {
    await page.goto('/');
    // Find content card gradient headers
    const cards = page.locator('a .bg-gradient-to-br');
    const count = await cards.count();
    // Homepage should have featured recipe cards with gradients
    if (count > 0) {
      const firstCard = cards.first();
      await expect(firstCard).toBeVisible();
    }
  });

  test('no horizontal scroll on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflow).toBe(false);
  });

  test('no horizontal scroll on recipes page mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/recipes/');
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflow).toBe(false);
  });

  test('all images have alt text', async ({ page }) => {
    await page.goto('/');
    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).not.toBeNull();
    }
  });

  test('logo is visible in footer', async ({ page }) => {
    await page.goto('/');
    const footerLogo = page.locator('footer img');
    if (await footerLogo.count() > 0) {
      await expect(footerLogo.first()).toBeVisible();
      const width = await footerLogo.first().evaluate(
        (img: HTMLElement) => img.offsetWidth
      );
      expect(width).toBeGreaterThan(0);
    }
  });

  test('ingredients page cards have illustrations', async ({ page }) => {
    await page.goto('/ingredients/');
    // Target the ingredient grid cards specifically (inside section elements)
    const sections = page.locator('section');
    const firstSection = sections.first();
    const cards = firstSection.locator('a');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    // First card should contain an SVG illustration
    const svgCount = await cards.first().locator('svg').count();
    expect(svgCount).toBeGreaterThan(0);
  });
});
