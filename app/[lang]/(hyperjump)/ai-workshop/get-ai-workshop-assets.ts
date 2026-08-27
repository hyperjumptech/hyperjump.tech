import type { SupportedLanguage } from "@/locales/.generated/types";

/** Fallback Open Graph path (English card). */
export const AI_WORKSHOP_OG_IMAGE_PATH = "/images/ai-workshop/og.png";

/** Locale-specific 1200×630 Open Graph cards. */
export const AI_WORKSHOP_OG_IMAGE_PATHS = {
  en: "/images/ai-workshop/og-en.png",
  id: "/images/ai-workshop/og-id.png"
} as const;

/** Public path to the facilitator photo used in the hero. */
export const AI_WORKSHOP_FACILITATOR_IMAGE_PATH =
  "/images/ai-workshop/facilitator.jpg";

/** Public path to the table-of-participants photo. */
export const AI_WORKSHOP_PARTICIPANTS_IMAGE_PATH =
  "/images/ai-workshop/participants.jpg";

/** Public path to the wide room photo. */
export const AI_WORKSHOP_ROOM_IMAGE_PATH = "/images/ai-workshop/room.jpg";

export const AI_WORKSHOP_OG_IMAGE_WIDTH = 1200;
export const AI_WORKSHOP_OG_IMAGE_HEIGHT = 630;

export type AiWorkshopPhoto = {
  src: string;
  width: number;
  height: number;
};

export type AiWorkshopOgImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

export type GetAiWorkshopOgImageOptions = {
  lang: SupportedLanguage;
  siteUrl: string;
  alt: string;
};

export type GetAiWorkshopStructuredImagesOptions = {
  lang: SupportedLanguage;
  siteUrl: string;
};

/**
 * Returns the locale-specific Open Graph image path.
 *
 * @param lang - Active locale
 * @returns Public path to the 1200×630 PNG for that locale
 */
export function getAiWorkshopOgImagePath(lang: SupportedLanguage): string {
  return AI_WORKSHOP_OG_IMAGE_PATHS[lang] ?? AI_WORKSHOP_OG_IMAGE_PATHS.en;
}

/**
 * Returns the absolute Open Graph / Twitter image for the workshop page.
 *
 * @param options - Locale, site origin, and alt text
 * @returns Image object for Next.js metadata
 */
export function getAiWorkshopOgImage({
  alt,
  lang,
  siteUrl
}: GetAiWorkshopOgImageOptions): AiWorkshopOgImage {
  return {
    url: `${siteUrl}${getAiWorkshopOgImagePath(lang)}`,
    width: AI_WORKSHOP_OG_IMAGE_WIDTH,
    height: AI_WORKSHOP_OG_IMAGE_HEIGHT,
    alt
  };
}

/**
 * Returns absolute image URLs for JSON-LD, OG card first then workshop photos.
 *
 * @param options - Locale and site origin
 * @returns Ordered list of absolute image URLs
 */
export function getAiWorkshopStructuredImages({
  lang,
  siteUrl
}: GetAiWorkshopStructuredImagesOptions): string[] {
  return [
    `${siteUrl}${getAiWorkshopOgImagePath(lang)}`,
    `${siteUrl}${AI_WORKSHOP_FACILITATOR_IMAGE_PATH}`,
    `${siteUrl}${AI_WORKSHOP_PARTICIPANTS_IMAGE_PATH}`,
    `${siteUrl}${AI_WORKSHOP_ROOM_IMAGE_PATH}`
  ];
}

/**
 * Returns the facilitator photo used in the workshop hero.
 */
export function getAiWorkshopFacilitatorPhoto(): AiWorkshopPhoto {
  return {
    src: AI_WORKSHOP_FACILITATOR_IMAGE_PATH,
    width: 1024,
    height: 768
  };
}

/**
 * Returns the participants photo used in the rule-of-the-room section.
 */
export function getAiWorkshopParticipantsPhoto(): AiWorkshopPhoto {
  return {
    src: AI_WORKSHOP_PARTICIPANTS_IMAGE_PATH,
    width: 1024,
    height: 769
  };
}

/**
 * Returns the wide room photo used in the logistics and teaser sections.
 */
export function getAiWorkshopRoomPhoto(): AiWorkshopPhoto {
  return {
    src: AI_WORKSHOP_ROOM_IMAGE_PATH,
    width: 1024,
    height: 576
  };
}
