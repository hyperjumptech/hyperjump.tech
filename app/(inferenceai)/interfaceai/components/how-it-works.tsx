"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GridItemsSection } from "./grid-items";
import intefaceAIData from "../interfaceai-data.json";

export default function HowItWorksInteractive() {
  const { header, subheader, data } = intefaceAIData.howItWorks;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="how-it-works" className="py-16">
      <GridItemsSection
        title={header}
        description={subheader}
        layout="vertical"
      >
        <div className="max-w-7xl mt-8 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="space-y-4 h-full">
            {data.map((step, i) => (
              <Card
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "cursor-pointer bg-[#1B1728] p-4 border rounded-xl shadow-sm transition-all",
                  i === activeIndex
                    ? "border-white/30 bg-[#292343]"
                    : "border-white/10 hover:border-white/20"
                )}
              >
                <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#2B2543] to-[#1A152E] rounded-2xl p-8 flex items-center justify-center min-h-[100%]">
            <div className="w-full max-w-md aspect-[4/3] relative">
              <Image
                src={data[activeIndex].image}
                alt={data[activeIndex].title}
                fill
                className="object-contain rounded-xl transition duration-300"
              />
            </div>
          </div>
        </div>
      </GridItemsSection>
    </section>
  );
}
