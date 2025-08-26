import {
  type SupportedLanguage,
  supportedLanguages
} from "@/locales/.generated/types";

import Home from "./home";

export const generateStaticParams = async () => {
  return supportedLanguages.map((lang) => ({ lang }));
};

type MediaPulseProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function MediaPulsePage({ params }: MediaPulseProps) {
  const { lang } = await params;
  return <Home lang={lang} />;
}
