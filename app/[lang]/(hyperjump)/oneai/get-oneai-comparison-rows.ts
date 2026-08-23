import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  oneaiComparisonRows0Chatgpt,
  oneaiComparisonRows0Feature,
  oneaiComparisonRows0Oneai,
  oneaiComparisonRows0Stipend,
  oneaiComparisonRows1Chatgpt,
  oneaiComparisonRows1Feature,
  oneaiComparisonRows1Oneai,
  oneaiComparisonRows1Stipend,
  oneaiComparisonRows2Chatgpt,
  oneaiComparisonRows2Feature,
  oneaiComparisonRows2Oneai,
  oneaiComparisonRows2Stipend,
  oneaiComparisonRows3Chatgpt,
  oneaiComparisonRows3Feature,
  oneaiComparisonRows3Oneai,
  oneaiComparisonRows3Stipend,
  oneaiComparisonRows4Chatgpt,
  oneaiComparisonRows4Feature,
  oneaiComparisonRows4Oneai,
  oneaiComparisonRows4Stipend,
  oneaiComparisonRows5Chatgpt,
  oneaiComparisonRows5Feature,
  oneaiComparisonRows5Oneai,
  oneaiComparisonRows5Stipend,
  oneaiComparisonRows6Chatgpt,
  oneaiComparisonRows6Feature,
  oneaiComparisonRows6Oneai,
  oneaiComparisonRows6Stipend,
  oneaiComparisonRows7Chatgpt,
  oneaiComparisonRows7Feature,
  oneaiComparisonRows7Oneai,
  oneaiComparisonRows7Stipend,
  oneaiComparisonRows8Chatgpt,
  oneaiComparisonRows8Feature,
  oneaiComparisonRows8Oneai,
  oneaiComparisonRows8Stipend,
  oneaiComparisonRows9Chatgpt,
  oneaiComparisonRows9Feature,
  oneaiComparisonRows9Oneai,
  oneaiComparisonRows9Stipend,
  oneaiComparisonRows10Chatgpt,
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
    oneai: oneaiComparisonRows0Oneai,
    advantage: null
  },
  {
    feature: oneaiComparisonRows1Feature,
    stipend: oneaiComparisonRows1Stipend,
    chatgpt: oneaiComparisonRows1Chatgpt,
    oneai: oneaiComparisonRows1Oneai,
    advantage: null
  },
  {
    feature: oneaiComparisonRows2Feature,
    stipend: oneaiComparisonRows2Stipend,
    chatgpt: oneaiComparisonRows2Chatgpt,
    oneai: oneaiComparisonRows2Oneai,
    advantage: "capability"
  },
  {
    feature: oneaiComparisonRows3Feature,
    stipend: oneaiComparisonRows3Stipend,
    chatgpt: oneaiComparisonRows3Chatgpt,
    oneai: oneaiComparisonRows3Oneai,
    advantage: "capability"
  },
  {
    feature: oneaiComparisonRows4Feature,
    stipend: oneaiComparisonRows4Stipend,
    chatgpt: oneaiComparisonRows4Chatgpt,
    oneai: oneaiComparisonRows4Oneai,
    advantage: "capability"
  },
  {
    feature: oneaiComparisonRows5Feature,
    stipend: oneaiComparisonRows5Stipend,
    chatgpt: oneaiComparisonRows5Chatgpt,
    oneai: oneaiComparisonRows5Oneai,
    advantage: null
  },
  {
    feature: oneaiComparisonRows6Feature,
    stipend: oneaiComparisonRows6Stipend,
    chatgpt: oneaiComparisonRows6Chatgpt,
    oneai: oneaiComparisonRows6Oneai,
    advantage: "capability"
  },
  {
    feature: oneaiComparisonRows7Feature,
    stipend: oneaiComparisonRows7Stipend,
    chatgpt: oneaiComparisonRows7Chatgpt,
    oneai: oneaiComparisonRows7Oneai,
    advantage: "capability"
  },
  {
    feature: oneaiComparisonRows8Feature,
    stipend: oneaiComparisonRows8Stipend,
    chatgpt: oneaiComparisonRows8Chatgpt,
    oneai: oneaiComparisonRows8Oneai,
    advantage: "capability"
  },
  {
    feature: oneaiComparisonRows9Feature,
    stipend: oneaiComparisonRows9Stipend,
    chatgpt: oneaiComparisonRows9Chatgpt,
    oneai: oneaiComparisonRows9Oneai,
    advantage: null
  },
  {
    feature: oneaiComparisonRows10Feature,
    stipend: oneaiComparisonRows10Stipend,
    chatgpt: oneaiComparisonRows10Chatgpt,
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
  return rowLoaders.map(({ advantage, chatgpt, feature, oneai, stipend }) => ({
    feature: feature(lang),
    stipend: stipend(lang),
    chatgpt: chatgpt(lang),
    oneai: oneai(lang),
    advantage
  }));
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
