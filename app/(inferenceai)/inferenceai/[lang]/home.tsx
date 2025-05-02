"use client";

import { useState } from "react";
import Image from "next/image";
import data from "@/data.json";
import {
  GridItems,
  GridItemsSection,
  GridItemsMoreButton
} from "@/app/components/grid-items";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SupportedLanguage } from "@/locales/.generated/types";
import {
  inferenceaiWhyWorkWithUsHeading,
  inferenceaiWhyWorkWithUsDesc,
  inferenceaiHowItWorksHeading,
  inferenceaiHowItWorksDesc,
  inferenceaiWhatYouGetHeading,
  inferenceaiWhatYouGetDesc,
  inferenceaiCaseStudiesHeading,
  inferenceaiCaseStudiesDesc,
  inferenceaiAboutUsHeading,
  inferenceaiAboutUsDesc,
  inferenceaiFaqHeading,
  inferenceaiFaqDesc,
  inferenceaiCtaHeading,
  inferenceaiCtaDesc,
  inferenceaiCtaLabel
} from "@/locales/.generated/server";
import {
  getWhyWorkWithUs,
  getHowItWorks,
  getWhatYouGet,
  getCaseStudies,
  getFaqs
} from "./data";

export default function Home({ lang }: { lang: SupportedLanguage }) {
  return (
    <>
      <WhyWorkWithUs lang={lang} />
      <HowItWorks lang={lang} />
      <WhatYouGet lang={lang} />
      <CaseStudies lang={lang} />
      <AboutUs lang={lang} />
      <Faqs lang={lang} />
      <CTASection lang={lang} />
    </>
  );
}

function WhyWorkWithUs({ lang }: { lang: SupportedLanguage }) {
  return (
    <GridItemsSection
      id="why-work-with-us"
      title={inferenceaiWhyWorkWithUsHeading(lang)}
      description={inferenceaiWhyWorkWithUsDesc(lang)}
      layout="vertical">
      <div className="mb-8" />
      <GridItems
        items={getWhyWorkWithUs(lang)}
        columns={{ base: 1, sm: 1, md: 3, lg: 3 }}
        cardClassName="rounded-[20px]"
        borderClassName="card-border-gradient"
        titleClassName="text-white"
        lang={lang}
      />
    </GridItemsSection>
  );
}

