import { test, expect } from "@playwright/test";
import { imagesTest } from "./shared-test";
import { getCaseStudies } from "../app/[lang]/(hyperjump)/data";

// Base URL
const baseURL = "http://localhost:3000";

// Test matrix: locales x data x devices
const locales = [
  ...getCaseStudies("en").map((cs) => ({
    code: "en",
    title: cs.title,
    slug: cs.slug,
    path: `/en/case-studies/${cs.slug}`
  })),
  ...getCaseStudies("id").map((cs) => ({
    code: "id",
    title: cs.title,
    slug: cs.slug,
    path: `/id/case-studies/${cs.slug}`
  }))
] as const;

const viewports = [
  { name: "mobile", size: { width: 360, height: 740 } },
  { name: "tablet", size: { width: 820, height: 1180 } },
  { name: "desktop", size: { width: 1280, height: 800 } },
  { name: "large", size: { width: 1536, height: 960 } }
] as const;

// Utility: get nav and footer link locators
function getHeader(page: import("@playwright/test").Page) {
  // Header is sticky nav; fall back to first header/nav region
  const header = page.locator("header, nav").first();
  return header;
}

function getMenuNav(page: import("@playwright/test").Page) {
  return page.locator('nav[aria-label="Main"]');
}

function getFooter(page: import("@playwright/test").Page) {
  return page.getByRole("contentinfo");
}

// Utility: navigate and ensure route
async function gotoAndWait(page: import("@playwright/test").Page, url: string) {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(
    new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  ); // escape
}

// Shared assertions for header nav links based on code in app/[lang]/(hyperjump)/components/nav.tsx
const expectedMenuPaths = (locale: string) => [
  `/${locale}/services`,
  `/${locale}/products`,
  `/${locale}/case-studies`,
  `/${locale}#faqs`
];

// Hero and list sections selectors from page.tsx
const selectors = {
  hero: "#hero",
  heroHeading: "#hero h1",
  heroDesc: "#hero p",
  article: "article",
  recommendationGrid: ".grid"
};

