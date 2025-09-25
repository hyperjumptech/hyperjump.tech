"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

import {
  GridItems,
  GridItemsContainerBlack,
  GridItemsTitleBlack
} from "@/app/components/grid-items";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  inferenceaiWhyWorkWithUsHeading,
  inferenceaiWhyWorkWithUsDesc,
  inferenceaiWhatYouGetHeading,
  inferenceaiWhatYouGetDesc,
  inferenceaiCaseStudiesHeading,
  inferenceaiCaseStudiesDesc,
  inferenceaiAboutUsHeading,
  inferenceaiAboutUsDesc,
  inferenceaiFaqHeading,
  inferenceaiFaqDesc,
  inferenceaiHeroHeading,
  inferenceaiHeroDesc,
  inferenceaiHowItWorksHeading,
  inferenceaiHowItWorksDesc
} from "@/locales/.generated/strings";
import type { SupportedLanguage } from "@/locales/.generated/types";
import InferenceAIAgent from "./components/chatbot-ui";
import {
  getWhyWorkWithUs,
  getWhatYouGet,
  getCaseStudies,
  getFaqs,
  getHowItWorks
} from "./data";

type HomeProps = {
  lang: SupportedLanguage;
};

type HeroProps = { lang: SupportedLanguage };

export function Hero({ lang }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#04040B] text-white">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: "easeOut" }}
        className="absolute inset-0 z-0">
        <Image
          src="/images/inferenceai/swatch.svg"
          alt="Hero Background"
          fill
          className="object-cover object-top"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-linear-to-t from-black/70 to-transparent" />
      <article className="relative z-20 mt-16 flex flex-col items-center justify-center px-4 md:mt-28 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex w-full flex-col items-center justify-center">
          <h1 className="mt-28 mb-4 text-center text-5xl font-semibold md:mb-6 md:max-w-4xl md:text-6xl">
            {inferenceaiHeroHeading(lang)}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="my-6 text-center text-base font-medium text-[#AFB0C3] md:my-10 md:max-w-3xl md:text-[22px]">
            {inferenceaiHeroDesc(lang)}
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
          className="mx-auto flex w-full flex-col items-center justify-center md:max-w-4xl">
          <InferenceAIAgent />
        </motion.div>
      </article>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
        className="relative z-10 h-56 w-full md:h-[400px]">
        <Image
          src="/images/inferenceai/banner.png"
          alt="Banner Bottom"
          fill
          className="object-cover object-center md:object-top"
        />

        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-24 bg-linear-to-t from-[#020F15] to-transparent md:h-32" />
      </motion.div>
    </section>
  );
}

export function WhyWorkWithUs({ lang }: HomeProps) {
  return (
    <GridItemsContainerBlack
      id="why-work-with-us"
      bgClassName="bg-inference-ai">
      <GridItemsTitleBlack
        title={inferenceaiWhyWorkWithUsHeading(lang)}
        description={inferenceaiWhyWorkWithUsDesc(lang)}
        layout="vertical"
      />
      <div className="my-6" />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}>
        <GridItems
          items={getWhyWorkWithUs(lang)}
          columns={{ base: 1, sm: 1, md: 3, lg: 3 }}
          cardClassName="rounded-[20px]"
          borderClassName="card-border-gradient"
          titleClassName="text-white md:text-lg"
          lang={lang}
        />
      </motion.div>
    </GridItemsContainerBlack>
  );
}

export function WhatYouGet({ lang }: HomeProps) {
  return (
    <GridItemsContainerBlack id="what-you-get" bgClassName="bg-what-you-get">
      <GridItemsTitleBlack
        title={inferenceaiWhatYouGetHeading(lang)}
        description={inferenceaiWhatYouGetDesc(lang)}
        layout="vertical"
      />
      <div className="my-6" />
      <div className="grid grid-cols-2 gap-10 text-white lg:grid-cols-3">
        {getWhatYouGet(lang).map((item, idx) => (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            key={idx}
            className="relative flex flex-col items-start justify-start gap-4 pl-6">
            <div className="absolute top-0 left-0 h-full w-[2px] bg-linear-to-b from-transparent via-white/20 to-transparent" />
            <Image src={item.icon} alt={item.title} width={32} height={32} />
            <p className="text-base font-semibold text-white/90 md:text-xl">
              {item.title}
            </p>
          </motion.div>
        ))}
      </div>
    </GridItemsContainerBlack>
  );
}

