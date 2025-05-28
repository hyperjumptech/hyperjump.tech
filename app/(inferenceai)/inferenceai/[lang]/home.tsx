"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  GridItems,
  GridItemsContainerBlack,
  GridItemsTitleBlack
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
  inferenceaiFaqDesc
} from "@/locales/.generated/server";
import {
  getWhyWorkWithUs,
  getHowItWorks,
  getWhatYouGet,
  getCaseStudies,
  getFaqs
} from "./data";

type HomeProps = { lang: SupportedLanguage };

export default function Home({ lang }: HomeProps) {
  return (
    <>
      <WhyWorkWithUs lang={lang} />
      <HowItWorks lang={lang} />
      <WhatYouGet lang={lang} />
      <CaseStudies lang={lang} />
      <AboutUs lang={lang} />
      <Faqs lang={lang} />
    </>
  );
}

function WhyWorkWithUs({ lang }: HomeProps) {
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

function HowItWorks({ lang }: HomeProps) {
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
            {getHowItWorks(lang).map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} asChild>
                <Card className="my-4 w-full border-none bg-[#1B1728] shadow-sm transition-all duration-300">
                  <CardHeader className="py-0 md:py-2">
                    <AccordionTrigger className="flex items-center justify-between no-underline hover:no-underline focus:no-underline">
                      <div className="text-left text-xl font-medium text-white">
                        {item.title}
                      </div>
                    </AccordionTrigger>
                  </CardHeader>
                  <AccordionContent asChild>
                    <CardContent className="flex flex-col py-0 text-base text-[#CDCED8] lg:text-lg">
                      <div className="mb-4 text-left font-medium text-[#AFB0C3]">
                        {item.description}
                      </div>
                      <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl">
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

function WhatYouGet({ lang }: HomeProps) {
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

function CaseStudies({ lang }: HomeProps) {
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
          items={getCaseStudies(lang)}
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

function AboutUs({ lang }: HomeProps) {
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

function Faqs({ lang }: HomeProps) {
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
