import Image from "next/image";
import Link from "next/link";
import type { Organization, WebPage, WithContext } from "schema-dts";

import { services } from "@/app/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import GridItemsContainer, {
  GridItems,
  GridItemsMoreButton,
  GridItemsTitle
} from "@/app/components/grid-items";
import data from "@/data.json";
import {
  supportedLanguages,
  type SupportedLanguage
} from "@/locales/.generated/types";
import {
  mainServicesHeading,
  mainServicesDesc,
  mainCaseStudiesHeading,
  mainCaseStudiesDesc,
  mainProjectHeading,
  mainProjectDesc,
  mainFaqHeading,
  mainFaqDesc,
  mainViewMore,
  mainHeroDesc,
  mainCaseStudiesCtaHeading,
  mainCaseStudiesCtaDesc,
  mainCaseStudiesCtaExploreOurCaseStudies,
  mainHeroHeading
} from "@/locales/.generated/server";

import { Clients } from "../components/clients";
import { Location } from "./components/location";
import { getCaseStudies, getProject, getFaqs, pageData } from "./data";

const { github, socials, title, url } = data;

export const generateStaticParams = async () => {
  return supportedLanguages.map((lang) => ({ lang }));
};

type HomeParams = {
  lang: SupportedLanguage;
};

type HomeProps = {
  params: Promise<HomeParams>;
};

export default async function MainPage({ params }: HomeProps) {
  const { lang } = await params;
  return (
    <>
      <Hero lang={lang} />
      <Services lang={lang} />
      <CaseStudies lang={lang} />
      <OpenSourceProducts lang={lang} />
      <Faqs lang={lang} />
      <Location lang={lang} location={pageData.location} />
      <JsonLd lang={lang} />
    </>
  );
}

type HeroProps = { lang: SupportedLanguage };

function Hero({ lang }: HeroProps) {
  return (
    <section
      id="hero"
      className="bg-hyperjump-black relative h-[648px] overflow-hidden px-4 text-white md:px-20">
      <div className="absolute inset-0 z-0">
        <Image
          alt="Hero background"
          blurDataURL="/images/banner-blur.webp"
          className="object-cover object-center"
          fill
          placeholder="blur"
          priority
          src="/images/banner.webp"
        />
      </div>

      <div className="relative z-10 flex h-[648px] flex-col items-center justify-center">
        <div className="max-w-5xl text-center">
          <h1 className="mb-4 text-4xl font-medium sm:text-5xl md:mb-6 md:text-6xl">
            {mainHeroHeading(lang)}
          </h1>
          <p className="text-sm font-medium text-white sm:text-base md:text-xl">
            {mainHeroDesc(lang)}
          </p>
        </div>
        <div className="relative top-15">
          <Clients clients={data.clients} isPriorityLoad />
        </div>
      </div>
    </section>
  );
}

function Services({ lang }: HomeParams) {
  return (
    <GridItemsContainer id="services">
      <GridItemsTitle
        title={mainServicesHeading(lang)}
        description={mainServicesDesc(lang)}
      />
      <GridItems
        items={services(lang).map(({ description, iconUrl, slug, title }) => ({
          title,
          description,
          icon: iconUrl,
          url: `/services/${slug}`
        }))}
        columns={{ base: 1, sm: 2, lg: 4 }}
        cardClassName="rounded"
        lang={lang}
      />
      <div className="mt-10 flex w-full items-center justify-center">
        <Button
          variant="default"
          className="bg-hyperjump-blue hover:bg-hyperjump-blue/90"
          asChild>
          <Link href="/services">{mainViewMore(lang)}</Link>
        </Button>
      </div>
    </GridItemsContainer>
  );
}

function CaseStudies({ lang }: HomeParams) {
  return (
    <GridItemsContainer className="bg-[#F6F8F9]" id="case-studies">
      <GridItemsTitle
        className="bg-[#F6F8F9]"
        title={mainCaseStudiesHeading(lang)}
        description={mainCaseStudiesDesc(lang)}
      />
      <GridItems
        items={getCaseStudies(lang)}
        columns={{ base: 1, md: 2, lg: 2 }}
        cardClassName="rounded"
        lang={lang}
      />
      <div className="relative mt-10 w-full max-w-5xl overflow-hidden rounded">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/swatch.svg"
            alt="Footer background"
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
          <h3 className="text-3xl font-medium">
            {mainCaseStudiesCtaHeading(lang)}
          </h3>
          <p className="mt-3 max-w-xl">{mainCaseStudiesCtaDesc(lang)}</p>
          <Button
            asChild
            variant="outline"
            className="mt-8 bg-transparent font-semibold text-white hover:bg-white">
            <Link href="/case-studies">
              {mainCaseStudiesCtaExploreOurCaseStudies(lang)}
            </Link>
          </Button>
        </div>
      </div>
    </GridItemsContainer>
  );
}

function OpenSourceProducts({ lang }: HomeParams) {
  return (
    <GridItemsContainer id="open-source">
      <GridItemsTitle
        title={mainProjectHeading(lang)}
        description={mainProjectDesc(lang)}
      />
      <GridItems
        items={getProject(lang)}
        columns={{ base: 1, sm: 2, lg: 3 }}
        cardClassName="rounded"
        lang={lang}
      />
      <GridItemsMoreButton
        text={mainViewMore(lang)}
        variant="outline"
        href={github}
      />
    </GridItemsContainer>
  );
}

function Faqs({ lang }: HomeParams) {
  return (
    <section id="faqs" className="scroll-mt-20 bg-[#F6F8F9] py-10">
      <div className="mx-auto flex flex-wrap items-center justify-center px-4 py-5 md:px-20 md:py-8">
        <div className="w-full">
          <GridItemsTitle
            title={mainFaqHeading(lang)}
            description={mainFaqDesc(lang)}
            layout="vertical"
            descriptionClassname="w-full md:max-w-2xl"
            className="bg-[#F6F8F9]"
          />
          <Accordion
            type="single"
            collapsible
            className="mx-auto w-full max-w-5xl space-y-4">
            {getFaqs(lang).map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} asChild>
                <Card className="w-full border border-gray-200 bg-white shadow-xs transition-all duration-300">
                  <CardHeader className="px-4 py-2">
                    <AccordionTrigger className="flex w-full items-center justify-between gap-2 text-left text-xl font-medium text-[#020F15] no-underline transition hover:no-underline focus:no-underline">
                      {item.question}
                    </AccordionTrigger>
                  </CardHeader>
                  <AccordionContent asChild>
                    <CardContent className="px-4 pt-0 pb-4 text-base text-[#61656E] lg:text-lg">
                      {item.answer}
                    </CardContent>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function JsonLd({ lang }: HomeParams) {
  return (
    <>
      <JsonLdOrganization />
      <JsonLdWebsite lang={lang} />
    </>
  );
}

function JsonLdOrganization() {
  const jsonLd: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: title,
    url,
    logo: "https://hyperjump.tech/images/hyperjump-colored.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "D.Lab Building (6th floor), Jl. Riau No. 1",
      addressLocality: "Gondangdia, Menteng, Jakarta Pusat",
      addressRegion: "DKI Jakarta",
      postalCode: "10350",
      addressCountry: "ID"
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: pageData.location.email,
      contactType: "Sales",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Indonesian"]
    },
    sameAs: socials.map(({ url }) => url),
    duns: pageData.location.duns
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

type JsonLdWebsiteParameters = {
  lang: SupportedLanguage;
};

function JsonLdWebsite({ lang }: JsonLdWebsiteParameters) {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url,
    description: mainHeroDesc(lang)
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
