import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { ourServices } from "@/locales/.generated/strings";
import { getServices } from "./get-services";

export default function Services({ lang }: { lang: SupportedLanguage }) {
  return (
    <section>
      <h1 className="my-4 mb-4 text-2xl leading-tight font-bold xl:text-5xl">
        {ourServices(lang)}
      </h1>
      <Accordion type="single" collapsible>
        {getServices(lang).map(
          ({ deliverables, description, quotes, title }) => (
            <AccordionItem value={title} key={title}>
              <AccordionTrigger>
                <h2 className="text-xl">{title}</h2>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-base">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: description
                    }}
                  />
                  <blockquote
                    className="border-l-4 border-gray-300 bg-gray-100 py-2 pl-4 italic"
                    dangerouslySetInnerHTML={{ __html: quotes }}
                  />
                  <div
                    className="font-bold"
                    dangerouslySetInnerHTML={{
                      __html: deliverables
                    }}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        )}
      </Accordion>
    </section>
  );
}
