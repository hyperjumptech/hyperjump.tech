import ScrollObserver from "@/app/components/scroll-observer";
import type { SupportedLanguage } from "@/locales/.generated/types";

import Nav from "@/app/components/nav";
import Footer from "@/app/components/footer";
import { Hero } from "../../components/hero-details";
import { caseStudyErpFisheriesTitle } from "@/locales/.generated/server";
type ServiceLangProps = {
  children: React.ReactNode;
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function ErpFisheriesLangLayout({
  children,
  params
}: ServiceLangProps) {
  const { lang } = await params;

  return (
    <div className="bg-white">
      <ScrollObserver />
      <Nav isTransparent className="xxl:max-w-7xl max-w-6xl" lang={lang} />
      <Hero heading={caseStudyErpFisheriesTitle(lang)} />
      {children}
      <Footer lang={lang} type="erp-fisheries" />
    </div>
  );
}
