import Image from "next/image";
import { HeroCTAButton } from "./hero-cta-button";
import { PartnersList } from "./partner-list";
import { SupportedLanguage } from "@/locales/.generated/types";
import { mainHeroDesc, mainHeroHeading } from "@/locales/.generated/server";

export function Hero({ lang }: { lang: SupportedLanguage }) {
  return (
    <section
      id="hero"
      className="relative h-[648px] overflow-hidden bg-hyperjump-black px-4 text-white md:px-20">
      <div className="absolute inset-0 z-0">
        <Image
          alt="Hero background"
          blurDataURL="/images/banner-blur.webp"
          className="object-cover object-center"
          fill
          placeholder="blur"
          priority
          src="/images/banner.webp"
        />
      </div>

      <div className="relative z-10 flex h-[648px] flex-col items-center justify-around">
        <div className="max-w-5xl text-center">
          <h1 className="md:mb-6l mb-4 mt-28 text-4xl font-medium sm:text-5xl md:text-6xl">
            {mainHeroHeading(lang)}
          </h1>
          <p className="mb-6 text-sm font-medium text-white sm:text-base md:mb-10 md:text-xl">
            {mainHeroDesc(lang)}
          </p>
          <HeroCTAButton lang={lang} />
        </div>

        <PartnersList />
      </div>
    </section>
  );
}
