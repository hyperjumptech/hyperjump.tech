import type { SupportedLanguage } from "@/locales/.generated/types";
import { oneaiPdfDownloadFileName } from "@/locales/.generated/strings";

/** Public path to the OneAI promo PDF served from `/public/documents`. */
export const ONEAI_PDF_PATH = "/documents/oneai-promo.pdf";

export type GetOneaiPdfDownloadFileNameOptions = {
  lang: SupportedLanguage;
  /** Filename loader for tests */
  getFileName?: (lang: SupportedLanguage) => string;
};

/**
 * Returns the suggested download filename for the OneAI promo PDF.
 *
 * @param options - Locale and optional filename loader for DI
 * @returns Localized filename shown when the user saves the PDF
 */
export function getOneaiPdfDownloadFileName({
  lang,
  getFileName = oneaiPdfDownloadFileName
}: GetOneaiPdfDownloadFileNameOptions): string {
  return getFileName(lang);
}

/**
 * Builds the href and download attribute for the OneAI promo PDF link.
 *
 * @param options - Locale and optional filename loader for DI
 * @returns PDF path and localized download filename
 */
export function getOneaiPdfDownloadLink({
  lang,
  getFileName = oneaiPdfDownloadFileName
}: GetOneaiPdfDownloadFileNameOptions) {
  return {
    href: ONEAI_PDF_PATH,
    download: getFileName(lang)
  };
}
