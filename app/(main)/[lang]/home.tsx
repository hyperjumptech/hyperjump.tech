import type { Metadata } from "next";
import type { Organization, WebPage, WithContext } from "schema-dts";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import GridItemsContainer, {
  GridItems,
  GridItemsMoreButton,
  GridItemsTitle
} from "@/app/components/grid-items";
import data from "@/data.json";
import { CaseStudiesCTA } from "../components/case-studies-cta";
import { SupportedLanguage } from "@/locales/.generated/types";
import {
  mainServicesHeading,
  mainServicesDesc,
  mainCaseStudiesHeading,
  mainCaseStudiesDesc,
  mainProjectHeading,
  mainProjectDesc,
  mainFaqHeading,
  mainFaqDesc,
  mainViewMore
} from "@/locales/.generated/server";
import { getServices, getCaseStudies, getProject, getFaqs } from "./data";
import { Location } from "./location";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const {
  hero: { heading, subheading },
  location,
  socials,
  title,
  url
} = data;

export const metadata: Metadata = {
  description: subheading,
  title: `${title} - ${heading}`,
  openGraph: {
    url,
    type: "website",
    title: `${title} - ${heading}`,
    images: [
      {
        url: "https://hyperjump.tech/images/hyperjump-og.png",
        width: 1200,
        height: 630,
        alt: "Hyperjump Logo",
        type: "image/png"
      }
    ],
    siteName: title
  }
};

export default function Home({ lang }: { lang: SupportedLanguage }) {
  return (
    <>
      <Services lang={lang} />
      <CaseStudies lang={lang} />
      <OpenSourceProducts lang={lang} />
      <Faqs lang={lang} />
      <Location lang={lang} />
      <JsonLd />
    </>
  );
}

function Services({ lang }: { lang: SupportedLanguage }) {
  return (
    <GridItemsContainer id="services">
      <GridItemsTitle
        title={mainServicesHeading(lang)}
        description={mainServicesDesc(lang)}
      />
      <GridItems
        items={getServices(lang)}
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

function CaseStudies({ lang }: { lang: SupportedLanguage }) {
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
      <CaseStudiesCTA lang={lang} />
    </GridItemsContainer>
  );
}

function OpenSourceProducts({ lang }: { lang: SupportedLanguage }) {
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
        href={data.github}
      />
    </GridItemsContainer>
  );
}

function Faqs({ lang }: { lang: SupportedLanguage }) {
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
                <Card className="w-full border border-gray-200 bg-white shadow-sm transition-all duration-300">
                  <CardHeader className="px-4 py-2">
                    <AccordionTrigger className="flex w-full items-center justify-between gap-2 text-left text-xl font-medium text-[#020F15] no-underline transition hover:no-underline focus:no-underline">
                      {item.question}
                    </AccordionTrigger>
                  </CardHeader>
                  <AccordionContent asChild>
                    <CardContent className="px-4 pb-4 pt-0 text-base text-[#61656E] lg:text-lg">
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

function JsonLd() {
  return (
    <>
      <JsonLdOrganization />
      <JsonLdWebsite />
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
      email: location.email,
      contactType: "Sales",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Indonesian"]
    },
    sameAs: socials.map(({ url }) => url),
    duns: location.duns
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function JsonLdWebsite() {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url,
    description: subheading
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
