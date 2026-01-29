import Link from "next/link";

import { Button } from "@/components/ui/button";
import { caseStudyButton } from "@/locales/.generated/strings";
import type { SupportedLanguage } from "@/locales/.generated/types";

import type { CaseStudy } from "../data";
import { serviceBySlug } from "../data";

type CaseStudyCardProps = {
  caseStudy: CaseStudy;
  lang: SupportedLanguage;
};

export function CaseStudyCard({
  caseStudy: { description, serviceSlug, slug, title, url },
  lang
}: CaseStudyCardProps) {
  return (
    <div
      key={slug}
      className="flex h-full flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm transition duration-300 hover:shadow-md">
      <div>
        <span className="mb-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
          {serviceBySlug({ lang, slug: serviceSlug })?.title}
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
  );
}
