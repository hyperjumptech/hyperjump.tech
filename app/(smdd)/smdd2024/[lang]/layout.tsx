import Hero from "@/smdd/smdd2024/components/hero";
import Nav from "./nav";
import ScrollObserver from "@/app/components/scroll-observer";
import type { SupportedLanguage } from "@/locales/.generated/types";
import Footer from "@/app/components/footer";

type SmddLangProps = {
  children: React.ReactNode;
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function SmddLangLayout({
  children,
  params
}: SmddLangProps) {
  const { lang } = await params;

  return (
    <>
      <ScrollObserver />
      <Nav lang={lang} />
      <Hero lang={lang} />
      {children}
      <Footer lang={lang} />
    </>
  );
}
