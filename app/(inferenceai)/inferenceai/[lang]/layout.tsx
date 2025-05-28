import ScrollObserver from "@/app/components/scroll-observer";
import {
  inferenceaiHeroDesc,
  inferenceaiHeroHeading
} from "@/locales/.generated/server";
import type { SupportedLanguage } from "@/locales/.generated/types";

import Footer from "../components/footer";
import Hero from "../components/hero";
import Nav from "../components/nav";

type InferenceAILangLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function InferenceAILangLayout({
  children,
  params
}: InferenceAILangLayoutProps) {
  const { lang } = await params;

  return (
    <>
      <ScrollObserver />
      <Nav lang={lang} />
      <Hero
        heading={inferenceaiHeroHeading(lang)}
        subheading={inferenceaiHeroDesc(lang)}
      />
      {children}
      <Footer lang={lang} />
    </>
  );
}
