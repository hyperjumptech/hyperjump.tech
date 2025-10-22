import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { Hero } from "@/app/components/hero";
import { Button } from "@/components/ui/button";
import data from "@/data.json";
import { dynamicOpengraph } from "@/lib/default-metadata";
import { cn } from "@/lib/utils";
import {
  supportedLanguages,
  type SupportedLanguage
} from "@/locales/.generated/types";
import {
  servicesPartnersHeading,
  servicesPartnersDesc,
  servicesSeeMore,
  servicesBestFor,
  servicesHeroHeading,
  servicesHeroDesc
} from "@/locales/.generated/server";

import { Clients } from "../components/clients";
import { serviceBySlug, services, ServiceSlug } from "../data";

const { clients, url } = data;

export async function generateMetadata(props: {
  params: Promise<{ lang: SupportedLanguage }>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  const meta: Metadata = {
    title: `Services - ${servicesHeroHeading(lang)}`,
    description: servicesHeroDesc(lang),
    alternates: {
      canonical: `${url}/${lang}/services`,
      languages: (supportedLanguages as SupportedLanguage[]).reduce(
        (acc, l) => {
          acc[l] = `${url}/${l}/services`;
          return acc;
        },
        {} as Record<string, string>
      )
    }
  };

  return dynamicOpengraph(meta);
}

export const generateStaticParams = async () => {
  return supportedLanguages.map((lang) => ({ lang }));
};

type ServicesProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function Services({ params }: ServicesProps) {
  const { lang } = await params;

  return (
    <main className="bg-white">
      <Hero
        subtitle={servicesHeroDesc(lang)}
        title={servicesHeroHeading(lang)}
      />
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-center px-4 pb-15 text-center md:px-20 xl:px-0">
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

        <section className="relative w-full pt-8">
          <h3 className="text-hyperjump-black mb-4 text-[28px] font-medium md:text-4xl">
            {servicesPartnersHeading(lang)}
          </h3>
          <p className="text-hyperjump-gray mx-auto mb-8 w-full max-w-3xl text-center text-base md:text-lg">
            {servicesPartnersDesc(lang)}
          </p>
          <Clients clients={clients} />
        </section>
      </div>
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

  const {
    bestFor,
    content: {
      whatYouGet: { items }
    },
    imageIconUrl,
    imageUrl,
    shortDescription,
    title
  } = service;

  return (
    <div
      className={cn(
        "flex flex-col items-start gap-6 border-b border-gray-200 pb-7 md:flex-row md:pb-14",
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
        <div className="absolute right-1 -bottom-1 rounded-md">
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
          {items.map((feature) => (
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
            <Link href={`/${lang}/services/${slug}`}>
              {servicesSeeMore(lang)}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
