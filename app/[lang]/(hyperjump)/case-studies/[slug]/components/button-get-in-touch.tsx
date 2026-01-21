"use client";

import { Button } from "@/components/ui/button";
import { caseStudyQuestion } from "@/locales/.generated/server";
import type { SupportedLanguage } from "@/locales/.generated/types";

type GetInTouchButtonProps = {
  children: React.ReactNode;
  lang: SupportedLanguage;
};

export default function ButtonGetInTouch({
  children,
  lang
}: GetInTouchButtonProps) {
  return (
    <Button
      variant="default"
      size="lg"
      className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 w-3/4 md:w-auto"
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent("prefillAIAgent", {
            detail: {
              message: caseStudyQuestion(lang)
            }
          })
        );
      }}>
      {children}
    </Button>
  );
}
