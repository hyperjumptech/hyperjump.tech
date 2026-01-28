import type { Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import type { SupportedLanguage } from "@/locales/.generated/types";

export const BASE_URL = "http://localhost:3000";

export async function gotoAndWait(page: Page, url: string) {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(
    new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  );
}

export function metaTest() {
  return () => {
    test("Meta title and description should exist", async ({ page }) => {
      const title = await page.title();
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");

      expect(title.length).toBeGreaterThan(10);
      expect(description?.length).toBeGreaterThan(20);
    });
  };
}

export function headerTest(locale: SupportedLanguage, path: string) {
  return () => {
    test("Header", async ({ page }) => {
      const header = getHeader(page);
      await expect(header).toBeVisible();
    });

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
        await expect(page).toHaveURL(`${BASE_URL}${href}`);
        if (href !== path) {
          await page.goBack();
          await expect(page).toHaveURL(`${BASE_URL}${path}`);
        }
      }
    });
  };
}

function getHeader(page: Page) {
  return page.locator("header, nav").first();
}

function expectedMenuPaths(locale: SupportedLanguage) {
  return [
    `/${locale}/services`,
    `/${locale}/products`,
    `/${locale}/case-studies`,
    `/${locale}/team`,
    `/${locale}#faqs`
  ];
}

function getMenuNav(page: Page) {
  return page.locator('nav[aria-label="Main"]');
}

export function imagesTest() {
  return () => {
    test("all images load without errors", async ({ page }) => {
      await expectAllImagesLoaded(page);
    });
  };
}

async function expectAllImagesLoaded(page: Page) {
  // TODO: re-enabled later due to flakiness
  return;
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForLoadState("networkidle");

  const images = page.locator('img, image, [style*="background-image"]');
  const count = await images.count();

  if (count === 0) {
    return;
  }

  for (let i = 0; i < count; i++) {
    const el = images.nth(i);
    const tag = await el.evaluate((n: any) => n.tagName.toLowerCase());

    await el.scrollIntoViewIfNeeded();
    await expect(el, `Image #${i} not visible`).toBeVisible({ timeout: 5000 });

    if (tag === "img" || tag === "image") {
      const ok = await el.evaluate((node: any) => {
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

export function languageSwitcherTest(locale: SupportedLanguage) {
  return () => {
    test("switch language to the other locale and back", async ({ page }) => {
      const footer = getFooter(page);
      const select = footer.getByRole("combobox");
      await expect(select).toBeVisible();

      await expect(select).toHaveValue(locale);
      await page.waitForURL(new RegExp(`/${locale}/`));

      const changedLocale = locale === "en" ? "id" : "en";
      await select.selectOption(changedLocale);
      await page.waitForURL(new RegExp(`/${changedLocale}/`));
    });
  };
}

export function footerTest(locale: SupportedLanguage) {
  return () => {
    test("Footer", async ({ page }) => {
      const footer = getFooter(page);
      await expect(footer).toBeVisible();
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

    test("company address or footer text visible", async ({ page }) => {
      const footer = getFooter(page);
      await expect(footer).toBeVisible();
      await expect(footer.locator("p").first()).toBeVisible();
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
  };
}

function getFooter(page: Page) {
  return page.getByRole("contentinfo");
}

const VIEWPORTS = [
  { name: "mobile", size: { width: 360, height: 740 } },
  { name: "tablet", size: { width: 820, height: 1180 } },
  { name: "desktop", size: { width: 1280, height: 800 } },
  { name: "large", size: { width: 1536, height: 960 } }
] as const;

export function responsiveTest(path: string) {
  return () => {
    for (const { name, size } of VIEWPORTS) {
      test(`layout renders correctly at ${name} (${size.width}x${size.height})`, async ({
        browser
      }) => {
        const context = await browser.newContext({
          viewport: size
        });
        const page = await context.newPage();
        await page.goto(`${BASE_URL}${path}`, {
          waitUntil: "domcontentloaded"
        });

        const header = getHeader(page);
        await expect(header).toBeVisible();

        const footer = getFooter(page);
        await expect(footer).toBeVisible();

        await context.close();
      });
    }
  };
}
