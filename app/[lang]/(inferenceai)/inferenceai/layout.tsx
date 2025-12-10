import ScrollObserver from "@/app/components/scroll-observer";
import {
  supportedLanguages,
  type SupportedLanguage
} from "@/locales/.generated/types";
import ClientWrapper from "./components/client-wrapper";
import { Footer } from "./components/footer";

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
      <div className="relative min-h-screen bg-transparent">
        <ClientWrapper lang={supportedLang} />
        {children}
        <Footer lang={supportedLang} />
      </div>
    </>
  );
}
