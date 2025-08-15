"use client";

import { usePathname } from "next/navigation";
import { SupportedLanguage } from "@/locales/.generated/types";
import Nav from "@/app/components/nav";
import Footer from "@/app/components/footer";

import NavInferenceAI from "../(inferenceai)/inferenceai/components/nav";
import FooterInferenceAI from "../(inferenceai)/inferenceai/components/footer";
import LandingAIAgent from "./landing-ai-agent";

export default function ClientWrapper({
  children,
  lang
}: {
  children: React.ReactNode;
  lang: SupportedLanguage;
}) {
  const pathname = usePathname();
  const isInferenceAi = pathname === `/${lang}/inferenceai`;
  const isRagChatbot = pathname === `/${lang}/inferenceai/rag-chatbot`;

  return (
    <div className="relative min-h-screen bg-white">
      {isInferenceAi ? (
        <NavInferenceAI lang={lang} />
      ) : isRagChatbot ? (
        <NavInferenceAI type="rag-chatbot" lang={lang} />
      ) : (
        <Nav lang={lang} />
      )}
      {children}
      {isInferenceAi ? <></> : <LandingAIAgent />}
      {isInferenceAi ? (
        <FooterInferenceAI lang={lang} />
      ) : isRagChatbot ? (
        <FooterInferenceAI type="rag-chatbot" lang={lang} />
      ) : (
        <Footer lang={lang} />
      )}
    </div>
  );
}
