import type { Metadata } from "next";
import Link from "next/link";
import { MailIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import data from "@/data.json";
import { dynamicOpengraph } from "@/lib/default-metadata";
import {
  supportedLanguages,
  type SupportedLanguage
} from "@/locales/.generated/types";
import {
  oneaiCapabilities0Text,
  oneaiCapabilities0Title,
  oneaiCapabilities1Text,
  oneaiCapabilities1Title,
  oneaiCapabilities2Text,
  oneaiCapabilities2Title,
  oneaiCapabilities3Text,
  oneaiCapabilities3Title,
  oneaiCapabilities4Text,
  oneaiCapabilities4Title,
  oneaiCapabilities5Text,
  oneaiCapabilities5Title,
  oneaiCapabilitiesLabel,
  oneaiCloseCtaCta,
  oneaiCloseCtaDesc,
  oneaiCloseCtaHeading,
  oneaiFaqDesc,
  oneaiFaqHeading,
  oneaiHeroCta,
  oneaiHeroEyebrow,
  oneaiHeroHeading,
  oneaiHeroLede,
  oneaiHeroTagline,
  oneaiHeroProofs0,
  oneaiHeroProofs1,
  oneaiHeroProofs2,
  oneaiMailtoBody,
  oneaiMailtoSubject,
  oneaiMetaDescription,
  oneaiMetaTitle,
  oneaiPillars0Kicker,
  oneaiPillars0Text,
  oneaiPillars0Title,
  oneaiPillars1Kicker,
  oneaiPillars1Text,
  oneaiPillars1Title,
  oneaiPillars2Kicker,
  oneaiPillars2Text,
  oneaiPillars2Title,
  oneaiPillarsLabel,
  oneaiPricingAnnual,
  oneaiPricingCompareItems0,
  oneaiPricingCompareItems1,
  oneaiPricingCompareItems2,
  oneaiPricingCompareItems3,
  oneaiPricingCompareKicker,
  oneaiPricingCompareTitle,
  oneaiPricingCta,
  oneaiPricingIncludes,
  oneaiPricingLabel,
  oneaiPricingPrice,
  oneaiPricingPriceUnit,
  oneaiPricingQuarterly,
  oneaiStickyCta
} from "@/locales/.generated/strings";

import { AnimatedLines } from "../components/animated-lines";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem
} from "../components/motion-wrappers";
import { buildOneaiMailto } from "./build-oneai-mailto";
import {
  getDefaultOneaiFaqs,
  getOneaiJsonLd,
  ONEAI_OG_IMAGE_PATH
} from "./get-oneai-json-ld";
import { OneaiComparisonSection } from "./oneai-comparison-section";
import { OneaiHeroVisual } from "./oneai-hero-visual";
import { OneaiStickyCta } from "./oneai-sticky-cta";

const { url } = data;
const OG_IMAGE = `${url}${ONEAI_OG_IMAGE_PATH}`;

type LangProps = { lang: SupportedLanguage };
type OneaiPageProps = { params: Promise<LangProps> };

export const generateStaticParams = async () => {
  return supportedLanguages.map((lang) => ({ lang }));
};

/**
 * Builds locale-specific metadata with canonical URLs and custom OG image.
 */
export async function generateMetadata({
  params
}: OneaiPageProps): Promise<Metadata> {
  const { lang } = await params;
  const pageUrl = `${url}/${lang}/oneai`;
  const pageTitle = oneaiMetaTitle(lang);
  const pageDescription = oneaiMetaDescription(lang);

  const meta: Metadata = {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: pageUrl,
      languages: supportedLanguages.reduce(
        (acc, locale) => {
          acc[locale] = `${url}/${locale}/oneai`;
          return acc;
        },
        {} as Record<string, string>
      )
    },
    openGraph: {
      url: pageUrl,
      locale: lang === "id" ? "id_ID" : "en_US",
      alternateLocale: lang === "id" ? ["en_US"] : ["id_ID"]
    }
  };

  return dynamicOpengraph({
    ...meta,
    image: {
      url: OG_IMAGE,
      width: 1200,
      height: 630,
      alt: pageTitle
    }
  });
}

/**
 * OneAI enterprise promo landing page with bilingual copy and mailto CTAs.
 */
