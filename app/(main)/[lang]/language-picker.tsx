"use client";

import {
  type SupportedLanguage,
  supportedLanguages
} from "@/locales/.generated/types";

type LanguagePickerProps = {
  lang: SupportedLanguage;
  type?: "hyperjump" | "services";
};

const labelByLang: Record<SupportedLanguage, string> = {
  en: "🇬🇧 English",
  id: "🇮🇩 Indonesia"
};

export function LanguagePicker({
  lang,
  type = "hyperjump"
}: LanguagePickerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as SupportedLanguage;
    window.location.href =
      type === "hyperjump" ? `/${newLang}#hero` : `/services/${newLang}#hero`;
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
