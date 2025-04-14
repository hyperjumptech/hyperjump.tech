import data from "@/data.json";
import GridItemsContainer, {
  GridItems,
  GridItemsMoreButton,
  GridItemsTitle,
} from "@/app/components/grid-items";

export default function Services() {
  return (
    <>
      <GridItemsContainer id="services">
        <GridItemsTitle
          title="Services"
          description="We offer expert technology solutions to help businesses scale,
           enhance efficiency, optimize operations, and drive continuous
           innovation."
        />
        <GridItems
          items={data.services}
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          classNameCard="rounded-md"
        />
        <GridItemsMoreButton text={data.cta.label} href={data.cta.link} />
      </GridItemsContainer>
    </>
  );
}
