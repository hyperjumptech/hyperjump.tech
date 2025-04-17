import intefaceAIData from "../interfaceai-data.json";
import {
  GridItems,
  GridItemsSection,
  ScheduleConsultationButton,
} from "./grid-items";

export default function CaseStudies() {
  const { header, subheader, data } = intefaceAIData.caseStudies;

  return (
    <GridItemsSection id="case-studies" title={header} description={subheader}>
      <GridItems
        items={data}
        columns={{ base: 1, md: 2, lg: 2 }}
        classNameCard="rounded-2xl mt-8"
      />
      <div className="w-full flex justify-center mt-8">
        <ScheduleConsultationButton />
      </div>
    </GridItemsSection>
  );
}
