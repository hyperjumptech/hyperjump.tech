import { test, expect } from "@playwright/test";

import {
  aiWorkshopHeroHeading,
  aiWorkshopMailtoSubject,
  aiWorkshopMetaDescription,
  aiWorkshopMetaTitle
} from "@/locales/.generated/strings";
import { supportedLanguages } from "@/locales/.generated/types";

import {
  BASE_URL,
  footerTest,
  gotoAndWait,
  headerTest,
  imagesTest,
  languageSwitcherTest,
  metaTest,
  responsiveTest
} from "./shared-test";

for (const locale of supportedLanguages) {
  const path = `/${locale}/ai-workshop`;

  test.describe(`AI Workshop Page - ${locale.toUpperCase()}`, () => {
    test.beforeEach(async ({ page }) => {
      await gotoAndWait(page, `${BASE_URL}${path}`);
    });

    test.describe("Header", headerTest(locale, path));
    test.describe("Language Switching", languageSwitcherTest(locale));
    test.describe("Images", imagesTest());
    test.describe("Footer", footerTest(locale));
    test.describe("Meta title and description should exist", metaTest());
    test.describe("Responsive Design", responsiveTest(path));

    test("renders hero heading", async ({ page }) => {
      await expect(page.locator("h1")).toHaveText(
        aiWorkshopHeroHeading(locale)
      );
    });

    test("meta description matches locale copy", async ({ page }) => {
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");

      expect(description).toBe(aiWorkshopMetaDescription(locale));
    });

    test("page title includes localized workshop meta title", async ({
      page
    }) => {
      const title = await page.title();
      expect(title).toContain(aiWorkshopMetaTitle(locale));
    });

    test("open graph and twitter images use the locale workshop card", async ({
      page
    }) => {
      const expectedPath =
        locale === "id"
          ? "/images/ai-workshop/og-id.png"
          : "/images/ai-workshop/og-en.png";
      const ogImage = await page
        .locator('meta[property="og:image"]')
        .getAttribute("content");
      const twitterImage = await page
        .locator('meta[name="twitter:image"]')
        .getAttribute("content");
      const ogWidth = await page
        .locator('meta[property="og:image:width"]')
        .getAttribute("content");
      const ogHeight = await page
        .locator('meta[property="og:image:height"]')
        .getAttribute("content");
      const ogAlt = await page
        .locator('meta[property="og:image:alt"]')
        .getAttribute("content");
      const twitterCard = await page
        .locator('meta[name="twitter:card"]')
        .getAttribute("content");

      expect(ogImage).toContain(expectedPath);
      expect(twitterImage).toContain(expectedPath);
      expect(ogWidth).toBe("1200");
      expect(ogHeight).toBe("630");
      expect(ogAlt).toBeTruthy();
      expect(twitterCard).toBe("summary_large_image");
    });

    test("mailto CTA includes prefilled subject", async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      const href = await page
        .getByTestId("ai-workshop-hero-cta")
        .getAttribute("href");

      expect(href).toContain("mailto:solution@hyperjump.tech");
      expect(href).toContain(
        encodeURIComponent(aiWorkshopMailtoSubject(locale))
      );
    });

    test("does not show a price section", async ({ page }) => {
      await expect(page.getByTestId("oneai-pricing")).toHaveCount(0);
      await expect(page.locator("#pricing")).toHaveCount(0);
    });

    test("sessions, feedback, faq, and close CTA are visible", async ({
      page
    }) => {
      await expect(page.getByTestId("ai-workshop-sessions")).toBeVisible();
      await expect(page.getByTestId("ai-workshop-feedback")).toBeVisible();
      await expect(
        page.getByTestId("ai-workshop-feedback-quote")
      ).toBeVisible();
      await expect(
        page.getByTestId("ai-workshop-feedback-stars")
      ).toBeVisible();
      await expect(page.getByTestId("ai-workshop-faq-section")).toBeVisible();
      await expect(page.getByTestId("ai-workshop-faq-accordion")).toBeVisible();
      await expect(page.getByTestId("ai-workshop-close-cta")).toBeVisible();
    });

    test("sticky mobile cta is visible on small viewport", async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await expect(page.getByTestId("ai-workshop-sticky-cta")).toBeVisible();
    });
  });
}

test.describe("AI Workshop teaser on services", () => {
  test("services page links to the workshop", async ({ page }) => {
    await gotoAndWait(page, `${BASE_URL}/en/services`);
    await expect(page.getByTestId("ai-workshop-teaser")).toBeVisible();
    await page.getByTestId("ai-workshop-teaser-cta").click();
    await expect(page).toHaveURL(/\/en\/ai-workshop$/);
  });
});
