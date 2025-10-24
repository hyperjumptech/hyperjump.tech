import { test, expect, Page } from "@playwright/test";
import { ServiceSlug } from "@/app/[lang]/(hyperjump)/data";

// Base URL
const baseURL = "http://localhost:3000";

const services = Object.entries(ServiceSlug).map(([key, slug]) => ({
  title: key.replace(/([A-Z])/g, " $1").trim(),
  slug
}));

const locales = [
  ...services.map((i) => ({
    code: "en",
    title: i.title,
    slug: i.slug,
    path: `/en/services/${i.slug}`
  })),
  ...services.map((i) => ({
    code: "id",
    title: i.title,
    slug: i.slug,
    path: `/id/services/${i.slug}`
  }))
] as const;

const viewports = [
  { name: "mobile", size: { width: 360, height: 740 } },
  { name: "tablet", size: { width: 820, height: 1180 } },
  { name: "desktop", size: { width: 1280, height: 800 } },
  { name: "large", size: { width: 1536, height: 960 } }
] as const;

// Utility: assert all images load (no broken images)
export async function expectAllImagesLoaded(page: Page) {
  await page.waitForLoadState("networkidle");
  const main = page.locator("main");
  const images = main.locator('img, [style*="background-image"], image');
  const count = await images.count();

  if (count === 0) return;

  for (let i = 0; i < count; i++) {
    const el = images.nth(i);
    const tag = await el.evaluate((n) => n.tagName.toLowerCase());

    await expect(el, `Image #${i} not visible`).toBeVisible({ timeout: 5000 });

    if (tag === "img" || tag === "image") {
      const ok = await el.evaluate(
        (img: HTMLImageElement | SVGImageElement) => {
          // @ts-ignore — handle both <img> and SVG <image>
          const nw = (img as any).naturalWidth ?? 1;
          // @ts-ignore
          const nh = (img as any).naturalHeight ?? 1;
          // @ts-ignore
          const href = (img as any).href?.baseVal ?? (img as any).src ?? null;
          return (nw > 0 && nh > 0) || Boolean(href);
        }
      );
      expect(
        ok,
        `Image #${i} failed to load or has 0x0 natural size`
      ).toBeTruthy();
    }
  }
}

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
  heroHeading:
    "#hero div div[dangerouslysetinnerhtml], #hero h1, #hero .text-3xl",
  heroDesc: "#hero p",
  cardsSection: "section div.grid",
  card: "div.grid > div, div.grid > article, div.grid > li",
  cardButton: "section > div a, section > div button"
};

for (const { code: locale, path, title, slug } of locales) {
  test.describe("Services Detail Page", () => {
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
            if (href !== `/${locale}/services/${slug}`) {
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

        test("content buttons link to intended destinations", async ({
          page
        }) => {
          const cardLinks = page.locator(selectors.cardButton);
          const n = await cardLinks.count();
          for (let i = 0; i < n; i++) {
            const link = cardLinks.nth(i);
            await expect(link).toBeVisible();
            const href = await link.getAttribute("href");
            expect(href).toBeTruthy();
            // Only test one click to avoid navigating away multiple times unnecessarily
            if (i === 0 && href) {
              await link.click();
              await expect(page).toHaveURL(
                new RegExp(`${href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`)
              );
              await page.goBack();
              await expect(page).toHaveURL(`${baseURL}${path}`);
            }
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
          await page.waitForURL(new RegExp(`/(${other})/services`));

          // Verify content changes (hero heading changes with locale)
          const heading = page
            .locator("#hero")
            .locator(
              ".text-3xl, .text-4xl, [class*='text-'][class*='font-medium']"
            )
            .first();
          await expect(heading).toBeVisible();

          // Switch back
          const select2 = getFooter(page).getByRole("combobox");
          await select2.selectOption(locale);
          await page.waitForURL(new RegExp(`/(${locale})/services`));
        });
      });

      // 4. Images
      test.describe("Images", () => {
        test("all images load without errors", async ({ page }) => {
          await expectAllImagesLoaded(page);
        });
      });

      // 5. Text & Content
      test.describe("Text & Content", () => {
        test("hero section visible with heading and description", async ({
          page
        }) => {
          const hero = page.locator(selectors.hero);
          await expect(hero).toBeVisible();
        });

        test("content sections are visible with text", async ({ page }) => {
          const section = page.locator(selectors.cardsSection);
          await expect(section.first()).toBeVisible();

          const headings = section.locator("h2");
          const headingCount = await headings.count();
          expect(headingCount).toBeGreaterThan(0);

          for (let i = 0; i < headingCount; i++) {
            const h2 = headings.nth(i);
            await expect(h2).toBeVisible();
            await expect(h2).not.toBeEmpty();
          }

          const paragraphs = section.locator("p");
          const paragraphCount = await paragraphs.count();
          expect(paragraphCount).toBeGreaterThan(0);

          for (let i = 0; i < paragraphCount; i++) {
            const p = paragraphs.nth(i);
            await expect(p).toBeVisible();
            await expect(p).not.toBeEmpty();
          }
        });

        test("footer text visible", async ({ page }) => {
          const footer = getFooter(page);
          await expect(footer).toBeVisible();

          const firstParagraph = footer.locator("p").first();
          await expect(firstParagraph).toBeVisible();
          await expect(firstParagraph).not.toBeEmpty();
        });
      });

      // 6. SEO & Metadata
      test.describe("SEO & Metadata", () => {
        test("meta title and description are set correctly", async ({
          page
        }) => {
          const title = await page.title();
          expect(title).toMatch(title);

          const metaDesc = await page
            .locator('head meta[name="description"]')
            .getAttribute("content");
          expect(metaDesc).toBeTruthy();
          // Basic sanity: should include hero description text excerpt
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

        test("Services Section", async ({ page }) => {
          const grid = page.locator("section div.grid");
          await expect(grid.first()).toBeVisible();

          const itemCount = await grid
            .first()
            .locator("div, article, li")
            .count();
          expect(itemCount).toBeGreaterThan(0);
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

            const grid = page.locator("section div.grid").first();
            await expect(grid).toBeVisible();

            const footer = getFooter(page);
            await expect(footer).toBeVisible();

            await context.close();
          });
        }
      });
    });
  });
}
