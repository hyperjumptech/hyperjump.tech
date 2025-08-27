import {
  ai,
  aiDeliverables,
  aiDesc,
  aiNarrative,
  aiQuotes,
  cloudMigration,
  cloudMigrationDeliverables,
  cloudMigrationDesc,
  cloudMigrationQuotes,
  ctoaas,
  ctoaasDeliverables,
  ctoaasDesc,
  ctoaasNarrative,
  ctoaasQuotes,
  erp,
  erpDeliverables,
  erpDesc,
  erpNarrative,
  erpQuotes,
  saas,
  saasDeliverables,
  saasDesc,
  saasNarrative,
  saasQuotes,
  tdd,
  tddDeliverables,
  tddDesc,
  tddNarrative,
  tddQuotes,
  volunteeringPlatform,
  volunteeringPlatformDeliverables,
  volunteeringPlatformDesc,
  volunteeringPlatformNarrative,
  volunteeringPlatformQuotes
} from "@/locales/.generated/server";
import { SupportedLanguage } from "@/locales/.generated/types";

export const getServices = (lang: SupportedLanguage) => {
  const services = [
    {
      title: ai(lang),
      description: aiDesc(lang),
      quotes: aiQuotes(lang),
      deliverables: aiDeliverables(lang),
      narative: aiNarrative(lang)
    },
    {
      title: ctoaas(lang),
      description: ctoaasDesc(lang),
      quotes: ctoaasQuotes(lang),
      deliverables: ctoaasDeliverables(lang),
      narative: ctoaasNarrative(lang)
    },
    {
      title: saas(lang),
      description: saasDesc(lang),
      quotes: saasQuotes(lang),
      deliverables: saasDeliverables(lang),
      narative: saasNarrative(lang)
    },
    {
      title: tdd(lang),
      description: tddDesc(lang),
      quotes: tddQuotes(lang),
      deliverables: tddDeliverables(lang),
      narative: tddNarrative(lang)
    },
    {
      title: erp(lang),
      description: erpDesc(lang),
      quotes: erpQuotes(lang),
      deliverables: erpDeliverables(lang),
      narative: erpNarrative(lang)
    },
    {
      title: cloudMigration(lang),
      description: cloudMigrationDesc(lang),
      quotes: cloudMigrationQuotes(lang),
      deliverables: cloudMigrationDeliverables(lang),
      narative: ""
    },
    {
      title: volunteeringPlatform(lang),
      description: volunteeringPlatformDesc(lang),
      quotes: volunteeringPlatformQuotes(lang),
      deliverables: volunteeringPlatformDeliverables(lang),
      narative: volunteeringPlatformNarrative(lang)
    }
  ];

  return services;
};
