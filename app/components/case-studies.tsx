import data from "@/data.json";
import GridItemsContainer, {
  GridItems,
  GridItemsMoreButton,
  GridItemsTitle,
} from "@/app/components/grid-items";

export default function CaseStudies() {
  const { gaEventName, label, link } = data.cta;

  return (
    <>
      <GridItemsContainer className="bg-[#F6F8F9]" id="case-studies">
        <GridItemsTitle
          className="bg-[#F6F8F9]"
          title="Case Studies"
          description="Discover how we successfully transform challenges into opportunities
        with real-world solutions that drive lasting impact and business
        growth."
        />
        <GridItems
          items={data.caseStudies}
          columns={{ base: 1, md: 2, lg: 2 }}
          classNameCard="rounded"
        />
        <GridItemsMoreButton
          text={label}
          href={link}
          gaEvent={{
            event: gaEventName,
            category: "engagement",
            label: "Case Study CTA",
          }}
        />
      </GridItemsContainer>
    </>
  );
}
