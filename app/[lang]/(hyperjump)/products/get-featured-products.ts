import type { SupportedLanguage } from "@/locales/.generated/types";

import {
  FEATURED_PRODUCT_SLUGS,
  getCommercialProduct,
  type CommercialProduct
} from "./data";

type GetProducts = (lang: SupportedLanguage) => CommercialProduct[];

type GetFeaturedProductsOptions = {
  /** Catalog loader; defaults to production commercial products. */
  getProducts?: GetProducts;
  /** Ordered slugs to feature; defaults to FEATURED_PRODUCT_SLUGS. */
  featuredSlugs?: readonly string[];
};

/**
 * Returns commercial products selected for the homepage, in featured-slug order.
 * Unknown slugs are skipped.
 *
 * @param lang - Active locale passed to the product catalog loader
 * @param options - Optional DI overrides for catalog and featured slug list
 */
export function getFeaturedProducts(
  lang: SupportedLanguage,
  {
    getProducts = getCommercialProduct,
    featuredSlugs = FEATURED_PRODUCT_SLUGS
  }: GetFeaturedProductsOptions = {}
): CommercialProduct[] {
  const bySlug = new Map(
    getProducts(lang).map((product) => [product.slug, product])
  );

  return featuredSlugs.flatMap((slug) => {
    const product = bySlug.get(slug);
    return product ? [product] : [];
  });
}
