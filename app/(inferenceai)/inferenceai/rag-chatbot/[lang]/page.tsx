import {
  SupportedLanguage,
  supportedLanguages
} from "@/locales/.generated/types";
import Home from "./home";

export const generateStaticParams = async () => {
  return supportedLanguages.map((lang) => ({ lang }));
};

type RagChatbotProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function RagChatbotPage({ params }: RagChatbotProps) {
  return <Home lang={(await params).lang} />;
}