export function HowItWorks({ lang }: HomeProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <GridItemsContainerBlack id="how-it-works" bgClassName="bg-inference-ai">
      <GridItemsTitleBlack
        title={inferenceaiHowItWorksHeading(lang)}
        description={inferenceaiHowItWorksDesc(lang)}
        layout="vertical"
      />
      <div className="md:hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}>
          <Accordion type="single" collapsible className="w-full">
            {getHowItWorks(lang).map(({ description, image, title }) => (
              <AccordionItem key={title} value={`faq-${title}`} asChild>
                <Card className="my-4 w-full border-none bg-[#1B1728] shadow-sm transition-all duration-300">
                  <CardHeader className="py-0 md:py-2">
                    <AccordionTrigger className="flex items-center justify-between no-underline hover:no-underline focus:no-underline">
                      <div className="text-left text-xl font-medium text-white">
                        {title}
                      </div>
                    </AccordionTrigger>
                  </CardHeader>
                  <AccordionContent asChild>
                    <CardContent className="flex flex-col py-0 text-base text-[#CDCED8] lg:text-lg">
                      <div className="mb-4 text-left font-medium text-[#AFB0C3]">
                        {description}
                      </div>
                      <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl">
                        <Image
                          src={image}
                          alt={title}
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
        </motion.div>
      </div>
      <div className="mx-auto mt-8 hidden w-full grid-cols-1 items-stretch gap-8 md:grid lg:grid-cols-2">
        <div className="h-full space-y-4">
          {getHowItWorks(lang).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}>
              <Card
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "transform cursor-pointer bg-transparent p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl",
                  i === activeIndex
                    ? "border-white/20 bg-[#1B1728] shadow-md ring-1 shadow-white/10 ring-white/10"
                    : "border-[#4E4566] hover:border-white/20 hover:bg-[#1f1a2f]/40 hover:ring-1 hover:ring-white/10"
                )}>
                <h3 className="mb-1 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-base">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex min-h-[100%] items-center justify-center rounded-2xl bg-[#302A43] p-3">
          <div className="relative aspect-3/3 w-full max-w-md md:aspect-4/3">
            <Image
              src={getHowItWorks(lang)[activeIndex].image}
              alt={getHowItWorks(lang)[activeIndex].title}
              fill
              className="rounded-xl object-contain transition duration-300"
            />
          </div>
        </div>
      </div>
    </GridItemsContainerBlack>
  );
}

export function CaseStudies({ lang }: HomeProps) {
  return (
    <GridItemsContainerBlack
      id="case-studies"
      bgClassName="bg-multilayer-gradient">
      <GridItemsTitleBlack
        title={inferenceaiCaseStudiesHeading(lang)}
        description={inferenceaiCaseStudiesDesc(lang)}
      />
      <div className="my-6" />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}>
        <GridItems
          lang={lang}
          items={getCaseStudies(lang).map((caseStudy) => ({
            ...caseStudy,
            url: caseStudy.slug ? `/inferenceai/${caseStudy.slug}` : ""
          }))}
          columns={{ base: 1, md: 2, lg: 2 }}
          cardClassName="rounded-2xl"
          borderClassName="card-border-gradient"
          categoryClassName="bg-white/10 text-white"
          titleClassName="text-white text-[22px] font-semibold"
        />
      </motion.div>
    </GridItemsContainerBlack>
  );
}

export function AboutUs({ lang }: HomeProps) {
  return (
    <section id="about-us" className="bg-inference-ai scroll-mt-20">
      <div className="mx-auto flex flex-col flex-wrap items-center justify-center px-4 py-7 md:flex-row md:px-6 md:py-[60px]">
        <div className="w-full max-w-5xl">
          <GridItemsTitleBlack
            title={inferenceaiAboutUsHeading(lang)}
            description={inferenceaiAboutUsDesc(lang)}
          />
          <div className="my-6" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mx-auto flex h-52 w-full max-w-full items-center overflow-hidden rounded-xl md:h-[400px] xl:w-[1100px]">
            <Image
              src="/images/inferenceai/about-us.webp"
              alt="image"
              width={1100}
              height={600}
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Faqs({ lang }: HomeProps) {
  return (
    <section id="faqs" className="bg-inference-ai scroll-mt-20">
      <div className="mx-auto flex flex-wrap items-center justify-center px-4 py-7 md:px-6 md:py-[60px]">
        <div className="w-full max-w-3xl">
          <GridItemsTitleBlack
            title={inferenceaiFaqHeading(lang)}
            description={inferenceaiFaqDesc(lang)}
            layout="vertical"
          />
          <div className="my-6" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}>
            <Accordion
              type="single"
              collapsible
              className="mx-auto mt-8 w-full max-w-4xl space-y-4">
              {getFaqs(lang).map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} asChild>
                  <Card className="card-border-gradient w-full shadow-sm transition-all duration-300">
                    <CardHeader className="py-0 md:py-2">
                      <AccordionTrigger className="flex w-full items-center justify-between text-left text-xl font-medium text-white no-underline transition hover:no-underline focus:no-underline md:gap-2">
                        {item.question}
                      </AccordionTrigger>
                    </CardHeader>
                    <AccordionContent asChild className="py-0">
                      <CardContent className="text-base text-[#CDCED8] lg:text-lg">
                        {item.answer}
                      </CardContent>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
