import ScrollObserver from "@/app/components/scroll-observer";
import type { SupportedLanguage } from "@/locales/.generated/types";
import Footer from "./components/footer";
import HyperBot from "./components/landing-ai-agent";
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

  return (
    <>
      <ScrollObserver />
      <div className="relative min-h-screen bg-white antialiased">
        <Nav lang={lang as SupportedLanguage} />
        {children}
        <HyperBot
          gaEvent={{
            event: "hyperbot_open",
            category: "engagement",
            label: "hyperjump_chat"
          }}
          lang={lang as SupportedLanguage}
        />
        <Footer lang={lang as SupportedLanguage} />
      </div>
    </>
  );
}
