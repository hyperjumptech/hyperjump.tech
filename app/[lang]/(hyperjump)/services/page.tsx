import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import { BreadcrumbJsonLd } from "next-seo";

import { Button } from "@/components/ui/button";
import data from "@/data.json";
import { dynamicOpengraph } from "@/lib/default-metadata";
import { cn } from "@/lib/utils";
import {
  supportedLanguages,
  type SupportedLanguage
} from "@/locales/.generated/types";
import {
  servicesPartnersHeading,
  servicesPartnersDesc,
  servicesBestFor,
  servicesHeroHeading,
  servicesHeroDesc,
  servicesReadMore,
  mainOurServices,
  mainHome,
  mainServicesLabel
} from "@/locales/.generated/strings";

import { AnimatedLines } from "../components/animated-lines";
import { Clients } from "../components/clients";
import { SectionReveal } from "../components/motion-wrappers";
import { serviceBySlug, services, ServiceSlug } from "../data";

const { clients, url } = data;

type LangProps = {
  lang: SupportedLanguage;
};

export async function generateMetadata(props: {
  params: Promise<LangProps>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  const meta: Metadata = {
    title: `${mainServicesLabel(lang)} - ${servicesHeroHeading(lang)}`,
    description: servicesHeroDesc(lang),
    alternates: {
      canonical: `${url}/${lang}/services`,
      languages: (supportedLanguages as SupportedLanguage[]).reduce(
        (acc, l) => {
          acc[l] = `${url}/${l}/services`;
          return acc;
        },
        {} as Record<string, string>
      )
    }
  };

  return dynamicOpengraph(meta);
}

export const generateStaticParams = async () => {
  return supportedLanguages.map((lang) => ({ lang }));
};

type ServicesProps = {
  params: Promise<LangProps>;
};

export default async function Services({ params }: ServicesProps) {
  const { lang } = await params;
  const serviceList = services(lang);
  const [featured, ...rest] = serviceList;

  return (
    <main>
      {/* ── Hero + Featured service — single continuous dark section ── */}
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

        <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-20 xl:px-0">
          {/* Hero text */}
          <div className="flex flex-col items-center pt-40 pb-16 md:pt-48 md:pb-20">
            <SectionReveal>
              <div className="max-w-3xl text-center">
                <span className="mb-5 inline-block text-xs font-semibold tracking-[0.2em] text-yellow-300 uppercase">
                  {mainOurServices(lang)}
                </span>
                <h1
                  className="mb-6 text-4xl leading-[1.08] font-semibold tracking-tight md:text-6xl lg:text-[4.5rem]"
                  dangerouslySetInnerHTML={{
                    __html: servicesHeroHeading(lang)
                  }}
                />
                <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-white/60 md:text-xl">
                  {servicesHeroDesc(lang)}
                </p>
              </div>
            </SectionReveal>
          </div>

          {/* Featured service */}
          {featured && (
            <div className="group/featured relative pb-20 md:pb-28">
              <div className="hero-glow animate-glow right-0 bottom-0 h-125! w-125! [animation-delay:2s]" />
              <span className="pointer-events-none absolute top-0 right-0 hidden text-[11rem] leading-none font-bold text-white/3 select-none lg:block">
                01
              </span>

              <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-12 lg:gap-16">
                <SectionReveal className="w-full md:w-1/2">
                  <div className="group relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/30">
                    <Image
                      src={featured.imageUrl}
                      alt={featured.title}
                      className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]"
                      width={660}
                      height={400}
                    />
                  </div>
                </SectionReveal>

                <SectionReveal delay={0.15} className="w-full md:w-1/2">
                  <div className="mb-5 flex flex-wrap gap-2">
                    {featured.bestFor.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="w-fit">
                    <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                      {featured.title}
                    </h2>
                    <div className="from-hyperjump-blue to-hyperjump-teal mt-3 mb-6 h-1 w-12 rounded-full bg-linear-to-r transition-all duration-500 ease-out group-hover/featured:w-full" />
                  </div>
                  <p className="mb-8 text-base leading-relaxed text-white/60 md:text-lg">
                    {featured.shortDescription}
                  </p>

                  <ul className="mb-8 grid gap-3 sm:grid-cols-2">
                    {featured.content.whatYouGet.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-white/70">
                        <span className="bg-hyperjump-teal/20 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                          <CheckIcon className="text-hyperjump-teal h-3 w-3" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 h-12 rounded-full px-8 text-base font-semibold text-white shadow-lg shadow-[#635BFF]/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#635BFF]/30">
                    <Link href={`/${lang}/services/${featured.slug}`}>
                      {servicesReadMore(lang)}
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </SectionReveal>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Remaining services — alternating showcase sections ── */}
      {rest.map(({ slug }, index) => (
        <ServiceShowcase
          key={slug}
          lang={lang}
          slug={slug}
          index={index}
          isReversed={index % 2 !== 0}
        />
      ))}

      {/* ── Partners ── */}
      <section className="bg-hyperjump-navy relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />
        <div className="hero-glow animate-glow -top-32 left-1/2 -translate-x-1/2 [animation-delay:0.5s]" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 md:px-20 md:py-28 xl:px-0">
          <SectionReveal>
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {servicesPartnersHeading(lang)}
              </h2>
              <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-white/60">
                {servicesPartnersDesc(lang)}
              </p>
              <Clients clients={clients} lang={lang} />
            </div>
          </SectionReveal>
        </div>
      </section>

      <BreadcrumbJsonLd
        items={[
          {
            name: mainHome(lang),
            item: `${url}/${lang}`
          },
          {
            name: mainServicesLabel(lang),
            item: `${url}/${lang}/services`
          }
        ]}
      />
    </main>
  );
}

type ServiceShowcaseProps = {
  slug: ServiceSlug;
  index: number;
  isReversed?: boolean;
} & LangProps;

function ServiceShowcase({
  lang,
  index,
  isReversed = false,
  slug
}: ServiceShowcaseProps) {
  const service = serviceBySlug({ lang, slug });
  if (!service) return null;

  const {
    bestFor,
    content: {
      whatYouGet: { items }
    },
    imageIconUrl,
    imageUrl,
    shortDescription,
    title
  } = service;

  const sectionNum = String(index + 2).padStart(2, "0");
  const isAlt = index % 2 !== 0;

  return (
    <section
      className={cn(
        "group/section relative overflow-hidden",
        isAlt ? "bg-white" : "bg-hyperjump-surface"
      )}>
      <span
        className="pointer-events-none absolute top-4 right-6 hidden text-[11rem] leading-none font-bold select-none lg:block"
        style={{
          color: isAlt ? "rgba(10,37,64,0.03)" : "rgba(99,91,255,0.04)"
        }}>
        {sectionNum}
      </span>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 md:px-20 md:py-24 lg:py-28 xl:px-0">
        <div
          className={cn(
            "flex flex-col items-center gap-10 md:gap-14 lg:gap-16",
            isReversed ? "md:flex-row-reverse" : "md:flex-row"
          )}>
          <SectionReveal className="w-full md:w-1/2">
            <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 shadow-black/15 ring-black/5 transition-shadow duration-500 group-hover/section:shadow-2xl group-hover/section:shadow-black/25">
              <Image
                src={imageUrl}
                alt={title}
                className="h-auto w-full transition-transform duration-700 group-hover/section:scale-[1.04]"
                width={660}
                height={400}
              />
            </div>
          </SectionReveal>

          <SectionReveal delay={0.15} className="w-full md:w-1/2">
            <div className="w-fit">
              <h3 className="text-hyperjump-black text-2xl font-semibold tracking-tight md:text-3xl lg:text-[2.125rem]">
                {title}
              </h3>
              <div className="from-hyperjump-blue to-hyperjump-teal mt-3 mb-5 h-1 w-12 rounded-full bg-linear-to-r transition-all duration-500 ease-out group-hover/section:w-full" />
            </div>

            <p className="text-hyperjump-gray mb-4 text-base leading-relaxed md:text-lg">
              {shortDescription}
            </p>
            <p className="text-hyperjump-gray mb-6 text-base md:text-lg">
              {servicesBestFor(lang)}:{" "}
              <span className="text-hyperjump-black font-medium">
                {bestFor.join(", ")}
              </span>
            </p>

            <ul className="mb-8 space-y-3">
              {items.map((feature) => (
                <li
                  key={feature}
                  className="text-hyperjump-gray flex items-start gap-2.5 text-[15px] leading-relaxed">
                  <span className="bg-hyperjump-blue/10 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                    <CheckIcon className="text-hyperjump-blue h-3 w-3" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              asChild
              className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 h-12 rounded-full px-8 text-base font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#635BFF]/20">
              <Link href={`/${lang}/services/${slug}`}>
                {servicesReadMore(lang)}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
