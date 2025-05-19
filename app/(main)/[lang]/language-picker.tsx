"use client";

import {
  type SupportedLanguage,
  supportedLanguages
} from "@/locales/.generated/types";

type LanguagePickerProps = {
  lang: SupportedLanguage;
  type?:
    | "hyperjump"
    | "services"
    | "tech-due-diligence"
    | "software-as-a-service"
    | "erp-implementation"
    | "cto-as-a-service"
    | "case-studies"
    | "erp-fisheries"
    | "ctoaas-media";
};

const labelByLang: Record<SupportedLanguage, string> = {
  en: "🇬🇧 English",
  id: "🇮🇩 Indonesia"
};

type Href = {
  lang: SupportedLanguage;
  type: NonNullable<LanguagePickerProps["type"]>;
};

function getHrefByLangAndType({ lang, type }: Href): string {
  const links: { type: Href["type"]; href: string }[] = [
    { type: "hyperjump", href: `/${lang}#hero` },
    { type: "services", href: `/services/${lang}#hero` },
    {
      type: "tech-due-diligence",
      href: `/services/tech-due-diligence/${lang}#hero`
    },
    {
      type: "software-as-a-service",
      href: `/services/software-as-a-service/${lang}#hero`
    },
    {
      type: "erp-implementation",
      href: `/services/erp-implementation/${lang}#hero`
    },
    {
      type: "cto-as-a-service",
      href: `/services/cto-as-a-service/${lang}#hero`
    },
    { type: "case-studies", href: `/case-studies/${lang}#hero` },
    { type: "erp-fisheries", href: `/case-studies/erp-fisheries/${lang}#hero` },
    { type: "ctoaas-media", href: `/case-studies/ctoaas-media/${lang}#hero` }
  ];

  return links.find((link) => link.type === type)?.href || `/${lang}#hero`;
}

export function LanguagePicker({
  lang,
  type = "hyperjump"
}: LanguagePickerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as SupportedLanguage;
    const targetHref = getHrefByLangAndType({ lang: newLang, type });
    window.location.href = targetHref;
  };

  return (
    <select
      value={lang}
      onChange={handleChange}
      className="max-w-32 rounded-full border border-[#2D364A] bg-transparent px-3 py-2 text-sm font-medium text-white">
      {supportedLanguages.map((l) => (
        <option key={l} value={l}>
          {labelByLang[l]}
        </option>
      ))}
    </select>
  );
}
