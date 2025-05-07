import type { Metadata } from "next";
import InferenceAILangLayout from "./[lang]/layout";
import InferenceAIPage from "./[lang]/page";
import {
  inferenceaiHeroDesc,
  inferenceaiHeroHeading
} from "@/locales/.generated/server";
import { data } from "./data";

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

export default function NoLangInferenceAI() {
  return (
    <InferenceAILangLayout params={{ lang: "en" }}>
      <InferenceAIPage params={{ lang: "en" }} />
    </InferenceAILangLayout>
  );
}
