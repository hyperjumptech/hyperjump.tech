import Image from "next/image";
import { cn } from "@/lib/utils";
import data from "@/data.json";

export const PartnersList = () => {
  return (
    <div className="relative px-8 md:px-20 py-4">
      <div className="flex flex-wrap items-center justify-center gap-8">
        {data.clients.map(({ imageUrl, name }) => (
          <div key={name} className="flex md:h-[36px] h-7 w-auto">
            <Image
              src={imageUrl}
              alt={name}
              height={36}
              width={120}
              className={cn(
                "object-contain h-[30px] w-auto",
                "grayscale opacity-60 hover:opacity-100 transition"
              )}
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
};
