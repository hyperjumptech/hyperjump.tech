import Image from "next/image";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import data from "@/data.json";
import type { SupportedLanguage } from "@/locales/.generated/types";
import { copyright, mainFooter } from "@/locales/.generated/server";
import { LanguagePicker } from "../../../components/language-picker";

type FooterProps = { lang: SupportedLanguage };

export default function Footer({ lang }: FooterProps) {
  return (
    <footer className="bg-hyperjump-navy relative overflow-hidden text-white">
      {/* Gradient separator line */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-[#635BFF]/40 to-transparent" />

      <div className="relative z-20 mx-auto max-w-5xl px-4 py-16 md:px-20 md:py-20 xl:px-0">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-3 md:gap-8">
          <div className="flex flex-col items-start gap-5">
            <Link href={`/${lang}`}>
              <Image
                src="/images/hyperjump-white.png"
                alt="Hyperjump Logo"
                width={187}
                height={32}
                className="h-7 w-auto"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/50">
              {mainFooter(lang)}
            </p>
          </div>

          <div className="flex justify-start gap-3 md:justify-center">
            {data.socials.map(({ icon, platform, url }) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platform}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-all duration-200 hover:scale-105 hover:border-[#635BFF]/50 hover:bg-[#635BFF]/10">
                <Image
                  src={icon}
                  alt={platform}
                  width={18}
                  height={18}
                  className="opacity-70"
                />
              </a>
            ))}
          </div>

          <div className="flex justify-start md:justify-end">
            <LanguagePicker lang={lang} />
          </div>
        </div>

        <Separator className="mt-10 w-full bg-white/8" />

        <p className="mt-5 text-center text-sm text-white/30">
          {copyright(lang)}
        </p>
      </div>
    </footer>
  );
}
