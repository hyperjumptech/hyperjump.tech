import Image from "next/image";
import data from "../inferenceai-data.json";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const { text, socials, copyright } = data.footer;

  return (
    <footer className="relative overflow-hidden border border-[#29223E] px-4 py-10 text-[#AFB0C3] md:px-20 md:py-14">
      <div className="flex flex-col space-y-6 md:items-center">
        <div className="flex items-center">
          <a href="/">
            <Image
              src={data.logoWhite}
              alt="Inference AI Logo"
              width={187}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </a>
        </div>

        <p className="text-sm md:max-w-60 md:text-center">{text}</p>

        <div className="flex space-x-6">
          {socials.map((s, i) => (
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

        <Separator className="w-full bg-[#29223E]" />

        <p className="text-center text-sm">{copyright}</p>
      </div>
    </footer>
  );
}
