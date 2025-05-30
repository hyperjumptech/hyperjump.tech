import Link from "next/link";
import Image from "next/image";

import { Clients } from "@/app/components/clients";
import { serviceBySlug, services, ServiceSlug } from "@/app/data/service";
import { Button } from "@/components/ui/button";
import data from "@/data.json";
import { cn } from "@/lib/utils";
import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  servicesHeading,
  servicesPartnersHeading,
  servicesPartnersDesc,
  servicesSeeMore,
  servicesBestFor
} from "@/locales/.generated/server";

export default function Home({ lang }: { lang: SupportedLanguage }) {
  return (
    <main className="xxl:max-w-7xl mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center px-4 py-12 text-center md:px-20 xl:px-0">
      <h3 className="text-hyperjump-black mb-14 text-[34px] font-medium md:text-[40px]">
        {servicesHeading(lang)}
      </h3>
      <section className="space-y-16">
        {services(lang).map(({ slug }, index) => (
          <Service
            key={slug}
            lang={lang}
            slug={slug}
            isReverseImagePosition={index % 2 !== 0}
          />
        ))}
      </section>

      <section className="relative w-full pt-16">
        <h3 className="text-hyperjump-black mb-4 text-[28px] font-medium md:text-4xl">
          {servicesPartnersHeading(lang)}
        </h3>
        <p className="text-hyperjump-gray mx-auto mb-8 w-full max-w-3xl text-center text-base md:text-lg">
          {servicesPartnersDesc(lang)}
        </p>
        <Clients clients={data.clients} />
      </section>
    </main>
  );
}

type ServiceProps = {
  lang: SupportedLanguage;
  slug: ServiceSlug;
  isReverseImagePosition?: boolean;
};

function Service({ lang, isReverseImagePosition = false, slug }: ServiceProps) {
  const service = serviceBySlug({ lang, slug });

  if (!service) {
    return null;
  }

  const { bestFor, features, imageIconUrl, imageUrl, shortDescription, title } =
    service;

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-6 border-b border-gray-200 pb-7 md:flex-row md:pb-14",
        isReverseImagePosition && "md:flex-row-reverse"
      )}>
      <div className="relative w-full xl:w-1/2">
        <Image
          src={imageUrl}
          alt={title}
          className="h-auto w-full rounded-2xl"
          width={660}
          height={400}
        />
        <div className="absolute -bottom-1 left-1 rounded-md">
          <Image
            className="h-20 w-20"
            src={imageIconUrl}
            alt={`${title} icon`}
            width={80}
            height={80}
          />
        </div>
      </div>

      <div className="w-full xl:w-1/2">
        <div className="text-left">
          <h3 className="text-hyperjump-black mb-4 text-[28px] font-medium md:text-4xl">
            {title}
          </h3>
          <p className="mb-4 text-lg text-gray-700">{shortDescription}</p>
          <p className="mb-6 text-lg text-gray-700">
            {servicesBestFor(lang)}:{" "}
            <span className="underline">{bestFor.join(", ")}</span>
          </p>
        </div>

        <ul className="list-none space-y-4 text-left text-base text-gray-700 md:text-lg [&_b]:mt-4 [&_b]:block">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <Image
                src="/images/checklist.svg"
                width="24"
                height="24"
                alt="Checklist icon"
              />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-8 md:text-left">
          <Button
            asChild
            size="lg"
            className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 w-full text-base font-semibold text-white md:w-44">
            <Link href={`/services/${slug}`}>{servicesSeeMore(lang)}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
