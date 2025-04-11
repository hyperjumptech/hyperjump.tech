import data from "@/data.json";
import GridItemsContainer, {
  GridItems,
  GridItemsMoreButton,
  GridItemsTitle,
} from "@/app/components/grid-items";

export default function CaseStudies() {
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
          classNameCard="rounded-xl"
        />
        <GridItemsMoreButton
          text="Schedule Consultation"
          href="https://forms.office.com/Pages/ResponsePage.aspx?id=YB_vnVvdsku6UOy9eolc4lSE-1zhiHZGuckpAFLZgMNUNzFXVlZCQjA0UFJRR1IyUk9aSjBZVENENS4u"
        />
      </GridItemsContainer>
    </>
  );
}
