"use client";

import {
  type SupportedLanguage,
  supportedLanguages
} from "@/locales/.generated/types";
import { usePathname, useRouter } from "next/navigation";

type LanguagePickerProps = {
  lang: SupportedLanguage;
};

const labelByLang = {
  en: "🇬🇧 English",
  id: "🇮🇩 Bahasa Indonesia"
};

export function LanguagePicker({ lang }: LanguagePickerProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const segementsWithoutLocale = pathname
      .split("/")
      .filter(Boolean)
      .filter((_, index) => index > 0);
    const newLocale = e.target.value;
    const newSegments = [newLocale, ...segementsWithoutLocale];

    router.push(`/${newSegments.join("/")}`, { scroll: false });
  };

  return (
    <select
      value={lang}
      onChange={handleChange}
      className="max-w-32 appearance-none rounded-full border border-[#2D364A] bg-transparent px-3 py-2 text-sm font-medium text-white focus:ring-1 focus:ring-white/30 focus:outline-none">
      {supportedLanguages.map((locale) => (
        <option key={locale} value={locale}>
          {labelByLang[locale]}
        </option>
      ))}
    </select>
  );
}
