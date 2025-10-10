import { test, expect, Page } from "@playwright/test";

test.describe("Navigation & Links", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  const navLinks: { name: string; expected: RegExp }[] = [
    { name: "Our Services", expected: /\/(en|id)\/services(\/|$)/ },
    { name: "Case Studies", expected: /\/(en|id)\/case-studies(\/|$)/ },
    { name: "Open Source", expected: /#open-source/ },
    { name: "FAQ", expected: /#faqs/ }
  ];

  for (const { name, expected } of navLinks) {
    test(`Navbar: should navigate correctly when clicking "${name}"`, async ({
      page
    }) => {
      const nav = page.getByRole("navigation");
      const link = nav.getByRole("link", { name, exact: false });
      await expect(link).toBeVisible();

      await link.first().click();
      await page.waitForTimeout(3000);

      await expect(page).toHaveURL(expected);
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
