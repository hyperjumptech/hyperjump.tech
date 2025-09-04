"use client";

import { usePathname } from "next/navigation";
import type { SupportedLanguage } from "@/locales/.generated/types";
import Nav, { Menu } from "./nav";
import { navRagChatbot } from "../[slug]/data";
import { navInferenceai } from "../data";

type ClientWrapperProps = {
  lang: SupportedLanguage;
};

function normalizeMenus(
  raw: { label: string; href: string }[],
  prefix = "menu"
): Menu[] {
  return raw.map((item, idx) => ({
    key: item.href || `${prefix}-${idx}`,
    label: item.label,
    href: item.href,
    description: undefined,
    children: undefined
  }));
}

export default function ClientWrapper({ lang }: ClientWrapperProps) {
  const pathname = usePathname();
  const isInferenceAiCaseStudy = pathname.includes(`/${lang}/inferenceai/`);

  const menus: Menu[] = isInferenceAiCaseStudy
    ? normalizeMenus(navRagChatbot(lang), "rag")
    : navInferenceai(lang);

  return <Nav menus={menus} lang={lang} />;
}
