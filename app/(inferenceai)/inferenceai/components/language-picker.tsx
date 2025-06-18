"use client";

import {
  SupportedLanguage,
  supportedLanguages
} from "@/locales/.generated/types";

const labelByLang: Record<SupportedLanguage, string> = {
  en: "🇬🇧 English",
  id: "🇮🇩 Indonesia"
};

export default function LanguagePicker({
  lang,
  type = "inferenceai"
}: {
  lang: SupportedLanguage;
  type: "inferenceai" | "rag-chatbot";
}) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as SupportedLanguage;
    window.location.href =
      type === "inferenceai"
        ? `/${lang}/inferenceai`
        : `/${lang}/inferenceai/rag-chatbot`;
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
