import {
  supportedLanguages,
  type SupportedLanguage
} from "@/locales/.generated/types";
import GridItemsContainer, {
  GridItems,
  GridItemsTitle
} from "@/app/components/grid-items";

import { data } from "./data";

export const generateStaticParams = async () => {
  return supportedLanguages.map((lang) => ({ lang }));
};

type JobProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function Home({ params }: JobProps) {
  return (
    <GridItemsContainer className="mt-10">
      <GridItemsTitle title="Available Positions" />
      <div className="mt-5" />
      <GridItems
        items={data.jobs.map((job) => ({ ...job, url: `/jobs/${job.id}` }))}
        lang={(await params).lang}
      />
    </GridItemsContainer>
  );
}
