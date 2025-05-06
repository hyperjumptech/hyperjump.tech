"use client";

import { sendGAEvent } from "@next/third-parties/google";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import data from "@/data.json";
import type { SupportedLanguage } from "@/locales/.generated/types";
import { mainCtaLabel } from "@/locales/.generated/server";

export function HeroCTAButton({ lang }: { lang: SupportedLanguage }) {
  const { gaEventName, link } = data.cta;

  return (
    <Button
      asChild
      variant="secondary"
      size="lg"
      className="font-semibold"
      onClick={() => {
        sendGAEvent({
          event: gaEventName,
          category: "engagement",
          label: "Hero Banner CTA"
        });
      }}>
      <Link href={link} target="_blank" rel="noreferrer noopener">
        {mainCtaLabel(lang)}
      </Link>
    </Button>
  );
}
