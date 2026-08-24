import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  oneaiComparisonEyebrow,
  oneaiComparisonGoodFitKicker,
  oneaiComparisonGoodFitText,
  oneaiComparisonGoodFitTitle,
  oneaiComparisonHeadingPartsAfterControl,
  oneaiComparisonHeadingPartsAfterMultipleModels,
  oneaiComparisonHeadingPartsAfterOneBudget,
  oneaiComparisonHeadingPartsBeforeHighlights,
  oneaiComparisonHeadingPartsControl,
  oneaiComparisonHeadingPartsMultipleModels,
  oneaiComparisonHeadingPartsOneBudget,
  oneaiComparisonLede,
  oneaiComparisonNotForYouKicker,
  oneaiComparisonNotForYouText,
  oneaiComparisonNotForYouTitle,
  oneaiComparisonWhySectionDesc,
  oneaiComparisonWhySectionHeading,
  oneaiComparisonWhySectionLabel
} from "@/locales/.generated/strings";

import {
  SectionReveal,
  StaggerContainer,
  StaggerItem
} from "../components/motion-wrappers";
import { getOneaiComparisonWhy } from "./get-oneai-comparison-rows";
import { OneaiComparisonTable } from "./oneai-comparison-table";
import { OneaiPdfDownload } from "./oneai-pdf-download";

type OneaiComparisonSectionProps = {
  lang: SupportedLanguage;
};

const HIGHLIGHT_CLASS =
  "underline decoration-hyperjump-blue decoration-[3px] underline-offset-[0.22em] decoration-skip-ink-none";

/**
 * Renders the comparison section headline with underlined key phrases.
 *
 * @param lang - Active locale for copy
 */
function OneaiComparisonHeading({ lang }: { lang: SupportedLanguage }) {
  return (
    <h2
      className="text-hyperjump-black mb-4 text-3xl font-semibold tracking-tight md:text-4xl"
      data-testid="oneai-comparison-heading">
      {oneaiComparisonHeadingPartsBeforeHighlights(lang)}
      <span className={HIGHLIGHT_CLASS}>
        {oneaiComparisonHeadingPartsControl(lang)}
      </span>
      {oneaiComparisonHeadingPartsAfterControl(lang)}
      <span className={HIGHLIGHT_CLASS}>
        {oneaiComparisonHeadingPartsMultipleModels(lang)}
      </span>
      {oneaiComparisonHeadingPartsAfterMultipleModels(lang)}
      <span className={HIGHLIGHT_CLASS}>
        {oneaiComparisonHeadingPartsOneBudget(lang)}
      </span>
      {oneaiComparisonHeadingPartsAfterOneBudget(lang)}
    </h2>
  );
}

/**
 * Full cost and capability comparison from the OneAI promo (PDF page 2).
 *
 * @param props - Active locale for copy and table rows
 */
export function OneaiComparisonSection({ lang }: OneaiComparisonSectionProps) {
  const whyColumns = getOneaiComparisonWhy({ lang });

  return (
    <section
      id="comparison"
      data-testid="oneai-comparison-section"
      className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-20 xl:px-0">
        <SectionReveal>
          <p className="text-hyperjump-blue mb-4 text-xs font-bold tracking-[0.16em] uppercase">
            {oneaiComparisonEyebrow(lang)}
          </p>
          <OneaiComparisonHeading lang={lang} />
          <p
            className="text-hyperjump-gray mb-10 max-w-3xl text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: oneaiComparisonLede(lang) }}
          />
        </SectionReveal>

        <StaggerContainer className="mb-10 grid gap-4 sm:grid-cols-2">
          <StaggerItem>
            <article className="h-full rounded-2xl border border-[#e8d5d0] bg-[#f7f1ef] p-6">
              <p className="mb-2 text-xs font-bold tracking-[0.14em] text-[#b4534a] uppercase">
                {oneaiComparisonNotForYouKicker(lang)}
              </p>
              <h3 className="text-hyperjump-black mb-2 text-lg font-semibold">
                {oneaiComparisonNotForYouTitle(lang)}
              </h3>
              <p className="text-hyperjump-gray text-[15px] leading-relaxed">
                {oneaiComparisonNotForYouText(lang)}
              </p>
            </article>
          </StaggerItem>
          <StaggerItem>
            <article className="h-full rounded-2xl border border-[#c8d9eb] bg-[#eef5fb] p-6">
              <p className="text-hyperjump-blue mb-2 text-xs font-bold tracking-[0.14em] uppercase">
                {oneaiComparisonGoodFitKicker(lang)}
              </p>
              <h3 className="text-hyperjump-black mb-2 text-lg font-semibold">
                {oneaiComparisonGoodFitTitle(lang)}
              </h3>
              <p className="text-hyperjump-gray text-[15px] leading-relaxed">
                {oneaiComparisonGoodFitText(lang)}
              </p>
            </article>
          </StaggerItem>
        </StaggerContainer>

        <OneaiComparisonTable lang={lang} />

        <SectionReveal delay={0.08}>
          <div
            className="mt-12 max-w-3xl"
            data-testid="oneai-comparison-why-intro">
            <p className="text-hyperjump-blue mb-2 text-xs font-bold tracking-[0.16em] uppercase">
              {oneaiComparisonWhySectionLabel(lang)}
            </p>
            <h3 className="text-hyperjump-black mb-3 text-xl font-semibold md:text-2xl">
              {oneaiComparisonWhySectionHeading(lang)}
            </h3>
            <p
              className="text-hyperjump-gray text-[15px] leading-relaxed md:text-base"
              dangerouslySetInnerHTML={{
                __html: oneaiComparisonWhySectionDesc(lang)
              }}
            />
          </div>
        </SectionReveal>

        <StaggerContainer className="mt-8 grid gap-6 md:grid-cols-3">
          {whyColumns.map(({ text, title }) => (
            <StaggerItem key={title}>
              <article className="h-full rounded-2xl border border-black/6 bg-[#F6F8F9] p-6">
                <h3
                  className="text-hyperjump-black mb-2 text-base font-semibold"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
                <p
                  className="text-hyperjump-gray text-[15px] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <OneaiPdfDownload lang={lang} />
      </div>
    </section>
  );
}
