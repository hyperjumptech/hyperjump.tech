import {
  supportedLanguages,
  type SupportedLanguage
} from "@/locales/.generated/types";
import {
  mainViewMore,
  ourProductsCommercialDescription,
  ourProductsCommercialHeading,
  ourProductsHeroDesc,
  ourProductsHeroHeading,
  ourProductsOpenSourceDescription,
  ourProductsOpenSourceHeading
} from "@/locales/.generated/server";
import { Metadata } from "next";
import { dynamicOpengraph } from "@/lib/default-metadata";
import GridItemsContainer, {
  GridItems,
  GridItemsMoreButton,
  GridItemsTitle
} from "@/app/components/grid-items";
import { getCommercialProduct, getOpenSource } from "./data";
import data from "@/data.json";

export const generateStaticParams = async () => {
  return supportedLanguages.map((lang) => ({ lang }));
};

type OurProductsProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export async function generateMetadata({
  params
}: OurProductsProps): Promise<Metadata> {
  const { lang } = await params;

  const meta = {
    title: `Our Products - ${ourProductsHeroHeading(lang)}`,
    description: ourProductsHeroDesc(lang),
    alternates: {
      canonical: `https://hyperjump.tech/${lang}/our-products`,
      languages: supportedLanguages.reduce(
        (acc, l) => {
          acc[l] = `https://hyperjump.tech/${l}/our-products`;
          return acc;
        },
        {} as Record<string, string>
      )
    }
  };

  return dynamicOpengraph(meta);
}

export default async function OurProductsPage({ params }: OurProductsProps) {
  const { lang } = await params;

  return (
    <main className="bg-white">
      <Hero lang={lang} />
      <div className="xxl:max-w-7xl mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center px-4 pb-6 md:px-20 xl:px-0">
        <ProductCommercial lang={lang} />
        <OpenSourceProducts lang={lang} />
      </div>
    </main>
  );
}

function Hero({ lang }: { lang: SupportedLanguage }) {
  return (
    <section
      id="hero"
      className="bg-services-hero text-hyperjump-black relative h-[451px] w-full px-4 text-center">
      <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center pt-12">
        <h1
          className="text-hyperjump-black mb-4 text-3xl font-medium sm:text-4xl md:text-[40px]"
          dangerouslySetInnerHTML={{
            __html: ourProductsHeroHeading(lang)
          }}
        />
        <p className="text-hyperjump-gray text-base sm:text-lg">
          {ourProductsHeroDesc(lang)}
        </p>
      </div>
    </section>
  );
}

function ProductCommercial({ lang }: { lang: SupportedLanguage }) {
  const projects = getCommercialProduct(lang);

  return (
    <GridItemsContainer id="commercial-product">
      <GridItemsTitle
        layout="vertical"
        className="-mt-10"
        title={ourProductsCommercialHeading(lang)}
        description={ourProductsCommercialDescription(lang)}
      />
      <GridItems
        items={projects}
        columns={{ base: 1, sm: 2, lg: 3 }}
        cardClassName="rounded"
        lang={lang}
      />
    </GridItemsContainer>
  );
}

function OpenSourceProducts({ lang }: { lang: SupportedLanguage }) {
  const projects = getOpenSource(lang);

  return (
    <GridItemsContainer id="open-source">
      <GridItemsTitle
        layout="vertical"
        title={ourProductsOpenSourceHeading(lang)}
        description={ourProductsOpenSourceDescription(lang)}
      />
      <GridItems
        items={projects}
        columns={{ base: 1, sm: 2, lg: 3 }}
        cardClassName="rounded"
        lang={lang}
      />
      <GridItemsMoreButton
        text={mainViewMore(lang)}
        variant="outline"
        href={data.github}
      />
    </GridItemsContainer>
  );
}
