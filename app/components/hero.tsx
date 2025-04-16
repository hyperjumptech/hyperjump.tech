import Image from "next/image";
import { HeroCTAButton } from "./hero-cta-button";
import { PartnersList } from "./partner-list";
import data from "@/data.json";

export default function Hero() {
  return (
    <section className="relative h-[648px] bg-hyperjump-black text-white px-4 md:px-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          alt="Hero background"
          blurDataURL="/images/banner-blur.webp"
          className="object-cover object-center"
          fill
          placeholder="blur"
          priority
          src="/images/banner.webp"
        />
      </div>

      <div className="relative z-10 justify-around flex items-center flex-col h-[648px]">
        <div className="text-center max-w-5xl">
          <h1 className="text-4xl sm:text-5xl mt-28 md:text-6xl font-medium mb-4 md:mb-6l">
            {data.hero.heading}
          </h1>
          <p className="text-white text-sm sm:text-base md:text-xl font-medium mb-6 md:mb-10">
            {data.hero.subheading}
          </p>
          <HeroCTAButton />
        </div>

        <PartnersList />
      </div>
    </section>
  );
}
