import {
  caseStudyCtoaasMediaDesc,
  caseStudyCtoaasMediaTitle,
  caseStudyErpFisheriesDesc,
  caseStudyErpFisheriesTitle
} from "@/locales/.generated/server";
import { SupportedLanguage } from "@/locales/.generated/types";

export const getCaseStudies = (lang: SupportedLanguage) => {
  const data = [
    {
      title: caseStudyErpFisheriesTitle(lang),
      description: caseStudyErpFisheriesDesc(lang),
      url: "/case-studies/erp-fisheries"
    },
    {
      title: caseStudyCtoaasMediaTitle(lang),
      description: caseStudyCtoaasMediaDesc(lang),
      url: "/case-studies/ctoaas-media"
    }
  ];

  return data;
};
