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

export const caseStudyCta = {
  media: {
    heading: "Ready to build your future? Let's discuss your transformation",
    subject: "Media Transformation",
    label: "Get In Touch"
  },
  default: {
    heading:
      "Ready to transform your tech team? Let's talk about CTO-as-a-Service",
    subject: "CTO as a Service",
    label: "Get In Touch"
  }
} as const;

export function caseStudyBy(slug: string, lang: SupportedLanguage) {
  return getCaseStudies(lang).find((cs) => cs.slug === slug);
}
