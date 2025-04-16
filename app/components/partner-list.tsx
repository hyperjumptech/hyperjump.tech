import Image from "next/image";
import { cn } from "@/lib/utils";
import data from "@/data.json";

export const PartnersList = () => {
  return (
    <div className="relative px-8 md:px-20 py-4">
      <div className="flex flex-wrap items-center justify-center gap-8">
        {data.clients.map(({ imageUrl, name }) => (
          <Image
            key={name}
            src={imageUrl}
            alt={name}
            height={36}
            width={120}
            className="object-contain h-6 sm:h-7 w-auto grayscale opacity-60 hover:opacity-100 transition"
            priority
          />
        ))}
      </div>
    </div>
  );
};
