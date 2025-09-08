import { SupportedLanguage } from "@/locales/.generated/types";
import { getCaseStudies } from "../data";
import { Menu } from "./nav";

export const getSolutionsMenu = (lang: SupportedLanguage): Menu[] => {
  const caseStudies = getCaseStudies(lang) ?? [];

  return caseStudies
    .filter((cs) => cs.slug && cs.slug !== "rag-chatbot")
    .map((cs) => ({
      key: cs.slug,
      label: cs.labelUrl ?? cs.title ?? "Untitled",
      href: `/${lang}/inferenceai/${cs.slug}`,
      description: cs.descUrl ?? ""
    }));
};
