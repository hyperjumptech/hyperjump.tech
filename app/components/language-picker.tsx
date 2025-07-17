import { cn } from "@/lib/utils";
import {
  SupportedLanguage,
  supportedLanguages
} from "@/locales/.generated/types";
import Link from "next/link";

export default function LanguagePicker({ lang }: { lang: SupportedLanguage }) {
  return (
    <div>
      {supportedLanguages.map((l) => (
        <Link
          scroll={false}
          key={l}
          href={`/${l}/smdd2024`}
          className={cn(
            "rounded-full px-6 py-2 text-sm group-[data-scroll='false']:text-white group-[data-scroll='true']:text-black",
            lang === l
              ? "bg-smdd-red text-white"
              : "text-blackgroup-data-[scroll=false]:text-white group-data-[scroll=true]:text-black"
          )}>
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
