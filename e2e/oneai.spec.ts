import { test, expect } from "@playwright/test";

import { getOneaiPdfPath } from "@/app/[lang]/(hyperjump)/oneai/get-oneai-pdf-download";
import {
  oneaiComparisonHeadingPartsControl,
  oneaiPdfDownloadCta,
  oneaiHeroHeading,
  oneaiMailtoSubject,
  oneaiMetaDescription,
  oneaiMetaTitle,
  oneaiPricingPrice
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
  const path = `/${locale}/oneai`;

  test.describe(`OneAI Page - ${locale.toUpperCase()}`, () => {
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
      await expect(page.locator("h1")).toHaveText(oneaiHeroHeading(locale));
    });

    test("meta description matches locale copy", async ({ page }) => {
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");

      expect(description).toBe(oneaiMetaDescription(locale));
    });

    test("page title includes localized OneAI meta title", async ({ page }) => {
      const title = await page.title();
      expect(title).toContain(oneaiMetaTitle(locale));
    });

    test("open graph image points to OneAI asset", async ({ page }) => {
      const ogImage = await page
        .locator('meta[property="og:image"]')
        .getAttribute("content");

      expect(ogImage).toContain("/images/oneai/og.png");
    });

    test("shows pricing amount", async ({ page }) => {
      await expect(page.getByTestId("oneai-price")).toHaveText(
        new RegExp(oneaiPricingPrice(locale).replace(/\./g, "\\."))
      );
    });

    test("mailto CTA includes prefilled subject", async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      const href = await page
        .getByTestId("oneai-pricing-cta")
        .getAttribute("href");

      expect(href).toContain("mailto:solution@hyperjump.tech");
      expect(href).toContain(encodeURIComponent(oneaiMailtoSubject(locale)));
    });

    test("comparison section and table are visible", async ({ page }) => {
      await expect(page.getByTestId("oneai-comparison-section")).toBeVisible();
      await expect(page.getByTestId("oneai-comparison-table")).toBeVisible();
      await expect(page.getByTestId("oneai-comparison-heading")).toBeVisible();
      await expect(page.getByTestId("oneai-comparison-heading")).toContainText(
        oneaiComparisonHeadingPartsControl(locale)
      );
    });

    test("pdf download link is available", async ({ page }) => {
      const downloadLink = page.getByTestId("oneai-pdf-download").locator("a");

      await expect(page.getByTestId("oneai-pdf-download")).toBeVisible();
      await expect(downloadLink).toHaveAttribute(
        "href",
        getOneaiPdfPath(locale)
      );
      await expect(downloadLink).toHaveText(oneaiPdfDownloadCta(locale));
    });

    test("faq section is visible", async ({ page }) => {
      await expect(page.getByTestId("oneai-faq-section")).toBeVisible();
      await expect(page.getByTestId("oneai-faq-accordion")).toBeVisible();
    });

    test("sticky mobile cta is visible on small viewport", async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await expect(page.getByTestId("oneai-sticky-cta")).toBeVisible();
    });
  });
}
