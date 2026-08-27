import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  oneaiComparisonRows0Chatgpt,
  oneaiComparisonRows0Copilot,
  oneaiComparisonRows0Feature,
  oneaiComparisonRows0Oneai,
  oneaiComparisonRows0Stipend,
  oneaiComparisonRows1Chatgpt,
  oneaiComparisonRows1Copilot,
  oneaiComparisonRows1Feature,
  oneaiComparisonRows1Oneai,
  oneaiComparisonRows1Stipend,
  oneaiComparisonRows2Chatgpt,
  oneaiComparisonRows2Copilot,
  oneaiComparisonRows2Feature,
  oneaiComparisonRows2Oneai,
  oneaiComparisonRows2Stipend,
  oneaiComparisonRows3Chatgpt,
  oneaiComparisonRows3Copilot,
  oneaiComparisonRows3Feature,
  oneaiComparisonRows3Oneai,
  oneaiComparisonRows3Stipend,
  oneaiComparisonRows4Chatgpt,
  oneaiComparisonRows4Copilot,
  oneaiComparisonRows4Feature,
  oneaiComparisonRows4Oneai,
  oneaiComparisonRows4Stipend,
  oneaiComparisonRows5Chatgpt,
  oneaiComparisonRows5Copilot,
  oneaiComparisonRows5Feature,
  oneaiComparisonRows5Oneai,
  oneaiComparisonRows5Stipend,
  oneaiComparisonRows6Chatgpt,
  oneaiComparisonRows6Copilot,
  oneaiComparisonRows6Feature,
  oneaiComparisonRows6Oneai,
  oneaiComparisonRows6Stipend,
  oneaiComparisonRows7Chatgpt,
  oneaiComparisonRows7Copilot,
  oneaiComparisonRows7Feature,
  oneaiComparisonRows7Oneai,
  oneaiComparisonRows7Stipend,
  oneaiComparisonRows8Chatgpt,
  oneaiComparisonRows8Copilot,
  oneaiComparisonRows8Feature,
  oneaiComparisonRows8Oneai,
  oneaiComparisonRows8Stipend,
  oneaiComparisonRows9Chatgpt,
  oneaiComparisonRows9Copilot,
  oneaiComparisonRows9Feature,
  oneaiComparisonRows9Oneai,
  oneaiComparisonRows9Stipend,
  oneaiComparisonRows10Chatgpt,
  oneaiComparisonRows10Copilot,
  oneaiComparisonRows10Feature,
  oneaiComparisonRows10Oneai,
  oneaiComparisonRows10Stipend,
  oneaiComparisonWhy0Text,
  oneaiComparisonWhy0Title,
  oneaiComparisonWhy1Text,
  oneaiComparisonWhy1Title,
  oneaiComparisonWhy2Text,
  oneaiComparisonWhy2Title
} from "@/locales/.generated/strings";

/** How OneAI compares on a given table row. */
export type OneaiComparisonRowAdvantage = "price" | "capability" | null;

export type OneaiComparisonRow = {
  feature: string;
  stipend: string;
  chatgpt: string;
  copilot: string;
  oneai: string;
  advantage: OneaiComparisonRowAdvantage;
};

export type OneaiComparisonWhy = {
  title: string;
  text: string;
};

type RowLoader = {
  feature: (lang: SupportedLanguage) => string;
  stipend: (lang: SupportedLanguage) => string;
  chatgpt: (lang: SupportedLanguage) => string;
  copilot: (lang: SupportedLanguage) => string;
  oneai: (lang: SupportedLanguage) => string;
  advantage: OneaiComparisonRowAdvantage;
};

type WhyLoader = {
  title: (lang: SupportedLanguage) => string;
  text: (lang: SupportedLanguage) => string;
};

export type GetOneaiComparisonRowsOptions = {
  lang: SupportedLanguage;
  rowLoaders?: RowLoader[];
  whyLoaders?: WhyLoader[];
};

const NEGATIVE_COMPARISON_VALUE_PATTERN =
  /^(No|Tidak|Limited|Terbatas|Not ZDR|Bukan ZDR|Tergantung|Depends)/i;

