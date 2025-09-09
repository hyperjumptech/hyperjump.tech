"use client";

import { usePathname } from "next/navigation";
import type { SupportedLanguage } from "@/locales/.generated/types";
import Nav, { Menu } from "./nav";
import { navInferenceai, navSolustions } from "../data";

type ClientWrapperProps = {
  lang: SupportedLanguage;
};

export default function ClientWrapper({ lang }: ClientWrapperProps) {
  const pathname = usePathname();
  const isInferenceAiCaseStudy = pathname.includes(`/${lang}/inferenceai/`);

  const parts = pathname.split("/");
  const slug = isInferenceAiCaseStudy ? parts[parts.length - 1] : "";

  const menus: Menu[] = isInferenceAiCaseStudy
    ? navSolustions(lang, slug)
    : navInferenceai(lang);

  return <Nav menus={menus} lang={lang} />;
}
