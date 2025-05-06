import ScrollObserver from "@/app/components/scroll-observer";
import { SupportedLanguage } from "@/locales/.generated/types";
import Hero from "../components/hero";
import Nav from "@/app/components/nav";
import Footer from "@/app/components/footer";

export default function ServicesLangLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <div className="bg-white">
      <ScrollObserver />
      <Nav
        className="xxl:max-w-7xl max-w-6xl"
        lang={params.lang as SupportedLanguage}
      />
      <Hero lang={params.lang as SupportedLanguage} />
      {children}
      <Footer lang={params.lang as SupportedLanguage} />
    </div>
  );
}
