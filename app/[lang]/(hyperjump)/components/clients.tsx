import Image from "next/image";
import { mainTrustedBy } from "@/locales/.generated/strings";
import type { SupportedLanguage } from "@/locales/.generated/types";

type Client = {
  name: string;
  imageUrl: string;
};

type ClientsProps = {
  clients: Client[];
  lang: SupportedLanguage;
};

export function Clients({ clients, lang }: ClientsProps) {
  if (clients.length === 0) return null;

  const repeatedClients = Array(4).fill(clients).flat();

  return (
    <div className="relative overflow-hidden py-4">
      <p className="mb-5 text-center text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">
        {mainTrustedBy(lang)}
      </p>
      <div className="marquee">
        <div className="marquee__track">
          {repeatedClients.map(({ imageUrl, name }, index) => (
            <Image
              key={`${name}-${index}`}
              src={imageUrl}
              alt={name}
              width={120}
              height={36}
              className="h-5 w-auto object-contain opacity-50 transition-opacity duration-300 hover:opacity-90 sm:h-6"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
