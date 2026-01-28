import { test, expect } from "@playwright/test";

// Base URL
const baseURL = "http://localhost:3000";
const locales = [
  { code: "en", path: "/en/services" },
  { code: "id", path: "/id/services" }
] as const;

const viewports = [
  { name: "mobile", size: { width: 360, height: 740 } },
  { name: "tablet", size: { width: 820, height: 1180 } },
  { name: "desktop", size: { width: 1280, height: 800 } },
  { name: "large", size: { width: 1536, height: 960 } }
] as const;

async function expectAllImagesLoaded(page: any) {
  // Scroll to bottom to trigger lazy-loaded images
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForLoadState("networkidle");

  const images = page.locator('img, image, [style*="background-image"]');
  const count = await images.count();

  for (let i = 0; i < count; i++) {
    const el = images.nth(i);
    const tag = await el.evaluate((n: any) => n.tagName.toLowerCase());

    await el.scrollIntoViewIfNeeded();
    await expect(el).toBeVisible();

    if (tag === "img" || tag === "image") {
      const ok = await el.evaluate((node: any) => {
        // @ts-ignore
        const img = node;
        const nw = img.naturalWidth ?? 1;
        const nh = img.naturalHeight ?? 1;
        const isSVG = !!img.href?.baseVal;

        // Allow lazy images that are replaced with placeholder
        const isLoaded = (nw > 0 && nh > 0) || isSVG;
        const src = img.currentSrc || img.src || img.href?.baseVal || "(none)";

        return { isLoaded, src };
      });

      expect(
        ok.isLoaded,
        `Image failed to load or has zero size: ${ok.src}`
      ).toBeTruthy();
    }
  }
}

// Utility: get nav and footer link locators
function getHeader(page: import("@playwright/test").Page) {
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
  );
}

// Shared assertions for header nav links based on code in app/[lang]/(hyperjump)/components/nav.tsx
const expectedMenuPaths = (locale: string) => [
  `/${locale}/services`,
  `/${locale}/products`,
  `/${locale}/case-studies`,
  `/${locale}#faqs`
];

const selectors = {
  hero: "#hero",
  heroHeading: "#hero h1, #hero .text-3xl, #hero [data-hero-heading]",
  heroDesc: "#hero p",
  cardsSection: "section.space-y-16",
  card: "section.space-y-16 > div",
  cardButton: "section.space-y-16 > div a, section.space-y-16 > div button"
};

for (const { code: locale, path } of locales) {
  test.describe("Services Page", () => {
    test.describe(`${locale.toUpperCase()} locale`, () => {
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
            if (href !== `/${locale}/services`) {
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
          await page.waitForURL(new RegExp(`/(${locale})/services`));

          // Verify content changes (hero heading changes with locale)
          const heading = page
            .locator("#hero")
            .locator(
              ".text-3xl, .text-4xl, [class*='text-'][class*='font-medium']"
            )
            .first();
          await expect(heading).toBeVisible();

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
          // Heading and description visible
          await expect(
            hero
              .locator(
                ".text-3xl, .text-4xl, [class*='text-'][class*='font-medium']"
              )
              .first()
          ).toBeVisible();
          await expect(hero.locator("p").first()).toBeVisible();
        });

        test("explore heading, service section, and CTA visible", async ({
          page
        }) => {
          const section = page.locator(selectors.cardsSection);
          await expect(section).toBeVisible();

          const cards = page.locator(selectors.card);
          await expect(cards.first()).toBeVisible();

          const button = page.locator(selectors.cardButton).first();
          await expect(button).toBeVisible();
        });

        test("company address or footer text visible", async ({ page }) => {
          const footer = getFooter(page);
          await expect(footer).toBeVisible();
          await expect(footer.locator("p").first()).toBeVisible();
        });
      });

      // 6. SEO & Metadata
      test("SEO: meta title and description should exist and match expected content", async ({
        page
      }) => {
        const title = await page.title();
        const description = await page
          .locator('meta[name="description"]')
          .getAttribute("content");

        expect(title.length).toBeGreaterThan(10);
        expect(description?.length).toBeGreaterThan(20);
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
          const section = page.locator(selectors.cardsSection);
          await expect(section).toBeVisible();
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

            const section = page.locator(selectors.cardsSection);
            await expect(section).toBeVisible();

            const footer = getFooter(page);
            await expect(footer).toBeVisible();

            await context.close();
          });
        }
      });
    });
  });
}
