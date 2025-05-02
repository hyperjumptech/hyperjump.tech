import data from "@/data.json";
import GridItemsContainer, {
  GridItems,
  GridItemsTitle
} from "@/app/components/grid-items";
import { SupportedLanguage } from "@/locales/.generated/types";

export default function Jobs({ lang }: { lang: SupportedLanguage }) {
  return (
    <GridItemsContainer>
      <GridItemsTitle title="Available Positions" />
      <GridItems items={data.jobs} lang={lang} />
    </GridItemsContainer>
  );
}
