import { test, expect } from '@playwright/test';

test.describe('Ingredient pages', () => {
  test('ingredient listing has three tiers', async ({ page }) => {
    await page.goto('/ingredients/');
    await expect(page.getByRole('heading', { name: 'Core' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Secondary' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Specialty' })).toBeVisible();
  });

  test('ingredient listing shows correct item counts per tier', async ({ page }) => {
    await page.goto('/ingredients/');
    // Core tier: 3 items (white vinegar, baking soda, castile soap)
    const sections = page.locator('section');
    const coreSection = sections.first();
    const coreLinks = coreSection.locator('a[href*="/ingredients/"]');
    expect(await coreLinks.count()).toBe(3);
  });

  test('ingredient detail page has property cards', async ({ page }) => {
    await page.goto('/ingredients/white-vinegar/');
    await expect(page.getByRole('heading', { name: 'Why it works' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Safety notes' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Storage', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Shelf life' })).toBeVisible();
  });

  test('ingredient detail page has structured body sections', async ({ page }) => {
    await page.goto('/ingredients/white-vinegar/');
    await expect(page.locator('h2', { hasText: 'What It Does' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'How to Use It' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Buying & Storage' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Enhance It' })).toBeVisible();
  });

  test('ingredient detail page shows related recipes', async ({ page }) => {
    await page.goto('/ingredients/white-vinegar/');
    await expect(page.getByText('Recipes using White Vinegar')).toBeVisible();
    // Should have at least some recipe cards
    const recipeCards = page.locator('a[href*="/recipes/"]');
    expect(await recipeCards.count()).toBeGreaterThan(0);
  });

  test('all 6 ingredient pages load successfully', async ({ page }) => {
    const slugs = [
      'white-vinegar',
      'baking-soda',
      'castile-soap',
      'washing-soda',
      'hydrogen-peroxide',
      'borax',
    ];
    for (const slug of slugs) {
      const response = await page.goto(`/ingredients/${slug}/`);
      expect(response?.status()).toBe(200);
      // Each page should have the ingredient name as an h1
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
    }
  });

  test('borax page shows safety notes in property card', async ({ page }) => {
    await page.goto('/ingredients/borax/');
    await expect(page.getByRole('heading', { name: 'Safety notes' })).toBeVisible();
    // Safety notes are rendered as a bulleted list in the property card
    await expect(page.getByText('Toxic if ingested — keep away from children and pets')).toBeVisible();
  });

  test('ingredient body sections appear in correct order', async ({ page }) => {
    await page.goto('/ingredients/baking-soda/');
    const headings = page.locator('.prose h2');
    const texts = await headings.allTextContents();
    const whatIdx = texts.indexOf('What It Does');
    const howIdx = texts.indexOf('How to Use It');
    const buyIdx = texts.findIndex((t) => t.includes('Buying'));
    expect(whatIdx).toBeLessThan(howIdx);
    expect(howIdx).toBeLessThan(buyIdx);
  });
});
