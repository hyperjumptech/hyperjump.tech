import ScrollObserver from "@/app/components/scroll-observer";
import type { SupportedLanguage } from "@/locales/.generated/types";
import Footer from "./components/footer";
import LandingAIAgent from "./components/landing-ai-agent";
import Nav from "./components/nav";

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
      <div className="relative min-h-screen bg-white">
        <Nav lang={lang} />
        {children}
        <LandingAIAgent />
        <Footer lang={lang} />
      </div>
    </>
  );
}
