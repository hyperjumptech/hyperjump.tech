import intefaceAIData from "../interfaceai-data.json";
import { GridItems, GridItemsSection } from "./grid-items";

export default function WhyWorkWithUs() {
  const { header, subheader, data } = intefaceAIData.whyWorkWithUs;

  return (
    <GridItemsSection
      id="why-work-with-us"
      title={header}
      description={subheader}
      layout="vertical"
    >
      <div className="mb-8" />
      <GridItems
        items={data}
        columns={{ base: 1, sm: 2, lg: 3 }}
        classNameCard="rounded-[20px]"
      />
    </GridItemsSection>
  );
}
