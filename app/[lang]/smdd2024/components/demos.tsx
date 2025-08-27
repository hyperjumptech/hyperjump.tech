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
    <section>
      <h1 className="my-4 mb-8 text-2xl leading-tight font-bold xl:text-5xl">
        {demosAndDocumentation(lang)}
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {items.map((item, i) => {
          return (
            <div
              key={i}
              className="flex flex-col space-y-4 overflow-hidden rounded-t rounded-b-none bg-white pb-6 shadow-sm">
              <img
                src={item.image}
                alt={item.title}
                className="h-40 w-full object-cover"
              />
              <div>
                <a
                  href={item.link}
                  className="text-smdd-red flex flex-wrap px-4 font-bold no-underline hover:no-underline">
                  {item.title}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
