import { notFound } from "next/navigation";

import { serviceBySlug, ServiceSlug } from "@/app/data/service";
import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  About,
  HowItWorks,
  WhatWeDeliver,
  WhatYouGet,
  WhoIsIt,
  WhyUs
} from "../../cto-as-a-service/[lang]/home";

type HomeProps = { lang: SupportedLanguage };

export default function Home({ lang }: HomeProps) {
  const service = serviceBySlug({ lang, slug: ServiceSlug.TechDueDiligence });

  if (!service) {
    notFound();
  }

  return (
    <>
      <About service={service} />
      <WhoIsIt lang={lang} service={service} />
      <WhatWeDeliver lang={lang} service={service} />
      <HowItWorks lang={lang} service={service} />
      <WhatYouGet lang={lang} service={service} />
      <WhyUs lang={lang} service={service} />
    </>
  );
}
