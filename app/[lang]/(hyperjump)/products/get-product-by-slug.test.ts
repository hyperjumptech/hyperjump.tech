import { describe, expect, it } from "vitest";

import type { SupportedLanguage } from "@/locales/.generated/types";

import type { CommercialProduct } from "./data";
import { getProductBySlug } from "./get-product-by-slug";

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

describe("getProductBySlug", () => {
  it("returns the product matching the slug", () => {
    // Setup
    const catalog = [
      fakeProduct("typetable", "TypeTable"),
      fakeProduct("frontier-news", "Frontier News")
    ];

    // Act
    const result = getProductBySlug(lang, "frontier-news", {
      getProducts: () => catalog
    });

    // Assert
    expect(result).toEqual(catalog[1]);
  });

  it("returns undefined when the slug is missing", () => {
    // Setup
    const catalog = [fakeProduct("typetable", "TypeTable")];

    // Act
    const result = getProductBySlug(lang, "frontier-news", {
      getProducts: () => catalog
    });

    // Assert
    expect(result).toBeUndefined();
  });

  it("returns undefined when the catalog is empty", () => {
    // Act
    const result = getProductBySlug(lang, "frontier-news", {
      getProducts: () => []
    });

    // Assert
    expect(result).toBeUndefined();
  });
});
