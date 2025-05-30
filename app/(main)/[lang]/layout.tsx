import Image from "next/image";

import Footer from "@/app/components/footer";
import Nav from "@/app/components/nav";
import { Clients } from "@/app/components/clients";
import ScrollObserver from "@/app/components/scroll-observer";
import data from "@/data.json";
import { mainHeroDesc, mainHeroHeading } from "@/locales/.generated/server";
import type { SupportedLanguage } from "@/locales/.generated/types";

type MainLangLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function MainLangLayout({
  children,
  params
}: MainLangLayoutProps) {
  const { lang } = await params;

  return (
    <>
      <ScrollObserver />
      <Nav isTransparent lang={lang} />
      <Hero lang={lang} />
      {children}
      <Footer lang={lang} />
    </>
  );
}

type HeroProps = { lang: SupportedLanguage };

function Hero({ lang }: HeroProps) {
  return (
    <section
      id="hero"
      className="bg-hyperjump-black relative h-[648px] overflow-hidden px-4 text-white md:px-20">
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
          <h1 className="md:mb-6l mt-28 mb-4 text-4xl font-medium sm:text-5xl md:text-6xl">
            {mainHeroHeading(lang)}
          </h1>
          <p className="mb-6 text-sm font-medium text-white sm:text-base md:mb-10 md:text-xl">
            {mainHeroDesc(lang)}
          </p>
        </div>
        <Clients clients={data.clients} isPriorityLoad />
      </div>
    </section>
  );
}
