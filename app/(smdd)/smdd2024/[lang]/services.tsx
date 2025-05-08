import { SupportedLanguage } from "@/locales/.generated/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { ourServices } from "@/locales/.generated/server";
import { getServices } from "./get-services";

export default function Services({ lang }: { lang: SupportedLanguage }) {
  return (
    <section className="w-full bg-white px-4 pt-4 sm:pt-0 xl:pt-16">
      <div className="container mx-auto w-full max-w-7xl text-black">
        <h1 className="my-4 mb-8 text-2xl leading-tight font-bold xl:text-5xl">
          {ourServices(lang)}
        </h1>
        <div>
          <Accordion type="single" collapsible>
            {getServices(lang).map((service, i) => {
              return (
                <AccordionItem value={`${i}`} key={i}>
                  <AccordionTrigger>
                    <h2 className="text-xl font-bold">{service.title}</h2>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 text-base">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: service.description
                        }}
                      />
                      <blockquote
                        className="border-l-4 border-gray-300 bg-gray-100 py-2 pl-4 italic"
                        dangerouslySetInnerHTML={{ __html: service.quotes }}
                      />
                      <div
                        className="font-bold"
                        dangerouslySetInnerHTML={{
                          __html: service.deliverables
                        }}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
