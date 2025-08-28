"use client";

import { notFound } from "next/navigation";

import {
  CaseStudiesFisheries,
  CaseStudiesMedia
} from "@/locales/.generated/locales-markdown";
import type { SupportedLanguage } from "@/locales/.generated/types";

type ContentProps = {
  lang: SupportedLanguage;
  slug: string;
};

const caseStudies = [
  {
    slug: "erp-fisheries",
    content: CaseStudiesFisheries
  },
  {
    slug: "ctoaas-media",
    content: CaseStudiesMedia
  }
];

export function Content({ lang, slug }: ContentProps) {
  const caseStudy = caseStudies.find((caseStudy) => caseStudy.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  return <caseStudy.content lang={lang} />;
}
