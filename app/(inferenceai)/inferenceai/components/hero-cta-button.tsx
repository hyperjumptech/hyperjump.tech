"use client";

import { sendGAEvent } from "@next/third-parties/google";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import data from "@/data.json";
import type { SupportedLanguage } from "@/locales/.generated/types";
import { inferenceaiCtaLabel } from "@/locales/.generated/server";

export function HeroCTAButton({ lang }: { lang: SupportedLanguage }) {
  const { gaEventName, linkAI } = data.cta;

  return (
    <Button
      asChild
      variant="default"
      size="lg"
      className="color-gradient-purple transform rounded-full text-white transition-all duration-200 ease-in-out hover:scale-[1.05] hover:shadow-md"
      onClick={() => {
        sendGAEvent({
          event: gaEventName,
          category: "engagement",
          label: "Inference AI CTA Button"
        });
      }}>
      <Link href={linkAI} target="_blank" rel="noreferrer noopener">
        {inferenceaiCtaLabel(lang)}
      </Link>
    </Button>
  );
}
