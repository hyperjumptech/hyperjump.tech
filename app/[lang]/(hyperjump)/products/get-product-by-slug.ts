import type { SupportedLanguage } from "@/locales/.generated/types";

import { getCommercialProduct, type CommercialProduct } from "./data";

type GetProducts = (lang: SupportedLanguage) => CommercialProduct[];

type GetProductBySlugOptions = {
  /** Catalog loader; defaults to production commercial products. */
  getProducts?: GetProducts;
};

/**
 * Returns a commercial product matching the given slug, or undefined if missing.
 *
 * @param lang - Active locale passed to the product catalog loader
 * @param slug - Product slug to look up
 * @param options - Optional DI overrides for the catalog loader
 */
export function getProductBySlug(
  lang: SupportedLanguage,
  slug: string,
  { getProducts = getCommercialProduct }: GetProductBySlugOptions = {}
): CommercialProduct | undefined {
  return getProducts(lang).find((product) => product.slug === slug);
}
