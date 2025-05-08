import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  servicesHeroHeading,
  servicesHeroDesc
} from "@/locales/.generated/server";

export default function Hero({ lang }: { lang: SupportedLanguage }) {
  return (
    <section
      id="hero"
      className="bg-services-hero text-hyperjump-black relative h-[415px] w-full px-4 text-center">
      <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center pt-16">
        <h1 className="text-hyperjump-black mb-4 text-2xl font-medium sm:text-4xl md:text-[40px]">
          {servicesHeroHeading(lang)}
        </h1>
        <p className="text-hyperjump-gray text-base sm:text-lg">
          {servicesHeroDesc(lang)}
        </p>
      </div>
    </section>
  );
}
