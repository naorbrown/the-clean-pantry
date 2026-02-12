import { test, expect } from '@playwright/test';

test.describe('Typography - Sans-serif only', () => {
  test('only Inter font is loaded, no Literata', async ({ page }) => {
    const fontResponses: string[] = [];
    page.on('response', (response) => {
      if (response.url().includes('.woff2')) {
        fontResponses.push(response.url());
      }
    });
    await page.goto('/');
    // At least one font file should be loaded (Inter)
    expect(fontResponses.length).toBeGreaterThan(0);
    // All loaded fonts should be Inter, none should be Literata
    for (const url of fontResponses) {
      expect(url).toContain('inter');
      expect(url).not.toContain('literata');
    }
  });

  test('headings do not use serif font classes', async ({ page }) => {
    await page.goto('/');
    const h1Classes = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return h1 ? h1.className : '';
    });
    expect(h1Classes).not.toContain('font-serif');
  });

  test('no Literata references in page source', async ({ page }) => {
    await page.goto('/');
    const html = await page.content();
    expect(html).not.toContain('Literata');
  });

  test('no font-serif classes in rendered HTML', async ({ page }) => {
    await page.goto('/');
    const serifElements = await page.locator('.font-serif').count();
    expect(serifElements).toBe(0);
  });

  test('Literata font file is not loaded', async ({ page }) => {
    const fontRequests: string[] = [];
    page.on('response', (response) => {
      if (response.url().includes('literata')) {
        fontRequests.push(response.url());
      }
    });
    await page.goto('/');
    expect(fontRequests).toHaveLength(0);
  });

  test('headings have appropriate weight', async ({ page }) => {
    await page.goto('/');
    const h1Weight = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return h1 ? window.getComputedStyle(h1).fontWeight : '';
    });
    // h1 should be bold (700) or less
    expect(Number(h1Weight)).toBeLessThanOrEqual(700);
  });

  test('Inter font file is preloaded', async ({ page }) => {
    await page.goto('/');
    const preloadLink = page.locator('link[rel="preload"][as="font"]');
    const count = await preloadLink.count();
    expect(count).toBe(1);
    const href = await preloadLink.getAttribute('href');
    expect(href).toContain('inter');
    // Verify no Literata preload exists
    const allPreloads = await page.locator('link[rel="preload"][as="font"]').all();
    for (const link of allPreloads) {
      const h = await link.getAttribute('href');
      expect(h).not.toContain('literata');
    }
  });

  test('recipe page has no serif references', async ({ page }) => {
    await page.goto('/recipes/kitchen/all-purpose-cleaner/');
    const html = await page.content();
    expect(html).not.toContain('Literata');
    const serifElements = await page.locator('.font-serif').count();
    expect(serifElements).toBe(0);
  });
});
