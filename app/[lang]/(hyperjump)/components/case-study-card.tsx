import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

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
      className="group flex h-full flex-col justify-between rounded-2xl border-t border-r border-b border-l-2 border-t-black/6 border-r-black/6 border-b-black/6 border-l-[#635BFF] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/6">
      <div>
        <span className="text-hyperjump-blue mb-4 inline-block text-xs font-semibold tracking-widest uppercase">
          {serviceBySlug({ lang, slug: serviceSlug })?.title}
        </span>
        <h3 className="text-hyperjump-black mb-3 text-lg font-semibold md:text-xl">
          {title}
        </h3>
        <p className="text-hyperjump-gray mb-4 text-[15px] leading-relaxed">
          {description}
        </p>
      </div>

      <Link
        href={url}
        className="text-hyperjump-blue mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-2.5">
        {caseStudyButton(lang)}
        <ArrowRightIcon className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
