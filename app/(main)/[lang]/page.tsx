import type { SupportedLanguage } from "@/locales/.generated/types";
import Home from "./home";
import { Metadata } from "next";
import { data } from "./data";

export async function generateMetadata(): Promise<Metadata> {
  const { baseUrl, name } = data;
  const title = `${name} - Open source first. Cloud native. DevOps excellence.`;

  return {
    description: "Open source first. Cloud native. DevOps excellence.",
    title,
    openGraph: {
      url: baseUrl,
      type: "website",
      title,
      images: [
        {
          url: "https://hyperjump.tech/images/hyperjump-og.png",
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

type HomepageProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function MainPage({ params }: HomepageProps) {
  return <Home lang={(await params).lang} />;
}
