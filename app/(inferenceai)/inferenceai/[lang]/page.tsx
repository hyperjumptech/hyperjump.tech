import {
  SupportedLanguage,
  supportedLanguages
} from "@/locales/.generated/types";
import Home from "./home";

export const generateStaticParams = async () => {
  return supportedLanguages.map((lang) => ({ lang }));
};

type InferenceAIProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function InferenceAIPage({ params }: InferenceAIProps) {
  return <Home lang={(await params).lang} />;
}
