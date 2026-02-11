import Link from "next/link";
import type { BreadcrumbList, WithContext } from "schema-dts";

import GridItemsContainer, {
  GridItemsTitle
} from "@/app/components/grid-items";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import dataJson from "@/data.json";
import type { SupportedLanguage } from "@/locales/.generated/types";
import { supportedLanguages } from "@/locales/.generated/types";

import { type Job } from "./data";
import { data } from "./data";

export const generateStaticParams = async () => {
  return supportedLanguages.map((lang) => ({ lang }));
};

type LangProps = {
  lang: SupportedLanguage;
};

type JobProps = {
  params: Promise<LangProps>;
};

export default async function Home({ params }: JobProps) {
  const { lang } = await params;

  return (
    <GridItemsContainer className="pt-10">
      <GridItemsTitle title="Available Positions" />
      <div className="mt-5" />
      <JobCards items={data.jobs} lang={lang} />
      <JsonLd lang={lang} />
    </GridItemsContainer>
  );
}

type JobCardProps = {
  items: Job[];
} & LangProps;

function JobCards({ items, lang }: JobCardProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map(({ id, category, description, title }) => (
        <Card
          key={id}
          data-testid={`job-card-${id}`}
          className="flex flex-col overflow-hidden rounded-2xl border-[#D9D9D9] bg-white transition-colors duration-300 ease-in-out hover:bg-white/5 hover:shadow-md hover:shadow-white/10">
          <CardHeader>
            <p className="bg-hyperjump-black/10 text-hyperjump-black mb-2 w-36 rounded-3xl px-2 py-1.5 text-center text-sm font-medium">
              {category}
            </p>
            <Link
              href={`/${lang}/jobs/${id}`}
              className="transition hover:underline">
              <CardTitle className="text-hyperjump-black text-xl font-semibold md:text-[22px]">
                {title}
              </CardTitle>
            </Link>
          </CardHeader>

          <CardContent className="-mt-3 flex flex-1 flex-col justify-between gap-4">
            <CardDescription className="text-base font-medium transition-all duration-300">
              {description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function JsonLd({ lang }: LangProps) {
  const { url } = dataJson;
  const jsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${url}/${lang}`
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Jobs",
        item: `${url}/${lang}/jobs`
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
