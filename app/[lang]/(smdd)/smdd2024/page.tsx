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

type Smdd2024Props = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function Smdd2024Page({ params }: Smdd2024Props) {
  const { lang } = await params;
  return (
    <>
      <SmddHero lang={lang} />
      <section className="border-b bg-white py-8">
        <div className="container mx-auto flex flex-wrap space-y-4 pt-4 pb-12">
          <Services lang={lang} />
          <DemosAndDocs lang={lang} />
          <OpenSourceProjects lang={lang} />
          <TrustedBy lang={lang} />
          <CaseStudies lang={lang} />
          <ContactForm lang={lang} />
        </div>
      </section>
    </>
  );
}
