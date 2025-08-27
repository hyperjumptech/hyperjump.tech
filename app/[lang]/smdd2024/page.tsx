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

type SmddProps = {
  params: Promise<{ lang: SupportedLanguage }>;
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
    </>
  );
}
