import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  mainLocationDesc,
  mainLocationEyebrow,
  mainLocationHeading,
  mainOpenInGoogleMaps
} from "@/locales/.generated/strings";
import type { SupportedLanguage } from "@/locales/.generated/types";

import type { Location as LocationType } from "../data";
import { SectionReveal } from "./motion-wrappers";

type LocationProps = { lang: SupportedLanguage; location: LocationType };

export function Location({ lang, location }: LocationProps) {
  const {
    address: { country, locality, postalCode, street },
    duns,
    email,
    imageUrl,
    mapsUrl,
    title
  } = location;

  return (
    <section id="location" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-20 md:px-20 md:py-28 xl:px-0">
        <SectionReveal>
          <div className="mb-16 text-center">
            <span className="text-hyperjump-blue mb-4 inline-block text-xs font-semibold tracking-[0.2em] uppercase">
              {mainLocationEyebrow(lang)}
            </span>
            <h2 className="text-hyperjump-black mx-auto max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl lg:text-[3.5rem]">
              {mainLocationHeading(lang)}
            </h2>
            <p className="text-hyperjump-gray mx-auto mt-5 max-w-xl text-lg leading-relaxed">
              {mainLocationDesc(lang)}
            </p>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="group overflow-hidden rounded-2xl shadow-lg shadow-black/8">
            <div className="relative h-64 overflow-hidden sm:h-80 md:h-96 lg:h-112">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </div>
        </SectionReveal>

        <SectionReveal>
          <div className="mt-8 flex flex-col gap-8 border-t border-black/6 pt-8 md:mt-10 md:flex-row md:items-start md:justify-between md:pt-10">
            <div>
              <h3 className="text-hyperjump-black mb-3 text-xl font-semibold md:text-2xl">
                {title}
              </h3>
              <div className="text-hyperjump-gray space-y-0.5 text-[15px] leading-relaxed">
                <p>{street}</p>
                <p>
                  {locality} {postalCode}
                </p>
                <p>{country}</p>
              </div>
            </div>

            <div className="flex flex-col gap-5 md:items-end md:text-right">
              <div className="space-y-1">
                <p>
                  <a
                    href={`mailto:${email}`}
                    className="text-hyperjump-black text-[15px] font-medium transition-colors duration-200 hover:text-[#635BFF]">
                    {email}
                  </a>
                </p>
                <p className="text-hyperjump-gray text-sm">
                  D&B D-U-N-S: {duns}
                </p>
              </div>
              <Button
                asChild
                className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 h-11 rounded-full px-8 text-sm font-semibold text-white shadow-lg shadow-[#635BFF]/20 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#635BFF]/25">
                <Link href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  {mainOpenInGoogleMaps(lang)}
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
