import Image from "next/image";
import { cn } from "@/lib/utils";
import data from "../interfaceai-data.json";

export const PartnersList = () => {
  const { header, logos } = data.partners;

  return (
    <section
      className="w-full px-4 md:px-20"
      style={{
        background:
          "linear-gradient(360deg, #050013 49.91%, rgba(1, 1, 2, 0.2) 86.45%)",
      }}
    >
      <div className="mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between">
        <h2 className="text-white text-2xl xl:text-[32px] font-medium grid grid-cols-1 mb-6 md:grid-cols-2 xl:grid-cols-4">
          {header}
        </h2>

        <div className="grid grid-cols-3 gap-4 md:gap-6 space-y-2 items-center justify-center md:justify-end">
          {logos.map((partner, index) => (
            <div
              key={index}
              className="flex w-auto items-center justify-center"
            >
              <Image
                src={partner}
                alt={`Partner ${index + 1}`}
                height={36}
                width={120}
                className={cn(
                  "object-contain h-[30px] w-auto",
                  "grayscale opacity-60 hover:opacity-100 transition"
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
