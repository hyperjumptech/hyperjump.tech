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
    { type: "hyperjump", href: `/${lang}` },
    { type: "services", href: `/${lang}/services` },
    {
      type: "tech-due-diligence",
      href: `/${lang}/services/tech-due-diligence`
    },
    {
      type: "software-as-a-service",
      href: `/${lang}/services/software-as-a-service`
    },
    {
      type: "erp-implementation",
      href: `/${lang}/services/erp-implementation`
    },
    {
      type: "cto-as-a-service",
      href: `/${lang}/services/cto-as-a-service`
    },
    { type: "case-studies", href: `/${lang}/case-studies` },
    { type: "erp-fisheries", href: `/${lang}/case-studies/erp-fisheries` },
    { type: "ctoaas-media", href: `/${lang}/case-studies/ctoaas-media` }
  ];

  return links.find((link) => link.type === type)?.href || `/${lang}`;
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
      className="max-w-32 appearance-none rounded-full border border-[#2D364A] bg-transparent px-3 py-2 text-sm font-medium text-white focus:ring-1 focus:ring-white/30 focus:outline-none">
      {supportedLanguages.map((l) => (
        <option key={l} value={l}>
          {labelByLang[l]}
        </option>
      ))}
    </select>
  );
}
