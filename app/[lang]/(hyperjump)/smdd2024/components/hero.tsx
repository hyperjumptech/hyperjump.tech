import { intro, talkWithUs } from "@/locales/.generated/server";
import type { SupportedLanguage } from "@/locales/.generated/types";

export default function SmddHero({ lang }: { lang: SupportedLanguage }) {
  return (
    <div className="relative h-full w-full bg-[url('/images/smdd/bg.jpg')] bg-cover bg-center px-4 pt-16 pb-5">
      <div className="absolute inset-0 z-10 bg-black opacity-40" />
      <div className="relative z-40 container mx-auto my-8 max-w-5xl text-white">
        <h1 className="mt-0 mb-8 text-2xl leading-tight font-bold xl:my-4 xl:text-4xl">
          Hyperjump @ Sinar Mas Digital Day
        </h1>
        <p className="mb-4 w-full lg:mb-8">{intro(lang)}</p>
        <a
          href="#contact-form"
          type="button"
          className="text-smdd-red rounded-full bg-white px-4 py-2 font-bold">
          {talkWithUs(lang)}
        </a>
      </div>
    </div>
  );
}
