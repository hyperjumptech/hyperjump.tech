import { test, expect } from "@playwright/test";
import { serviceBySlug, ServiceSlug } from "@/app/[lang]/(hyperjump)/data";
import {
  aiFaqHeading,
  aiProductsTitle,
  caseStudyButton,
  servicesCaseStudies,
  servicesHowItWorks,
  servicesWhatWeDeliver,
  servicesWhatYouGet,
  servicesWhoIsItFor,
  servicesWhyHyperjump
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
  for (const [_, slug] of Object.entries(ServiceSlug)) {
    const path = `/${locale}/services/${slug}`;
    const service = serviceBySlug({ lang: locale, slug });
    if (!service) {
      throw new Error(`Service ${slug} not found`);
    }

    const {
      caseStudies,
      content: { products },
      shortDescription,
      title,
      faqs
    } = service;

    test.describe(`Services Detail Page - ${title}`, () => {
      test.describe(`${locale.toUpperCase()} locale`, () => {
        test.beforeEach(async ({ page }) => {
          await gotoAndWait(page, `${BASE_URL}${path}`);
        });

        test.describe("Header", headerTest(locale, path));
        test.describe("Language Switching", languageSwitcherTest(locale));
        test.describe("Images", imagesTest());
        test.describe("Footer", footerTest(locale));
        test.describe("Meta title and description should exist", metaTest());
        test.describe("Responsive Design", responsiveTest(path));
        test.describe("Content", async () => {
          test("Hero", async ({ page }) => {
            expect(page.locator("h1")).toHaveText(title);
            expect(page.getByText(shortDescription)).toBeVisible();
          });

          test("Overview", async ({ page }) => {
            expect(page.locator("h2").filter({ hasText: title })).toBeVisible();
            expect(page.getByTestId("request-demo-button")).toHaveCount(2);
          });

          test("Who is it for", async ({ page }) => {
            expect(
              page.getByRole("heading", { name: servicesWhoIsItFor(locale) })
            ).toBeVisible();
          });

          test("What we deliver", async ({ page }) => {
            expect(
              page.getByRole("heading", {
                name: servicesWhatWeDeliver(locale)
              })
            ).toBeVisible();

            // How it works
            expect(
              page.getByRole("heading", { name: servicesHowItWorks(locale) })
            ).toBeVisible();

            // What you get
            expect(
              page.getByRole("heading", { name: servicesWhatYouGet(locale) })
            ).toBeVisible();

            // Why Hyperjump
            expect(
              page.getByRole("heading", {
                name: servicesWhyHyperjump(locale)
              })
            ).toBeVisible();

            // Case studies
            if (caseStudies.length > 0) {
              expect(
                page.getByRole("heading", { name: servicesCaseStudies(locale) })
              ).toBeVisible();
              await Promise.all(
                caseStudies.map(async ({ title, slug, description }, index) => {
                  expect(page.getByText(title)).toBeVisible();
                  expect(page.getByText(description)).toBeVisible();
                  page
                    .getByRole("link", { name: caseStudyButton(locale) })
                    .nth(index)
                    .click();
                  await page.waitForURL(
                    new RegExp(`/${locale}/case-studies/${slug}`)
                  );
                  page.goBack();
                })
              );
            }

            // Products
            if (products.length > 0) {
              expect(
                page.getByRole("heading", { name: aiProductsTitle(locale) })
              ).toBeVisible();
              for (const { title, description } of products) {
                expect(page.getByText(title)).toBeVisible();
                expect(page.getByText(description)).toBeVisible();
              }
            }

            // FAQ
            if (faqs.length > 0) {
              expect(
                page.getByRole("heading", { name: aiFaqHeading(locale) })
              ).toBeVisible();
              for (const { question, answer } of faqs) {
                expect(page.getByText(question)).toBeVisible();
                await page.getByText(question).click();
                expect(page.getByText(answer)).toBeVisible();
              }
            }
          });
        });
      });
    });
  }
}
