import {
  ragChatbotHeroDesc,
  ragChatbotHeroHeading
} from "@/locales/.generated/server";
import RagChatbotLangLayout from "./[lang]/layout";
import RagChatbotPage from "./[lang]/page";
import { data } from "../data";
import { Metadata } from "next";

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

export default function NoLangRagChatbot() {
  return (
    <RagChatbotLangLayout params={Promise.resolve({ lang: "en" })}>
      <RagChatbotPage params={Promise.resolve({ lang: "en" })} />
    </RagChatbotLangLayout>
  );
}