for (const { code: locale, path, title, slug } of locales) {
  test.describe("Case Study Detail Page", () => {
    test.describe(`/${slug} -${locale.toUpperCase()} locale`, () => {
      test.beforeEach(async ({ page }) => {
        await gotoAndWait(page, `${baseURL}${path}`);
      });

      // 1. Navigation & Links
      test.describe("Navigation & Links", () => {
        test("header nav links route correctly", async ({ page }) => {
          const header = getHeader(page);
          await expect(header).toBeVisible();

          const menuNav = getMenuNav(page);
          const expected = expectedMenuPaths(locale);
          for (const href of expected) {
            await expect(
              menuNav.locator(`a[href='${href}']`).first()
            ).toBeVisible();
          }

          // Click-through checks for non-anchor-with-fragment links
          for (const href of expected) {
            menuNav.locator(`a[href='${href}']`).first().click();
            await expect(page).toHaveURL(`${baseURL}${href}`);
            // Go back to subject page
            if (href !== `/${locale}/case-studies/${slug}`) {
              await page.goBack();
              await expect(page).toHaveURL(`${baseURL}${path}`);
            }
          }
        });

        test("footer links and social icons are visible and valid", async ({
          page
        }) => {
          const footer = getFooter(page);
          await expect(footer).toBeVisible();

          const footerLinks = footer.getByRole("link");
          await expect(footerLinks.first()).toBeVisible();

          // Ensure each link has href
          const count = await footerLinks.count();
          for (let i = 0; i < count; i++) {
            const link = footerLinks.nth(i);
            const href = await link.getAttribute("href");
            expect(href, "footer link should have href").toBeTruthy();
          }
        });
      });

      // 2. Branding
      test.describe("Branding", () => {
        test("logo visible in header and links to home", async ({ page }) => {
          const header = getHeader(page);
          const logo = header
            .getByRole("link")
            .filter({ has: page.getByAltText("Hyperjump Logo") })
            .first();
          await expect(logo).toBeVisible();

          const href = await logo.getAttribute("href");
          expect(href).toBe(`/${locale}`);
        });

        test("logo visible in footer and links to home", async ({ page }) => {
          const footer = getFooter(page);
          const logo = footer
            .getByRole("link")
            .filter({ has: page.getByAltText("Hyperjump Logo") })
            .first();
          await expect(logo).toBeVisible();
          const href = await logo.getAttribute("href");
          expect(href).toBe(`/${locale}`);
        });
      });

      // 3. Language Switching
      test.describe("Language Switching", () => {
        test("switch language to the other locale and back", async ({
          page
        }) => {
          const footer = getFooter(page);
          const select = footer.getByRole("combobox");
          await expect(select).toBeVisible();

          // Current value should be locale
          await expect(select).toHaveValue(locale);

          const other = locale === "en" ? "id" : "en";
          await select.selectOption(other);
          await page.waitForURL(new RegExp(`/(${other})/case-studies`));

          // Verify content changes (hero heading changes with locale)
          const heading = page
            .locator("#hero")
            .locator("h1")
            .first();
          await expect(heading).toBeVisible();

          // Switch back
          const select2 = getFooter(page).getByRole("combobox");
          await select2.selectOption(locale);
          await page.waitForURL(new RegExp(`/(${locale})/case-studies`));
        });
      });

      // 4. Images
      test.describe("Images", imagesTest());

      // 5. Text & Content
      test.describe("Text & Content", () => {
        test("hero section visible with heading and description", async ({
          page
        }) => {
          const hero = page.locator(selectors.hero);
          await expect(hero).toBeVisible();

          // Heading and description visible
          const h1 = hero.locator("h1");
          await expect(h1).toBeVisible();
          await expect(h1).toContainText(title);

          await expect(hero.locator("p").first()).toBeVisible();
        });

        test("content are visible", async ({ page }) => {
          const article = page.locator(selectors.article);
          await expect(article).toBeVisible();

          const articleHeadings = article.locator("h2");
          const articleHeadingsCount = await articleHeadings.count();
          for (let i = 0; i < articleHeadingsCount; i++) {
            const h2 = articleHeadings.nth(i);
            await expect(h2).toBeVisible();
            await expect(h2).not.toBeEmpty();
          }

          const articleParagraphs = article.locator("p");
          const articleParagraphsCount = await articleParagraphs.count();
          for (let i = 0; i < articleParagraphsCount; i++) {
            const p = articleParagraphs.nth(i);
            await expect(p).toBeVisible();
            await expect(p).not.toBeEmpty();
          }
        });

        test("footer text visible", async ({ page }) => {
          const footer = getFooter(page);
          await expect(footer).toBeVisible();
          await expect(footer.locator("p").first()).toBeVisible();
        });
      });

      // 6. SEO & Metadata
      test.describe("SEO & Metadata", () => {
        test("meta title and description are set correctly", async ({
          page
        }) => {
          const pageTitle = await page.title();
          expect(pageTitle).toContain(title);

          const metaDesc = await page
            .locator('head meta[name="description"]')
            .getAttribute("content");
          expect(metaDesc).toBeTruthy();
          // Basic sanity: should include some text
          const bodyText = await page.locator("body").innerText();
          expect(bodyText.length).toBeGreaterThan(50);
        });
      });

      // 7. Test Structure by UI sections
      test.describe("Sections", () => {
        test("Header", async ({ page }) => {
          const header = getHeader(page);
          await expect(header).toBeVisible();
        });

        test("Hero Section", async ({ page }) => {
          const hero = page.locator(selectors.hero);
          await expect(hero).toBeVisible();
        });

        test("Article Content", async ({ page }) => {
          const article = page.locator(selectors.article);
          await expect(article).toBeVisible();
        });

        test("Footer", async ({ page }) => {
          const footer = getFooter(page);
          await expect(footer).toBeVisible();
        });
      });

      // 8. Responsive Design
      test.describe("Responsive Design", () => {
        for (const viewport of viewports) {
          test(`layout renders correctly at ${viewport.name} (${viewport.size.width}x${viewport.size.height})`, async ({
            browser
          }) => {
            const context = await browser.newContext({
              viewport: viewport.size
            });
            const page = await context.newPage();
            await page.goto(`${baseURL}${path}`, {
              waitUntil: "domcontentloaded"
            });

            const header = getHeader(page);
            await expect(header).toBeVisible();

            const hero = page.locator(selectors.hero);
            await expect(hero).toBeVisible();

            const footer = getFooter(page);
            await expect(footer).toBeVisible();

            await context.close();
          });
        }
      });
    });
  });
}
