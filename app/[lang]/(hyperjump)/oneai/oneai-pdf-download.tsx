import { FileDownIcon, FileTextIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  oneaiDocxDownloadCta,
  oneaiPdfDownloadCta,
  oneaiPdfDownloadDesc,
  oneaiPdfDownloadEyebrow,
  oneaiPdfDownloadHeading
} from "@/locales/.generated/strings";

import { SectionReveal } from "../components/motion-wrappers";
import { getOneaiDocxDownloadLink } from "./get-oneai-docx-download";
import { getOneaiPdfDownloadLink } from "./get-oneai-pdf-download";

type OneaiPdfDownloadProps = {
  lang: SupportedLanguage;
};

const downloadButtonClassName =
  "border-hyperjump-blue/30 text-hyperjump-black hover:bg-hyperjump-blue/5 h-12 w-full rounded-full px-6 text-base font-semibold md:min-w-[16.5rem]";

/**
 * Prompts visitors to download the OneAI promo PDF and leadership-memo DOCX.
 *
 * @param props - Active locale for copy and download filenames
 */
export function OneaiPdfDownload({ lang }: OneaiPdfDownloadProps) {
  const pdf = getOneaiPdfDownloadLink({ lang });
  const docx = getOneaiDocxDownloadLink({ lang });

  return (
    <SectionReveal delay={0.1}>
      <aside
        className="mt-12 rounded-2xl border border-[#c8d9eb] bg-linear-to-br from-[#eef5fb] via-white to-[#f6f8f9] p-6 md:p-8"
        data-testid="oneai-downloads">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-hyperjump-blue mb-2 text-xs font-bold tracking-[0.16em] uppercase">
              {oneaiPdfDownloadEyebrow(lang)}
            </p>
            <h3 className="text-hyperjump-black mb-2 text-xl font-semibold md:text-2xl">
              {oneaiPdfDownloadHeading(lang)}
            </h3>
            <p className="text-hyperjump-gray text-[15px] leading-relaxed md:text-base">
              {oneaiPdfDownloadDesc(lang)}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3">
            <Button
              asChild
              variant="outline"
              className={downloadButtonClassName}>
              <a
                href={pdf.href}
                download={pdf.download}
                data-testid="oneai-pdf-download">
                <FileDownIcon className="mr-2 h-4 w-4" aria-hidden />
                {oneaiPdfDownloadCta(lang)}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className={downloadButtonClassName}>
              <a
                href={docx.href}
                download={docx.download}
                data-testid="oneai-docx-download">
                <FileTextIcon className="mr-2 h-4 w-4" aria-hidden />
                {oneaiDocxDownloadCta(lang)}
              </a>
            </Button>
          </div>
        </div>
      </aside>
    </SectionReveal>
  );
}
