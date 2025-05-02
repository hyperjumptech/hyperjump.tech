import Footer from "@/app/components/footer";
import { Hero } from "@/app/components/hero";
import Nav from "@/app/components/nav";
import ScrollObserver from "@/app/components/scroll-observer";
import { SupportedLanguage } from "@/locales/.generated/types";

export default function MainLangLayout({
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
      <Footer lang={params.lang as SupportedLanguage} />
    </>
  );
}
