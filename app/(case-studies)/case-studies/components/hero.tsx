import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  caseStudyHeroHeading,
  caseStudyHeroDesc
} from "@/locales/.generated/server";

export default function Hero({ lang }: { lang: SupportedLanguage }) {
  return (
    <section
      id="hero"
      className="bg-services-hero text-hyperjump-black relative h-[415px] w-full px-4 text-center">
      <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center pt-16">
        <div
          className="text-hyperjump-black mb-4 text-3xl font-medium sm:text-4xl md:text-[40px]"
          dangerouslySetInnerHTML={{
            __html: caseStudyHeroHeading(lang)
          }}
        />
        <p className="text-hyperjump-gray text-base sm:text-lg">
          {caseStudyHeroDesc(lang)}
        </p>
      </div>
    </section>
  );
}
