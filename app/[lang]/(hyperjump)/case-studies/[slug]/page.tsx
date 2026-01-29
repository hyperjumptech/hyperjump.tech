import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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

import {
  caseStudyBy,
  getCaseStudies,
  serviceBySlug,
  type CaseStudy
} from "../../data";
import { Content } from "./components/content";

type Params = { lang: SupportedLanguage; slug: string };

type CaseStudyProps = {
  params: Promise<Params>;
};

export async function generateMetadata({
  params
}: CaseStudyProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const { url } = data;
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
    cta: { heading, label },
    title
  } = caseStudy;

  return (
    <main className="bg-white">
      <Hero heading={title} />
      <section className="mx-auto max-w-3xl px-4 md:px-20">
        <article className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-md dark:prose-headings:text-white text-left">
          <Content slug={slug} lang={lang} />
        </article>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <h3 className="text-hyperjump-black max-w-xl text-xl font-semibold md:text-2xl">
            {heading}
          </h3>
          <div className="w-full md:w-auto">
            <ButtonCTA message={caseStudyQuestion(lang)}>{label}</ButtonCTA>
          </div>
        </div>
      </section>

      <section className="mt-5 px-4 md:px-20">
        <Recommendation
          caseStudies={getCaseStudies(lang).filter((cs) => cs.slug !== slug)}
          lang={lang}
        />
      </section>
    </main>
  );
}

function Hero({ heading }: { heading: string }) {
  return (
    <section
      id="hero"
      className="bg-hyperjump-black relative h-87.75 overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        <Image
          alt="Hero background"
          blurDataURL="/images/case-studies/banner.webp"
          className="object-cover object-center"
          fill
          placeholder="blur"
          priority
          src="/images/case-studies/banner.webp"
        />
      </div>

      <div className="relative z-10 mt-10 flex h-87.75 items-center justify-center">
        <h1
          className="mb-4 max-w-3xl px-4 text-center text-2xl font-medium text-white sm:text-4xl md:px-20 md:text-4xl"
          dangerouslySetInnerHTML={{
            __html: heading
          }}
        />
      </div>
    </section>
  );
}

type RecommendationProps = {
  caseStudies: CaseStudy[];
  lang: SupportedLanguage;
};

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
