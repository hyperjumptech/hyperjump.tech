import Link from "next/link";

import { Button } from "@/components/ui/button";
import { caseStudyButton, caseStudyMore } from "@/locales/.generated/server";
import type { SupportedLanguage } from "@/locales/.generated/types";

type CaseStudy = {
  description: string;
  title: string;
  url: string;
  category: string;
};

type RecommendationProps = {
  caseStudies: CaseStudy[];
  lang: SupportedLanguage;
};

export function Recommendation({ caseStudies, lang }: RecommendationProps) {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-hyperjump-black mb-5 text-2xl font-semibold capitalize md:text-4xl">
          {caseStudyMore(lang)}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {caseStudies.map(({ description, title, url, category }) => (
            <div
              key={title}
              className="flex h-full flex-col justify-between rounded-xl border border-gray-200 p-6 text-left shadow-sm transition duration-300 hover:shadow-md">
              <div>
                <span className="mb-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                  {category}
                </span>
                <h3 className="text-hyperjump-black mb-2 text-lg font-semibold md:text-[22px]">
                  {title}
                </h3>
                <p className="text-hyperjump-gray mb-4 text-sm md:text-base">
                  {description}
                </p>
              </div>

              <Button
                asChild
                variant="outline"
                className="text-hyperjump-blue hover:bg-hyperjump-blue mt-4 w-full border-gray-300 hover:text-white">
                <Link href={url}>{caseStudyButton(lang)}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
