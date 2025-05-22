"use client";

import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  servicesCtoaasTitle,
  servicesHeading,
  servicesCtoaasText,
  servicesCtoaasDesc,
  servicesCtoaasItems0,
  servicesCtoaasItems1,
  servicesCtoaasItems2,
  servicesSaasTitle,
  servicesSaasText,
  servicesSaasDesc,
  servicesSaasItems0,
  servicesSaasItems1,
  servicesSaasItems2,
  servicesTechDueDiligenceTitle,
  servicesTechDueDiligenceText,
  servicesTechDueDiligenceDesc,
  servicesTechDueDiligenceItems0,
  servicesTechDueDiligenceItems1,
  servicesTechDueDiligenceItems2,
  servicesErpTitle,
  servicesErpText,
  servicesErpDesc,
  servicesErpItems0,
  servicesErpItems1,
  servicesErpItems2,
  servicesCtaLabel,
  servicesCtaHeading,
  servicesCtaDesc,
  servicesPartnersHeading,
  servicesPartnersDesc,
  servicesSeeMore
} from "@/locales/.generated/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { sendGAEvent } from "@next/third-parties/google";
import { Clients } from "@/app/components/clients";
import data from "@/data.json";

export default function Home({ lang }: { lang: SupportedLanguage }) {
  return (
    <main className="xxl:max-w-7xl mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center px-4 py-12 text-center md:px-20 xl:px-0">
      <h3 className="text-hyperjump-black mb-14 text-[34px] font-medium md:text-[40px]">
        {servicesHeading(lang)}
      </h3>
      <section className="space-y-16">
        <CtoAsAService lang={lang} />
        <SoftwareAsAService lang={lang} />
        <TechDueDilligence lang={lang} />
        <ErpImplementation lang={lang} />
        <Partners lang={lang} />
        <CTAServices lang={lang} />
      </section>
    </main>
  );
}

