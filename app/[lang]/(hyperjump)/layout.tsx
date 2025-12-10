import ScrollObserver from "@/app/components/scroll-observer";
import {
  supportedLanguages,
  type SupportedLanguage
} from "@/locales/.generated/types";
import Footer from "./components/footer";
import LandingAIAgent from "./components/landing-ai-agent";
import Nav from "./components/nav";

type MainLangLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function MainLangLayout({
  children,
  params
}: MainLangLayoutProps) {
  const { lang } = await params;
  const supportedLang = supportedLanguages.includes(lang as SupportedLanguage)
    ? (lang as SupportedLanguage)
    : "en";

  return (
    <>
      <ScrollObserver />
      <div className="relative min-h-screen bg-white">
        <Nav lang={supportedLang} />
        {children}
        <LandingAIAgent />
        <Footer lang={supportedLang} />
      </div>
    </>
  );
}
