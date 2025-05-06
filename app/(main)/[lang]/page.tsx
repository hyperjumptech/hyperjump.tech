import type { SupportedLanguage } from "@/locales/.generated/types";
import Home from "./home";

export const generateStaticParams = async () => {
  return [{ lang: "en" }, { lang: "id" }];
};

type HomepageProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function MainPage({ params }: HomepageProps) {
  return <Home lang={(await params).lang} />;
}
