import data from "@/data.json";
import GridItemsContainer, {
  GridItems,
  GridItemsMoreButton,
  GridItemsTitle,
} from "@/app/components/grid-items";

export default function OpenSourceProducts() {
  return (
    <>
      <GridItemsContainer id="open-source">
        <GridItemsTitle
          title="Open Source Product"
          description="Explore our open-source projects and see how we innovate, collaborate,
          and build solutions that drive real impact. Join our community and
          contribute to cutting-edge technology."
        />
        <GridItems
          items={data.openSourceProducts}
          columns={{ base: 1, lg: 3 }}
          classNameCard="rounded"
        />
        <GridItemsMoreButton
          text="View More"
          variant="outline"
          href={data.github}
        />
      </GridItemsContainer>
    </>
  );
}
