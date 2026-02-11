import type { BreadcrumbList, WithContext } from "schema-dts";

import data from "@/data.json";
import {
  type SupportedLanguage,
  supportedLanguages
} from "@/locales/.generated/types";

import Services from "./components/services";
import DemosAndDocs from "./components/demos";
import { OpenSourceProjects } from "./components/projects";
import TrustedBy from "./components/trusted";
import ContactForm from "./components/contact-form";
import CaseStudies from "./components/case-studies";
import SmddHero from "./components/hero";

export const generateStaticParams = async () => {
  return supportedLanguages.map((lang) => ({ lang }));
};

type LangProps = {
  lang: SupportedLanguage;
};

type SmddProps = {
  params: Promise<LangProps>;
};

export default async function Smdd({ params }: SmddProps) {
  const { lang } = await params;
  return (
    <>
      <SmddHero lang={lang} />
      <div className="container mx-auto flex max-w-5xl flex-col space-y-8 border-b bg-white px-4 pt-8 text-black">
        <Services lang={lang} />
        <DemosAndDocs lang={lang} />
        <OpenSourceProjects lang={lang} />
        <TrustedBy lang={lang} />
        <CaseStudies lang={lang} />
        <ContactForm lang={lang} />
      </div>
      <JsonLd lang={lang} />
    </>
  );
}

function JsonLd({ lang }: LangProps) {
  const { url } = data;
  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${url}/${lang}`
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sinar Mas Digital Day 2024",
        item: `${url}/${lang}/smdd2024`
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
    />
  );
}
