import { notFound } from "next/navigation";

import {
  type SupportedLanguage,
  supportedLanguages
} from "@/locales/.generated/types";

import { caseStudyBy, getCaseStudies } from "../data";
import { Faqs, Hero, HowItWorks, KeyFeatures, WhatIsIncluded } from "./home";

type Params = { lang: SupportedLanguage; slug: string };

type CaseStudyProps = {
  params: Params;
};

export async function generateStaticParams(): Promise<Params[]> {
  return supportedLanguages.reduce<Params[]>((acc, lang) => {
    return [
      ...acc,
      ...getCaseStudies(lang).map(({ slug }) => ({ slug, lang }))
    ];
  }, []);
}

export default async function CaseStudy({ params }: CaseStudyProps) {
  const { lang, slug } = params;
  const caseStudy = caseStudyBy(slug, lang);

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <Hero caseStudy={caseStudy} />
      <KeyFeatures caseStudy={caseStudy} lang={lang} />
      <HowItWorks caseStudy={caseStudy} />
      {(caseStudy.whatsIncluded ?? []).length > 0 && (
        <WhatIsIncluded caseStudy={caseStudy} />
      )}
      <Faqs caseStudy={caseStudy} />
    </>
  );
}
