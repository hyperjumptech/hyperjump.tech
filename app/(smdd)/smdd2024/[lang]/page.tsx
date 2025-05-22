import type { SupportedLanguage } from "@/locales/.generated/types";
import Services from "./services";
import DemosAndDocs from "./demos";
import { OpenSourceProjects } from "./projects";
import TrustedBy from "./trusted";
import CaseStudies from "./case-studies";
import ContactForm from "./contact-form";

export const generateStaticParams = async () => {
  return [{ lang: "en" }, { lang: "id" }];
};

type SmddProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function Home({ params }: SmddProps) {
  const { lang } = await params;

  return (
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
  );
}
