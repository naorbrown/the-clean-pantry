import { test, expect } from '@playwright/test';

test.describe('Car Care – Guides', () => {
  test('car care category page loads and shows all guides', async ({ page }) => {
    await page.goto('/categories/car-care/');
    await expect(page.getByRole('heading', { name: 'Car Care' })).toBeVisible();
    // Should have guide cards linking to car-care guides
    const guideCards = page.locator('a[href*="/guides/car-care/"]');
    expect(await guideCards.count()).toBe(5);
  });

  test('new car first detail guide loads with correct heading', async ({ page }) => {
    const response = await page.goto('/guides/car-care/new-car-first-detail/');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('New Car First Detail');
  });

  test('new car paint protection guide loads', async ({ page }) => {
    const response = await page.goto('/guides/car-care/new-car-paint-protection/');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('Natural Paint Protection');
  });

  test('old car revival guide loads', async ({ page }) => {
    const response = await page.goto('/guides/car-care/old-car-revival/');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('Old Car Revival');
  });

  test('old car rust prevention guide loads', async ({ page }) => {
    const response = await page.goto('/guides/car-care/old-car-rust-prevention/');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('Rust Prevention');
  });

  test('off-gassing guide still loads', async ({ page }) => {
    const response = await page.goto('/guides/car-care/off-gassing/');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('Off-Gassing');
  });

  test('new car first detail guide has expected sections', async ({ page }) => {
    await page.goto('/guides/car-care/new-car-first-detail/');
    await expect(page.locator('h2', { hasText: 'Why the First Detail Matters' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Inspect the Paint' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'The First Wash' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Apply Protection' })).toBeVisible();
  });

  test('old car revival guide has expected sections', async ({ page }) => {
    await page.goto('/guides/car-care/old-car-revival/');
    await expect(page.locator('h2', { hasText: 'Assess the Damage' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Deep Clean Fabric Surfaces' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Condition Leather' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Eliminate Odors' })).toBeVisible();
  });
});

test.describe('Car Care – Recipes', () => {
  test('car care category page shows all 20 recipes', async ({ page }) => {
    await page.goto('/categories/car-care/');
    const recipeCards = page.locator('a[href*="/recipes/car-care/"]');
    expect(await recipeCards.count()).toBe(20);
  });

  test('all new car recipes load with 200 status', async ({ page }) => {
    const newCarRecipes = [
      '/recipes/car-care/natural-paint-sealant/',
      '/recipes/car-care/new-car-fabric-protector/',
      '/recipes/car-care/streak-free-glass-cleaner/',
      '/recipes/car-care/new-car-leather-protector/',
      '/recipes/car-care/cabin-freshening-mist/',
      '/recipes/car-care/floor-mat-cleaner/',
    ];
    for (const url of newCarRecipes) {
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toBeVisible();
    }
  });

  test('all old car recipes load with 200 status', async ({ page }) => {
    const oldCarRecipes = [
      '/recipes/car-care/leather-seat-conditioner/',
      '/recipes/car-care/vinyl-restorer/',
      '/recipes/car-care/rust-spot-remover/',
      '/recipes/car-care/oxidized-paint-polish/',
    ];
    for (const url of oldCarRecipes) {
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toBeVisible();
    }
  });

  test('natural paint sealant recipe has standard headings', async ({ page }) => {
    await page.goto('/recipes/car-care/natural-paint-sealant/');
    await expect(page.locator('h2', { hasText: 'Steps' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Why It Works' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Tips' })).toBeVisible();
  });

  test('leather seat conditioner recipe has standard headings', async ({ page }) => {
    await page.goto('/recipes/car-care/leather-seat-conditioner/');
    await expect(page.locator('h2', { hasText: 'Steps' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Why It Works' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Tips' })).toBeVisible();
  });

  test('rust spot remover recipe has standard headings', async ({ page }) => {
    await page.goto('/recipes/car-care/rust-spot-remover/');
    await expect(page.locator('h2', { hasText: 'Steps' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Why It Works' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Tips' })).toBeVisible();
  });

  test('oxidized paint polish recipe has standard headings', async ({ page }) => {
    await page.goto('/recipes/car-care/oxidized-paint-polish/');
    await expect(page.locator('h2', { hasText: 'Steps' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Why It Works' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Tips' })).toBeVisible();
  });

  test('vinyl restorer recipe has standard headings', async ({ page }) => {
    await page.goto('/recipes/car-care/vinyl-restorer/');
    await expect(page.locator('h2', { hasText: 'Steps' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Why It Works' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Tips' })).toBeVisible();
  });

  test('new car fabric protector recipe has standard headings', async ({ page }) => {
    await page.goto('/recipes/car-care/new-car-fabric-protector/');
    await expect(page.locator('h2', { hasText: 'Steps' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Why It Works' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Tips' })).toBeVisible();
  });

  test('existing car care recipes still load', async ({ page }) => {
    const existingRecipes = [
      '/recipes/car-care/car-wash-soap/',
      '/recipes/car-care/interior-cleaner/',
      '/recipes/car-care/headlight-restorer/',
      '/recipes/car-care/seat-stain-remover/',
      '/recipes/car-care/tire-cleaner/',
      '/recipes/car-care/windshield-washer-fluid/',
      '/recipes/car-care/car-air-freshener/',
      '/recipes/car-care/dashboard-cleaner/',
      '/recipes/car-care/upholstery-cleaner/',
      '/recipes/car-care/trunk-deodorizer/',
    ];
    for (const url of existingRecipes) {
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
    }
  });
});

test.describe('Car Care – Content Integrity', () => {
  test('new car guide references off-gassing', async ({ page }) => {
    await page.goto('/guides/car-care/new-car-first-detail/');
    const body = await page.textContent('body');
    expect(body).toContain('off-gassing');
  });

  test('old car revival guide covers leather and vinyl', async ({ page }) => {
    await page.goto('/guides/car-care/old-car-revival/');
    const body = await page.textContent('body');
    expect(body).toContain('leather');
    expect(body).toContain('vinyl');
  });

  test('rust prevention guide covers vinegar treatment', async ({ page }) => {
    await page.goto('/guides/car-care/old-car-rust-prevention/');
    const body = await page.textContent('body');
    expect(body).toContain('vinegar');
    expect(body).toContain('baking soda');
  });

  test('paint protection guide covers carnauba and beeswax', async ({ page }) => {
    await page.goto('/guides/car-care/new-car-paint-protection/');
    const body = await page.textContent('body');
    expect(body).toContain('Carnauba');
    expect(body).toContain('Beeswax');
  });

  test('no recipe uses ## How to Make It heading', async ({ page }) => {
    const recipes = [
      '/recipes/car-care/natural-paint-sealant/',
      '/recipes/car-care/leather-seat-conditioner/',
      '/recipes/car-care/vinyl-restorer/',
      '/recipes/car-care/rust-spot-remover/',
      '/recipes/car-care/oxidized-paint-polish/',
      '/recipes/car-care/new-car-fabric-protector/',
      '/recipes/car-care/streak-free-glass-cleaner/',
      '/recipes/car-care/new-car-leather-protector/',
      '/recipes/car-care/cabin-freshening-mist/',
      '/recipes/car-care/floor-mat-cleaner/',
    ];
    for (const url of recipes) {
      await page.goto(url);
      const body = await page.textContent('body');
      expect(body).not.toContain('How to Make It');
    }
  });

  test('streak-free glass cleaner has standard headings', async ({ page }) => {
    await page.goto('/recipes/car-care/streak-free-glass-cleaner/');
    await expect(page.locator('h2', { hasText: 'Steps' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Why It Works' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Tips' })).toBeVisible();
  });

  test('cabin freshening mist has standard headings', async ({ page }) => {
    await page.goto('/recipes/car-care/cabin-freshening-mist/');
    await expect(page.locator('h2', { hasText: 'Steps' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Why It Works' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Tips' })).toBeVisible();
  });

  test('floor mat cleaner has standard headings', async ({ page }) => {
    await page.goto('/recipes/car-care/floor-mat-cleaner/');
    await expect(page.locator('h2', { hasText: 'Steps' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Why It Works' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Tips' })).toBeVisible();
  });

  test('new car leather protector has standard headings', async ({ page }) => {
    await page.goto('/recipes/car-care/new-car-leather-protector/');
    await expect(page.locator('h2', { hasText: 'Steps' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Why It Works' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Tips' })).toBeVisible();
  });
});
