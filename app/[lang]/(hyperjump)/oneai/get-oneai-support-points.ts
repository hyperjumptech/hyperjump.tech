import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  oneaiSupportPoints0Text,
  oneaiSupportPoints0Title,
  oneaiSupportPoints1Text,
  oneaiSupportPoints1Title,
  oneaiSupportPoints2Text,
  oneaiSupportPoints2Title
} from "@/locales/.generated/strings";

/** Public path to the full-bleed support section photo. */
export const ONEAI_SUPPORT_IMAGE_PATH = "/images/oneai/support-engineers.jpg";

export type OneaiSupportPoint = {
  title: string;
  text: string;
};

type PointLoader = {
  title: (lang: SupportedLanguage) => string;
  text: (lang: SupportedLanguage) => string;
};

export type GetOneaiSupportPointsOptions = {
  lang: SupportedLanguage;
  /** Point loaders for tests */
  pointLoaders?: PointLoader[];
};

const DEFAULT_POINT_LOADERS: PointLoader[] = [
  { title: oneaiSupportPoints0Title, text: oneaiSupportPoints0Text },
  { title: oneaiSupportPoints1Title, text: oneaiSupportPoints1Text },
  { title: oneaiSupportPoints2Title, text: oneaiSupportPoints2Text }
];

/**
 * Loads localized support proof points for the OneAI landing page.
 *
 * @param options - Locale and optional point loaders for DI
 * @returns Ordered title and text pairs shown over the support photo
 */
export function getOneaiSupportPoints({
  lang,
  pointLoaders = DEFAULT_POINT_LOADERS
}: GetOneaiSupportPointsOptions): OneaiSupportPoint[] {
  return pointLoaders.map(({ text, title }) => ({
    title: title(lang),
    text: text(lang)
  }));
}
