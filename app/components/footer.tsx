import data from "@/data.json";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden px-4 py-10 text-white md:px-20 md:py-14">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/swatch.svg"
          alt="Footer background"
          width={1440}
          height={308}
          className="pointer-events-none h-full w-full select-none"
          style={{
            background: "linear-gradient(44.24deg, #0D0B1E 0%, #161D29 109.69%)"
          }}
        />
      </div>

      <div className="container relative z-20 mx-auto px-4">
        <div className="flex flex-col space-y-6 md:items-center">
          <div className="flex items-center">
            <a href="/">
              <Image
                src="/images/hyperjump-white.png"
                alt="Hyperjump Logo"
                width={187}
                height={32}
                className="h-8 w-auto"
              />
            </a>
          </div>

          <p className="max-w-md text-sm text-[#C7CDCD]">
            Accelerating Business Growth with Cutting-Edge Technology Solutions
          </p>

          <div className="flex space-x-3">
            {data.socials.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2D364A] text-white transition hover:bg-hyperjump-blue"
                aria-label={s.platform}>
                <i className={s.icon} aria-hidden="true"></i>
              </a>
            ))}
          </div>

          <Separator className="w-full max-w-5xl bg-[#2D364A]" />

          <p className="text-center text-sm text-[#C7CDCD]">{data.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
