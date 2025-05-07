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
    const newLang = e.target.value as SupportedLanguage;
    window.location.href =
      type === "inferenceai"
        ? `/inferenceai/${newLang}#hero`
        : `/inferenceai/rag-chatbot/${newLang}#hero`;
  };

  return (
    <select
      value={lang}
      onChange={handleChange}
      className="max-w-32 rounded-full border bg-transparent px-3 py-2 text-sm font-medium text-white">
      {supportedLanguages.map((l) => (
        <option key={l} value={l}>
          {labelByLang[l]}
        </option>
      ))}
    </select>
  );
}
