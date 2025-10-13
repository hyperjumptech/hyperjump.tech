import { test, expect } from "@playwright/test";

test.describe("Footer - Language Picker", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should switch from EN to ID with smooth scroll and visible cursor", async ({
    page
  }) => {
    await page.mouse.move(300, 200);

    await page.evaluate(async () => {
      window.scrollTo(0, 0);
    });

    const totalHeight = await page.evaluate(() => document.body.scrollHeight);

    for (let y = 0; y < totalHeight; y += 50) {
      await page.mouse.wheel(0, 50);
      await page.mouse.move(400, 200 + y * 0.02);
      await page.waitForTimeout(40);
    }

    await page.waitForTimeout(800);

    const footer = page.getByRole("contentinfo");
    await expect(footer).toBeVisible();

    const languageSelect = footer.getByRole("combobox");
    await expect(languageSelect).toBeVisible();

    const box = await languageSelect.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.waitForTimeout(200);
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    }

    await expect(languageSelect).toHaveValue("en");

    await languageSelect.selectOption("id");

    await page.waitForURL(/\/id(?:\/)?$/);
    await page.waitForTimeout(500);

    const langAttr = await page.locator("html").getAttribute("lang");
    console.log("Detected lang:", langAttr);

    const scrollBackHeight = await page.evaluate(
      () => document.body.scrollHeight
    );
    for (let y = scrollBackHeight; y > 0; y -= 50) {
      await page.mouse.wheel(0, -50);
      await page.mouse.move(400, 600 - y * 0.02);
      await page.waitForTimeout(40);
    }

    const hero = page
      .locator("#hero, [data-testid='hero'], header, main section")
      .first();
    await expect(hero).toBeVisible();
  });
});