function HowItWorks({ lang }: { lang: SupportedLanguage }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <GridItemsSection
      id="how-it-works"
      title={inferenceaiHowItWorksHeading(lang)}
      description={inferenceaiHowItWorksDesc(lang)}
      layout="vertical">
      <div className="md:hidden">
        <Accordion type="single" collapsible className="w-full">
          {getHowItWorks(lang).map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`} asChild>
              <Card className="my-4 w-full border-none bg-[#1B1728] shadow-sm transition-all duration-300">
                <CardHeader className="px-4 py-2">
                  <AccordionTrigger className="flex items-center justify-between no-underline hover:no-underline focus:no-underline">
                    <div className="flex flex-col">
                      <div className="text-left text-xl font-medium text-white">
                        {item.title}
                      </div>
                      <div className="text-left font-medium text-[#AFB0C3]">
                        {item.description}
                      </div>
                    </div>
                  </AccordionTrigger>
                </CardHeader>
                <AccordionContent asChild>
                  <CardContent className="px-4 pb-4 pt-0 text-base text-[#CDCED8] lg:text-lg">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="mx-auto mt-8 hidden w-full grid-cols-1 items-stretch gap-8 md:grid lg:grid-cols-2">
        <div className="h-full space-y-4">
          {getHowItWorks(lang).map((item, i) => (
            <Card
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "cursor-pointer rounded-2xl border bg-[#1B1728] p-4 transition-all duration-300 ease-in-out",
                i === activeIndex
                  ? "border-white/20 bg-[#2E2843] shadow-lg shadow-white/10 ring-1 ring-white/10"
                  : "border-white/10"
              )}>
              <h3 className="mb-1 font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-[#AFB0C3] text-muted-foreground">
                {item.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="flex min-h-[100%] items-center justify-center rounded-2xl bg-gradient-to-br from-[#2B2543] to-[#1A152E] p-8">
          <div className="relative aspect-[4/3] w-full max-w-md">
            <Image
              src={getHowItWorks(lang)[activeIndex].image}
              alt={getHowItWorks(lang)[activeIndex].title}
              fill
              className="rounded-xl object-contain transition duration-300"
            />
          </div>
        </div>
      </div>
    </GridItemsSection>
  );
}

function WhatYouGet({ lang }: { lang: SupportedLanguage }) {
  return (
    <GridItemsSection
      id="what-you-get"
      title={inferenceaiWhatYouGetHeading(lang)}
      description={inferenceaiWhatYouGetDesc(lang)}
      layout="vertical">
      <div className="grid grid-cols-2 gap-10 bg-[#0A0713] pt-8 text-white lg:grid-cols-3">
        {getWhatYouGet(lang).map((item, idx) => (
          <div
            key={idx}
            className="relative flex flex-col items-start justify-start gap-4 pl-6">
            <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <Image src={item.icon} alt={item.title} width={32} height={32} />
            <p className="text-sm text-white/90 md:text-base">{item.title}</p>
          </div>
        ))}
      </div>
    </GridItemsSection>
  );
}

function CaseStudies({ lang }: { lang: SupportedLanguage }) {
  const { linkAI, gaEventName } = data.cta;

  return (
    <GridItemsSection
      id="case-studies"
      title={inferenceaiCaseStudiesHeading(lang)}
      description={inferenceaiCaseStudiesDesc(lang)}>
      <GridItems
        lang={lang}
        items={getCaseStudies(lang)}
        columns={{ base: 1, md: 2, lg: 2 }}
        cardClassName="rounded-2xl mt-8"
        borderClassName="card-border-gradient"
        categoryClassName="bg-white/10 text-white"
        titleClassName="text-white"
      />
      <div className="mt-8 flex w-full justify-center">
        <GridItemsMoreButton
          type="inferenceai"
          text={inferenceaiCtaLabel(lang)}
          href={linkAI}
          gaEvent={{
            event: gaEventName,
            category: "engagement",
            label: "Case Study Inference AI"
          }}
        />
      </div>
    </GridItemsSection>
  );
}

function AboutUs({ lang }: { lang: SupportedLanguage }) {
  return (
    <GridItemsSection
      id="about-us"
      title={inferenceaiAboutUsHeading(lang)}
      description={inferenceaiAboutUsDesc(lang)}>
      <div className="relative mt-9 flex w-full justify-center">
        <div className="relative aspect-[1280/603.7735595703125] w-full max-w-[1280px] overflow-hidden rounded-[24.15px]">
          <Image
            src="/images/inferenceai/about-us.webp"
            alt="image"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </GridItemsSection>
  );
}

function Faqs({ lang }: { lang: SupportedLanguage }) {
  return (
    <GridItemsSection
      id="faqs"
      title={inferenceaiFaqHeading(lang)}
      description={inferenceaiFaqDesc(lang)}
      layout="vertical"
      className="bg-grid-faqs">
      <Accordion
        type="single"
        collapsible
        className="mx-auto mt-8 w-full max-w-4xl space-y-4">
        {getFaqs(lang).map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`} asChild>
            <Card className="w-full border-none bg-[#1B1728] shadow-sm transition-all duration-300">
              <CardHeader className="px-4 py-2">
                <AccordionTrigger className="flex w-full items-center justify-between gap-2 text-left text-xl font-medium text-white no-underline hover:no-underline focus:no-underline">
                  {item.question}
                </AccordionTrigger>
              </CardHeader>
              <AccordionContent asChild>
                <CardContent className="px-4 pb-4 pt-0 text-base text-[#CDCED8] lg:text-lg">
                  {item.answer}
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>
    </GridItemsSection>
  );
}

function CTASection({ lang }: { lang: SupportedLanguage }) {
  const { linkAI, gaEventName } = data.cta;

  return (
    <section className="w-full px-4 py-5 md:py-8">
      <div className="custom-glow-border relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-inferenceai-indigo p-6 text-center md:p-10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/inferenceai/cta-background.png"
            alt="Background"
            fill
            className="translate-y-16 scale-125 object-cover object-center md:translate-y-8"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-20 space-y-4 text-white md:space-y-6">
          <h2 className="bg-gradient-to-b from-white to-[#0C1711] bg-clip-text text-center text-2xl font-semibold leading-[120%] tracking-[-0.02em] text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] md:text-[48px]">
            {inferenceaiCtaHeading(lang)}
          </h2>
          <p className="mx-auto max-w-xl text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
            {inferenceaiCtaDesc(lang)}
          </p>
          <GridItemsMoreButton
            type="inferenceai"
            text={inferenceaiCtaLabel(lang)}
            href={linkAI}
            gaEvent={{
              event: gaEventName,
              category: "engagement",
              label: "CTA Inference AI"
            }}
          />
        </div>
      </div>
    </section>
  );
}
