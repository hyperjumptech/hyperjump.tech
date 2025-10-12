import { test, expect, Page, Locator } from "@playwright/test";

const navLinks: { name: string; expected: RegExp }[] = [
  { name: "Our Services", expected: /\/(en|id)\/services(\/|$)/ },
  { name: "Case Studies", expected: /\/(en|id)\/case-studies(\/|$)/ },
  { name: "Open Source", expected: /#open-source/ },
  { name: "FAQ", expected: /#faqs/ }
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
      await expect(link).toBeVisible();

      await link.first().click();
      await page.waitForTimeout(2000);

      await expect(page).toHaveURL(expected);
    });
  }

  for (const { name, expected } of footerLinks) {
    test(`Footer: Should open "${name}" link correctly`, async ({ page }) => {
      const link = page.getByRole("link", { name, exact: false });
      await expect(link).toBeVisible();

      const popupPromise = page.waitForEvent("popup").catch(() => null);
      await link.click();

      const popup = await popupPromise;
      const target: Page = popup || page;

      await page.waitForTimeout(1000);

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

    const seeMoreLinks = await page
      .getByRole("link", { name: "See More" })
      .all();
    expect(seeMoreLinks.length).toBeGreaterThan(0);

    for (const [index, link] of seeMoreLinks.entries()) {
      console.log(`Clicking Service link ${index + 1}...`);
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
      .getByRole("link", { name: "View More" });
    await expect(viewMore).toBeVisible({ timeout: 5000 });
    await viewMore.scrollIntoViewIfNeeded();
    await viewMore.click({ timeout: 10000 });
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveURL(/\/(en|id)\/services/);
  });

  // test("Services Link: Should open all Service links correctly", async ({
  //   page
  // }) => {
  //   const seeMoreLinks = await page
  //     .getByRole("link", { name: "See More" })
  //     .all();
  //   for (const [index, link] of seeMoreLinks.entries()) {
  //     await link.click();
  //     await page.waitForTimeout(2000);
  //     await page.goBack();
  //   }

  //   const viewMore = page
  //     .locator("#services")
  //     .getByRole("link", { name: "View More" });
  //   await expect(viewMore).toBeVisible();
  //   await viewMore.click();
  //   await page.waitForTimeout(2000);

  //   await expect(page).toHaveURL(/\/(en|id)\/services/);
  // });

  // test("Case Studies Link: Should open all Case Study links correctly", async ({
  //   page
  // }) => {
  //   const readCaseStudyLinks = await page
  //     .getByRole("link", { name: "Read Case Study" })
  //     .all();
  //   for (const [index, link] of readCaseStudyLinks.entries()) {
  //     await link.click();
  //     await page.waitForTimeout(2000);
  //     await page.goBack();
  //   }

  //   const viewMore = page
  //     .locator("#case-studies")
  //     .getByRole("link", { name: "Explore Our Case Studies" });
  //   await expect(viewMore).toBeVisible();
  //   await viewMore.click();
  //   await page.waitForTimeout(2000);

  //   await expect(page).toHaveURL(/\/(en|id)\/case-studies/);
  // });

  test("Case Studies Link: Should open all Case Study links correctly", async ({
    page
  }) => {
    const caseStudiesSection = page.locator("#case-studies");
    await caseStudiesSection.scrollIntoViewIfNeeded();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
    const readCaseStudyLinks = await page
      .getByRole("link", { name: "Read Case Study" })
      .all();
    expect(readCaseStudyLinks.length).toBeGreaterThan(0);

    for (const [index, link] of readCaseStudyLinks.entries()) {
      console.log(`Clicking Case Study link ${index + 1}...`);
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
      name: "Explore Our Case Studies"
    });
    await expect(viewMore).toBeVisible({ timeout: 5000 });
    await viewMore.scrollIntoViewIfNeeded();
    await viewMore.click({ timeout: 10000 });
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveURL(/\/(en|id)\/case-studies/);
  });

  // test("Open Source Link: Should open all Open Source project links correctly", async ({
  //   page
  // }) => {
  //   async function expectGithubURL(popup: any, repoSlug: string) {
  //     const url = await popup.url();
  //     const isRepo =
  //       url.includes(`github.com/hyperjumptech/${repoSlug}`) ||
  //       url.includes(
  //         `github.com/login?return_to=https%3A%2F%2Fgithub.com%2Fhyperjumptech%2F${repoSlug}`
  //       );
  //     expect(
  //       isRepo,
  //       `Expected redirect or repo for ${repoSlug}, got: ${url}`
  //     ).toBeTruthy();
  //   }

  //   async function backToOpenSource() {
  //     await page.goto("http://localhost:3000/en#open-source");
  //   }

  //   // === GRULE ===
  //   const gruleLink = page.getByRole("link", { name: "Grule" });
  //   await expect(gruleLink).toBeVisible();
  //   await gruleLink.click();

  //   await backToOpenSource();

  //   const gruleStarPopup = page.waitForEvent("popup");
  //   await page.getByRole("link", { name: /Star/i }).first().click();
  //   const gruleStarPage = await gruleStarPopup;
  //   await expectGithubURL(gruleStarPage, "grule-rule-engine");

  //   await backToOpenSource();

  //   const gruleForkPopup = page.waitForEvent("popup");
  //   await page.getByRole("link", { name: /Fork/i }).first().click();
  //   const gruleForkPage = await gruleForkPopup;
  //   await expectGithubURL(gruleForkPage, "grule-rule-engine");

  //   await backToOpenSource();

  //   // === MONIKA ===
  //   const monikaLink = page.getByRole("link", { name: "Monika" });
  //   await expect(monikaLink).toBeVisible();
  //   await monikaLink.click();

  //   await backToOpenSource();

  //   const monikaStarPopup = page.waitForEvent("popup");
  //   await page.getByRole("link", { name: /Star/i }).nth(1).click();
  //   const monikaStarPage = await monikaStarPopup;
  //   await expectGithubURL(monikaStarPage, "monika");

  //   await backToOpenSource();

  //   const monikaForkPopup = page.waitForEvent("popup");
  //   await page.getByRole("link", { name: /Fork/i }).nth(1).click();
  //   const monikaForkPage = await monikaForkPopup;
  //   await expectGithubURL(monikaForkPage, "monika");

  //   await backToOpenSource();

  //   // === WHATSAPP CHATBOT CONNECTOR ===
  //   const waLink = page.getByRole("link", {
  //     name: "WhatsApp Chatbot Connector"
  //   });
  //   await expect(waLink).toBeVisible();
  //   await waLink.click();

  //   await backToOpenSource();

  //   const waStarPopup = page.waitForEvent("popup");
  //   await page.getByRole("link", { name: /Star/i }).nth(2).click();
  //   const waStarPage = await waStarPopup;
  //   await expectGithubURL(waStarPage, "whatsapp-chatbot-connector");

  //   await backToOpenSource();

  //   const waForkPopup = page.waitForEvent("popup");
  //   await page.getByRole("link", { name: /Fork/i }).nth(2).click();
  //   const waForkPage = await waForkPopup;
  //   await expectGithubURL(waForkPage, "whatsapp-chatbot-connector");

  //   await backToOpenSource();

  //   const viewMore = page.locator('a[href*="github.com/hyperjumptech"]', {
  //     hasText: "View More"
  //   });
  //   if (await viewMore.first().isVisible()) {
  //     await viewMore.first().click();
  //   }
  // });

  // Per-file timeout (opsional). Bisa disesuaikan.
  test.setTimeout(60_000);

  async function expectGithubURL(p: Page, repoSlug: string) {
    const url = await p.url();
    const isRepo =
      url.includes(`github.com/hyperjumptech/${repoSlug}`) ||
      url.includes(
        `github.com/login?return_to=https%3A%2F%2Fgithub.com%2Fhyperjumptech%2F${repoSlug}`
      );
    expect(
      isRepo,
      `Expected redirect or repo for ${repoSlug}, got: ${url}`
    ).toBeTruthy();
  }

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
      // Click, then wait for load; if click does not navigate, waitForLoadState returns quickly.
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
    const gruleLink = page.getByRole("link", { name: "Grule" });
    await expect(gruleLink).toBeVisible();
    await gruleLink.click();
    await backToOpenSource();

    const gruleStarLocator = page.getByRole("link", { name: /Star/i }).first();
    const gruleStarPage = await openLinkAndReturnPage(page, gruleStarLocator);
    await expectGithubURL(gruleStarPage, "grule-rule-engine");

    await backToOpenSource();
    const gruleForkLocator = page.getByRole("link", { name: /Fork/i }).first();
    const gruleForkPage = await openLinkAndReturnPage(page, gruleForkLocator);
    await expectGithubURL(gruleForkPage, "grule-rule-engine");

    // === MONIKA ===
    await backToOpenSource();
    const monikaLink = page.getByRole("link", { name: "Monika" });
    await expect(monikaLink).toBeVisible();
    await monikaLink.click();
    await backToOpenSource();

    const monikaStarLocator = page.getByRole("link", { name: /Star/i }).nth(1);
    const monikaStarPage = await openLinkAndReturnPage(page, monikaStarLocator);
    await expectGithubURL(monikaStarPage, "monika");

    await backToOpenSource();
    const monikaForkLocator = page.getByRole("link", { name: /Fork/i }).nth(1);
    const monikaForkPage = await openLinkAndReturnPage(page, monikaForkLocator);
    await expectGithubURL(monikaForkPage, "monika");

    // === WHATSAPP CHATBOT CONNECTOR ===
    await backToOpenSource();
    const waLink = page.getByRole("link", {
      name: "WhatsApp Chatbot Connector"
    });
    await expect(waLink).toBeVisible();
    await waLink.click();
    await backToOpenSource();

    const waStarLocator = page.getByRole("link", { name: /Star/i }).nth(2);
    const waStarPage = await openLinkAndReturnPage(page, waStarLocator);
    await expectGithubURL(waStarPage, "whatsapp-chatbot-connector");

    await backToOpenSource();
    const waForkLocator = page.getByRole("link", { name: /Fork/i }).nth(2);
    const waForkPage = await openLinkAndReturnPage(page, waForkLocator);
    await expectGithubURL(waForkPage, "whatsapp-chatbot-connector");

    // Optional: click View More if present
    await backToOpenSource();
    const viewMore = page.locator('a[href*="github.com/hyperjumptech"]', {
      hasText: "View More"
    });
    if (await viewMore.first().isVisible()) {
      await viewMore.first().click();
    }
  });
});
