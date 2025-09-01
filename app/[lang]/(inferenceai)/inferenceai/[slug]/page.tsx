import { notFound } from "next/navigation";

import {
  type SupportedLanguage,
  supportedLanguages
} from "@/locales/.generated/types";

import { caseStudyBy, getCaseStudies } from "../data";
import { Faqs, Hero, HowItWorks, KeyFeatures, WhatIsIncluded } from "./home";

type Params = { lang: SupportedLanguage; slug: string };

type CaseStudyProps = {
  params: Promise<Params>;
};

export const generateStaticParams = async ({ params }: CaseStudyProps) => {
  return getCaseStudies((await params).lang).reduce<Params[]>(
    (acc, { slug }) => [
      ...acc,
      ...supportedLanguages.map((lang) => ({ slug, lang }))
    ],
    []
  );
};

export default async function CaseStudy({ params }: CaseStudyProps) {
  const { lang, slug } = await params;
  const caseStudy = caseStudyBy(slug, lang);

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <Hero caseStudy={caseStudy} lang={lang} />
      <KeyFeatures caseStudy={caseStudy} lang={lang} />
      <HowItWorks caseStudy={caseStudy} lang={lang} />
      {(caseStudy.whatsIncluded ?? []).length > 0 && (
        <WhatIsIncluded caseStudy={caseStudy} lang={lang} />
      )}
      <Faqs caseStudy={caseStudy} lang={lang} />
    </>
  );
}
