"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import Footer from "@/app/components/footer";
import Nav from "@/app/components/nav";
import { cn } from "@/lib/utils";
import type { SupportedLanguage } from "@/locales/.generated/types";

import { Footer as FooterInferenceAI } from "../inferenceai/components/footer";
import NavInferenceAI from "../inferenceai/components/nav";
import LandingAIAgent from "./landing-ai-agent";

type ClientWrapperProps = {
  children: ReactNode;
  lang: SupportedLanguage;
};

export default function ClientWrapper({ children, lang }: ClientWrapperProps) {
  const pathname = usePathname();
  const isInferenceAi = pathname.includes(`/${lang}/inferenceai`);
  const isInferenceAiCaseStudy = pathname.includes(`/${lang}/inferenceai/`);

  return (
    <div
      className={cn(
        "relative min-h-screen",
        isInferenceAi ? "bg-transparent" : "bg-white"
      )}>
      {isInferenceAi ? (
        <NavInferenceAI
          type={isInferenceAiCaseStudy ? "rag-chatbot" : "inferenceai"}
          lang={lang}
        />
      ) : (
        <Nav lang={lang} />
      )}
      {children}
      {isInferenceAi ? <></> : <LandingAIAgent />}
      {isInferenceAi ? (
        <FooterInferenceAI lang={lang} />
      ) : (
        <Footer lang={lang} />
      )}
    </div>
  );
}
