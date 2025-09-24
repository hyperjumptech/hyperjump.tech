import { test, expect } from "@playwright/test";

const languages = ["en", "id"];

for (const lang of languages) {
  test(`Homepage (${lang}) should load sections`, async ({ page }) => {
    await page.goto(`/${lang}`);

    await expect(page.locator("#hero")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("#services")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("#case-studies")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("#open-source")).toBeVisible({ timeout: 10000 });
    await expect(page.locator("#faqs")).toBeVisible({ timeout: 10000 });
  });
}
