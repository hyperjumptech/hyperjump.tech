import { SupportedLanguage } from "@/locales/.generated/types";
import Home from "./home";

export const generateStaticParams = async () => {
  return [{ lang: "en" }, { lang: "id" }];
};

export default function InferenceAIPage({
  params
}: {
  params: { lang: SupportedLanguage };
}) {
  return <Home lang={params.lang} />;
}
