import GridItemsContainer, {
  GridItems,
  GridItemsMoreButton,
  GridItemsTitle,
} from "@/app/components/grid-items";
import data from "@/data.json";
import Script from "next/script";

export default function OpenSourceProjects() {
  return (
    <div className="w-full max-w-7xl px-2 sm:px-0 mx-auto text-black container">
      <GridItemsContainer>
        <GridItemsTitle title="Open Source" />
        <GridItems items={data.projects} />
        <GridItemsMoreButton href={data.github} text="and more..." />
      </GridItemsContainer>
      <Script src="https://buttons.github.io/buttons.js" />
    </div>
  );
}
