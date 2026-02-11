import type { Metadata } from "next";
import type { BreadcrumbList, WithContext } from "schema-dts";

import { Hero } from "@/app/components/hero";
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
  caseStudyTitle
} from "@/locales/.generated/strings";

import { getCaseStudies } from "../data";
import { CaseStudyCard } from "../components/case-study-card";

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

  return (
    <main className="bg-white">
      <Hero
        title={caseStudyHeroHeading(lang)}
        subtitle={caseStudyHeroDesc(lang)}
      />
      <div className="xxl:max-w-7xl mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center px-4 py-6 text-center md:px-20 xl:px-0">
        <h3 className="text-hyperjump-black w-72 text-[28px] font-medium md:w-full md:text-[40px]">
          {caseStudyExplore(lang)}
        </h3>
        <section className="bg-white pt-5 pb-10">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 md:grid-cols-3">
              {getCaseStudies(lang).map((caseStudy) => (
                <CaseStudyCard
                  key={caseStudy.slug}
                  caseStudy={caseStudy}
                  lang={lang}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
      <JsonLd lang={lang} />
    </main>
  );
}

function JsonLd({ lang }: LangProps) {
  const jsonLd: WithContext<BreadcrumbList> = {
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
        name: "Case Studies",
        item: `${url}/${lang}/case-studies`
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
