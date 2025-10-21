import type { Metadata } from "next";

import { GridItems } from "@/app/components/grid-items";
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
    <main className="pb-10">
      <Hero
        subtitle={productsHeroDesc(lang)}
        title={productsHeroHeading(lang)}
      />
      <section
        id="commercial-product"
        className="mx-auto max-w-5xl px-4 md:-mt-5 md:px-20 xl:px-0">
        <GridItems
          items={[...getCommercialProduct(lang), ...getOpenSource(lang)]}
          columns={{ base: 1, sm: 2, md: 2, lg: 3 }}
          cardClassName="rounded"
          lang={lang}
        />
      </section>
    </main>
  );
}
