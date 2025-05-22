import GridItemsContainer, {
  GridItems,
  GridItemsTitle
} from "@/app/components/grid-items";
import type { SupportedLanguage } from "@/locales/.generated/types";

import { data } from "./data";

type JobProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function Home({ params }: JobProps) {
  return (
    <GridItemsContainer>
      <GridItemsTitle title="Available Positions" />
      <GridItems items={data.jobs} lang={(await params).lang} />
    </GridItemsContainer>
  );
}
