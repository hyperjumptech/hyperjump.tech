import { FileDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  oneaiPdfDownloadCta,
  oneaiPdfDownloadDesc,
  oneaiPdfDownloadEyebrow,
  oneaiPdfDownloadHeading
} from "@/locales/.generated/strings";

import { SectionReveal } from "../components/motion-wrappers";
import { getOneaiPdfDownloadLink } from "./get-oneai-pdf-download";

type OneaiPdfDownloadProps = {
  lang: SupportedLanguage;
};

/**
 * Prompts visitors to download the OneAI promo PDF for internal sharing.
 *
 * @param props - Active locale for copy and download filename
 */
export function OneaiPdfDownload({ lang }: OneaiPdfDownloadProps) {
  const { download, href } = getOneaiPdfDownloadLink({ lang });

  return (
    <SectionReveal delay={0.1}>
      <aside
        className="mt-12 rounded-2xl border border-[#c8d9eb] bg-linear-to-br from-[#eef5fb] via-white to-[#f6f8f9] p-6 md:p-8"
        data-testid="oneai-pdf-download">
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
          <Button
            asChild
            variant="outline"
            className="border-hyperjump-blue/30 text-hyperjump-black hover:bg-hyperjump-blue/5 h-12 shrink-0 rounded-full px-6 text-base font-semibold">
            <a href={href} download={download}>
              <FileDownIcon className="mr-2 h-4 w-4" aria-hidden />
              {oneaiPdfDownloadCta(lang)}
            </a>
          </Button>
        </div>
      </aside>
    </SectionReveal>
  );
}
