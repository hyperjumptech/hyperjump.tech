import { SupportedLanguage } from "@/locales/.generated/types";
import Home from "./home";

import { Metadata } from "next";
import { data } from "../../data";
import {
  ragChatbotHeroDesc,
  ragChatbotHeroHeading
} from "@/locales/.generated/server";

export async function generateMetadata(): Promise<Metadata> {
  const { baseUrl, name } = data;
  const title = `${name} - ${ragChatbotHeroHeading("en")}`;

  return {
    description: ragChatbotHeroDesc("en"),
    title,
    openGraph: {
      url: baseUrl,
      type: "website",
      title,
      images: [
        {
          url: "https://hyperjump.tech/images/inferenceai/inference-ai-og.png",
          width: 1200,
          height: 630,
          alt: `${name} Logo`,
          type: "image/png"
        }
      ],
      siteName: name
    }
  };
}

export const generateStaticParams = async () => {
  return [{ lang: "en" }, { lang: "id" }];
};

type RagChatbotProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function RagChatbotPage({ params }: RagChatbotProps) {
  return <Home lang={(await params).lang} />;
}
