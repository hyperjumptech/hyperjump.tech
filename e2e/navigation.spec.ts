import { test, expect, Page } from "@playwright/test";

const BASE_URL = "https://hyperjump.tech/en";

test.describe("Navigation & Links", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  const navLinks: { name: string; expected: string }[] = [
    { name: "Our Services", expected: "/en/services" },
    { name: "Case Studies", expected: "/en/case-studies" },
    { name: "Open Source", expected: "/en#open-source" },
    { name: "FAQ", expected: "/en#faqs" }
  ];

  for (const { name, expected } of navLinks) {
    test(`Navbar: should navigate correctly when clicking "${name}"`, async ({
      page
    }) => {
      const link = page.getByRole("link", { name, exact: false });
      await expect(link).toBeVisible();

      await link.first().click();
      await page.waitForTimeout(3000);

      await expect(page).toHaveURL(new RegExp(expected));
    });
  }

  const footerLinks: { name: string; expected: string }[] = [
    { name: "LinkedIn", expected: "linkedin" },
    { name: "GitHub", expected: "github" },
    { name: "Medium", expected: "medium" },
    { name: "Substack", expected: "substack" }
  ];

  for (const { name, expected } of footerLinks) {
    test(`Footer: should open "${name}" link correctly`, async ({ page }) => {
      const link = page.getByRole("link", { name, exact: false });
      await expect(link).toBeVisible();

      const popupPromise = page.waitForEvent("popup").catch(() => null);
      await link.click();

      const popup = await popupPromise;
      const target: Page = popup || page;

      await page.waitForTimeout(3000);

      await expect(target).toHaveURL(new RegExp(expected));
    });
  }
});
