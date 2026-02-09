"use client";

import Image from "next/image";

type Client = {
  name: string;
  imageUrl: string;
};

type ClientsProps = {
  clients: Client[];
};

export function Clients({ clients }: ClientsProps) {
  if (clients.length === 0) return null;

  const repeatedClients = Array(4).fill(clients).flat();

  return (
    <div className="relative overflow-hidden py-6">
      <div className="marquee">
        <div className="marquee__track">
          {repeatedClients.map(({ imageUrl, name }, index) => (
            <Image
              key={`${name}-${index}`}
              src={imageUrl}
              alt={name}
              width={120}
              height={36}
              className="h-6 w-auto object-contain sm:h-7"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
