import data from "@/data.json";
import GridItemsContainer, {
  GridItems,
  GridItemsMoreButton,
  GridItemsTitle
} from "@/app/components/grid-items";
import Script from "next/script";

export default function Projects() {
  return (
    <>
      <GridItemsContainer>
        <GridItemsTitle title="Open Source" />
        <GridItems
          items={data.projects}
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        />
        <GridItemsMoreButton text="and more ..." href={data.github} />
      </GridItemsContainer>
      <Script src="https://buttons.github.io/buttons.js" />
    </>
  );
}
