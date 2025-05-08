import { SupportedLanguage } from "@/locales/.generated/types";
import Home from "./home";

export const generateStaticParams = async () => {
  return [{ lang: "en" }, { lang: "id" }];
};

type RagChatbotProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function RagChatbotPage({ params }: RagChatbotProps) {
  return <Home lang={(await params).lang} />;
}
