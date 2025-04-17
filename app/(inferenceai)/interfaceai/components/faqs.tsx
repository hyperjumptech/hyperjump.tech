import intefaceAIData from "../interfaceai-data.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GridItemsSection } from "./grid-items";

export default function Faqs() {
  const { header, subheader, data } = intefaceAIData.faq;

  return (
    <GridItemsSection
      id="faqs"
      title={header}
      description={subheader}
      layout="vertical"
      className="bg-grid-faqs"
    >
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-4xl mt-8 space-y-4 mx-auto"
      >
        {data.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`} asChild>
            <Card className="bg-[#1B1728] border-none shadow-sm transition-all duration-300 w-full">
              <CardHeader className="py-2 px-4">
                <AccordionTrigger className="flex items-center justify-between gap-2 text-left text-xl font-medium text-white w-full no-underline hover:no-underline focus:no-underline">
                  {item.question}
                </AccordionTrigger>
              </CardHeader>
              <AccordionContent asChild>
                <CardContent className="text-[#CDCED8] text-base lg:text-lg px-4 pb-4 pt-0">
                  {item.answer}
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>
    </GridItemsSection>
  );
}
