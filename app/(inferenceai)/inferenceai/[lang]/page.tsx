import { SupportedLanguage } from "@/locales/.generated/types";
import Home from "./home";
import { data } from "../data";
import {
  inferenceaiHeroDesc,
  inferenceaiHeroHeading
} from "@/locales/.generated/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const { baseUrl, name } = data;
  const title = `${name} - ${inferenceaiHeroHeading("en")}`;

  return {
    description: inferenceaiHeroDesc("en"),
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

type InferenceAIProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function InferenceAIPage({ params }: InferenceAIProps) {
  return <Home lang={(await params).lang} />;
}
