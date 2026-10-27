import type { SupportedLanguage } from "@/locales/.generated/types";

import { getCommercialProduct, type CommercialProduct } from "./data";

/** Product slugs omitted from the products page. */
export const PRODUCTS_PAGE_EXCLUDED_SLUGS = [
  "avenu",
  "startgpt",
  "typetable"
] as const;

type GetProducts = (lang: SupportedLanguage) => CommercialProduct[];

type GetProductsPageCommercialProductsOptions = {
  /** Catalog loader; defaults to production commercial products. */
  getProducts?: GetProducts;
  /** Slugs to omit; defaults to PRODUCTS_PAGE_EXCLUDED_SLUGS. */
  excludedSlugs?: readonly string[];
};

/**
 * Returns commercial products for the products page, omitting excluded slugs.
 *
 * @param lang - Active locale passed to the product catalog loader
 * @param options - Optional DI overrides for the catalog and excluded slugs
 * @returns Commercial products in catalog order, without excluded slugs
 */
export function getProductsPageCommercialProducts(
  lang: SupportedLanguage,
  {
    getProducts = getCommercialProduct,
    excludedSlugs = PRODUCTS_PAGE_EXCLUDED_SLUGS
  }: GetProductsPageCommercialProductsOptions = {}
): CommercialProduct[] {
  const excluded = new Set<string>(excludedSlugs);

  return getProducts(lang).filter((product) => !excluded.has(product.slug));
}
