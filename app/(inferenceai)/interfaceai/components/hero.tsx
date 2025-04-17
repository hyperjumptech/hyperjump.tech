import Image from "next/image";
import data from "../interfaceai-data.json";
import { ScheduleConsultationButton } from "./grid-items";

export default function Hero() {
  const { header, subheader, image } = data.hero;

  return (
    <section className="relative h-[648px] bg-[#020206] text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt="Hero background"
          className="object-cover object-center"
          fill
          priority
        />
      </div>
      <article className="relative z-10 justify-around flex items-center flex-col h-[648px]">
        <div className="text-center px-4 md:px-20">
          <h1 className="text-5xl mt-28 md:text-6xl font-medium mb-4 md:mb-6 bg-gradient-to-b from-white to-[#0C1711] bg-clip-text text-transparent">
            {header}
          </h1>
          <p className="text-[#AFB0C3] text-base md:text-xl font-medium mb-6 md:mb-10">
            {subheader}
          </p>
          <ScheduleConsultationButton />
        </div>
      </article>
    </section>
  );
}
