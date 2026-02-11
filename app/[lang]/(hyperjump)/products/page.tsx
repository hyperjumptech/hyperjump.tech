import type { Metadata } from "next";
import type {
  BreadcrumbList,
  SoftwareApplication,
  WithContext
} from "schema-dts";

import { GridItems } from "@/app/components/grid-items";
import { Hero } from "@/app/components/hero";
import dataJson from "@/data.json";
import { dynamicOpengraph } from "@/lib/default-metadata";
import {
  supportedLanguages,
  type SupportedLanguage
} from "@/locales/.generated/types";
import {
  productsHeroDesc,
  productsHeroHeading
} from "@/locales/.generated/strings";

import {
  CommercialProduct,
  getCommercialProduct,
  OpenSourceProduct,
  openSourceProducts
} from "./data";

const { url } = dataJson;

export const generateStaticParams = async () => {
  return supportedLanguages.map((lang) => ({ lang }));
};

type LangProps = {
  lang: SupportedLanguage;
};

type ProductsProps = {
  params: Promise<LangProps>;
};

export async function generateMetadata({
  params
}: ProductsProps): Promise<Metadata> {
  const { lang } = await params;
  const meta: Metadata = {
    title: productsHeroHeading(lang),
    description: productsHeroDesc(lang),
    alternates: {
      canonical: `${url}/${lang}/products`,
      languages: supportedLanguages.reduce(
        (acc, l) => {
          acc[l] = `${url}/${l}/products`;
          return acc;
        },
        {} as Record<string, string>
      )
    }
  };

  return dynamicOpengraph(meta);
}

type Product = CommercialProduct | OpenSourceProduct;

export default async function productsPage({ params }: ProductsProps) {
  const { lang } = await params;
  const products: Product[] = [
    ...getCommercialProduct(lang),
    ...openSourceProducts(lang)
  ];

  return (
    <main className="pb-10">
      <Hero
        subtitle={productsHeroDesc(lang)}
        title={productsHeroHeading(lang)}
      />
      <section className="mx-auto max-w-5xl px-4 md:-mt-5 md:px-20 xl:px-0">
        <GridItems
          items={products}
          columns={{ base: 1, sm: 2, md: 2, lg: 3 }}
          cardClassName="rounded"
          lang={lang}
        />
      </section>
      <JsonLd lang={lang} products={products} />
    </main>
  );
}

type JsonLdProps = {
  products: Product[];
} & LangProps;

function JsonLd({ lang, products }: JsonLdProps) {
  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${url}/${lang}`
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${url}/${lang}/products`
      }
    ]
  };
  const softwareApplicationsJsonLd = products.map(
    ({ description, image, title, ...product }) =>
      ({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: title,
        description: description,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url:
          (product as CommercialProduct)?.urlLearnMore ||
          (product as OpenSourceProduct)?.url,
        image: `${url}${image}`
      }) as WithContext<SoftwareApplication>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {softwareApplicationsJsonLd.map((app, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }}
        />
      ))}
    </>
  );
}
