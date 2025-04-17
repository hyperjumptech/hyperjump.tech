import Image from "next/image";
import data from "../interfaceai-data.json";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const { logo, text, socials, copyright } = data.footer;

  return (
    <footer className="relative text-[#AFB0C3] border border-[#29223E] px-4 py-10 md:py-14 md:px-20 overflow-hidden">
      <div className="flex flex-col md:items-center space-y-6">
        <div className="flex items-center">
          <a href="/">
            <Image
              src={logo}
              alt="Hyperjump Logo"
              width={187}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </a>
        </div>

        <p className="md:max-w-60 md:text-center text-sm">{text}</p>

        <div className="flex space-x-6">
          {socials.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 text-xl"
              aria-label={s.platform}
            >
              <i className={s.icon} aria-hidden="true"></i>
            </a>
          ))}
        </div>

        <Separator className="bg-[#29223E] w-full" />

        <p className="text-sm text-center">{copyright}</p>
      </div>
    </footer>
  );
}
