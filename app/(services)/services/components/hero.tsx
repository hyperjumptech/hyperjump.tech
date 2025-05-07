"use client";

import { SupportedLanguage } from "@/locales/.generated/types";
import {
  servicesHeroHeading,
  servicesHeroDesc
} from "@/locales/.generated/server";

export default function Hero({ lang }: { lang: SupportedLanguage }) {
  return (
    <section className="relative h-[415px] w-full bg-services-hero px-4 text-center text-hyperjump-black">
      <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center pt-16">
        <h1 className="mb-4 text-2xl font-medium text-hyperjump-black sm:text-4xl md:text-[40px]">
          {servicesHeroHeading(lang)}
        </h1>
        <p className="text-base text-hyperjump-gray sm:text-lg">
          {servicesHeroDesc(lang)}
        </p>
      </div>
    </section>
  );
}
