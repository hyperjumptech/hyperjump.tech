import { describe, expect, it } from "vitest";

import type { SupportedLanguage } from "@/locales/.generated/types";

import type { CommercialProduct } from "./data";
import { getFeaturedProducts } from "./get-featured-products";

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

describe("getFeaturedProducts", () => {
  it("returns products in featured-slug order", () => {
    // Setup
    const catalog = [
      fakeProduct("avenu", "Avenu"),
      fakeProduct("typetable", "TypeTable"),
      fakeProduct("hydra8", "Hydra8")
    ];

    // Act
    const result = getFeaturedProducts(lang, {
      getProducts: () => catalog,
      featuredSlugs: ["typetable", "hydra8", "avenu"]
    });

    // Assert
    expect(result.map((p) => p.slug)).toEqual(["typetable", "hydra8", "avenu"]);
  });

  it("skips unknown slugs", () => {
    // Setup
    const catalog = [fakeProduct("typetable", "TypeTable")];

    // Act
    const result = getFeaturedProducts(lang, {
      getProducts: () => catalog,
      featuredSlugs: ["typetable", "missing-product", "also-missing"]
    });

    // Assert
    expect(result).toHaveLength(1);
    expect(result[0]?.slug).toBe("typetable");
  });

  it("returns an empty list when featured slugs is empty", () => {
    // Setup
    const catalog = [fakeProduct("typetable", "TypeTable")];

    // Act
    const result = getFeaturedProducts(lang, {
      getProducts: () => catalog,
      featuredSlugs: []
    });

    // Assert
    expect(result).toEqual([]);
  });

  it("returns an empty list when catalog has no matches", () => {
    // Act
    const result = getFeaturedProducts(lang, {
      getProducts: () => [],
      featuredSlugs: ["typetable"]
    });

    // Assert
    expect(result).toEqual([]);
  });
});
