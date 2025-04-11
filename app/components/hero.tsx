import data from "@/data.json";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { PartnersList } from "./partner-list";

import "@/app/galaxy.css";

export default function Hero() {
  return (
    <section className="relative h-[648px] bg-hyperjump-black text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/banner.webp"
          alt="Hero background"
          className="object-cover object-center"
          fill
          priority
        />
      </div>

      <article className="relative z-10 justify-around flex items-center flex-col h-[648px]">
        <div className="text-center">
          <h1 className="text-5xl mt-28 md:text-6xl font-medium mb-4 md:mb-6">
            Accelerating Enterprise Innovation
          </h1>
          <p className="text-white text-base md:text-xl font-medium mb-6 md:mb-10">
            Strategic technology solutions for scalable growth and efficiency
          </p>
          <Button
            asChild
            variant="default"
            size="lg"
            className="transition-all duration-200 ease-in-out transform hover:shadow-md hover:scale-[1.02] text-hyperjump-blue bg-white hover:bg-white/90"
          >
            <Link
              href={data.cta.link}
              className="py-4 px-7 text-lg font-semibold"
            >
              {data.cta.label}
            </Link>
          </Button>
        </div>

        <PartnersList />
      </article>
    </section>
  );
}