const DEFAULT_ROW_LOADERS: RowLoader[] = [
  {
    feature: oneaiComparisonRows0Feature,
    stipend: oneaiComparisonRows0Stipend,
    chatgpt: oneaiComparisonRows0Chatgpt,
    copilot: oneaiComparisonRows0Copilot,
    oneai: oneaiComparisonRows0Oneai,
    advantage: null
  },
  {
    feature: oneaiComparisonRows1Feature,
    stipend: oneaiComparisonRows1Stipend,
    chatgpt: oneaiComparisonRows1Chatgpt,
    copilot: oneaiComparisonRows1Copilot,
    oneai: oneaiComparisonRows1Oneai,
    advantage: null
  },
  {
    feature: oneaiComparisonRows2Feature,
    stipend: oneaiComparisonRows2Stipend,
    chatgpt: oneaiComparisonRows2Chatgpt,
    copilot: oneaiComparisonRows2Copilot,
    oneai: oneaiComparisonRows2Oneai,
    advantage: "capability"
  },
  {
    feature: oneaiComparisonRows3Feature,
    stipend: oneaiComparisonRows3Stipend,
    chatgpt: oneaiComparisonRows3Chatgpt,
    copilot: oneaiComparisonRows3Copilot,
    oneai: oneaiComparisonRows3Oneai,
    advantage: "capability"
  },
  {
    feature: oneaiComparisonRows4Feature,
    stipend: oneaiComparisonRows4Stipend,
    chatgpt: oneaiComparisonRows4Chatgpt,
    copilot: oneaiComparisonRows4Copilot,
    oneai: oneaiComparisonRows4Oneai,
    advantage: "capability"
  },
  {
    feature: oneaiComparisonRows5Feature,
    stipend: oneaiComparisonRows5Stipend,
    chatgpt: oneaiComparisonRows5Chatgpt,
    copilot: oneaiComparisonRows5Copilot,
    oneai: oneaiComparisonRows5Oneai,
    advantage: null
  },
  {
    feature: oneaiComparisonRows6Feature,
    stipend: oneaiComparisonRows6Stipend,
    chatgpt: oneaiComparisonRows6Chatgpt,
    copilot: oneaiComparisonRows6Copilot,
    oneai: oneaiComparisonRows6Oneai,
    advantage: "capability"
  },
  {
    feature: oneaiComparisonRows7Feature,
    stipend: oneaiComparisonRows7Stipend,
    chatgpt: oneaiComparisonRows7Chatgpt,
    copilot: oneaiComparisonRows7Copilot,
    oneai: oneaiComparisonRows7Oneai,
    advantage: "capability"
  },
  {
    feature: oneaiComparisonRows8Feature,
    stipend: oneaiComparisonRows8Stipend,
    chatgpt: oneaiComparisonRows8Chatgpt,
    copilot: oneaiComparisonRows8Copilot,
    oneai: oneaiComparisonRows8Oneai,
    advantage: "capability"
  },
  {
    feature: oneaiComparisonRows9Feature,
    stipend: oneaiComparisonRows9Stipend,
    chatgpt: oneaiComparisonRows9Chatgpt,
    copilot: oneaiComparisonRows9Copilot,
    oneai: oneaiComparisonRows9Oneai,
    advantage: null
  },
  {
    feature: oneaiComparisonRows10Feature,
    stipend: oneaiComparisonRows10Stipend,
    chatgpt: oneaiComparisonRows10Chatgpt,
    copilot: oneaiComparisonRows10Copilot,
    oneai: oneaiComparisonRows10Oneai,
    advantage: "capability"
  }
];

const DEFAULT_WHY_LOADERS: WhyLoader[] = [
  { title: oneaiComparisonWhy0Title, text: oneaiComparisonWhy0Text },
  { title: oneaiComparisonWhy1Title, text: oneaiComparisonWhy1Text },
  { title: oneaiComparisonWhy2Title, text: oneaiComparisonWhy2Text }
];

/**
 * Returns whether a competitor cell value represents a clear disadvantage.
 *
 * @param value - Localized comparison cell copy
 * @returns True when the value starts with a known negative phrase
 */
export function isNegativeComparisonValue(value: string): boolean {
  return NEGATIVE_COMPARISON_VALUE_PATTERN.test(value.trim());
}

/**
 * Loads localized comparison table rows for the OneAI landing page.
 *
 * @param options - Locale and optional row loaders for DI
 * @returns Ordered comparison rows with feature and competitor values
 */
export function getOneaiComparisonRows({
  lang,
  rowLoaders = DEFAULT_ROW_LOADERS
}: GetOneaiComparisonRowsOptions): OneaiComparisonRow[] {
  return rowLoaders.map(
    ({ advantage, chatgpt, copilot, feature, oneai, stipend }) => ({
      feature: feature(lang),
      stipend: stipend(lang),
      chatgpt: chatgpt(lang),
      copilot: copilot(lang),
      oneai: oneai(lang),
      advantage
    })
  );
}

/**
 * Loads localized "why OneAI" columns shown below the comparison table.
 *
 * @param options - Locale and optional loaders for DI
 * @returns Three explanation blocks from the promo comparison page
 */
export function getOneaiComparisonWhy({
  lang,
  whyLoaders = DEFAULT_WHY_LOADERS
}: GetOneaiComparisonRowsOptions): OneaiComparisonWhy[] {
  return whyLoaders.map(({ text, title }) => ({
    title: title(lang),
    text: text(lang)
  }));
}

export { DEFAULT_ROW_LOADERS, DEFAULT_WHY_LOADERS };
