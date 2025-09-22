import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads and shows key content', async ({ page }) => {
    await page.goto('/');

    // Check page responded OK by checking title contains known strings
    await expect(page).toHaveTitle(/(Hyperjump|Your partner in building reliable, modern software)/i);

    // Expect some hero text or brand text to be visible
    await expect(page.getByText(/Hyperjump/i)).toBeVisible();
  });
});
