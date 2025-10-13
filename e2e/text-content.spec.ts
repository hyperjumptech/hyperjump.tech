import { test, expect, Page, Locator } from "@playwright/test";

const URL = "http://localhost:3000";
test.setTimeout(60_000);

async function safeScrollAndClick(
  page: Page,
  selector: string,
  timeout = 10_000
) {
  const locator = page.locator(selector);
  await locator.waitFor({ state: "attached", timeout });

  await locator.scrollIntoViewIfNeeded();

  try {
    await locator.waitFor({
      state: "visible",
      timeout: Math.min(timeout, 5_000)
    });
  } catch {}

  try {
    await locator.click({ timeout: Math.min(timeout, 5_000) });
    return;
  } catch {
    try {
      await page.evaluate((sel) => {
        const el = document.querySelector(sel) as HTMLElement | null;
        if (!el) throw new Error(`Element not found: ${sel}`);
        el.scrollIntoView({ block: "center", inline: "center" });
        (el as HTMLElement).click();
      }, selector);
      return;
    } catch {
      await locator.click({ force: true, timeout });
    }
  }
}

async function waitForHeading(
  page: Page,
  headingText: string,
  timeout = 10_000
): Promise<Locator> {
  // Try accessible role first (more semantic)
  const byRole = page.getByRole("heading", { name: headingText });
  try {
    await byRole.scrollIntoViewIfNeeded();
    await expect(byRole).toBeVisible({ timeout });
    return byRole;
  } catch {
    // fallback to common heading tags
    const tagLocator = page
      .locator(
        `h1:has-text("${headingText}"), h2:has-text("${headingText}"), h3:has-text("${headingText}")`
      )
      .first();
    await tagLocator.scrollIntoViewIfNeeded();
    await expect(tagLocator).toBeVisible({ timeout });
    return tagLocator;
  }
}

test.describe("Text and Content", () => {
  test("Content: should validate text accuracy and proper localization in all sections", async ({
    page
  }: {
    page: Page;
  }) => {
    await page.goto(URL);

    // === Hero Section ===
    // Use regex or partial matching if exact text may differ
    const heroHeading = page.getByRole("heading", {
      name: /Your partner in building/i
    });
    await heroHeading.scrollIntoViewIfNeeded();
    await expect(heroHeading).toBeVisible({ timeout: 10_000 });
    await expect(
      page.getByText("We help organizations deliver", { exact: false })
    ).toBeVisible({ timeout: 10_000 });

    // Verify partner logos
    const partners = [
      "Amman Mineral Internasional",
      "Bank Tabungan Negara",
      "Eka Mas Republik",
      "Sinar Mas Digital Day",
      "Smartfren"
    ];

    for (const partner of partners) {
      const logo = page.getByRole("img", { name: partner });
      await expect(logo).toBeVisible({ timeout: 10_000 });
    }

    // === Services Section ===
    await safeScrollAndClick(page, "#case-studies");
    await page.waitForTimeout(200);

    await waitForHeading(page, "Services", 15_000);
    await expect(
      page.getByText("We offer expert technology", { exact: false })
    ).toBeVisible({ timeout: 10_000 });

    // === Case Studies Section ===
    await safeScrollAndClick(page, "#case-studies");
    await page.waitForTimeout(200);

    await waitForHeading(page, "Case Studies", 15_000);
    await expect(
      page.getByText("Discover how we successfully", { exact: false })
    ).toBeVisible({ timeout: 10_000 });

    // === Case Studies CTA ===
    await page.waitForTimeout(200);
    await waitForHeading(page, "Solve What's Holding You Back", 15_000);
    await expect(
      page.getByText("Whether you're dealing with", { exact: false })
    ).toBeVisible({ timeout: 10_000 });

    // === Open Source Section ===
    await page.locator("#open-source").scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    await waitForHeading(page, "Open Source Product", 15_000);
    await expect(
      page.getByText("Explore our open-source", { exact: false })
    ).toBeVisible({ timeout: 10_000 });

    // === FAQs Section ===
    await safeScrollAndClick(page, "#faqs");
    await page.waitForTimeout(200);
    await waitForHeading(page, "Frequently asked questions", 15_000);
    await expect(
      page.getByText("Find answers to commonly", { exact: false })
    ).toBeVisible({ timeout: 10_000 });

    // === Location Section ===
    await safeScrollAndClick(page, "#location");
    await page.waitForTimeout(200);

    const locationHeading = await waitForHeading(page, "Our Location", 15_000);
    await expect(locationHeading).toBeVisible({ timeout: 10_000 });

    await expect(
      page.getByRole("heading", { name: "D.Lab Building (6th floor)" })
    ).toBeVisible({ timeout: 10_000 });
    await expect(
      page.getByText("Jl. Riau No. 1, Gondangdia,", { exact: false })
    ).toBeVisible({ timeout: 10_000 });
    await expect(
      page.getByText("Jakarta Pusat -", { exact: false })
    ).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText("Indonesia", { exact: true })).toBeVisible({
      timeout: 10_000
    });
    await expect(
      page.getByText("Email: solution@hyperjump.tech", { exact: false })
    ).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText(/D&B D-U-N-S:/, { exact: false })).toBeVisible({
      timeout: 10_000
    });
  });
});
