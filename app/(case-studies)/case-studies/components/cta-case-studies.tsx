"use client";

import { SupportedLanguage } from "@/locales/.generated/types";
import data from "@/data.json";
import Image from "next/image";
import {
  servicesCtaDesc,
  servicesCtaHeading,
  servicesCtaLabel
} from "@/locales/.generated/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";

export function CTACaseStudies({ lang }: { lang: SupportedLanguage }) {
  const { gaEventName, link } = data.cta;

  return (
    <section className="relative my-10 w-full max-w-6xl overflow-hidden rounded-lg">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/swatch.svg"
          alt="CTA Background"
          width={1440}
          height={308}
          className="pointer-events-none h-full object-cover select-none"
          style={{
            background:
              "linear-gradient(134.7deg, #5954DA 3.43%, #0B0B0D 48.93%)"
          }}
        />
      </div>
      <div className="relative flex flex-col items-center justify-center px-6 py-11 text-center">
        <h4 className="mb-3 text-3xl font-medium text-white md:text-4xl">
          {servicesCtaHeading(lang)}
        </h4>
        <p className="mb-8 text-lg text-white">{servicesCtaDesc(lang)}</p>

        <Button
          asChild
          size="lg"
          className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 text-base font-semibold text-white">
          <Link
            onClick={() => {
              sendGAEvent({
                event: gaEventName,
                category: "engagement",
                label: "Case Studies CTA"
              });
            }}
            href={link}
            target="_blank"
            rel="noreferrer noopener">
            {servicesCtaLabel(lang)}
          </Link>
        </Button>
      </div>
    </section>
  );
}
