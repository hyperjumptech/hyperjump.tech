import Footer from "@/app/components/footer";
import Nav from "@/app/components/nav";
import ScrollObserver from "@/app/components/scroll-observer";
import type { SupportedLanguage } from "@/locales/.generated/types";

type MainLangLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function MainLangLayout({
  children,
  params
}: MainLangLayoutProps) {
  const { lang } = await params;

  return (
    <>
      <ScrollObserver />
      <Nav lang={lang} />
      {children}
      <Footer lang={lang} />
    </>
  );
}
