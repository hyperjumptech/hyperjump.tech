"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  GridItems,
  GridItemsContainerBlack,
  GridItemsTitleBlack
} from "@/app/components/grid-items";
import type { SupportedLanguage } from "@/locales/.generated/types";
import InferenceAIAgent from "../components/chatbot-ui";
import { CaseStudy } from "../data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  inferenceaiHeroLabelDemoButton,
  inferenceaiHeroTextDemo
} from "@/locales/.generated/server";

type HeroProps = { caseStudy: CaseStudy; lang: SupportedLanguage };

export function Hero({
  caseStudy: { title, description, slug, demoUrl, username, password },
  lang
}: HeroProps) {
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
            {title}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="my-6 text-center text-base font-medium text-[#AFB0C3] md:my-10 md:max-w-3xl md:text-[22px]">
            {description}
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
          className="mx-auto flex w-full flex-col items-center justify-center md:max-w-4xl">
          {slug === "rag-chatbot" && <InferenceAIAgent />}
          {slug === "presenton" && (
            <>
              <Button
                asChild
                variant="default"
                className="mb-3 rounded-full border border-[#6D5697] bg-[radial-gradient(50%_50%_at_50%_50%,_#413AA3_0%,_#332C95_100%),linear-gradient(177.61deg,rgba(255,255,255,0)_2%,rgba(255,255,255,0.12)_98.17%)] font-semibold text-white transition-all hover:bg-white hover:text-gray-300 md:-mt-5">
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={demoUrl ?? `/${lang}/inferenceai/${slug}`}>
                  {inferenceaiHeroLabelDemoButton(lang)}
                </Link>
              </Button>
              <div className="flex flex-col text-center text-sm md:flex-row md:items-center md:gap-2 md:text-base">
                <div>{inferenceaiHeroTextDemo(lang)}</div>
                <span>
                  <b>Username:</b> {username} &nbsp;|&nbsp; <b>Password:</b>{" "}
                  {password}
                </span>
              </div>
            </>
          )}
          {slug === "startgpt" && (
            <>
              <Button
                asChild
                variant="default"
                className="mb-3 rounded-full border border-[#6D5697] bg-[radial-gradient(50%_50%_at_50%_50%,_#413AA3_0%,_#332C95_100%),linear-gradient(177.61deg,rgba(255,255,255,0)_2%,rgba(255,255,255,0.12)_98.17%)] font-semibold text-white transition-all hover:bg-white hover:text-gray-300 md:-mt-5">
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={demoUrl ?? `/${lang}/inferenceai/${slug}`}>
                  {inferenceaiHeroLabelDemoButton(lang)}
                </Link>
              </Button>
            </>
          )}
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

export function KeyFeatures({
  caseStudy: { keyFeatures, keyFeaturesHeading },
  lang
}: { lang: SupportedLanguage } & HeroProps) {
  return (
    <GridItemsContainerBlack
      id="key-features"
      className="max-w-7xl"
      bgClassName="bg-[#050013]">
      <GridItemsTitleBlack title={keyFeaturesHeading} />
      <div className="my-6" />
      <GridItems
        items={keyFeatures}
        columns={{ base: 1, sm: 2, md: 3, lg: 3, xl: 5 }}
        cardClassName="rounded-xl"
        borderClassName="card-border-gradient"
        titleClassName="text-white md:text-lg"
        lang={lang}
      />
    </GridItemsContainerBlack>
  );
}

export function HowItWorks({
  caseStudy: { howItWorks, howItWorksHeading }
}: HeroProps) {
  return (
    <section id="how-it-works" className="bg-inference-ai scroll-mt-20">
      <div className="mx-auto flex flex-wrap items-center justify-center px-4 py-7 md:px-6 md:py-[60px]">
        <div className="w-full max-w-3xl">
          <GridItemsTitleBlack title={howItWorksHeading} />
          <div className="my-6 space-y-6">
            {howItWorks.map(({ description, title }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}>
                <Card className="card-border-gradient rounded-xl p-6">
                  <h3 className="mb-1 text-xl font-semibold text-white">
                    {title}
                  </h3>
                  <p className="text-base text-[#AFB0C3]">{description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhatIsIncluded({
  caseStudy: { whatsIncluded, whatsIncludedHeading }
}: HeroProps) {
  return (
    <GridItemsContainerBlack
      id="what-is-included"
      className="max-w-7xl"
      bgClassName="bg-multilayer-gradient">
      <GridItemsTitleBlack title={whatsIncludedHeading} />
      <div className="my-6" />
      <div
        className="grid grid-cols-2 gap-10 bg-transparent pt-8 text-white lg:grid-cols-4 xl:grid-cols-none"
        style={{
          gridTemplateColumns: `repeat(${whatsIncluded?.length}, minmax(0, 1fr))`
        }}>
        {whatsIncluded.map(({ icon, title, text }) => (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            key={title}
            className="relative flex flex-col items-start justify-start gap-4 pl-6">
            <div className="absolute top-0 left-0 h-full w-[2px] bg-linear-to-b from-transparent via-white/20 to-transparent" />
            {icon}
            <p className="text-base font-semibold text-white/90 md:text-xl">
              {title}
            </p>
            <p className="text-sm font-medium text-white/90 md:text-lg">
              {text}
            </p>
          </motion.div>
        ))}
      </div>
    </GridItemsContainerBlack>
  );
}

export function Faqs({ caseStudy: { faqDesc, faqHeading, faqs } }: HeroProps) {
  return (
    <section id="faqs" className="bg-inference-ai scroll-mt-20">
      <div className="mx-auto flex flex-wrap items-center justify-center px-4 py-7 md:px-6 md:py-[60px]">
        <div className="w-full max-w-3xl">
          <GridItemsTitleBlack
            title={faqHeading}
            description={faqDesc}
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
              className="mx-auto w-full max-w-4xl space-y-4">
              {faqs.map(({ answer, question }) => (
                <AccordionItem key={question} value={`faq-${question}`} asChild>
                  <Card className="card-border-gradient w-full shadow-sm transition-all duration-300">
                    <CardHeader className="py-0 md:py-2">
                      <AccordionTrigger className="flex w-full items-center justify-between text-left text-xl font-medium text-white no-underline transition hover:no-underline focus:no-underline md:gap-2">
                        {question}
                      </AccordionTrigger>
                    </CardHeader>
                    <AccordionContent asChild className="py-0">
                      <CardContent
                        className="text-base text-[#CDCED8] lg:text-lg"
                        dangerouslySetInnerHTML={{ __html: answer }}
                      />
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
