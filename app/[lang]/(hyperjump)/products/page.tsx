import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { BreadcrumbJsonLd, SoftwareApplicationJsonLd } from "next-seo";

import { Button } from "@/components/ui/button";
import dataJson from "@/data.json";
import { dynamicOpengraph } from "@/lib/default-metadata";
import {
  supportedLanguages,
  type SupportedLanguage
} from "@/locales/.generated/types";
import {
  productsHeroDesc,
  productsHeroHeading,
  productsLearnMore
} from "@/locales/.generated/strings";

import { AnimatedLines } from "../components/animated-lines";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem
} from "../components/motion-wrappers";

import type { CommercialProduct, OpenSourceProduct } from "./data";
import { getCommercialProduct, openSourceProducts } from "./data";
import { OSSSection } from "./oss-section";

const { url } = dataJson;

type LangProps = { lang: SupportedLanguage };
type ProductsProps = { params: Promise<LangProps> };

export const generateStaticParams = async () => {
  return supportedLanguages.map((lang) => ({ lang }));
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

export default async function ProductsPage({ params }: ProductsProps) {
  const { lang } = await params;
  const commercial = getCommercialProduct(lang);
  const oss = openSourceProducts(lang);
  const [featured, ...restCommercial] = commercial;
  const allProducts: (CommercialProduct | OpenSourceProduct)[] = [
    ...commercial,
    ...oss
  ];

  return (
    <main>
      {/* ── Premium Dark Hero + Featured Product ── */}
      <section className="bg-hero-premium relative overflow-hidden text-white">
        <div className="hero-glow animate-glow top-[12%] left-1/2 -translate-x-1/2" />
        <div className="hero-glow animate-glow -top-32 right-0 [animation-delay:1.5s]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />
        <AnimatedLines className="pointer-events-none absolute inset-0 h-full w-full opacity-30" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-20 xl:px-0">
          {/* Hero text */}
          <div className="flex flex-col items-center pt-40 pb-16 md:pt-48 md:pb-20">
            <SectionReveal>
              <div className="max-w-3xl text-center">
                <span className="mb-5 inline-block text-xs font-semibold tracking-[0.2em] text-yellow-300 uppercase">
                  Our Products
                </span>
                <h1
                  className="mb-6 text-4xl leading-[1.08] font-semibold tracking-tight md:text-6xl lg:text-[4.5rem]"
                  dangerouslySetInnerHTML={{
                    __html: productsHeroHeading(lang)
                  }}
                />
                <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-white/60 md:text-xl">
                  {productsHeroDesc(lang)}
                </p>
              </div>
            </SectionReveal>
          </div>

          {/* Featured Product */}
          {featured && (
            <div className="group/featured relative pb-20 md:pb-28">
              <div className="hero-glow animate-glow right-0 bottom-0 h-[500px]! w-[500px]! [animation-delay:2s]" />
              <span className="pointer-events-none absolute top-0 right-0 hidden text-[11rem] leading-none font-bold text-white/3 select-none lg:block">
                01
              </span>

              <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-12 lg:gap-16">
                <SectionReveal className="w-full md:w-1/2">
                  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur-sm">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.04] hover:scale-110"
                      width={660}
                      height={400}
                    />
                  </div>
                </SectionReveal>

                <SectionReveal delay={0.15} className="w-full md:w-1/2">
                  <div className="w-fit">
                    <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                      {featured.title}
                    </h2>
                    <div className="from-hyperjump-blue to-hyperjump-teal mt-3 mb-6 h-1 w-12 rounded-full bg-linear-to-r transition-all duration-500 ease-out group-hover/featured:w-full" />
                  </div>
                  <p
                    className="mb-8 text-base leading-relaxed text-white/60 md:text-lg"
                    dangerouslySetInnerHTML={{
                      __html: featured.description
                    }}
                  />
                  <Button
                    asChild
                    className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 h-12 rounded-full px-8 text-base font-semibold text-white shadow-lg shadow-[#635BFF]/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#635BFF]/30">
                    <Link
                      href={featured.urlLearnMore}
                      target="_blank"
                      rel="noopener noreferrer">
                      {productsLearnMore(lang)}
                      <ArrowUpRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </SectionReveal>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Remaining Commercial Products ── */}
      {restCommercial.length > 0 && (
        <section className="relative overflow-hidden bg-white">
          <span
            className="pointer-events-none absolute top-4 right-6 hidden text-[11rem] leading-none font-bold select-none lg:block"
            style={{ color: "rgba(99,91,255,0.04)" }}>
            02
          </span>
          <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 md:px-20 md:py-28 xl:px-0">
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {restCommercial.map((product) => (
                <StaggerItem key={product.title}>
                  <CommercialCard product={product} lang={lang} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ── Open Source Products ── */}
      <OSSSection products={oss} />

      {/* ── JSON-LD ── */}
      <JsonLd lang={lang} products={allProducts} />
    </main>
  );
}

type CommercialCardProps = {
  product: CommercialProduct;
  lang: SupportedLanguage;
};

/**
 * Premium card for a commercial product with image, description, and CTA link.
 * Features hover lift, shadow glow, and image zoom micro-interactions.
 */
function CommercialCard({ product, lang }: CommercialCardProps) {
  return (
    <div className="group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/6 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#635BFF]/8">
      <div className="bg-hyperjump-surface flex aspect-[16/9] items-center justify-center overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain transition-transform duration-700 group-hover/card:scale-[1.06]"
          width={400}
          height={225}
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-hyperjump-black text-xl font-semibold tracking-tight">
          {product.title}
        </h3>
        <div className="from-hyperjump-blue to-hyperjump-teal mt-2 mb-4 h-1 w-10 rounded-full bg-linear-to-r transition-all duration-500 ease-out group-hover/card:w-full" />
        <p
          className="text-hyperjump-gray mb-6 flex-1 text-[15px] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
        <Link
          href={product.urlLearnMore}
          target="_blank"
          rel="noopener noreferrer"
          className="text-hyperjump-blue inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 hover:gap-2.5">
          {productsLearnMore(lang)}
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

type JsonLdProps = {
  products: (CommercialProduct | OpenSourceProduct)[];
  lang: SupportedLanguage;
};

function JsonLd({ lang, products }: JsonLdProps) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: `${url}/${lang}` },
          { name: "Products", item: `${url}/${lang}/products` }
        ]}
      />
      {products.map(({ description, image, title, ...product }) => (
        <SoftwareApplicationJsonLd
          applicationCategory="BusinessApplication"
          description={description}
          image={`${url}${image}`}
          key={title}
          name={title}
          operatingSystem="Web"
          url={
            (product as CommercialProduct)?.urlLearnMore ||
            (product as OpenSourceProduct)?.url
          }
        />
      ))}
    </>
  );
}
