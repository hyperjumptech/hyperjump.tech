import { describe, expect, it } from "vitest";

import type { SupportedLanguage } from "@/locales/.generated/types";

import type { CommercialProduct } from "./data";
import {
  getProductsPageCommercialProducts,
  PRODUCTS_PAGE_EXCLUDED_SLUGS
} from "./get-products-page-commercial-products";

const lang: SupportedLanguage = "en";

/**
 * Builds a minimal commercial product for tests.
 *
 * @param slug - Product slug
 * @param title - Display title
 */
function fakeProduct(slug: string, title: string): CommercialProduct {
  return {
    slug,
    title,
    description: `${title} description`,
    image: `/images/products/${slug}.svg`,
    urlLearnMore: `https://example.com/${slug}`
  };
}

describe("getProductsPageCommercialProducts", () => {
  it("omits Avenu, StartGPT, and TypeTable and keeps the remaining products in order", () => {
    // Setup
    const catalog = [
      fakeProduct("oneai", "OneAI"),
      fakeProduct("avenu", "Avenu"),
      fakeProduct("typetable", "TypeTable"),
      fakeProduct("startgpt", "StartGPT"),
      fakeProduct("hydra8", "Hydra8")
    ];

    // Act
    const result = getProductsPageCommercialProducts(lang, {
      getProducts: () => catalog
    });

    // Assert
    expect(result.map((product) => product.slug)).toEqual(["oneai", "hydra8"]);
  });

  it("returns every product when the exclusion list is empty", () => {
    // Setup
    const catalog = [
      fakeProduct("avenu", "Avenu"),
      fakeProduct("startgpt", "StartGPT")
    ];

    // Act
    const result = getProductsPageCommercialProducts(lang, {
      getProducts: () => catalog,
      excludedSlugs: []
    });

    // Assert
    expect(result).toEqual(catalog);
  });

  it("returns an empty list when the catalog is empty", () => {
    // Act
    const result = getProductsPageCommercialProducts(lang, {
      getProducts: () => [],
      excludedSlugs: PRODUCTS_PAGE_EXCLUDED_SLUGS
    });

    // Assert
    expect(result).toEqual([]);
  });

  it("omits Avenu, StartGPT, and TypeTable from the production catalog", () => {
    // Act
    const result = getProductsPageCommercialProducts(lang);

    // Assert
    const slugs = result.map((product) => product.slug);
    expect(slugs).not.toContain("avenu");
    expect(slugs).not.toContain("startgpt");
    expect(slugs).not.toContain("typetable");
    expect(slugs).toContain("oneai");
    expect(slugs).toContain("searchpoint");
    expect(slugs).toContain("hydra8");
  });
});
