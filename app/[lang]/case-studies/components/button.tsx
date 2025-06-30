"use client";

import { SupportedLanguage } from "@/locales/.generated/types";
import { caseStudyButton } from "@/locales/.generated/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CaseStudyButton({
  lang,
  url
}: {
  lang: SupportedLanguage;
  url: string;
}) {
  return (
    <Button
      asChild
      variant="outline"
      className="text-hyperjump-blue hover:bg-hyperjump-blue mt-4 w-full border-gray-300 hover:text-white">
      <Link href={url}>{caseStudyButton(lang)}</Link>
    </Button>
  );
}
