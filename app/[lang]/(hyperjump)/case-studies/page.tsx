import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "next-seo";

import data from "@/data.json";
import { dynamicOpengraph } from "@/lib/default-metadata";
import {
  supportedLanguages,
  type SupportedLanguage
} from "@/locales/.generated/types";
import {
  caseStudyExplore,
  caseStudyHeroDesc,
  caseStudyHeroHeading,
  caseStudyTitle,
  caseStudyExploreDesc
} from "@/locales/.generated/strings";

import { getCaseStudies } from "../data";
import { AnimatedLines } from "../components/animated-lines";
import { CaseStudyCarousel } from "../components/case-study-carousel";
import { SectionReveal } from "../components/motion-wrappers";

const { url } = data;

export const generateStaticParams = async () => {
  return supportedLanguages.map((lang) => ({ lang }));
};

type LangProps = {
  lang: SupportedLanguage;
};

type CaseStudyProps = {
  params: Promise<LangProps>;
};

export async function generateMetadata(props: {
  params: Promise<LangProps>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  const meta: Metadata = {
    title: `Case Studies - ${caseStudyTitle(lang)}`,
    description: caseStudyHeroDesc(lang),
    alternates: {
      canonical: `${url}/${lang}/case-studies`,
      languages: (supportedLanguages as SupportedLanguage[]).reduce(
        (acc, l) => {
          acc[l] = `${url}/${l}/case-studies`;
          return acc;
        },
        {} as Record<string, string>
      )
    }
  };

  return dynamicOpengraph(meta);
}

export default async function CaseStudiesPage({ params }: CaseStudyProps) {
  const { lang } = await params;
  const caseStudies = getCaseStudies(lang);

  return (
    <main>
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
          <div className="flex flex-col items-center pt-40 pb-20 md:pt-48 md:pb-28">
            <SectionReveal>
              <div className="max-w-3xl text-center">
                <span className="mb-5 inline-block text-xs font-semibold tracking-[0.2em] text-yellow-300 uppercase">
                  Case Studies
                </span>
                <h1
                  className="mb-6 text-4xl leading-[1.08] font-semibold tracking-tight md:text-6xl lg:text-[4.5rem] [&>span]:text-yellow-300"
                  dangerouslySetInnerHTML={{
                    __html: caseStudyHeroHeading(lang)
                  }}
                />
                <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-white/60 md:text-xl">
                  {caseStudyHeroDesc(lang)}
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="bg-hyperjump-surface">
        <div className="mx-auto max-w-5xl px-4 py-20 md:px-20 md:py-28 xl:px-0">
          <SectionReveal>
            <div className="mb-16">
              <h2 className="text-hyperjump-black max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
                {caseStudyExplore(lang)}
              </h2>
              <p className="text-hyperjump-gray mt-5 max-w-2xl text-lg leading-relaxed">
                {caseStudyExploreDesc(lang)}
              </p>
            </div>
          </SectionReveal>

          <SectionReveal>
            <CaseStudyCarousel caseStudies={caseStudies} lang={lang} />
          </SectionReveal>
        </div>
      </section>

      <BreadcrumbJsonLd
        items={[
          {
            name: "Home",
            item: `${url}/${lang}`
          },
          {
            name: "Case Studies",
            item: `${url}/${lang}/case-studies`
          }
        ]}
      />
    </main>
  );
}
