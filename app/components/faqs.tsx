import data from "@/data.json";
import { GridItemsTitle } from "@/app/components/grid-items";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Faqs() {
  return (
    <section id="faqs" className="bg-white scroll-mt-20">
      <div className="mx-auto flex py-5 md:py-8 px-4 md:px-20 flex-wrap justify-center items-center">
        <div className="w-full">
          <GridItemsTitle
            title="Frequently asked questions"
            description="Find answers to commonly asked questions. If you need further assistance, feel free to reach out to us."
            layout="vertical"
            descriptionStyle="w-full md:max-w-2xl"
          />
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-4xl space-y-4 mx-auto"
          >
            {data.faqs.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} asChild>
                <Card className="bg-white border border-gray-200 shadow-sm transition-all duration-300 w-full">
                  <CardHeader className="py-2 px-4">
                    <AccordionTrigger className="flex items-center justify-between gap-2 text-left text-xl font-medium text-[#020F15] w-full no-underline hover:no-underline focus:no-underline">
                      {item.question}
                    </AccordionTrigger>
                  </CardHeader>
                  <AccordionContent asChild>
                    <CardContent className="text-[#61656E] text-base lg:text-lg px-4 pb-4 pt-0">
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
