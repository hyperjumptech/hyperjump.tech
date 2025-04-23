import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { Organization, WebPage, WithContext } from "schema-dts";

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
import { CaseStudiesCTA } from "./components/case-studies-cta";

const {
  cta,
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

export default function Home() {
  return (
    <>
      <Services />
      <CaseStudies />
      <OpenSourceProducts />
      <Faqs />
      <Location />
      <JsonLd />
    </>
  );
}

function Services() {
  const { gaEventName, label, link } = cta;

  return (
    <GridItemsContainer id="services">
      <GridItemsTitle
        title="Services"
        description="We offer expert technology solutions to help businesses scale,
           enhance efficiency, optimize operations, and drive continuous
           innovation."
      />
      <GridItems
        items={data.services}
        columns={{ base: 1, sm: 2, lg: 4 }}
        classNameCard="rounded"
      />
      <GridItemsMoreButton
        text={label}
        href={link}
        gaEvent={{
          event: gaEventName,
          category: "engagement",
          label: "Service CTA"
        }}
      />
    </GridItemsContainer>
  );
}

function CaseStudies() {
  return (
    <GridItemsContainer className="bg-[#F6F8F9]" id="case-studies">
      <GridItemsTitle
        className="bg-[#F6F8F9]"
        title="Case Studies"
        description="Discover how we successfully transform challenges into opportunities
        with real-world solutions that drive lasting impact and business
        growth."
      />
      <GridItems
        items={data.caseStudies}
        columns={{ base: 1, md: 2, lg: 2 }}
        classNameCard="rounded"
      />
      <CaseStudiesCTA />
    </GridItemsContainer>
  );
}

function OpenSourceProducts() {
  return (
    <GridItemsContainer id="open-source">
      <GridItemsTitle
        title="Open Source Product"
        description="Explore our open-source projects and see how we innovate, collaborate,
          and build solutions that drive real impact. Join our community and
          contribute to cutting-edge technology."
      />
      <GridItems
        items={data.openSourceProducts}
        columns={{ base: 1, lg: 3 }}
        classNameCard="rounded"
      />
      <GridItemsMoreButton
        text="View More"
        variant="outline"
        href={data.github}
      />
    </GridItemsContainer>
  );
}

function Faqs() {
  return (
    <section id="faqs" className="scroll-mt-20 bg-[#F6F8F9] py-10">
      <div className="mx-auto flex flex-wrap items-center justify-center px-4 py-5 md:px-20 md:py-8">
        <div className="w-full">
          <GridItemsTitle
            title="Frequently asked questions"
            description="Find answers to commonly asked questions. If you need further assistance, feel free to reach out to us."
            layout="vertical"
            descriptionStyle="w-full md:max-w-2xl"
            className="bg-[#F6F8F9]"
          />
          <Accordion
            type="single"
            collapsible
            className="mx-auto w-full max-w-5xl space-y-4">
            {data.faqs.map((item, i) => (
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

function Location() {
  const { address, duns, email, imageUrl, mapsUrl, title } = location;

  return (
    <GridItemsContainer>
      <GridItemsTitle title="Our Location" layout="vertical" />
      <div className="mb-6 mt-8 grid w-full grid-cols-1 overflow-hidden rounded shadow-lg lg:grid-cols-4">
        <div className="relative col-span-1 overflow-hidden p-6 text-white">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/swatch.svg"
              alt="Location background"
              width={1440}
              height={308}
              className="pointer-events-none h-full select-none object-cover"
              style={{
                background:
                  "linear-gradient(134.7deg, #5954DA 3.43%, #0B0B0D 48.93%)"
              }}
            />
          </div>
          <div className="relative z-20">
            <h2 className="mb-4 text-lg font-bold">{title}</h2>
            <div className="mb-2 text-sm leading-relaxed">
              {address.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            <p className="mb-2 mt-4 text-sm">
              Email:{" "}
              <a
                href={`mailto:${email}`}
                className="transition-colors hover:text-hyperjump-blue">
                {email}
              </a>
            </p>
            <p className="mb-4 text-sm">D&B D-U-N-S: {duns}</p>
            <Button asChild variant="outline" className="bg-transparent">
              <Link href={mapsUrl} target="_blank" rel="noopener noreferrer">
                Open in Google Maps
              </Link>
            </Button>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-3">
          <Image
            src={imageUrl}
            alt={title}
            width={1072}
            height={500}
            className="h-[300px] w-full object-cover object-right lg:h-[500px] lg:object-center"
          />
        </div>
      </div>
    </GridItemsContainer>
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
