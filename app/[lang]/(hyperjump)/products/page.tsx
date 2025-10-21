import type { Metadata } from "next";

import GridItemsContainer, { GridItems } from "@/app/components/grid-items";
import { Hero } from "@/app/components/hero";
import { dynamicOpengraph } from "@/lib/default-metadata";
import {
  supportedLanguages,
  type SupportedLanguage
} from "@/locales/.generated/types";
import {
  productsHeroDesc,
  productsHeroHeading
} from "@/locales/.generated/server";

import { getCommercialProduct, getOpenSource } from "./data";

export const generateStaticParams = async () => {
  return supportedLanguages.map((lang) => ({ lang }));
};

type ProductsProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export async function generateMetadata({
  params
}: ProductsProps): Promise<Metadata> {
  const { lang } = await params;

  const meta = {
    title: productsHeroHeading(lang),
    description: productsHeroDesc(lang),
    alternates: {
      canonical: `https://hyperjump.tech/${lang}/products`,
      languages: supportedLanguages.reduce(
        (acc, l) => {
          acc[l] = `https://hyperjump.tech/${l}/products`;
          return acc;
        },
        {} as Record<string, string>
      )
    }
  };

  return dynamicOpengraph(meta);
}

export default async function productsPage({ params }: ProductsProps) {
  const { lang } = await params;

  return (
    <main className="bg-white">
      <Hero
        subtitle={productsHeroDesc(lang)}
        title={productsHeroHeading(lang)}
      />
      <div className="xxl:max-w-7xl mx-auto -mt-10 flex w-full max-w-6xl flex-wrap items-center justify-center px-2 py-6 md:-mt-24 md:px-20 xl:px-0">
        <GridItemsContainer id="commercial-product">
          <GridItems
            items={[...getCommercialProduct(lang), ...getOpenSource(lang)]}
            columns={{ base: 1, sm: 2, lg: 3 }}
            cardClassName="rounded"
            lang={lang}
          />
        </GridItemsContainer>
      </div>
    </main>
  );
}