function CtoAsAService({ lang }: { lang: SupportedLanguage }) {
  return (
    <section className="flex flex-col items-center gap-6 border-b border-gray-200 pb-7 md:flex-row md:pb-14">
      <div className="relative w-full xl:w-1/2">
        <Image
          src="/images/services/ctoaas.webp"
          alt={servicesCtoaasTitle(lang)}
          className="h-auto w-full rounded-2xl"
          width={660}
          height={400}
        />
        <div className="absolute -bottom-1 left-1 rounded-md">
          <Image
            className="h-20 w-20"
            src="/images/services/ctoaas-icon.svg"
            alt={`${servicesCtoaasTitle(lang)} icon`}
            width={80}
            height={80}
          />
        </div>
      </div>

      <div className="w-full xl:w-1/2">
        <div className="text-left">
          <h3 className="text-hyperjump-black mb-4 text-[28px] font-medium md:text-4xl">
            {servicesCtoaasTitle(lang)}
          </h3>
          <p className="mb-4 text-lg text-gray-700">
            {servicesCtoaasText(lang)}
          </p>
          <p className="mb-6 text-lg text-gray-700 underline">
            {servicesCtoaasDesc(lang)}
          </p>
        </div>

        <ul
          className="list-none space-y-4 text-left text-base text-gray-700 md:text-lg [&_b]:mt-4 [&_b]:block"
          dangerouslySetInnerHTML={{
            __html: [
              servicesCtoaasItems0(lang),
              servicesCtoaasItems1(lang),
              servicesCtoaasItems2(lang)
            ]
              .map(
                (point) =>
                  `<li class="flex items-center gap-2"><img src="/images/checklist.svg" width="24" height="24" alt="icon" /><div>${point}</div></li>`
              )
              .join("")
          }}
        />

        <div className="mt-8 md:text-left">
          <Button
            asChild
            size="lg"
            className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 w-full text-base font-semibold text-white md:w-44">
            <Link href="/services/cto-as-a-service">
              {servicesSeeMore(lang)}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function SoftwareAsAService({ lang }: { lang: SupportedLanguage }) {
  return (
    <section className="flex flex-col items-center gap-6 border-b border-gray-200 pb-7 md:flex-row-reverse md:pb-14">
      <div className="relative w-full xl:w-1/2">
        <Image
          src="/images/services/saas.webp"
          alt={servicesSaasTitle(lang)}
          className="h-auto w-full rounded-2xl"
          width={660}
          height={400}
        />
        <div className="absolute top-3 left-0 rounded-md">
          <Image
            className="h-20 w-20"
            src="/images/services/saas-icon.svg"
            alt={`${servicesSaasTitle(lang)} icon`}
            width={80}
            height={80}
          />
        </div>
      </div>
      <div className="w-full xl:w-1/2">
        <div className="text-left">
          <h3 className="text-hyperjump-black mb-4 text-[28px] font-medium md:text-4xl">
            {servicesSaasTitle(lang)}
          </h3>
          <p className="mb-4 text-lg text-gray-700">{servicesSaasText(lang)}</p>
          <p className="mb-6 text-lg text-gray-700 underline">
            {servicesSaasDesc(lang)}
          </p>
        </div>
        <ul
          className="list-none space-y-4 text-left text-base text-gray-700 md:text-lg [&_b]:mt-4 [&_b]:block"
          dangerouslySetInnerHTML={{
            __html: [
              servicesSaasItems0(lang),
              servicesSaasItems1(lang),
              servicesSaasItems2(lang)
            ]
              .map(
                (point) =>
                  `<li class="flex items-center gap-2"><img src="/images/checklist.svg" width="24" height="24" alt="icon" /><div>${point}</div></li>`
              )
              .join("")
          }}
        />
        <div className="mt-8 md:text-left">
          <Button
            asChild
            size="lg"
            className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 w-full text-base font-semibold text-white md:w-44">
            <Link href="/services/software-as-a-service">
              {servicesSeeMore(lang)}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function TechDueDilligence({ lang }: { lang: SupportedLanguage }) {
  return (
    <section className="flex flex-col items-center gap-6 border-b border-gray-200 pb-7 md:flex-row md:pb-14">
      <div className="relative w-full xl:w-1/2">
        <Image
          src="/images/services/tech-due-diligence.webp"
          alt={servicesTechDueDiligenceTitle(lang)}
          className="h-auto w-full rounded-2xl"
          width={660}
          height={400}
        />
        <div className="absolute right-1 -bottom-1 rounded-md">
          <Image
            className="h-20 w-20"
            src="/images/services/tech-due-diligence-icon.svg"
            alt={`${servicesTechDueDiligenceTitle(lang)} icon`}
            width={80}
            height={80}
          />
        </div>
      </div>

      <div className="w-full xl:w-1/2">
        <div className="text-left">
          <h3 className="text-hyperjump-black mb-4 text-[28px] font-medium md:text-4xl">
            {servicesTechDueDiligenceTitle(lang)}
          </h3>
          <p className="mb-4 text-lg text-gray-700">
            {servicesTechDueDiligenceText(lang)}
          </p>
          <p className="mb-6 text-lg text-gray-700 underline">
            {servicesTechDueDiligenceDesc(lang)}
          </p>
        </div>

        <ul
          className="list-none space-y-4 text-left text-base text-gray-700 md:text-lg [&_b]:mt-4 [&_b]:block"
          dangerouslySetInnerHTML={{
            __html: [
              servicesTechDueDiligenceItems0(lang),
              servicesTechDueDiligenceItems1(lang),
              servicesTechDueDiligenceItems2(lang)
            ]
              .map(
                (point) =>
                  `<li class="flex items-center gap-2"><img src="/images/checklist.svg" width="24" height="24" alt="icon" /><div>${point}</div></li>`
              )
              .join("")
          }}
        />

        <div className="mt-8 md:text-left">
          <Button
            asChild
            size="lg"
            className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 w-full text-base font-semibold text-white md:w-44">
            <Link href="/services/tech-due-diligence">
              {servicesSeeMore(lang)}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ErpImplementation({ lang }: { lang: SupportedLanguage }) {
  return (
    <section className="flex flex-col items-center gap-6 border-b border-gray-200 pb-7 md:flex-row-reverse md:pb-14">
      <div className="relative w-full xl:w-1/2">
        <Image
          src="/images/services/erp.webp"
          alt={servicesErpTitle(lang)}
          className="h-auto w-full rounded-2xl"
          width={660}
          height={400}
        />
        <div className="absolute right-1 -bottom-1 rounded-md">
          <Image
            className="h-20 w-20"
            src="/images/services/erp-icon.svg"
            alt={`${servicesErpTitle(lang)} icon`}
            width={80}
            height={80}
          />
        </div>
      </div>
      <div className="w-full xl:w-1/2">
        <div className="text-left">
          <h3 className="text-hyperjump-black mb-4 text-[28px] font-medium md:text-4xl">
            {servicesErpTitle(lang)}
          </h3>
          <p className="mb-4 text-lg text-gray-700">{servicesErpText(lang)}</p>
          <p className="mb-6 text-lg text-gray-700 underline">
            {servicesErpDesc(lang)}
          </p>
        </div>
        <ul
          className="list-none space-y-4 text-left text-base text-gray-700 md:text-lg [&_b]:mt-4 [&_b]:block"
          dangerouslySetInnerHTML={{
            __html: [
              servicesErpItems0(lang),
              servicesErpItems1(lang),
              servicesErpItems2(lang)
            ]
              .map(
                (point) =>
                  `<li class="flex items-center gap-2"><img src="/images/checklist.svg" width="24" height="24" alt="icon" /><div>${point}</div></li>`
              )
              .join("")
          }}
        />
        <div className="mt-8 md:text-left">
          <Button
            asChild
            size="lg"
            className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 w-full text-base font-semibold text-white md:w-44">
            <Link href="/services/erp-implementation">
              {servicesSeeMore(lang)}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Partners({ lang }: { lang: SupportedLanguage }) {
  return (
    <section className="relative w-full">
      <h3 className="text-hyperjump-black mb-4 text-[28px] font-medium md:text-4xl">
        {servicesPartnersHeading(lang)}
      </h3>
      <p className="text-hyperjump-gray mx-auto mb-8 w-full max-w-3xl text-center text-base md:text-lg">
        {servicesPartnersDesc(lang)}
      </p>
      <Clients clients={data.clients} />
    </section>
  );
}

function CTAServices({ lang }: { lang: SupportedLanguage }) {
  const { gaEventName, link } = data.cta;

  return (
    <section className="relative w-full max-w-7xl overflow-hidden rounded-lg">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/swatch.svg"
          alt="CTA Background"
          width={1440}
          height={308}
          className="pointer-events-none h-full object-cover select-none"
          style={{
            background:
              "linear-gradient(134.7deg, #5954DA 3.43%, #0B0B0D 48.93%)"
          }}
        />
      </div>
      <div className="relative flex flex-col items-center justify-center px-6 py-11 text-center">
        <h4 className="mb-3 text-3xl font-medium text-white md:text-4xl">
          {servicesCtaHeading(lang)}
        </h4>
        <p className="mb-8 text-lg text-white">{servicesCtaDesc(lang)}</p>

        <Button
          asChild
          size="lg"
          className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 text-base font-semibold text-white">
          <Link
            onClick={() => {
              sendGAEvent({
                event: gaEventName,
                category: "engagement",
                label: "Services CTA"
              });
            }}
            href={link}
            target="_blank"
            rel="noreferrer noopener">
            {servicesCtaLabel(lang)}
          </Link>
        </Button>
      </div>
    </section>
  );
}
