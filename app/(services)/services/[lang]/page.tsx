import type { SupportedLanguage } from "@/locales/.generated/types";
import Home from "./home";

export const generateStaticParams = async () => {
  return [{ lang: "en" }, { lang: "id" }];
};

type ServiceProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function ServicesPage({ params }: ServiceProps) {
  return <Home lang={(await params).lang} />;
}
