import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  type SupportedLanguage,
  supportedLanguages
} from "@/locales/.generated/types";

type LanguagePickerProps = {
  lang: SupportedLanguage;
  isOpen?: boolean;
};

export function LanguagePicker({ lang, isOpen }: LanguagePickerProps) {
  return (
    <div className="flex gap-2">
      {supportedLanguages.map((l) => {
        const isActive = lang === l;

        return (
          <Link
            scroll={false}
            key={l}
            href={`/${l}`}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors",
              isActive
                ? isOpen
                  ? "bg-hyperjump-black"
                  : "text-white group-data-[scroll='false']:bg-white group-data-[scroll='true']:bg-hyperjump-blue group-data-[scroll='false']:text-hyperjump-black group-data-[scroll='true']:text-white"
                : isOpen
                  ? "text-hyperjump-black"
                  : "text-white group-data-[scroll='true']:text-hyperjump-black"
            )}>
            {l.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}

export function LanguagePickerServices({ lang, isOpen }: LanguagePickerProps) {
  return (
    <div className="flex gap-2">
      {supportedLanguages.map((l) => {
        const isActive = lang === l;

        return (
          <Link
            scroll={false}
            key={l}
            href={`/services/${l}`}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors",
              isActive
                ? isOpen
                  ? "bg-hyperjump-black"
                  : "bg-hyperjump-blue text-white"
                : isOpen
                  ? "text-hyperjump-black"
                  : "text-hyperjump-black group-data-[scroll='true']:text-hyperjump-black"
            )}>
            {l.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
