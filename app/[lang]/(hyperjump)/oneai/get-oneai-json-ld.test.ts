import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  getDefaultOneaiFaqs,
  getOneaiJsonLd,
  ONEAI_OG_IMAGE_PATH
} from "./get-oneai-json-ld";

/**
 * Reads width and height from a PNG file's IHDR chunk.
 *
 * @param buffer - PNG file bytes
 * @returns Pixel dimensions
 */
function getPngSize(buffer: Buffer) {
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

describe("getDefaultOneaiFaqs", () => {
  it("returns five localized FAQ entries for English", () => {
    const faqs = getDefaultOneaiFaqs("en");

    expect(faqs).toHaveLength(5);
    expect(faqs[0]?.question).toContain("users");
  });

  it("returns five localized FAQ entries for Indonesian", () => {
    const faqs = getDefaultOneaiFaqs("id");

    expect(faqs).toHaveLength(5);
    expect(faqs[0]?.question).toContain("pengguna");
  });
});

describe("getOneaiJsonLd", () => {
  const siteUrl = "https://hyperjump.tech";
  const pageUrl = `${siteUrl}/en/oneai`;

  it("builds breadcrumb, product, and FAQ graphs", () => {
    const graph = getOneaiJsonLd({
      lang: "en",
      pageUrl,
      siteUrl,
      getTitle: () => "OneAI — Unified Enterprise AI",
      getDescription: () => "One controlled AI platform.",
      getFaqs: () => [
        { question: "Q1", answer: "A1" },
        { question: "Q2", answer: "A2" }
      ]
    });

    expect(graph["@graph"]).toHaveLength(3);

    const breadcrumb = graph["@graph"][0];
    expect(breadcrumb["@type"]).toBe("BreadcrumbList");
    expect(breadcrumb.itemListElement).toHaveLength(2);

    const product = graph["@graph"][1];
    expect(product["@type"]).toBe("SoftwareApplication");
    expect(product.name).toBe("OneAI");
    expect(product.image).toBe(`${siteUrl}${ONEAI_OG_IMAGE_PATH}`);
    expect(product.offers.price).toBe("12400000");
    expect(product.offers.priceCurrency).toBe("IDR");

    const faqPage = graph["@graph"][2];
    expect(faqPage["@type"]).toBe("FAQPage");
    expect(faqPage.mainEntity).toHaveLength(2);
  });

  it("uses Indonesian breadcrumb label for id locale", () => {
    const graph = getOneaiJsonLd({
      lang: "id",
      pageUrl: `${siteUrl}/id/oneai`,
      siteUrl
    });

    const breadcrumb = graph["@graph"][0];
    expect(breadcrumb.itemListElement[0].name).toBe("Beranda");
  });
});

describe("ONEAI_OG_IMAGE_PATH", () => {
  it("points to a 1200x630 PNG in public/", () => {
    expect(ONEAI_OG_IMAGE_PATH).toBe("/images/oneai/og.png");

    const ogPng = readFileSync(
      join(process.cwd(), "public", ONEAI_OG_IMAGE_PATH.replace(/^\//, ""))
    );

    expect(getPngSize(ogPng)).toEqual({ width: 1200, height: 630 });
  });

  it("reads IHDR dimensions from a PNG buffer", () => {
    const png = Buffer.alloc(24);
    png.writeUInt32BE(1600, 16);
    png.writeUInt32BE(900, 20);

    expect(getPngSize(png)).toEqual({ width: 1600, height: 900 });
  });
});
