import Script from "next/script";

import GridItemsContainer, {
  GridItems,
  GridItemsMoreButton,
  GridItemsTitle
} from "@/app/components/grid-items";
import data from "@/data.json";
import type { SupportedLanguage } from "@/locales/.generated/types";

import { data as pageData } from "../data";

type OpenSourceProjectsProps = {
  lang: SupportedLanguage;
};

export function OpenSourceProjects({ lang }: OpenSourceProjectsProps) {
  return (
    <section>
      <GridItemsContainer>
        <GridItemsTitle title="Open Source" />
        <GridItems items={pageData.projects} lang={lang} />
        <GridItemsMoreButton href={data.github} text="and more..." />
      </GridItemsContainer>
      <Script src="https://buttons.github.io/buttons.js" />
    </section>
  );
}
