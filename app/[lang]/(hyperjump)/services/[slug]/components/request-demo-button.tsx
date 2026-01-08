"use client";

import { Button } from "@/components/ui/button";
import type { SupportedLanguage } from "@/locales/.generated/types";
import { servicesRequestDemo } from "@/locales/.generated/server";

export default function RequestDemoButton({
  lang,
  service
}: {
  lang: SupportedLanguage;
  service: string;
}) {
  const handleChatbot = () => {
    window.dispatchEvent(
      new CustomEvent("prefillAIAgent", {
        detail: { message: `I want to request a demo for ${service}` }
      })
    );
  };
  return (
    <>
      <Button
        variant="default"
        size="lg"
        className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 text-md w-full max-w-sm"
        data-testid="request-demo-button"
        onClick={handleChatbot}>
        {servicesRequestDemo(lang)}
      </Button>
    </>
  );
}
