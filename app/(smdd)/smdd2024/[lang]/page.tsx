import { SupportedLanguage } from "@/locales/.generated/types";
import Services from "./services";
import DemosAndDocs from "./demos";
import OpenSourceProjects from "./projects";
import TrustedBy from "./trusted";
import CaseStudies from "./case-studies";
import ContactForm from "./contact-form";

export const generateStaticParams = async () => {
  return [{ lang: "en" }, { lang: "id" }];
};

export default function Home({
  params
}: {
  params: { lang: SupportedLanguage };
}) {
  return (
    <section className="border-b bg-white py-8">
      <div className="container mx-auto flex flex-wrap space-y-4 pb-12 pt-4">
        <Services lang={params.lang} />
        <DemosAndDocs lang={params.lang} />
        <OpenSourceProjects lang={params.lang} />
        <TrustedBy lang={params.lang} />
        <CaseStudies lang={params.lang} />
        <ContactForm lang={params.lang} />
      </div>
    </section>
  );
}
