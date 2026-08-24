import { CheckCircle2Icon, CircleXIcon } from "lucide-react";

import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  oneaiComparisonAdvantageIncludedBadge,
  oneaiComparisonAdvantagePriceBadge,
  oneaiComparisonAssumptions,
  oneaiComparisonColumnsChatgpt,
  oneaiComparisonColumnsFeature,
  oneaiComparisonColumnsOneai,
  oneaiComparisonColumnsStipend,
  oneaiComparisonTableLabel
} from "@/locales/.generated/strings";
import { cn } from "@/lib/utils";

import { SectionReveal } from "../components/motion-wrappers";
import {
  getOneaiComparisonRows,
  isNegativeComparisonValue,
  type OneaiComparisonRow
} from "./get-oneai-comparison-rows";

type OneaiComparisonTableProps = {
  lang: SupportedLanguage;
};

type CompetitorCellProps = {
  value: string;
  muted?: boolean;
};

type OneaiCellProps = {
  row: OneaiComparisonRow;
  lang: SupportedLanguage;
};

/**
 * Renders a competitor column cell, optionally de-emphasizing weak values.
 *
 * @param props - Cell copy and whether the row highlights a OneAI advantage
 */
function CompetitorCell({ muted = false, value }: CompetitorCellProps) {
  const isNegative = isNegativeComparisonValue(value);

  return (
    <td
      className={cn(
        "px-3 py-3 align-top",
        muted ? "text-hyperjump-gray/55" : "text-hyperjump-gray"
      )}>
      <div className="flex items-start gap-2">
        {isNegative ? (
          <CircleXIcon
            className="mt-0.5 h-4 w-4 shrink-0 text-red-400/80"
            aria-hidden
          />
        ) : null}
        <span
          className={cn(
            isNegative && muted && "line-through decoration-red-300/60"
          )}>
          {value}
        </span>
      </div>
    </td>
  );
}

/**
 * Renders the OneAI column with stronger styling when it wins the row.
 *
 * @param props - Row data and locale for advantage badges
 */
function OneaiCell({ lang, row }: OneaiCellProps) {
  const { advantage, oneai } = row;

  return (
    <td
      className={cn(
        "px-3 py-3 align-top",
        advantage === "price" &&
          "border-hyperjump-teal/70 bg-hyperjump-teal/12 border-l-[3px]",
        advantage === "capability" &&
          "border-hyperjump-blue/60 bg-hyperjump-blue/10 border-l-[3px]",
        !advantage && "bg-hyperjump-blue/5"
      )}>
      <div className="flex items-start gap-2">
        {advantage ? (
          <CheckCircle2Icon
            className={cn(
              "mt-0.5 h-4 w-4 shrink-0",
              advantage === "price"
                ? "text-hyperjump-teal"
                : "text-hyperjump-blue"
            )}
            aria-hidden
          />
        ) : null}
        <div className="space-y-1.5">
          <p
            className={cn(
              "text-hyperjump-black leading-snug",
              advantage ? "font-semibold" : "font-medium"
            )}>
            {oneai}
          </p>
          {advantage === "price" ? (
            <span className="bg-hyperjump-teal/15 text-hyperjump-teal inline-flex rounded-full px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase">
              {oneaiComparisonAdvantagePriceBadge(lang)}
            </span>
          ) : null}
          {advantage === "capability" && oneai.startsWith("USD") ? (
            <span className="bg-hyperjump-blue/15 text-hyperjump-blue inline-flex rounded-full px-2 py-0.5 text-[11px] font-bold tracking-wide uppercase">
              {oneaiComparisonAdvantageIncludedBadge(lang)}
            </span>
          ) : null}
        </div>
      </div>
    </td>
  );
}

/**
 * Responsive comparison table with visual emphasis on OneAI advantages.
 *
 * @param props - Active locale for copy and row data
 */
export function OneaiComparisonTable({ lang }: OneaiComparisonTableProps) {
  const rows = getOneaiComparisonRows({ lang });

  return (
    <SectionReveal delay={0.05}>
      <p className="text-hyperjump-gray mb-4 text-xs font-bold tracking-[0.14em] uppercase">
        {oneaiComparisonTableLabel(lang)}
      </p>
      <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
        <table
          className="w-full min-w-[720px] border-collapse text-left text-sm"
          data-testid="oneai-comparison-table">
          <thead>
            <tr className="border-b border-black/10">
              <th
                scope="col"
                className="text-hyperjump-black sticky left-0 z-10 bg-white py-3 pr-4 font-semibold">
                {oneaiComparisonColumnsFeature(lang)}
              </th>
              <th
                scope="col"
                className="text-hyperjump-gray px-3 py-3 font-semibold"
                dangerouslySetInnerHTML={{
                  __html: oneaiComparisonColumnsStipend(lang)
                }}
              />
              <th
                scope="col"
                className="text-hyperjump-gray px-3 py-3 font-semibold">
                {oneaiComparisonColumnsChatgpt(lang)}
              </th>
              <th
                scope="col"
                className="bg-hyperjump-blue/10 text-hyperjump-black border-hyperjump-blue/20 border-b-2 px-3 py-3 font-bold">
                {oneaiComparisonColumnsOneai(lang)}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const mutedCompetitors = row.advantage !== null;

              return (
                <tr
                  key={row.feature}
                  className={cn(
                    "border-b border-black/6 last:border-0",
                    row.advantage &&
                      "to-hyperjump-blue/[0.03] bg-linear-to-r from-transparent via-transparent"
                  )}
                  data-advantage={row.advantage ?? undefined}>
                  <th
                    scope="row"
                    className={cn(
                      "text-hyperjump-black sticky left-0 z-10 bg-white py-3 pr-4 align-top font-medium",
                      row.advantage && "font-semibold"
                    )}>
                    {row.feature}
                  </th>
                  <CompetitorCell
                    muted={mutedCompetitors}
                    value={row.stipend}
                  />
                  <CompetitorCell
                    muted={mutedCompetitors}
                    value={row.chatgpt}
                  />
                  <OneaiCell lang={lang} row={row} />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p
        className="text-hyperjump-gray mt-4 text-xs leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: oneaiComparisonAssumptions(lang)
        }}
      />
    </SectionReveal>
  );
}
