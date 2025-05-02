"use client";

import { cn } from "@/lib/utils";
import {
  SupportedLanguage,
  supportedLanguages
} from "@/locales/.generated/types";
import Link from "next/link";

export default function LanguagePicker({
  lang,
  isOpen
}: {
  lang: SupportedLanguage;
  isOpen?: boolean;
}) {
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
