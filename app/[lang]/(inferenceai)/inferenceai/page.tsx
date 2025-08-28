import {
  type SupportedLanguage,
  supportedLanguages
} from "@/locales/.generated/types";

import {
  AboutUs,
  CaseStudies,
  Faqs,
  Hero,
  HowItWorks,
  WhatYouGet,
  WhyWorkWithUs
} from "./home";

export const generateStaticParams = async () => {
  return supportedLanguages.map((lang) => ({ lang }));
};

type InferenceAIProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function InferenceAIPage({ params }: InferenceAIProps) {
  const { lang } = await params;

  return (
    <>
      <Hero lang={lang} />
      <WhyWorkWithUs lang={lang} />
      <HowItWorks lang={lang} />
      <WhatYouGet lang={lang} />
      <CaseStudies lang={lang} />
      <AboutUs lang={lang} />
      <Faqs lang={lang} />
    </>
  );
}
