import { test, expect, Page, Locator } from "@playwright/test";

const URL = "http://localhost:3000";
test.setTimeout(60_000);

async function scrollToSection(page: Page, selector: string, timeout = 10_000) {
  const locator = page.locator(selector);
  await locator.waitFor({ state: "attached", timeout });
  await locator.scrollIntoViewIfNeeded();
}

async function waitForHeading(
  page: Page,
  headingText: string | RegExp,
  timeout = 15_000
): Promise<Locator> {
  const byRole = page.getByRole("heading", { name: headingText });
  try {
    await expect(byRole.first()).toBeVisible({ timeout });
    return byRole.first();
  } catch {
    const fallback = page
      .locator("h1, h2, h3, h4, h5, h6")
      .filter({ hasText: headingText })
      .first();
    await expect(fallback).toBeVisible({ timeout });
    return fallback;
  }
}

test.describe("Text and Content", () => {
  test("Content: should validate text accuracy and proper localization in all sections", async ({
    page
  }: {
    page: Page;
  }) => {
    // Navigate to localized homepage directly to be more robust
    await page.goto(URL, { waitUntil: "domcontentloaded" });
    await page.waitForURL(/\/en|\/id/);

    // === Hero Section ===
    const heroHeading = page.getByRole("heading", {
      name: /engineer the software|membangun perangkat lunak/i
    });
    await expect(heroHeading.first()).toBeVisible({ timeout: 15_000 });

    // === Services Section ===
    await scrollToSection(page, "#services");
    await waitForHeading(page, /disciplines|disiplin/i);
    await expect(
      page
        .getByText(/From AI to cloud.native SaaS|Dari AI hingga SaaS/i)
        .first()
    ).toBeVisible();

    // === Case Studies Section ===
    await scrollToSection(page, "#case-studies");
    await waitForHeading(page, /Impact|Dampak/i);
    await expect(
      page.getByText(/ship code|mengirim kode/i).first()
    ).toBeVisible();

    // === Case Studies CTA ===
    await waitForHeading(page, /Ready to build|Atasi hambatan/i);

    // === Open Source Section ===
    await scrollToSection(page, "#open-source");
    await waitForHeading(page, /Open source|Produk sumber terbuka/i);

    // === FAQs Section ===
    await scrollToSection(page, "#faqs");
    await waitForHeading(page, /know|diajukan/i);

    // === Location Section ===
    await scrollToSection(page, "#location");
    await waitForHeading(page, /headquarters|pusat/i);

    await expect(page.getByText(/Sinar Mas MSIG Tower/i)).toBeVisible();
    await expect(page.getByText("solution@hyperjump.tech")).toBeVisible();
    await expect(page.getByText(/65-975-4901/)).toBeVisible();
  });
});
