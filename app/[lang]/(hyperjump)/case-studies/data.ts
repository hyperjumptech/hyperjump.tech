import {
  caseStudyCtoaasMediaCategory,
  caseStudyCtoaasMediaDesc,
  caseStudyCtoaasMediaTitle,
  caseStudyErpFisheriesCategory,
  caseStudyErpFisheriesDesc,
  caseStudyErpFisheriesTitle
} from "@/locales/.generated/server";
import type { SupportedLanguage } from "@/locales/.generated/types";

export const getCaseStudies = (lang: SupportedLanguage) => {
  return [
    {
      slug: "erp-fisheries",
      title: caseStudyErpFisheriesTitle(lang),
      description: caseStudyErpFisheriesDesc(lang),
      category: caseStudyErpFisheriesCategory(lang)
    },
    {
      slug: "ctoaas-media",
      title: caseStudyCtoaasMediaTitle(lang),
      description: caseStudyCtoaasMediaDesc(lang),
      category: caseStudyCtoaasMediaCategory(lang)
    }
  ];
};

export function caseStudyBy(slug: string, lang: SupportedLanguage) {
  return getCaseStudies(lang).find((cs) => cs.slug === slug);
}
