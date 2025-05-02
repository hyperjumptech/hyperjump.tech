import GridItemsContainer, {
  GridItems,
  GridItemsMoreButton,
  GridItemsTitle
} from "@/app/components/grid-items";
import data from "@/data.json";
import Script from "next/script";
import { SupportedLanguage } from "@/locales/.generated/types";

export default function OpenSourceProjects({
  lang
}: {
  lang: SupportedLanguage;
}) {
  return (
    <div className="container mx-auto w-full max-w-7xl px-2 text-black sm:px-0">
      <GridItemsContainer>
        <GridItemsTitle title="Open Source" />
        <GridItems items={data.projects} lang={lang} />
        <GridItemsMoreButton href={data.github} text="and more..." />
      </GridItemsContainer>
      <Script src="https://buttons.github.io/buttons.js" />
    </div>
  );
}
