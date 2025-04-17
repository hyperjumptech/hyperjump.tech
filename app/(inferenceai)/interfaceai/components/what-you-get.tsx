import Image from "next/image";
import intefaceAIData from "../interfaceai-data.json";
import { GridItemsSection } from "./grid-items";

export default function WhatYouGet() {
  const { header, subheader, data } = intefaceAIData.whatYouGet;

  return (
    <GridItemsSection
      id="what-you-get"
      title={header}
      description={subheader}
      layout="vertical"
    >
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 text-white bg-[#0A0713] px-6 py-12">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-start justify-start gap-4 relative pl-4"
          >
            <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
            <Image src={item.icon} alt={item.title} width={32} height={32} />
            <p className="text-sm md:text-base">{item.title}</p>
          </div>
        ))}
      </div>
    </GridItemsSection>
  );
}
