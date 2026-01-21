import {
  caseStudyCtoaasMediaCategory,
  caseStudyCtoaasMediaDesc,
  caseStudyCtoaasMediaTitle,
  caseStudyErpFisheriesCategory,
  caseStudyErpFisheriesDesc,
  caseStudyErpFisheriesTitle,
  caseStudyCtoaasMediaCtaHeading,
  caseStudyCtoaasMediaCtaLabel,
  caseStudyCtoaasMediaCtaSubject,
  caseStudyErpFisheriesCtaHeading,
  caseStudyErpFisheriesCtaLabel,
  caseStudyErpFisheriesCtaSubject
} from "@/locales/.generated/server";
import type { SupportedLanguage } from "@/locales/.generated/types";

export const getCaseStudies = (lang: SupportedLanguage) => {
  return [
    {
      slug: "erp-fisheries",
      title: caseStudyErpFisheriesTitle(lang),
      description: caseStudyErpFisheriesDesc(lang),
      category: caseStudyErpFisheriesCategory(lang),
      cta: {
        heading: caseStudyErpFisheriesCtaHeading(lang),
        subject: caseStudyErpFisheriesCtaSubject(lang),
        label: caseStudyErpFisheriesCtaLabel(lang)
      }
    },
    {
      slug: "ctoaas-media",
      title: caseStudyCtoaasMediaTitle(lang),
      description: caseStudyCtoaasMediaDesc(lang),
      category: caseStudyCtoaasMediaCategory(lang),
      cta: {
        heading: caseStudyCtoaasMediaCtaHeading(lang),
        subject: caseStudyCtoaasMediaCtaSubject(lang),
        label: caseStudyCtoaasMediaCtaLabel(lang)
      }
    }
  ];
};

export function caseStudyBy(slug: string, lang: SupportedLanguage) {
  return getCaseStudies(lang).find((cs) => cs.slug === slug);
}
