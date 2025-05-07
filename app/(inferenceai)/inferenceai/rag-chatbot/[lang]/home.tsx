"use client";

import { GridItems, GridItemsSection } from "@/app/components/grid-items";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SupportedLanguage } from "@/locales/.generated/types";
import {
  ragChatbotKeyFeaturesHeading,
  ragChatbotHowItWorksHeading,
  ragChatbotWhatIsIncludedHeading,
  ragChatbotFaqHeading,
  ragChatbotFaqDesc
} from "@/locales/.generated/server";
import {
  getKeyFeatures,
  getHowItWorks,
  getWhatIsIncluded,
  getFaqs
} from "./data";

export default function Home({ lang }: { lang: SupportedLanguage }) {
  return (
    <>
      <KeyFeatures lang={lang} />
      <HowItWorks lang={lang} />
      <WhatIsIncluded lang={lang} />
      <Faqs lang={lang} />
    </>
  );
}

function KeyFeatures({ lang }: { lang: SupportedLanguage }) {
  return (
    <GridItemsSection
      id="key-features"
      title={ragChatbotKeyFeaturesHeading(lang)}
      className="my-10 max-w-7xl">
      <div className="my-10" />
      <GridItems
        items={getKeyFeatures(lang)}
        columns={{ base: 1, sm: 2, md: 3, lg: 3, xl: 5 }}
        cardClassName="rounded-[20px]"
        borderClassName="card-border-gradient"
        titleClassName="text-white md:text-lg"
        lang={lang}
      />
    </GridItemsSection>
  );
}

function HowItWorks({ lang }: { lang: SupportedLanguage }) {
  return (
    <GridItemsSection
      id="how-it-works"
      title={ragChatbotHowItWorksHeading(lang)}
      className="my-10 max-w-7xl">
      <div className="my-10" />
      <div className="mt-8 w-full grid-cols-1 gap-8 space-y-6 md:grid md:space-y-0 lg:grid-cols-1">
        {getHowItWorks(lang).map((item, i) => (
          <Card
            key={i}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-[#1B1728] p-6 transition-all duration-300 ease-in-out hover:border-white/20 hover:bg-gradient-to-br hover:from-[#2E2843] hover:to-[#1B1728] hover:shadow-lg hover:ring-1 hover:ring-white/10">
            <h3 className="mb-1 text-xl font-semibold text-white group-hover:text-white">
              {item.title}
            </h3>
            <p className="text-base text-[#AFB0C3] group-hover:text-[#CDCED8]">
              {item.description}
            </p>
          </Card>
        ))}
      </div>
    </GridItemsSection>
  );
}

function WhatIsIncluded({ lang }: { lang: SupportedLanguage }) {
  return (
    <GridItemsSection
      id="what-is-included"
      title={ragChatbotWhatIsIncludedHeading(lang)}
      className="my-10 max-w-7xl">
      <div className="mt-10 grid grid-cols-2 gap-10 bg-[#0A0713] pt-8 text-white lg:grid-cols-4">
        {getWhatIsIncluded(lang).map((item, idx) => (
          <div
            key={idx}
            className="relative flex flex-col items-start justify-start gap-4 pl-6">
            <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            {item.icon}
            <p className="text-base font-semibold text-white/90 md:text-xl">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </GridItemsSection>
  );
}

function Faqs({ lang }: { lang: SupportedLanguage }) {
  return (
    <GridItemsSection
      id="faqs"
      title={ragChatbotFaqHeading(lang)}
      description={ragChatbotFaqDesc(lang)}
      layout="vertical"
      className="bg-grid-faqs my-10">
      <Accordion
        type="single"
        collapsible
        className="mx-auto mt-8 w-full max-w-7xl space-y-4">
        {getFaqs(lang).map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`} asChild>
            <Card className="w-full border-none bg-[#1B1728] shadow-sm transition-all duration-300">
              <CardHeader className="px-4 py-2">
                <AccordionTrigger className="flex w-full items-center justify-between gap-2 text-left text-lg font-medium text-white no-underline hover:no-underline focus:no-underline md:text-[22px]">
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
