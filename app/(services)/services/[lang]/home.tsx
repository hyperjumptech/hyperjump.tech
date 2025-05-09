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
  servicesPartnersDesc
} from "@/locales/.generated/server";
import { ServiceCard } from "../components/service-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { sendGAEvent } from "@next/third-parties/google";
import data from "@/data.json";

export default function Home({ lang }: { lang: SupportedLanguage }) {
  const { gaEventName, link } = data.cta;

  return (
    <main className="xxl:max-w-7xl mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center px-4 py-12 text-center md:px-20 xl:px-0">
      <h3 className="text-hyperjump-black mb-14 text-[34px] font-medium md:text-[40px]">
        {servicesHeading(lang)}
      </h3>
      <section className="space-y-16">
        <ServiceCard
          title={servicesCtoaasTitle(lang)}
          text={servicesCtoaasText(lang)}
          desc={servicesCtoaasDesc(lang)}
          items={[
            servicesCtoaasItems0(lang),
            servicesCtoaasItems1(lang),
            servicesCtoaasItems2(lang)
          ]}
          image="/images/services/ctoaas.webp"
          icon="/images/services/ctoaas-icon.svg"
        />

        <ServiceCard
          title={servicesSaasTitle(lang)}
          text={servicesSaasText(lang)}
          desc={servicesSaasDesc(lang)}
          items={[
            servicesSaasItems0(lang),
            servicesSaasItems1(lang),
            servicesSaasItems2(lang)
          ]}
          image="/images/services/saas.webp"
          icon="/images/services/saas-icon.svg"
          reverse
        />

        <ServiceCard
          title={servicesTechDueDiligenceTitle(lang)}
          text={servicesTechDueDiligenceText(lang)}
          desc={servicesTechDueDiligenceDesc(lang)}
          items={[
            servicesTechDueDiligenceItems0(lang),
            servicesTechDueDiligenceItems1(lang),
            servicesTechDueDiligenceItems2(lang)
          ]}
          image="/images/services/tech-due-diligence.webp"
          icon="/images/services/tech-due-diligence-icon.svg"
        />

        <ServiceCard
          title={servicesErpTitle(lang)}
          text={servicesErpText(lang)}
          desc={servicesErpDesc(lang)}
          items={[
            servicesErpItems0(lang),
            servicesErpItems1(lang),
            servicesErpItems2(lang)
          ]}
          image="/images/services/erp.webp"
          icon="/images/services/erp-icon.svg"
          withBorder={false}
          reverse
        />
      </section>

      <section className="relative mt-20 mb-10 w-full">
        <h3 className="text-hyperjump-black mb-4 text-[28px] font-medium md:text-4xl">
          {servicesPartnersHeading(lang)}
        </h3>
        <p className="text-hyperjump-gray mx-auto mb-8 w-full max-w-3xl text-center text-base md:text-lg">
          {servicesPartnersDesc(lang)}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8">
          {[
            {
              imageUrl: "/images/clients/services/my-republic.svg",
              name: "My Republic"
            },
            { imageUrl: "/images/clients/services/btn.svg", name: "BTN" },
            { imageUrl: "/images/clients/services/aruna.svg", name: "Aruna" }
          ].map(({ imageUrl, name }) => (
            <Image
              key={name}
              src={imageUrl}
              alt={name}
              height={36}
              width={120}
              className="h-6 w-auto object-contain sm:h-7"
              priority
            />
          ))}
        </div>
      </section>

      <section className="relative mt-10 w-full max-w-7xl overflow-hidden rounded-lg">
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
    </main>
  );
}
