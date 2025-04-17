import { intro, talkWithUs } from "@/locales/.generated/server";
import { SupportedLanguage } from "@/locales/.generated/types";

export default function SmddHero({ lang }: { lang: SupportedLanguage }) {
  return (
    <div className="relative h-full w-full bg-[url('/images/smdd/bg.jpg')] bg-cover bg-center px-4 pt-16">
      <div className="absolute inset-0 z-10 bg-black opacity-40"></div>
      <div className="container relative z-40 mx-auto my-8 w-full text-white">
        <h1 className="mb-8 mt-0 text-2xl font-bold leading-tight xl:my-4 xl:text-5xl">
          Hyperjump @ Sinarmas Digital Day
        </h1>
        <p className="mb-4 w-full lg:mb-8 lg:w-2/3 xl:w-1/2 xl:text-lg">
          {intro(lang)}
        </p>
        <a
          href="#contact-form"
          type="button"
          className=" rounded-full bg-white px-4 py-2 font-bold text-smdd-red">
          {talkWithUs(lang)}
        </a>
      </div>
    </div>
  );
}
