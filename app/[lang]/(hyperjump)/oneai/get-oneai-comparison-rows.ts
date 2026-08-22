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
  oneaiComparisonWhy0Text,
  oneaiComparisonWhy0Title,
  oneaiComparisonWhy1Text,
  oneaiComparisonWhy1Title,
  oneaiComparisonWhy2Text,
  oneaiComparisonWhy2Title
} from "@/locales/.generated/strings";

export type OneaiComparisonRow = {
  feature: string;
  stipend: string;
  chatgpt: string;
  oneai: string;
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

const DEFAULT_ROW_LOADERS: RowLoader[] = [
  {
    feature: oneaiComparisonRows0Feature,
    stipend: oneaiComparisonRows0Stipend,
    chatgpt: oneaiComparisonRows0Chatgpt,
    oneai: oneaiComparisonRows0Oneai
  },
  {
    feature: oneaiComparisonRows1Feature,
    stipend: oneaiComparisonRows1Stipend,
    chatgpt: oneaiComparisonRows1Chatgpt,
    oneai: oneaiComparisonRows1Oneai
  },
  {
    feature: oneaiComparisonRows2Feature,
    stipend: oneaiComparisonRows2Stipend,
    chatgpt: oneaiComparisonRows2Chatgpt,
    oneai: oneaiComparisonRows2Oneai
  },
  {
    feature: oneaiComparisonRows3Feature,
    stipend: oneaiComparisonRows3Stipend,
    chatgpt: oneaiComparisonRows3Chatgpt,
    oneai: oneaiComparisonRows3Oneai
  },
  {
    feature: oneaiComparisonRows4Feature,
    stipend: oneaiComparisonRows4Stipend,
    chatgpt: oneaiComparisonRows4Chatgpt,
    oneai: oneaiComparisonRows4Oneai
  },
  {
    feature: oneaiComparisonRows5Feature,
    stipend: oneaiComparisonRows5Stipend,
    chatgpt: oneaiComparisonRows5Chatgpt,
    oneai: oneaiComparisonRows5Oneai
  },
  {
    feature: oneaiComparisonRows6Feature,
    stipend: oneaiComparisonRows6Stipend,
    chatgpt: oneaiComparisonRows6Chatgpt,
    oneai: oneaiComparisonRows6Oneai
  },
  {
    feature: oneaiComparisonRows7Feature,
    stipend: oneaiComparisonRows7Stipend,
    chatgpt: oneaiComparisonRows7Chatgpt,
    oneai: oneaiComparisonRows7Oneai
  },
  {
    feature: oneaiComparisonRows8Feature,
    stipend: oneaiComparisonRows8Stipend,
    chatgpt: oneaiComparisonRows8Chatgpt,
    oneai: oneaiComparisonRows8Oneai
  },
  {
    feature: oneaiComparisonRows9Feature,
    stipend: oneaiComparisonRows9Stipend,
    chatgpt: oneaiComparisonRows9Chatgpt,
    oneai: oneaiComparisonRows9Oneai
  }
];

const DEFAULT_WHY_LOADERS: WhyLoader[] = [
  { title: oneaiComparisonWhy0Title, text: oneaiComparisonWhy0Text },
  { title: oneaiComparisonWhy1Title, text: oneaiComparisonWhy1Text },
  { title: oneaiComparisonWhy2Title, text: oneaiComparisonWhy2Text }
];

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
  return rowLoaders.map(({ chatgpt, feature, oneai, stipend }) => ({
    feature: feature(lang),
    stipend: stipend(lang),
    chatgpt: chatgpt(lang),
    oneai: oneai(lang)
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
