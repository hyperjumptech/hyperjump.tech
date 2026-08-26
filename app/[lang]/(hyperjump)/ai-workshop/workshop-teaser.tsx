import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  aiWorkshopPhotosRoomAlt,
  aiWorkshopTeaserCta,
  aiWorkshopTeaserDesc,
  aiWorkshopTeaserEyebrow,
  aiWorkshopTeaserHeading
} from "@/locales/.generated/strings";

import { SectionReveal } from "../components/motion-wrappers";
import { getAiWorkshopRoomPhoto } from "./get-ai-workshop-assets";

type AiWorkshopTeaserProps = {
  lang: SupportedLanguage;
};

/**
 * Cross-page teaser that sends visitors to the AI workshop landing page.
 *
 * @param props - Active locale for copy and the destination path
 */
export function AiWorkshopTeaser({ lang }: AiWorkshopTeaserProps) {
  const photo = getAiWorkshopRoomPhoto();
  const href = `/${lang}/ai-workshop`;

  return (
    <section
      data-testid="ai-workshop-teaser"
      className="bg-hyperjump-navy relative overflow-hidden text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 md:px-20 md:py-24 xl:px-0">
        <div className="flex flex-col items-center gap-10 md:flex-row md:gap-14">
          <SectionReveal className="w-full md:w-[46%]">
            <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 shadow-black/40 ring-white/10">
              <Image
                src={photo.src}
                alt={aiWorkshopPhotosRoomAlt(lang)}
                width={photo.width}
                height={photo.height}
                className="h-auto w-full"
              />
            </div>
          </SectionReveal>
          <SectionReveal delay={0.12} className="w-full md:w-[54%]">
            <span className="mb-4 inline-block text-xs font-semibold tracking-[0.2em] text-yellow-300 uppercase">
              {aiWorkshopTeaserEyebrow(lang)}
            </span>
            <h2 className="mb-5 text-3xl font-semibold tracking-tight md:text-4xl">
              {aiWorkshopTeaserHeading(lang)}
            </h2>
            <p className="mb-8 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
              {aiWorkshopTeaserDesc(lang)}
            </p>
            <Button
              asChild
              className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 h-12 rounded-full px-8 text-base font-semibold">
              <Link href={href} data-testid="ai-workshop-teaser-cta">
                {aiWorkshopTeaserCta(lang)}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
