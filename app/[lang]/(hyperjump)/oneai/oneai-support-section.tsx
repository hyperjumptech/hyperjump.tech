import Image from "next/image";
import Link from "next/link";
import { MailIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  oneaiSupportCta,
  oneaiSupportEyebrow,
  oneaiSupportHeading,
  oneaiSupportImageAlt,
  oneaiSupportLede
} from "@/locales/.generated/strings";

import { SectionReveal } from "../components/motion-wrappers";
import {
  getOneaiSupportPoints,
  ONEAI_SUPPORT_IMAGE_PATH,
  type OneaiSupportPoint
} from "./get-oneai-support-points";

type OneaiSupportSectionProps = {
  lang: SupportedLanguage;
  mailtoHref: string;
  /** Support points loader for tests */
  getPoints?: (options: { lang: SupportedLanguage }) => OneaiSupportPoint[];
  /** Photo path for tests */
  imagePath?: string;
};

/**
 * Full-bleed support section contrasting local Hyperjump engineers with overseas vendor queues.
 *
 * @param props - Locale, mailto CTA, and optional loaders for DI
 */
export function OneaiSupportSection({
  lang,
  mailtoHref,
  getPoints = getOneaiSupportPoints,
  imagePath = ONEAI_SUPPORT_IMAGE_PATH
}: OneaiSupportSectionProps) {
  const points = getPoints({ lang });

  return (
    <section
      id="support"
      data-testid="oneai-support-section"
      className="relative min-h-144 w-full overflow-hidden md:min-h-168">
      <Image
        src={imagePath}
        alt={oneaiSupportImageAlt(lang)}
        fill
        className="object-cover object-[72%_center]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-linear-to-r from-[#020F15]/94 via-[#020F15]/78 to-[#020F15]/40 md:via-[#020F15]/72 md:to-[#020F15]/22" />

      <div className="relative z-10 mx-auto flex min-h-144 max-w-6xl items-center px-4 py-16 md:min-h-168 md:px-20 xl:px-0">
        <SectionReveal className="max-w-xl">
          <p className="mb-4 text-xs font-bold tracking-[0.16em] text-yellow-300 uppercase">
            {oneaiSupportEyebrow(lang)}
          </p>
          <h2
            className="mb-5 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.75rem] lg:leading-tight"
            data-testid="oneai-support-heading">
            {oneaiSupportHeading(lang)}
          </h2>
          <p className="mb-8 text-base leading-relaxed text-white/80 md:text-lg">
            {oneaiSupportLede(lang)}
          </p>
          <ul className="mb-8 space-y-4">
            {points.map(({ text, title }) => (
              <li key={title} className="border-l-2 border-yellow-300/70 pl-4">
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/70">
                  {text}
                </p>
              </li>
            ))}
          </ul>
          <Button
            asChild
            className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 h-12 rounded-full px-8 text-base font-semibold">
            <Link href={mailtoHref} data-testid="oneai-support-cta">
              <MailIcon className="mr-2 h-4 w-4" aria-hidden />
              {oneaiSupportCta(lang)}
            </Link>
          </Button>
        </SectionReveal>
      </div>
    </section>
  );
}
