import { expect, test } from "@playwright/test";
import { data } from "@/app/[lang]/(hyperjump)/jobs/data";
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
  const path = `/${locale}/jobs`;

  test.describe("Job page", () => {
    test.describe(`${locale.toUpperCase()} locale`, () => {
      test.beforeEach(async ({ page }) => {
        await gotoAndWait(page, `${BASE_URL}${path}`);
      });
      test.describe("Header", headerTest(locale, path));
      test.describe("Language Switching", languageSwitcherTest(locale, path));
      test.describe("Images", imagesTest());
      test.describe("Footer", footerTest(locale));
      test.describe("Meta title and description should exist", metaTest());
      test.describe("Responsive Design", responsiveTest(path));
      test.describe("Job links", () => {
        for (const {
          category,
          deliverables,
          description,
          id,
          requirements,
          responsibilities,
          title
        } of data.jobs) {
          test(`Job ${title} (${category}) should be visible and link to detail page`, async ({
            page
          }) => {
            await expect(
              page
                .getByTestId(`job-card-${id}`)
                .getByText(category, { exact: true })
            ).toBeVisible();
            await expect(
              page
                .getByTestId(`job-card-${id}`)
                .getByText(description, { exact: true })
            ).toBeVisible();
            await page
              .getByTestId(`job-card-${id}`)
              .getByRole("link", { name: title })
              .click();
            await page.waitForURL(new RegExp(`${path}/${id}`));

            await expect(
              page
                .getByTestId("job-detail")
                .getByText(category, { exact: true })
            ).toBeVisible();
            await expect(
              page.getByRole("heading", { name: title })
            ).toBeVisible();
            await expect(
              page
                .getByTestId("job-detail")
                .getByText(description, { exact: true })
            ).toBeVisible();
            for (const responsibility of responsibilities) {
              await expect(
                page
                  .getByTestId("job-detail")
                  .getByText(responsibility, { exact: true })
              ).toBeVisible();
            }
            for (const requirement of requirements) {
              await expect(
                page
                  .getByTestId("job-detail")
                  .getByText(requirement, { exact: true })
              ).toBeVisible();
            }
            for (const deliverable of deliverables) {
              await expect(
                page
                  .getByTestId("job-detail")
                  .getByText(deliverable, { exact: true })
              ).toBeVisible();
            }
            await expect(
              page.getByRole("link", { name: "Apply" })
            ).toBeVisible();

            await page.goBack();
            await page.waitForURL(new RegExp(path));
          });
        }
      });
    });
  });
}
