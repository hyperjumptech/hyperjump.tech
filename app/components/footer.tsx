import data from "@/data.json";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative text-white px-4 py-10 md:py-14 md:px-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/swatch.svg"
          alt="Footer background"
          width={1440}
          height={308}
          className="pointer-events-none select-none"
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(44.24deg, #0D0B1E 0%, #161D29 109.69%)",
          }}
        />
      </div>

      <div className="relative z-20 container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="flex items-center">
            <a href="/">
              <Image
                src="/images/hyperjump-white.png"
                alt="Hyperjump Logo"
                width={187}
                height={32}
                className="h-8 w-auto"
                priority
              />
            </a>
          </div>

          <p className="text-left md:text-center text-[#C7CDCD] max-w-md text-sm">
            Accelerating Business Growth with Cutting-Edge Technology Solutions
          </p>

          <div className="flex space-x-6">
            {data.socials.map((s, i) => (
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

          <Separator className="bg-[#2D364A] w-full" />

          <p className="text-sm text-[#C7CDCD] text-center">{data.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
