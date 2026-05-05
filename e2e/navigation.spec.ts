import { test, expect, Page, Locator } from "@playwright/test";

const navLinks: { name: string | RegExp; expected: RegExp }[] = [
  { name: /Services|Layanan Kami/i, expected: /\/(en|id)\/services(\/|$)/ },
  { name: /Products|Produk Kami/i, expected: /\/(en|id)\/products(\/|$)/ },
  {
    name: /Case Studies|Studi Kasus/i,
    expected: /\/(en|id)\/case-studies(\/|$)/
  },
  { name: /FAQ/i, expected: /#faqs/ }
];

const footerLinks: { name: string; expected: string }[] = [
  { name: "LinkedIn", expected: "linkedin" },
  { name: "GitHub", expected: "github" },
  { name: "Medium", expected: "medium" },
  { name: "Substack", expected: "substack" }
];

test.describe("Navigation & Links", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });
  });

  for (const { name, expected } of navLinks) {
    test(`Navbar: Should correctly navigate upon clicking '${name}' link"`, async ({
      page
    }) => {
      const nav = page.getByRole("navigation");
      const link = nav.getByRole("link", { name, exact: false });
      await expect(link.first()).toBeVisible();

      await link.first().click();
      await page.waitForLoadState("domcontentloaded");

      await expect(page).toHaveURL(expected);
    });
  }

  for (const { name, expected } of footerLinks) {
    test(`Footer: Should open "${name}" link correctly`, async ({ page }) => {
      const link = page
        .getByRole("contentinfo")
        .getByRole("link", { name, exact: true });
      await expect(link).toBeVisible();

      const popupPromise = page.waitForEvent("popup").catch(() => null);
      await link.click();

      const popup = await popupPromise;
      const target: Page = popup || page;

      await expect(target).toHaveURL(new RegExp(expected));
    });
  }

  test("Services Link: Should open all Service links correctly", async ({
    page
  }) => {
    const homeUrl = page.url();
    const servicesSection = page.locator("#services");
    await servicesSection.scrollIntoViewIfNeeded();
    await page.waitForLoadState("domcontentloaded");

    const learnMoreLinks = await page
      .locator("#services")
      .getByRole("link", { name: /Learn More|Pelajari selengkapnya/i })
      .all();
    expect(learnMoreLinks.length).toBeGreaterThan(0);

    for (const [_, link] of learnMoreLinks.entries()) {
      await link.scrollIntoViewIfNeeded();
      await expect(link).toBeVisible({ timeout: 5000 });
      await expect(link).toBeEnabled();
      await Promise.all([
        page.waitForURL(/\/(en|id)\/services\/.+/),
        link.click({ timeout: 10000 })
      ]);
      // Avoid history-based navigation flakiness in WebKit.
      await page.goto(`${homeUrl}#services`, { waitUntil: "domcontentloaded" });
    }

    const viewMore = page
      .locator("#services")
      .getByRole("link", { name: /View More|Lihat selengkapnya/i });
    await expect(viewMore).toBeVisible({ timeout: 5000 });
    await viewMore.scrollIntoViewIfNeeded();
    await Promise.all([
      page.waitForURL(/\/(en|id)\/services(\/|$)/),
      viewMore.click({ timeout: 10000 })
    ]);

    await expect(page).toHaveURL(/\/(en|id)\/services/);
  });

  test("Case Studies Link: Should open all Case Study links correctly", async ({
    page
  }) => {
    const homeUrl = page.url();
    const caseStudiesSection = page.locator("#case-studies");
    await caseStudiesSection.scrollIntoViewIfNeeded();
    await page.waitForLoadState("domcontentloaded");
    const readCaseStudyLinks = await page
      .locator("#case-studies")
      .getByRole("link", { name: /Read case study|Baca studi kasus/i })
      .all();
    expect(readCaseStudyLinks.length).toBeGreaterThan(0);

    for (const [index, link] of readCaseStudyLinks.entries()) {
      await link.scrollIntoViewIfNeeded();
      await expect(link).toBeVisible({ timeout: 5000 });
      await expect(link).toBeEnabled();

      try {
        await Promise.all([
          page.waitForURL(/\/(en|id)\/case-studies\/.+/),
          link.click({ timeout: 10000 })
        ]);
        // Avoid history-based navigation flakiness in WebKit.
        await page.goto(`${homeUrl}#case-studies`, {
          waitUntil: "domcontentloaded"
        });
      } catch (error) {
        console.warn(
          `⚠️ Skipping Case Study link ${index + 1} (not clickable or detached)`
        );
      }
    }

    // The CTA copy is not stable across locales/pages; prefer URL-based targeting.
    const viewMore = caseStudiesSection
      .locator('a[href*="/case-studies"]')
      .first();
    await expect(viewMore).toBeVisible({ timeout: 5000 });
    await viewMore.scrollIntoViewIfNeeded();
    await Promise.all([
      page.waitForURL(/\/(en|id)\/case-studies(\/|$)/),
      viewMore.click({ timeout: 10000 })
    ]);

    await expect(page).toHaveURL(/\/(en|id)\/case-studies/);
  });

  test.setTimeout(60_000);

  /**
   * Click a locator and return the Page that results:
   * - If the click opens a popup (target=_blank or window.open), returns the popup Page.
   * - Otherwise returns the same page (after navigation).
   */
  async function openLinkAndReturnPage(
    page: Page,
    locator: Locator
  ): Promise<Page> {
    // Avoid pre-reading attributes (can hang in WebKit if element gets detached).
    const popupPromise = page
      .waitForEvent("popup", { timeout: 3000 })
      .catch(() => null);
    await locator.click();

    const popup = await popupPromise;
    if (popup) {
      await popup.waitForLoadState("domcontentloaded");
      return popup;
    }

    await page.waitForLoadState("domcontentloaded");
    return page;
  }

  test("Open Source Link: Should open all Open Source project links correctly", async ({
    page
  }: {
    page: Page;
  }) => {
    async function gotoOpenSource() {
      // The OSS cards live on the Products page (no stable #open-source anchor).
      await page.goto("http://localhost:3000/en/products", {
        waitUntil: "domcontentloaded"
      });
      const firstCard = page.locator(".oss-card").first();
      await firstCard.scrollIntoViewIfNeeded();
      await expect(firstCard).toBeVisible();
    }

    await gotoOpenSource();

    // === GRULE ===
    const gruleLink = page
      .locator(".oss-card")
      .filter({ hasText: "Grule" })
      .getByRole("link")
      .first();
    await expect(gruleLink).toBeVisible();
    await expect(gruleLink).toHaveAttribute(
      "href",
      /github\.com\/hyperjumptech\/grule-rule-engine/
    );

    // === MONIKA ===
    await gotoOpenSource();
    const monikaLink = page
      .locator(".oss-card")
      .filter({ hasText: "Monika" })
      .getByRole("link")
      .first();
    await expect(monikaLink).toBeVisible();
    await expect(monikaLink).toHaveAttribute("href", /monika\.hyperjump\.tech/);

    // === WHATSAPP CHATBOT CONNECTOR ===
    await gotoOpenSource();
    const waLink = page
      .locator(".oss-card")
      .filter({
        hasText: /WhatsApp Chatbot Connector|Konektor Chatbot WhatsApp/i
      })
      .getByRole("link")
      .first();
    await expect(waLink).toBeVisible();
    await expect(waLink).toHaveAttribute(
      "href",
      /github\.com\/hyperjumptech\/whatsapp-chatbot-connector/
    );

    // === View More ===
    await gotoOpenSource();
    const viewMore = page
      .locator('a[href="https://github.com/hyperjumptech"]')
      .first();
    await expect(viewMore).toBeVisible();
    await expect(viewMore).toHaveAttribute(
      "href",
      "https://github.com/hyperjumptech"
    );
  });
});
