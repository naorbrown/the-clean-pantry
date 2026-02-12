import { test, expect } from '@playwright/test';

test.describe('Contact/Suggestion Form', () => {
  test('suggestion form is visible in footer', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer.getByText('Got a suggestion?')).toBeVisible();
  });

  test('suggestion form has required fields', async ({ page }) => {
    await page.goto('/');
    const form = page.locator('footer form');
    await expect(form).toBeVisible();
    // Suggestion input is required
    const suggestionInput = form.locator('input[name="suggestion"]');
    await expect(suggestionInput).toBeVisible();
    await expect(suggestionInput).toHaveAttribute('required', '');
    // Email input is optional (no required attr)
    const emailInput = form.locator('input[name="email"]');
    await expect(emailInput).toBeVisible();
    expect(await emailInput.getAttribute('required')).toBeNull();
  });

  test('suggestion form has submit button', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    const submitBtn = footer.getByRole('button', { name: /send suggestion/i });
    await expect(submitBtn).toBeVisible();
  });

  test('form action points to formspree', async ({ page }) => {
    await page.goto('/');
    const form = page.locator('footer form');
    const action = await form.getAttribute('action');
    expect(action).toContain('formspree.io');
  });

  test('email address is not exposed in page source', async ({ page }) => {
    await page.goto('/');
    const html = await page.content();
    // The actual email must never appear in source
    expect(html).not.toContain('naorbrown@gmail.com');
    // The form action should use an opaque Formspree ID, not the email
    expect(html).not.toContain('mailto:');
  });

  test('honeypot field is hidden', async ({ page }) => {
    await page.goto('/');
    const honeypot = page.locator('footer input[name="_gotcha"]');
    expect(await honeypot.count()).toBe(1);
    await expect(honeypot).toBeHidden();
  });

  test('form uses POST method', async ({ page }) => {
    await page.goto('/');
    const form = page.locator('footer form');
    const method = await form.getAttribute('method');
    expect(method?.toUpperCase()).toBe('POST');
  });

  test('suggestion form is visible on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer.getByText('Got a suggestion?')).toBeVisible();
    await expect(footer.locator('form')).toBeVisible();
  });
});
