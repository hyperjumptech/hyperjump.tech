/* eslint-disable @next/next/no-img-element */
import { demosAndDocumentation } from "@/locales/.generated/server";
import { SupportedLanguage } from "@/locales/.generated/types";

export default function DemosAndDocs({ lang }: { lang: SupportedLanguage }) {
  const items = [
    {
      image: "/images/smdd/indira.png",
      link: "https://web.festivalrelawan.com",
      title: "Indira: AI assistant for volunteering platform"
    },
    {
      image: "/images/smdd/smddcb.png",
      link: "https://digitalday.sinarmas.com",
      title: "AI Chatbot with Retrieval-Augmented Generation for SMDD 2024"
    },
    {
      image: "/images/smdd/ai.png",
      link: "https://rfynbbyeuvbhjbqiixxk.supabase.co/storage/v1/object/public/documents/ai.pdf",
      title: "How We Build RAG Chatbot for SMDD"
    },
    {
      image: "/images/smdd/volunteering-platform.png",
      link: "https://rfynbbyeuvbhjbqiixxk.supabase.co/storage/v1/object/public/documents/volunteering-platform.pdf",
      title: "Unlocking Employee Engagement with Corporate Volunteering"
    }
  ];

  return (
    <section className="w-full bg-white px-4 pt-4 sm:pt-0 xl:pt-16">
      <div className="container mx-auto w-full max-w-7xl text-black">
        <h1 className="my-4 mb-8 text-2xl font-bold leading-tight xl:text-5xl">
          {demosAndDocumentation(lang)}
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          {items.map((item, i) => {
            return (
              <div
                key={i}
                className="flex flex-col  space-y-4 overflow-hidden rounded-b-none rounded-t bg-white pb-6 shadow">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-40 w-full object-cover"
                />
                <div>
                  <a
                    href={item.link}
                    className="flex flex-wrap px-4 font-bold text-smdd-red no-underline hover:no-underline">
                    {item.title}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
