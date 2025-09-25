import Link from "next/link";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import type { SupportedLanguage } from "@/locales/.generated/types";
import { copyright, inferenceaiFooter } from "@/locales/.generated/server";

import { LanguagePicker } from "@/app/components/language-picker";
import { getData } from "../data";

export function Footer({ lang }: { lang: SupportedLanguage }) {
  return (
    <footer className="relative overflow-hidden border border-[#29223E] px-4 py-10 text-[#AFB0C3] md:px-20 md:py-14">
      <div className="flex flex-col space-y-6 md:items-center">
        <div className="flex items-center">
          <Link href={`/${lang}/inferenceai`}>
            <Image
              src="/images/inferenceai/inference-ai-white.svg"
              alt="Inference AI Logo"
              width={187}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <p className="text-sm md:max-w-60 md:text-center">
          {inferenceaiFooter(lang)}
        </p>

        <div className="flex space-x-6">
          {getData(lang).socials.map(({ icon, platform, url }) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={platform}
              className="flex items-center justify-center rounded-full bg-transparent transition-colors duration-200 hover:bg-white/20">
              <Image
                src={icon}
                alt={platform}
                width={20}
                height={20}
                className="h-12 w-12"
              />
            </a>
          ))}
        </div>

        <LanguagePicker lang={lang} />

        <Separator className="w-full bg-[#29223E]" />

        <p className="text-center text-sm">{copyright(lang)}</p>
      </div>
    </footer>
  );
}
