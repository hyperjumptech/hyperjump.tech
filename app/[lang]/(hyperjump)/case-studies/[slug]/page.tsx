import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "next-seo";

import ButtonCTA from "@/app/components/cta-button";
import { Button } from "@/components/ui/button";
import data from "@/data.json";
import { dynamicOpengraph } from "@/lib/default-metadata";
import {
  caseStudyButton,
  caseStudyMore,
  caseStudyQuestion
} from "@/locales/.generated/strings";
import type { SupportedLanguage } from "@/locales/.generated/types";
import { supportedLanguages } from "@/locales/.generated/types";

import { AnimatedLines } from "../../components/animated-lines";
import { SectionReveal } from "../../components/motion-wrappers";
import {
  caseStudyBy,
  getCaseStudies,
  serviceBySlug,
  type CaseStudy
} from "../../data";
import { Content } from "./components/content";

const { url } = data;

type LangProps = {
  lang: SupportedLanguage;
};

type Params = { slug: string } & LangProps;

type CaseStudyProps = {
  params: Promise<Params>;
};

export async function generateMetadata({
  params
}: CaseStudyProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const caseStudies = caseStudyBy({ lang, slug });
  const meta: Metadata = {
    title: `Case-Studies - ${caseStudies?.title ?? ""}`,
    description: caseStudies?.description ?? "",
    alternates: {
      canonical: `${url}/${lang}/case-studies/${caseStudies?.slug}`,
      languages: (supportedLanguages as SupportedLanguage[]).reduce(
        (acc, l) => {
          acc[l] = `${url}/${l}/case-studies/${caseStudies?.slug}`;
          return acc;
        },
        {} as Record<string, string>
      )
    }
  };

  return dynamicOpengraph(meta);
}

export async function generateStaticParams(): Promise<Params[]> {
  return supportedLanguages.reduce<Params[]>((acc, lang) => {
    return [
      ...acc,
      ...getCaseStudies(lang).map(({ slug }) => ({ slug, lang }))
    ];
  }, []);
}

export default async function CaseStudy({ params }: CaseStudyProps) {
  const { lang, slug } = await params;
  const caseStudy = caseStudyBy({ lang, slug });
  if (!caseStudy) {
    notFound();
  }

  const {
    cta: { heading, label, subject },
    title
  } = caseStudy;
  const message = `${caseStudyQuestion(lang)} ${subject}`;

  return (
    <main className="bg-white">
      <Hero heading={title} subheading={caseStudy.description} />
      <section className="mx-auto max-w-3xl px-4 md:px-20">
        <article className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-md dark:prose-headings:text-white text-left">
          <Content slug={slug} lang={lang} />
        </article>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <h3 className="text-hyperjump-black max-w-xl text-xl font-semibold md:text-2xl">
            {heading}
          </h3>
          <div className="w-full md:w-auto">
            <ButtonCTA message={message}>{label}</ButtonCTA>
          </div>
        </div>
      </section>

      <section className="mt-5 px-4 md:px-20">
        <Recommendation
          caseStudies={getCaseStudies(lang).filter((cs) => cs.slug !== slug)}
          lang={lang}
        />
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
          },
          {
            name: title,
            item: `${url}/${lang}/case-studies/${slug}`
          }
        ]}
      />
    </main>
  );
}

function Hero({
  heading,
  subheading
}: {
  heading: string;
  subheading: string;
}) {
  return (
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
        <div className="flex flex-col items-center pt-40 pb-20 md:pt-48 md:pb-28">
          <SectionReveal>
            <div className="max-w-3xl text-center">
              <span className="mb-5 inline-block text-xs font-semibold tracking-[0.2em] text-yellow-300 uppercase">
                Case Study
              </span>
              <h1 className="mb-6 text-4xl leading-[1.08] font-semibold tracking-tight md:text-6xl lg:text-[4.5rem]">
                {heading}
              </h1>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-white/60 md:text-xl">
                {subheading}
              </p>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

type RecommendationProps = {
  caseStudies: CaseStudy[];
} & LangProps;

function Recommendation({ caseStudies, lang }: RecommendationProps) {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-hyperjump-black mb-5 text-2xl font-semibold md:text-4xl">
          {caseStudyMore(lang)}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {caseStudies.map(({ description, serviceSlug, slug, title }) => (
            <div
              key={slug}
              className="flex h-full flex-col justify-between rounded-xl border border-gray-200 p-6 text-left shadow-sm transition duration-300 hover:shadow-md">
              <div>
                <span className="mb-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                  {serviceBySlug({ lang, slug: serviceSlug })?.title}
                </span>
                <h3 className="text-hyperjump-black mb-2 text-lg font-semibold md:text-[22px]">
                  {title}
                </h3>
                <p className="text-hyperjump-gray mb-4 text-sm md:text-base">
                  {description}
                </p>
              </div>

              <Button
                asChild
                variant="outline"
                className="text-hyperjump-blue hover:bg-hyperjump-blue mt-4 w-full border-gray-300 hover:text-white">
                <Link href={`/${lang}/case-studies/${slug}`}>
                  {caseStudyButton(lang)}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
