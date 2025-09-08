"use client";

import { usePathname } from "next/navigation";
import type { SupportedLanguage } from "@/locales/.generated/types";
import Nav, { Menu } from "./nav";
import { navRagChatbot } from "../[slug]/data";
import { navInferenceai } from "../data";

type ClientWrapperProps = {
  lang: SupportedLanguage;
};

export default function ClientWrapper({ lang }: ClientWrapperProps) {
  const pathname = usePathname();
  const isInferenceAiCaseStudy = pathname.includes(`/${lang}/inferenceai/`);

  const menus: Menu[] = isInferenceAiCaseStudy
    ? navRagChatbot(lang)
    : navInferenceai(lang);

  return <Nav menus={menus} lang={lang} />;
}