export default async function OneaiPage({ params }: OneaiPageProps) {
  const { lang } = await params;
  const mailtoHref = buildOneaiMailto({
    subject: oneaiMailtoSubject(lang),
    body: oneaiMailtoBody(lang)
  });
  const pageUrl = `${url}/${lang}/oneai`;
  const jsonLd = getOneaiJsonLd({ lang, pageUrl, siteUrl: url });
  const faqs = getDefaultOneaiFaqs(lang);
  const heroProofs = [
    oneaiHeroProofs0(lang),
    oneaiHeroProofs1(lang),
    oneaiHeroProofs2(lang)
  ];
  const pillars = [
    {
      kicker: oneaiPillars0Kicker(lang),
      title: oneaiPillars0Title(lang),
      text: oneaiPillars0Text(lang)
    },
    {
      kicker: oneaiPillars1Kicker(lang),
      title: oneaiPillars1Title(lang),
      text: oneaiPillars1Text(lang)
    },
    {
      kicker: oneaiPillars2Kicker(lang),
      title: oneaiPillars2Title(lang),
      text: oneaiPillars2Text(lang)
    }
  ];
  const capabilities = [
    {
      title: oneaiCapabilities0Title(lang),
      text: oneaiCapabilities0Text(lang)
    },
    {
      title: oneaiCapabilities1Title(lang),
      text: oneaiCapabilities1Text(lang)
    },
    {
      title: oneaiCapabilities2Title(lang),
      text: oneaiCapabilities2Text(lang)
    },
    {
      title: oneaiCapabilities3Title(lang),
      text: oneaiCapabilities3Text(lang)
    },
    {
      title: oneaiCapabilities4Title(lang),
      text: oneaiCapabilities4Text(lang)
    },
    {
      title: oneaiCapabilities5Title(lang),
      text: oneaiCapabilities5Text(lang)
    }
  ];
  const compareItems = [
    oneaiPricingCompareItems0(lang),
    oneaiPricingCompareItems1(lang),
    oneaiPricingCompareItems2(lang),
    oneaiPricingCompareItems3(lang)
  ];

  return (
    <main className="pb-24 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        id="hero"
        className="bg-hero-premium relative overflow-hidden text-white">
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

        <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-20 xl:px-0">
          <div className="flex flex-col gap-12 pt-40 pb-16 lg:flex-row lg:items-center lg:pt-48 lg:pb-24">
            <SectionReveal className="w-full lg:w-[42%]">
              <div className="max-w-xl">
                <span className="mb-5 inline-block text-xs font-semibold tracking-[0.2em] text-yellow-300 uppercase">
                  {oneaiHeroEyebrow(lang)}
                </span>
                <h1 className="mb-6 text-4xl leading-[1.08] font-semibold tracking-tight md:text-6xl lg:text-[4.5rem]">
                  {oneaiHeroHeading(lang)}
                </h1>
                <p className="mb-8 text-lg leading-relaxed font-medium text-white/60 md:text-xl">
                  {oneaiHeroLede(lang)}
                </p>
                <ul className="mb-8 space-y-3">
                  {heroProofs.map((proof) => (
                    <li
                      key={proof}
                      className="flex items-center gap-3 text-sm font-medium text-white/80 md:text-base">
                      <span className="bg-hyperjump-teal h-2 w-2 shrink-0 rounded-full" />
                      {proof}
                    </li>
                  ))}
                </ul>
                <p
                  className="mb-5 inline-block rounded-lg bg-yellow-300/15 px-3 py-1.5 text-base font-semibold text-yellow-100 ring-1 ring-yellow-300/35 ring-inset md:text-[17px]"
                  data-testid="oneai-hero-tagline">
                  {oneaiHeroTagline(lang)}
                </p>
                <Button
                  asChild
                  className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 hidden h-12 rounded-full px-8 text-base font-semibold shadow-lg shadow-[#635BFF]/25 md:inline-flex">
                  <Link href={mailtoHref} data-testid="oneai-hero-cta">
                    <MailIcon className="mr-2 h-4 w-4" aria-hidden />
                    {oneaiHeroCta(lang)}
                  </Link>
                </Button>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.15} className="w-full lg:w-[58%]">
              <OneaiHeroVisual
                lang={lang}
                productName={oneaiHeroHeading(lang)}
              />
            </SectionReveal>
          </div>
        </div>
      </section>

      <OneaiStickyCta href={mailtoHref} label={oneaiStickyCta(lang)} />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-20 xl:px-0">
          <SectionReveal>
            <h2 className="text-hyperjump-black mb-10 text-center text-3xl font-semibold tracking-tight md:text-4xl">
              {oneaiPillarsLabel(lang)}
            </h2>
          </SectionReveal>
          <StaggerContainer className="grid gap-6 md:grid-cols-3">
            {pillars.map(({ kicker, text, title }) => (
              <StaggerItem key={title}>
                <article className="border-hyperjump-blue/10 h-full rounded-2xl border bg-[#F6F8F9] p-7 shadow-sm">
                  <p className="text-hyperjump-blue mb-3 text-xs font-bold tracking-[0.16em] uppercase">
                    {kicker}
                  </p>
                  <h3 className="text-hyperjump-black mb-3 text-xl font-semibold">
                    {title}
                  </h3>
                  <p className="text-hyperjump-gray text-[15px] leading-relaxed">
                    {text}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-[#F6F8F9] py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-20 xl:px-0">
          <SectionReveal>
            <h2 className="text-hyperjump-black mb-10 text-center text-3xl font-semibold tracking-tight md:text-4xl">
              {oneaiCapabilitiesLabel(lang)}
            </h2>
          </SectionReveal>
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ text, title }) => (
              <StaggerItem key={title}>
                <article className="h-full rounded-2xl border border-black/6 bg-white p-6 shadow-sm">
                  <h3 className="text-hyperjump-black mb-2 text-lg font-semibold">
                    {title}
                  </h3>
                  <div className="from-hyperjump-blue to-hyperjump-teal mb-4 h-1 w-10 rounded-full bg-linear-to-r" />
                  <p className="text-hyperjump-gray text-[15px] leading-relaxed">
                    {text}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section
        id="pricing"
        data-testid="oneai-pricing"
        className="bg-cta-premium relative overflow-hidden py-16 text-white md:py-24">
        <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-20 xl:px-0">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <SectionReveal>
              <p className="text-hyperjump-teal mb-4 text-xs font-bold tracking-[0.16em] uppercase">
                {oneaiPricingLabel(lang)}
              </p>
              <p
                className="mb-2 text-4xl font-bold tracking-tight md:text-5xl"
                data-testid="oneai-price">
                {oneaiPricingPrice(lang)}
                <span className="ml-2 text-lg font-medium text-white/70">
                  {oneaiPricingPriceUnit(lang)}
                </span>
              </p>
              <p className="mb-4 text-base text-white/75">
                {oneaiPricingQuarterly(lang)}
              </p>
              <span className="bg-hyperjump-blue/20 text-hyperjump-teal mb-6 inline-block rounded-full px-4 py-1.5 text-sm font-semibold">
                {oneaiPricingAnnual(lang)}
              </span>
              <p className="mb-8 text-sm leading-relaxed text-white/60">
                {oneaiPricingIncludes(lang)}
              </p>
              <Button
                asChild
                className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 h-12 rounded-full px-8 text-base font-semibold">
                <Link href={mailtoHref} data-testid="oneai-pricing-cta">
                  <MailIcon className="mr-2 h-4 w-4" aria-hidden />
                  {oneaiPricingCta(lang)}
                </Link>
              </Button>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <p className="text-hyperjump-teal mb-3 text-xs font-bold tracking-[0.16em] uppercase">
                {oneaiPricingCompareKicker(lang)}
              </p>
              <h2 className="mb-6 text-2xl font-semibold md:text-3xl">
                {oneaiPricingCompareTitle(lang)}
              </h2>
              <ul className="space-y-4">
                {compareItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-white/10 pb-4 text-white/85 last:border-0">
                    <span className="mt-2 h-0.5 w-4 shrink-0 bg-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </SectionReveal>
          </div>
        </div>
      </section>

      <OneaiComparisonSection lang={lang} />

      <section
        id="faqs"
        data-testid="oneai-faq-section"
        className="bg-white px-4 py-16 md:px-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <SectionReveal>
            <h2 className="text-hyperjump-black mb-3 text-center text-3xl font-semibold md:text-4xl">
              {oneaiFaqHeading(lang)}
            </h2>
            <p className="text-hyperjump-gray mx-auto mb-10 max-w-2xl text-center text-lg">
              {oneaiFaqDesc(lang)}
            </p>
          </SectionReveal>
          <Accordion
            type="single"
            collapsible
            className="space-y-4"
            data-testid="oneai-faq-accordion">
            {faqs.map(({ answer, question }, index) => (
              <AccordionItem
                key={question}
                value={`oneai-faq-${index}`}
                asChild>
                <div className="rounded-xl border border-gray-200 bg-white px-6 py-2 shadow-xs">
                  <AccordionTrigger className="text-left text-lg font-medium text-[#020F15] hover:no-underline">
                    {question}
                  </AccordionTrigger>
                  <AccordionContent className="text-hyperjump-gray text-base leading-relaxed">
                    {answer}
                  </AccordionContent>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-[#F6F8F9] px-4 py-16 md:px-20 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <SectionReveal>
            <h2 className="text-hyperjump-black mb-4 text-3xl font-semibold md:text-4xl">
              {oneaiCloseCtaHeading(lang)}
            </h2>
            <p className="text-hyperjump-gray mx-auto mb-8 max-w-xl text-lg">
              {oneaiCloseCtaDesc(lang)}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 h-12 rounded-full px-8 text-base font-semibold">
              <Link href={mailtoHref} data-testid="oneai-close-cta">
                <MailIcon className="mr-2 h-4 w-4" aria-hidden />
                {oneaiCloseCtaCta(lang)}
              </Link>
            </Button>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
