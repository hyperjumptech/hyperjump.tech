import Image from "next/image";
import { cn } from "@/lib/utils";
import data from "../inferenceai-data.json";

export default function PartnersList() {
  const { header, logos } = data.partners;

  return (
    <section className="relative w-full overflow-hidden bg-[#050013] py-16">
      <div className="relative z-10 mx-auto flex flex-col justify-center gap-y-8 px-4 md:flex-row md:items-center md:justify-between md:px-20">
        <h2 className="text-2xl font-medium text-white xl:text-[32px]">
          {header}
        </h2>

        <div className="grid grid-cols-3 items-center justify-center gap-4 md:justify-end md:gap-6">
          {logos.map((partner, index) => (
            <div key={index} className="flex w-auto items-center justify-start">
              <Image
                src={partner}
                alt={`Partner ${index + 1}`}
                height={36}
                width={120}
                className={cn(
                  "h-[30px] w-auto object-contain",
                  "opacity-60 grayscale transition hover:opacity-100"
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
