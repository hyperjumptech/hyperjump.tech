import { test, expect } from "@playwright/test";

test.describe("Footer - Language Picker", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://hyperjump.tech/en");
  });

  test("should display language picker and switch between EN and ID correctly", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const footer = page.getByRole("contentinfo");
    await expect(footer).toBeVisible();

    const languageSelect = footer.locator('select');

    await expect(languageSelect).toHaveValue("en");

    await languageSelect.selectOption("id");
    await page.waitForURL(/\/id/);
    await expect(page.locator("html")).toHaveAttribute("lang", "id");

    await languageSelect.selectOption("en");
    await page.waitForURL(/\/en/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });
});
