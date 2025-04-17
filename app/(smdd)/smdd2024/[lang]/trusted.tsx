/* eslint-disable @next/next/no-img-element */
import { andManyMore, trustedBy } from "@/locales/.generated/server";
import { SupportedLanguage } from "@/locales/.generated/types";

export default function TrustedBy({ lang }: { lang: SupportedLanguage }) {
  return (
    <section className="w-full bg-white px-4 pt-4 sm:pt-0 xl:pt-16">
      <div className="w-full bg-white px-4 pt-4 sm:pt-0 xl:pt-16">
        <div className="container mx-auto w-full max-w-7xl text-black">
          <h1 className="my-4 mb-8 text-2xl font-bold leading-tight xl:text-5xl">
            {trustedBy(lang)}
          </h1>
          <div className="mb-8 grid w-full grid-cols-3 items-center justify-center gap-4 text-center xl:grid-cols-6">
            <div className="flex items-center justify-center">
              <img
                src="/images/smdd/1engage.png"
                alt="1engage"
                className="h-12 w-auto self-center object-contain px-4 py-2 grayscale filter transition-all duration-150 hover:grayscale-0"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/smdd/amman.png"
                alt="AMMAN"
                className="h-12 w-auto self-center object-contain px-4 py-2 grayscale filter transition-all duration-150 hover:grayscale-0"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/smdd/aruna.png"
                alt="Aruna"
                className="h-12 w-auto self-center object-contain px-4 py-2 grayscale filter transition-all duration-150 hover:grayscale-0"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/smdd/ausvet.svg"
                alt="Ausvet"
                className="h-12 w-auto self-center object-contain px-4 py-2 grayscale filter transition-all duration-150 hover:grayscale-0"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/smdd/btn.jpg"
                alt="Bank BTN"
                className="h-12 w-auto self-center object-contain px-4 py-2 grayscale filter transition-all duration-150 hover:grayscale-0"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/smdd/idn-media.png"
                alt="IDN Media"
                className="h-12 w-auto self-center object-contain px-4 py-2 grayscale filter transition-all duration-150 hover:grayscale-0"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/smdd/ismaya.png"
                alt="Ismaya"
                className="h-12 w-auto self-center object-contain px-4 py-2 grayscale filter transition-all duration-150 hover:grayscale-0"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/smdd/myrep.webp"
                alt="MyRepublic"
                className="h-12 w-auto self-center object-contain px-4 py-2 grayscale filter transition-all duration-150 hover:grayscale-0"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/smdd/prakerja.png"
                alt="Prakerja"
                className="h-12 w-auto self-center object-contain px-4 py-2 grayscale filter transition-all duration-150 hover:grayscale-0"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/smdd/sdn.png"
                alt="SDN Distribution"
                className="h-12 w-auto self-center object-contain px-4 py-2 grayscale filter transition-all duration-150 hover:grayscale-0"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/smdd/smdv.png"
                alt="SMDV"
                className="h-12 w-auto self-center object-contain px-4 py-2 grayscale filter transition-all duration-150 hover:grayscale-0"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/smdd/trimegah.svg"
                alt="Trimegah"
                className="h-12 w-auto self-center object-contain px-4 py-2 grayscale filter transition-all duration-150 hover:grayscale-0"
              />
            </div>
          </div>
          <p className="mb-4 text-center text-gray-300">{andManyMore(lang)}</p>
        </div>
      </div>
    </section>
  );
}
