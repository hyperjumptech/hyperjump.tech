"use client";

import Image from "next/image";
import Link from "next/link";

import GridItemsContainer, {
  GridItemsTitle
} from "@/app/components/grid-items";
import { Button } from "@/components/ui/button";
import {
  mainOpenInGoogleMaps,
  mainOurLocation
} from "@/locales/.generated/server";
import type { SupportedLanguage } from "@/locales/.generated/types";

type Location = {
  title: string;
  address: string[];
  email: string;
  duns: string;
  mapsUrl: string;
  imageUrl: string;
};

type LocationProps = { lang: SupportedLanguage; location: Location };

export function Location({ lang, location }: LocationProps) {
  const { address, duns, email, imageUrl, mapsUrl, title } = location;

  return (
    <GridItemsContainer>
      <GridItemsTitle title={mainOurLocation(lang)} layout="vertical" />
      <div className="mt-8 mb-6 grid w-full grid-cols-1 overflow-hidden rounded shadow-lg lg:grid-cols-4">
        <div className="relative col-span-1 overflow-hidden p-6 text-white">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/swatch.svg"
              alt="Location background"
              width={1440}
              height={308}
              className="pointer-events-none h-full object-cover select-none"
              style={{
                background:
                  "linear-gradient(134.7deg, #5954DA 3.43%, #0B0B0D 48.93%)"
              }}
            />
          </div>
          <div className="relative z-20">
            <h2 className="mb-4 text-lg font-bold">{title}</h2>
            <div className="mb-2 text-sm leading-relaxed">
              {address.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            <p className="mt-4 mb-2 text-sm">
              Email:{" "}
              <a
                href={`mailto:${email}`}
                className="hover:text-hyperjump-blue transition-colors">
                {email}
              </a>
            </p>
            <p className="mb-4 text-sm">D&B D-U-N-S: {duns}</p>
            <Button asChild variant="outline" className="bg-transparent">
              <Link href={mapsUrl} target="_blank" rel="noopener noreferrer">
                {mainOpenInGoogleMaps(lang)}
              </Link>
            </Button>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-3">
          <Image
            src={imageUrl}
            alt={title}
            width={1072}
            height={500}
            className="h-[300px] w-full object-cover object-right lg:h-[500px] lg:object-center"
          />
        </div>
      </div>
    </GridItemsContainer>
  );
}
