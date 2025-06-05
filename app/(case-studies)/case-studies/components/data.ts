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

export const ctoaasMedia = {
  title: `Case Studies - ${caseStudyCtoaasMediaTitle("en")}`
};

export const erpFisheries = {
  title: `Case Studies - ${caseStudyErpFisheriesTitle("en")}`
};

export const getCaseStudies = (lang: SupportedLanguage) => {
  const data = [
    {
      title: caseStudyErpFisheriesTitle(lang),
      description: caseStudyErpFisheriesDesc(lang),
      category: caseStudyErpFisheriesCategory(lang),
      url: "/case-studies/erp-fisheries"
    },
    {
      title: caseStudyCtoaasMediaTitle(lang),
      description: caseStudyCtoaasMediaDesc(lang),
      category: caseStudyCtoaasMediaCategory(lang),
      url: "/case-studies/ctoaas-media"
    }
  ];

  return data;
};
