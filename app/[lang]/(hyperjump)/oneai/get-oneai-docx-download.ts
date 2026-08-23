import type { SupportedLanguage } from "@/locales/.generated/types";
import { oneaiDocxDownloadFileName } from "@/locales/.generated/strings";

/** Public paths to locale-specific OneAI leadership-memo DOCX files. */
export const ONEAI_DOCX_PATHS: Record<SupportedLanguage, string> = {
  en: "/documents/oneai-leadership-memo-en.docx",
  id: "/documents/oneai-leadership-memo-id.docx"
};

export type GetOneaiDocxDownloadFileNameOptions = {
  lang: SupportedLanguage;
  /** Filename loader for tests */
  getFileName?: (lang: SupportedLanguage) => string;
  /** DOCX path map for tests */
  docxPaths?: Record<SupportedLanguage, string>;
};

/**
 * Returns the public path for the OneAI leadership-memo DOCX in the active locale.
 *
 * @param lang - Active locale
 * @param docxPaths - Optional path map for DI
 * @returns Public DOCX path
 */
export function getOneaiDocxPath(
  lang: SupportedLanguage,
  docxPaths: Record<SupportedLanguage, string> = ONEAI_DOCX_PATHS
): string {
  return docxPaths[lang];
}

/**
 * Returns the suggested download filename for the OneAI leadership-memo DOCX.
 *
 * @param options - Locale and optional filename loader for DI
 * @returns Localized filename shown when the user saves the DOCX
 */
export function getOneaiDocxDownloadFileName({
  lang,
  getFileName = oneaiDocxDownloadFileName
}: GetOneaiDocxDownloadFileNameOptions): string {
  return getFileName(lang);
}

/**
 * Builds the href and download attribute for the OneAI leadership-memo DOCX link.
 *
 * @param options - Locale and optional loaders for DI
 * @returns DOCX path and localized download filename
 */
export function getOneaiDocxDownloadLink({
  lang,
  getFileName = oneaiDocxDownloadFileName,
  docxPaths = ONEAI_DOCX_PATHS
}: GetOneaiDocxDownloadFileNameOptions) {
  return {
    href: getOneaiDocxPath(lang, docxPaths),
    download: getFileName(lang)
  };
}
