import data from "@/data.json";
import GridItemsContainer, {
  GridItems,
  GridItemsMoreButton,
  GridItemsTitle,
} from "@/app/components/grid-items";

export default function CaseStudies() {
  return (
    <>
      <GridItemsContainer id="case-studies">
        <GridItemsTitle
          title="Case Studies"
          description="Discover how we successfully transform challenges into opportunities
        with real-world solutions that drive lasting impact and business
        growth."
        />
        <GridItems
          items={data.caseStudies}
          columns={{ base: 1, md: 2, lg: 2 }}
          classNameCard="rounded-xl"
        />
        <GridItemsMoreButton text={data.cta.label} href={data.cta.link} />
      </GridItemsContainer>
    </>
  );
}
