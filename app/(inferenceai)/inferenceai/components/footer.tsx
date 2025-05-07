import Image from "next/image";
import data from "@/data.json";
import { Separator } from "@/components/ui/separator";
import { SupportedLanguage } from "@/locales/.generated/types";
import { inferenceaiFooter } from "@/locales/.generated/server";
import LanguagePicker from "./language-picker";
import Link from "next/link";

export default function Footer({
  lang,
  type = "inferenceai"
}: {
  lang: SupportedLanguage;
  type?: "inferenceai" | "rag-chatbot";
}) {
  const { aiSocials, copyright } = data;

  return (
    <footer className="relative overflow-hidden border border-[#29223E] px-4 py-10 text-[#AFB0C3] md:px-20 md:py-14">
      <div className="flex flex-col space-y-6 md:items-center">
        <div className="flex items-center">
          <Link
            href={
              type === "inferenceai"
                ? "/inferenceai"
                : "/inferenceai/rag-chatbot"
            }>
            <Image
              src="/images/inferenceai/inference-ai-white.svg"
              alt="Inference AI Logo"
              width={187}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>
        </div>

        <p className="text-sm md:max-w-60 md:text-center">
          {inferenceaiFooter(lang)}
        </p>

        <div className="flex space-x-6">
          {aiSocials.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.platform}
              className="flex items-center justify-center rounded-full bg-transparent transition-colors duration-200 hover:bg-white/20">
              <Image
                src={s.icon}
                alt={s.platform}
                width={20}
                height={20}
                className="h-12 w-12"
              />
            </a>
          ))}
        </div>

        <LanguagePicker lang={lang} type={type} />

        <Separator className="w-full bg-[#29223E]" />

        <p className="text-center text-sm">{copyright}</p>
      </div>
    </footer>
  );
}
