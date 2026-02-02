"use client";

import { notFound } from "next/navigation";

import {
  CaseStudiesFisheries,
  CaseStudiesMedia,
  CaseStudiesVolunteeringPlatform
} from "@/locales/.generated/locales-markdown";
import type { SupportedLanguage } from "@/locales/.generated/types";
import { CaseStudySlug } from "../../../data";

type ContentProps = {
  lang: SupportedLanguage;
  slug: string;
};

export function Content({ lang, slug }: ContentProps) {
  const caseStudies = [
    {
      slug: CaseStudySlug.Fisheries,
      content: CaseStudiesFisheries
    },
    {
      slug: CaseStudySlug.Media,
      content: CaseStudiesMedia
    },
    {
      slug: CaseStudySlug.VolunteeringPlatform,
      content: CaseStudiesVolunteeringPlatform
    }
  ];
  const caseStudy = caseStudies.find((caseStudy) => caseStudy.slug === slug);

  if (!caseStudy) {
    console.error(`Case study content for "${slug}" is not registered.`);
    notFound();
  }

  return <caseStudy.content lang={lang} />;
}
