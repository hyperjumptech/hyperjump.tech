import ScrollObserver from "@/app/components/scroll-observer";
import { SupportedLanguage } from "@/locales/.generated/types";
import Footer from "../../components/footer";
import Hero from "../../components/hero";
import Nav from "../../components/nav";

export default function ChatbotLangLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <>
      <ScrollObserver />
      <Nav lang={params.lang as SupportedLanguage} type="rag-chatbot" />
      <Hero lang={params.lang as SupportedLanguage} type="rag-chatbot" />
      {children}
      <Footer lang={params.lang as SupportedLanguage} type="rag-chatbot" />
    </>
  );
}
