import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  aiWorkshopFaq0Answer,
  aiWorkshopFaq0Question,
  aiWorkshopFaq1Answer,
  aiWorkshopFaq1Question,
  aiWorkshopFaq2Answer,
  aiWorkshopFaq2Question,
  aiWorkshopFaq3Answer,
  aiWorkshopFaq3Question,
  aiWorkshopFaq4Answer,
  aiWorkshopFaq4Question,
  aiWorkshopFaq5Answer,
  aiWorkshopFaq5Question,
  aiWorkshopFeedback0Credit,
  aiWorkshopFeedback0Quote,
  aiWorkshopLogistics0,
  aiWorkshopLogistics1,
  aiWorkshopLogistics2,
  aiWorkshopLogistics3,
  aiWorkshopOutcomes0Text,
  aiWorkshopOutcomes0Title,
  aiWorkshopOutcomes1Text,
  aiWorkshopOutcomes1Title,
  aiWorkshopOutcomes2Text,
  aiWorkshopOutcomes2Title,
  aiWorkshopProofs0,
  aiWorkshopProofs1,
  aiWorkshopProofs2,
  aiWorkshopSessions0Duration,
  aiWorkshopSessions0Kicker,
  aiWorkshopSessions0Text,
  aiWorkshopSessions0Title,
  aiWorkshopSessions1Duration,
  aiWorkshopSessions1Kicker,
  aiWorkshopSessions1Text,
  aiWorkshopSessions1Title,
  aiWorkshopSessions2Duration,
  aiWorkshopSessions2Kicker,
  aiWorkshopSessions2Text,
  aiWorkshopSessions2Title,
  aiWorkshopSessions3Duration,
  aiWorkshopSessions3Kicker,
  aiWorkshopSessions3Text,
  aiWorkshopSessions3Title,
  aiWorkshopWho0Text,
  aiWorkshopWho0Title,
  aiWorkshopWho1Text,
  aiWorkshopWho1Title,
  aiWorkshopWho2Text,
  aiWorkshopWho2Title
} from "@/locales/.generated/strings";

export type AiWorkshopFaq = {
  question: string;
  answer: string;
};

export type AiWorkshopSession = {
  kicker: string;
  title: string;
  duration: string;
  text: string;
};

export type AiWorkshopTitledItem = {
  title: string;
  text: string;
};

export type AiWorkshopFeedback = {
  quote: string;
  credit: string;
  rating: number;
};

type StringLoader = (lang: SupportedLanguage) => string;

type TitledItemLoader = {
  title: StringLoader;
  text: StringLoader;
};

type SessionLoader = {
  kicker: StringLoader;
  title: StringLoader;
  duration: StringLoader;
  text: StringLoader;
};

type FaqLoader = {
  question: StringLoader;
  answer: StringLoader;
};

type FeedbackLoader = {
  quote: StringLoader;
  credit: StringLoader;
  rating?: number;
};

export type GetAiWorkshopListOptions = {
  lang: SupportedLanguage;
  loaders?: StringLoader[];
};

export type GetAiWorkshopTitledItemsOptions = {
  lang: SupportedLanguage;
  loaders?: TitledItemLoader[];
};

export type GetAiWorkshopSessionsOptions = {
  lang: SupportedLanguage;
  loaders?: SessionLoader[];
};

export type GetAiWorkshopFaqsOptions = {
  lang: SupportedLanguage;
  loaders?: FaqLoader[];
};

export type GetAiWorkshopFeedbackOptions = {
  lang: SupportedLanguage;
  loaders?: FeedbackLoader[];
};

/** Maximum stars shown on a workshop feedback quote. */
export const AI_WORKSHOP_MAX_STAR_RATING = 5;

const DEFAULT_PROOF_LOADERS: StringLoader[] = [
  aiWorkshopProofs0,
  aiWorkshopProofs1,
  aiWorkshopProofs2
];

const DEFAULT_LOGISTICS_LOADERS: StringLoader[] = [
  aiWorkshopLogistics0,
  aiWorkshopLogistics1,
  aiWorkshopLogistics2,
  aiWorkshopLogistics3
];

const DEFAULT_AUDIENCE_LOADERS: TitledItemLoader[] = [
  { title: aiWorkshopWho0Title, text: aiWorkshopWho0Text },
  { title: aiWorkshopWho1Title, text: aiWorkshopWho1Text },
  { title: aiWorkshopWho2Title, text: aiWorkshopWho2Text }
];

const DEFAULT_OUTCOME_LOADERS: TitledItemLoader[] = [
  { title: aiWorkshopOutcomes0Title, text: aiWorkshopOutcomes0Text },
  { title: aiWorkshopOutcomes1Title, text: aiWorkshopOutcomes1Text },
  { title: aiWorkshopOutcomes2Title, text: aiWorkshopOutcomes2Text }
];

const DEFAULT_SESSION_LOADERS: SessionLoader[] = [
  {
    kicker: aiWorkshopSessions0Kicker,
    title: aiWorkshopSessions0Title,
    duration: aiWorkshopSessions0Duration,
    text: aiWorkshopSessions0Text
  },
  {
    kicker: aiWorkshopSessions1Kicker,
    title: aiWorkshopSessions1Title,
    duration: aiWorkshopSessions1Duration,
    text: aiWorkshopSessions1Text
  },
  {
    kicker: aiWorkshopSessions2Kicker,
    title: aiWorkshopSessions2Title,
    duration: aiWorkshopSessions2Duration,
    text: aiWorkshopSessions2Text
  },
  {
    kicker: aiWorkshopSessions3Kicker,
    title: aiWorkshopSessions3Title,
    duration: aiWorkshopSessions3Duration,
    text: aiWorkshopSessions3Text
  }
];

