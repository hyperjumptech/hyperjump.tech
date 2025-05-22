import Image from "next/image";

type Client = {
  imageUrl: string;
  name: string;
};

type ClientsProps = {
  isPriorityLoad?: boolean;
  clients: Client[];
};

export function Clients({
  clients = [],
  isPriorityLoad = false
}: ClientsProps) {
  return (
    <div className="relative px-8 py-4 md:px-20">
      <div className="flex flex-wrap items-center justify-center gap-8">
        {clients.map(({ imageUrl, name }) => (
          <Image
            key={name}
            src={imageUrl}
            alt={name}
            height={36}
            width={120}
            className="h-6 w-auto object-contain opacity-60 grayscale transition hover:opacity-100 sm:h-7"
            priority={isPriorityLoad}
          />
        ))}
      </div>
    </div>
  );
}
