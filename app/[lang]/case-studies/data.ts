import {
  caseStudyCtoaasMediaCategory,
  caseStudyCtoaasMediaDesc,
  caseStudyCtoaasMediaTitle,
  caseStudyErpFisheriesCategory,
  caseStudyErpFisheriesDesc,
  caseStudyErpFisheriesTitle,
  caseStudyHeroDesc,
  caseStudyTitle
} from "@/locales/.generated/server";
import { SupportedLanguage } from "@/locales/.generated/types";

export const caseStudy = {
  title: `Case Studies - ${caseStudyTitle("en")}`,
  description: caseStudyHeroDesc("en")
};

export const getCaseStudies = (lang: SupportedLanguage = "en") => {
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