const DEFAULT_FAQ_LOADERS: FaqLoader[] = [
  { question: aiWorkshopFaq0Question, answer: aiWorkshopFaq0Answer },
  { question: aiWorkshopFaq1Question, answer: aiWorkshopFaq1Answer },
  { question: aiWorkshopFaq2Question, answer: aiWorkshopFaq2Answer },
  { question: aiWorkshopFaq3Question, answer: aiWorkshopFaq3Answer },
  { question: aiWorkshopFaq4Question, answer: aiWorkshopFaq4Answer },
  { question: aiWorkshopFaq5Question, answer: aiWorkshopFaq5Answer }
];

const DEFAULT_FEEDBACK_LOADERS: FeedbackLoader[] = [
  {
    quote: aiWorkshopFeedback0Quote,
    credit: aiWorkshopFeedback0Credit,
    rating: AI_WORKSHOP_MAX_STAR_RATING
  }
];

/**
 * Loads localized hero proof lines for the workshop page.
 *
 * @param options - Locale and optional string loaders for DI
 * @returns Ordered proof lines shown under the hero lede
 */
export function getAiWorkshopProofs({
  lang,
  loaders = DEFAULT_PROOF_LOADERS
}: GetAiWorkshopListOptions): string[] {
  return loaders.map((load) => load(lang));
}

/**
 * Loads localized logistics checklist items.
 *
 * @param options - Locale and optional string loaders for DI
 * @returns What participants need to bring
 */
export function getAiWorkshopLogistics({
  lang,
  loaders = DEFAULT_LOGISTICS_LOADERS
}: GetAiWorkshopListOptions): string[] {
  return loaders.map((load) => load(lang));
}

/**
 * Loads localized audience blocks for the "who this is for" section.
 *
 * @param options - Locale and optional titled-item loaders for DI
 * @returns Ordered title and text pairs
 */
export function getAiWorkshopAudience({
  lang,
  loaders = DEFAULT_AUDIENCE_LOADERS
}: GetAiWorkshopTitledItemsOptions): AiWorkshopTitledItem[] {
  return loaders.map(({ text, title }) => ({
    title: title(lang),
    text: text(lang)
  }));
}

/**
 * Loads localized outcome blocks for the "what you leave with" section.
 *
 * @param options - Locale and optional titled-item loaders for DI
 * @returns Ordered title and text pairs
 */
export function getAiWorkshopOutcomes({
  lang,
  loaders = DEFAULT_OUTCOME_LOADERS
}: GetAiWorkshopTitledItemsOptions): AiWorkshopTitledItem[] {
  return loaders.map(({ text, title }) => ({
    title: title(lang),
    text: text(lang)
  }));
}

/**
 * Loads localized session entries for the workshop agenda.
 *
 * @param options - Locale and optional session loaders for DI
 * @returns Ordered session blocks with kicker, title, duration, and body
 */
export function getAiWorkshopSessions({
  lang,
  loaders = DEFAULT_SESSION_LOADERS
}: GetAiWorkshopSessionsOptions): AiWorkshopSession[] {
  return loaders.map(({ duration, kicker, text, title }) => ({
    kicker: kicker(lang),
    title: title(lang),
    duration: duration(lang),
    text: text(lang)
  }));
}

/**
 * Loads default FAQ entries for the active locale.
 *
 * @param options - Locale and optional FAQ loaders for DI
 * @returns Ordered question and answer pairs
 */
export function getDefaultAiWorkshopFaqs({
  lang,
  loaders = DEFAULT_FAQ_LOADERS
}: GetAiWorkshopFaqsOptions): AiWorkshopFaq[] {
  return loaders.map(({ answer, question }) => ({
    question: question(lang),
    answer: answer(lang)
  }));
}

/**
 * Loads localized participant feedback for the workshop page.
 *
 * @param options - Locale and optional feedback loaders for DI
 * @returns Ordered quote, anonymous credit, and star-rating entries
 */
export function getAiWorkshopFeedback({
  lang,
  loaders = DEFAULT_FEEDBACK_LOADERS
}: GetAiWorkshopFeedbackOptions): AiWorkshopFeedback[] {
  return loaders.map(
    ({ credit, quote, rating = AI_WORKSHOP_MAX_STAR_RATING }) => ({
      quote: quote(lang),
      credit: credit(lang),
      rating
    })
  );
}

export type GetAiWorkshopStarIndexesOptions = {
  rating: number;
  max?: number;
};

/**
 * Returns indexes used to render filled stars for a rating.
 *
 * @param options - Rating value and optional maximum
 * @returns Zero-based indexes, one per filled star, clamped to the maximum
 */
export function getAiWorkshopStarIndexes({
  rating,
  max = AI_WORKSHOP_MAX_STAR_RATING
}: GetAiWorkshopStarIndexesOptions): number[] {
  const filled = Math.max(0, Math.min(max, Math.round(rating)));
  return Array.from({ length: filled }, (_, index) => index);
}

export type GetAiWorkshopStarRatingLabelOptions = {
  lang: SupportedLanguage;
  rating: number;
  max?: number;
};

/**
 * Returns an accessible label for a star rating.
 *
 * @param options - Locale, rating, and optional maximum
 * @returns Localized "n out of max stars" copy
 */
export function getAiWorkshopStarRatingLabel({
  lang,
  rating,
  max = AI_WORKSHOP_MAX_STAR_RATING
}: GetAiWorkshopStarRatingLabelOptions): string {
  return lang === "id"
    ? `${rating} dari ${max} bintang`
    : `${rating} out of ${max} stars`;
}
