import Hero from "@/smdd/smdd2024/components/hero";
import Nav from "./nav";
import ScrollObserver from "@/app/components/scroll-observer";
import { SupportedLanguage } from "@/locales/.generated/types";
import Footer from "@/app/components/footer";

export default function SmddLangLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <>
      <ScrollObserver />
      <Nav lang={params.lang as SupportedLanguage} />
      <Hero lang={params.lang as SupportedLanguage} />
      {children}
      <Footer />
    </>
  );
}
