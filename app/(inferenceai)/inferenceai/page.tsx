"use client";

import { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import Image from "next/image";
import data from "./inferenceai-data.json";
import {
  GridItems,
  GridItemsSection,
  ScheduleConsultationButton
} from "./components/grid-items";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function InferenceAI() {
  return (
    <>
      <WhyWorkWithUs />
      <HowItWorks />
      <WhatYouGet />
      <CaseStudies />
      <AboutUs />
      <Faqs />
      <CTASection />
    </>
  );
}

function WhyWorkWithUs() {
  const { header, subheader, content } = data.whyWorkWithUs;

  return (
    <GridItemsSection
      id="why-work-with-us"
      title={header}
      description={subheader}
      layout="vertical">
      <div className="mb-8" />
      <GridItems
        items={content}
        columns={{ base: 1, sm: 1, md: 3, lg: 3 }}
        classNameCard="rounded-[20px]"
      />
    </GridItemsSection>
  );
}

function HowItWorks() {
  const { header, subheader, content } = data.howItWorks;
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  return (
    <GridItemsSection
      id="how-it-works"
      title={header}
      description={subheader}
      layout="vertical">
      {isMobile ? (
        <Accordion type="single" collapsible className="w-full">
          {content.map((item, i) => (
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
      ) : (
        <div className="mx-auto mt-8 grid w-full grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
          <div className="h-full space-y-4">
            {content.map((item, i) => (
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
                src={content[activeIndex].image}
                alt={content[activeIndex].title}
                fill
                className="rounded-xl object-contain transition duration-300"
              />
            </div>
          </div>
        </div>
      )}
    </GridItemsSection>
  );
}

function WhatYouGet() {
  const { header, subheader, content } = data.whatYouGet;

  return (
    <GridItemsSection
      id="what-you-get"
      title={header}
      description={subheader}
      layout="vertical">
      <div className="grid grid-cols-2 gap-10 bg-[#0A0713] pt-8 text-white lg:grid-cols-3">
        {content.map((item, idx) => (
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

function CaseStudies() {
  const { header, subheader, content } = data.caseStudies;

  return (
    <GridItemsSection id="case-studies" title={header} description={subheader}>
      <GridItems
        items={content}
        columns={{ base: 1, md: 2, lg: 2 }}
        classNameCard="rounded-2xl mt-8"
      />
      <div className="mt-8 flex w-full justify-center">
        <ScheduleConsultationButton />
      </div>
    </GridItemsSection>
  );
}

function AboutUs() {
  const { header, subheader, image } = data.aboutUs;

  return (
    <GridItemsSection id="about-us" title={header} description={subheader}>
      <div className="relative mt-9 flex w-full justify-center">
        <div className="relative aspect-[1280/603.7735595703125] w-full max-w-[1280px] overflow-hidden rounded-[24.15px]">
          <Image src={image} alt="image" fill className="object-cover" />
        </div>
      </div>
    </GridItemsSection>
  );
}

function Faqs() {
  const { header, subheader, content } = data.faq;

  return (
    <GridItemsSection
      id="faqs"
      title={header}
      description={subheader}
      layout="vertical"
      className="bg-grid-faqs">
      <Accordion
        type="single"
        collapsible
        className="mx-auto mt-8 w-full max-w-4xl space-y-4">
        {content.map((item, i) => (
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

function CTASection() {
  const { header, subheader, background } = data.cta;

  return (
    <section className="w-full px-4 py-5 md:py-8">
      <div className="custom-glow-border relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-inferenceai-ai-indigo p-6 text-center md:p-10">
        <div className="absolute inset-0 z-0">
          <Image
            src={background}
            alt="Background"
            fill
            className="translate-y-16 scale-125 object-cover object-center md:translate-y-8"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-20 space-y-4 text-white md:space-y-6">
          <h2 className="bg-gradient-to-b from-white to-[#0C1711] bg-clip-text text-center text-2xl font-semibold leading-[120%] tracking-[-0.02em] text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] md:text-[48px]">
            {header}
          </h2>
          <p className="mx-auto max-w-xl text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
            {subheader}
          </p>
          <ScheduleConsultationButton />
        </div>
      </div>
    </section>
  );
}
