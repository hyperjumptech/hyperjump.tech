import Image from "next/image";
import data from "@/data.json";

export const PartnersList = () => {
  return (
    <div className="relative px-8 py-4 md:px-20">
      <div className="flex flex-wrap items-center justify-center gap-8">
        {data.clients.map(({ imageUrl, name }) => (
          <Image
            key={name}
            src={imageUrl}
            alt={name}
            height={36}
            width={120}
            className="h-6 w-auto object-contain opacity-60 grayscale transition hover:opacity-100 sm:h-7"
            priority
          />
        ))}
      </div>
    </div>
  );
};
