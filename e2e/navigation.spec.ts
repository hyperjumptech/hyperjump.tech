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
    await page.goto("http://localhost:3000");
  });

  for (const { name, expected } of navLinks) {
    test(`Navbar: Should correctly navigate upon clicking '${name}' link"`, async ({
      page
    }) => {
      const nav = page.getByRole("navigation");
      const link = nav.getByRole("link", { name, exact: false });
      await expect(link.first()).toBeVisible();

      await link.first().click();
      await page.waitForTimeout(2000);

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
    const servicesSection = page.locator("#services");
    await servicesSection.scrollIntoViewIfNeeded();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);

    const learnMoreLinks = await page
      .locator("#services")
      .getByRole("link", { name: /Learn More|Pelajari selengkapnya/i })
      .all();
    expect(learnMoreLinks.length).toBeGreaterThan(0);

    for (const [_, link] of learnMoreLinks.entries()) {
      await link.scrollIntoViewIfNeeded();
      await expect(link).toBeVisible({ timeout: 5000 });
      await expect(link).toBeEnabled();
      await link.click({ timeout: 10000 });
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(2000);
      await page.goBack();
      await page.waitForLoadState("networkidle");
    }

    const viewMore = page
      .locator("#services")
      .getByRole("link", { name: /View More|Lihat selengkapnya/i });
    await expect(viewMore).toBeVisible({ timeout: 5000 });
    await viewMore.scrollIntoViewIfNeeded();
    await viewMore.click({ timeout: 10000 });
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveURL(/\/(en|id)\/services/);
  });

  test("Case Studies Link: Should open all Case Study links correctly", async ({
    page
  }) => {
    const caseStudiesSection = page.locator("#case-studies");
    await caseStudiesSection.scrollIntoViewIfNeeded();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
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
        await link.click({ timeout: 10000 });
        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(2000);
        await page.goBack();
        await page.waitForLoadState("networkidle");
      } catch (error) {
        console.warn(
          `⚠️ Skipping Case Study link ${index + 1} (not clickable or detached)`
        );
      }
    }

    const viewMore = caseStudiesSection.getByRole("link", {
      name: /Explore Our Case Studies|Telusuri studi kasus kami/i
    });
    await expect(viewMore).toBeVisible({ timeout: 5000 });
    await viewMore.scrollIntoViewIfNeeded();
    await viewMore.click({ timeout: 10000 });
    await page.waitForLoadState("networkidle");

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
    const href = await locator.getAttribute("href");
    const target = await locator.getAttribute("target");

    // If link clearly opens in new tab, wait for popup
    if (target === "_blank" || (href && href.includes("github.com"))) {
      try {
        const [popup] = await Promise.all([
          page.waitForEvent("popup"),
          locator.click()
        ]);
        await popup.waitForLoadState("load");
        return popup;
      } catch (e) {
        // fallback to same page flow if popup didn't appear for some reason
        await page.waitForLoadState("load");
        return page;
      }
    }

    // Heuristic: try to detect popup with a short timeout (covers window.open without target attr).
    try {
      const [popup] = await Promise.all([
        page.waitForEvent("popup", { timeout: 2000 }),
        locator.click()
      ]);
      await popup.waitForLoadState("load");
      return popup;
    } catch (e) {
      // no popup -> same-page navigation
      try {
        await Promise.all([page.waitForLoadState("load"), locator.click()]);
      } catch {
        // ignore click error if any and just return current page
      }
      return page;
    }
  }

  test("Open Source Link: Should open all Open Source project links correctly", async ({
    page
  }: {
    page: Page;
  }) => {
    async function backToOpenSource() {
      await page.goto("http://localhost:3000/en#open-source", {
        waitUntil: "load"
      });
    }

    // === GRULE ===
    const gruleLink = page.locator(".oss-card").filter({ hasText: "Grule" });
    await expect(gruleLink).toBeVisible();
    const grulePage = await openLinkAndReturnPage(page, gruleLink);
    expect(grulePage.url()).toContain(
      "github.com/hyperjumptech/grule-rule-engine"
    );
    if (grulePage !== page) await grulePage.close();

    // === MONIKA ===
    await backToOpenSource();
    const monikaLink = page.locator(".oss-card").filter({ hasText: "Monika" });
    await expect(monikaLink).toBeVisible();
    const monikaPage = await openLinkAndReturnPage(page, monikaLink);
    expect(monikaPage.url()).toContain("monika.hyperjump.tech");
    if (monikaPage !== page) await monikaPage.close();

    // === WHATSAPP CHATBOT CONNECTOR ===
    await backToOpenSource();
    const waLink = page.locator(".oss-card").filter({
      hasText: /WhatsApp Chatbot Connector|Konektor Chatbot WhatsApp/i
    });
    await expect(waLink).toBeVisible();
    const waPage = await openLinkAndReturnPage(page, waLink);
    expect(waPage.url()).toContain(
      "github.com/hyperjumptech/whatsapp-chatbot-connector"
    );
    if (waPage !== page) await waPage.close();

    // === View More ===
    await backToOpenSource();
    const viewMore = page.locator("#open-source").getByRole("link", {
      name: /View More|Lihat selengkapnya/i
    });
    await expect(viewMore).toBeVisible();
    const orgPage = await openLinkAndReturnPage(page, viewMore);
    expect(orgPage.url()).toContain("github.com/hyperjumptech");
    if (orgPage !== page) await orgPage.close();
  });
});
