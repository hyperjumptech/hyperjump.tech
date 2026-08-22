import type { SupportedLanguage } from "@/locales/.generated/types";
import { oneaiPdfDownloadFileName } from "@/locales/.generated/strings";

/** Public paths to locale-specific OneAI promo PDFs. */
export const ONEAI_PDF_PATHS: Record<SupportedLanguage, string> = {
  en: "/documents/oneai-promo-en.pdf",
  id: "/documents/oneai-promo-id.pdf"
};

export type GetOneaiPdfDownloadFileNameOptions = {
  lang: SupportedLanguage;
  /** Filename loader for tests */
  getFileName?: (lang: SupportedLanguage) => string;
  /** PDF path map for tests */
  pdfPaths?: Record<SupportedLanguage, string>;
};

/**
 * Returns the public path for the OneAI promo PDF in the active locale.
 *
 * @param lang - Active locale
 * @param pdfPaths - Optional path map for DI
 * @returns Public PDF path
 */
export function getOneaiPdfPath(
  lang: SupportedLanguage,
  pdfPaths: Record<SupportedLanguage, string> = ONEAI_PDF_PATHS
): string {
  return pdfPaths[lang];
}

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
 * @param options - Locale and optional loaders for DI
 * @returns PDF path and localized download filename
 */
export function getOneaiPdfDownloadLink({
  lang,
  getFileName = oneaiPdfDownloadFileName,
  pdfPaths = ONEAI_PDF_PATHS
}: GetOneaiPdfDownloadFileNameOptions) {
  return {
    href: getOneaiPdfPath(lang, pdfPaths),
    download: getFileName(lang)
  };
}
