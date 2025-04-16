import Image from "next/image";

import GridItemsContainer, {
  GridItemsTitle,
} from "@/app/components/grid-items";
import data from "@/data.json";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Location() {
  const { address, duns, email, imageUrl, mapsUrl, title } = data.location;

  return (
    <GridItemsContainer>
      <GridItemsTitle title="Our Location" layout="vertical" />
      <div className="mt-8 mb-6 w-full grid grid-cols-1 lg:grid-cols-4 rounded overflow-hidden shadow-lg">
        <div className="relative text-white p-6 col-span-1 overflow-hidden">
          <Image
            src="/images/swatch.svg"
            alt="Footer background"
            height={378}
            width={1440}
            className="absolute inset-0 z-0 pointer-events-none select-none"
          />
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(134.7deg, #5954DA 3.43%, #0B0B0D 48.93%)",
            }}
          />
          <div className="relative z-20">
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            <div className="text-sm leading-relaxed mb-2">
              {address.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            <p className="text-sm mb-2 mt-4">
              Email:{" "}
              <a
                href={`mailto:${email}`}
                className="transition-colors hover:text-hyperjump-blue"
              >
                {email}
              </a>
            </p>
            <p className="text-sm mb-4">D&B D-U-N-S: {duns}</p>
            <Button asChild variant="outline" className="bg-transparent">
              <Link href={mapsUrl} target="_blank" rel="noopener noreferrer">
                Open in Google Maps
              </Link>
            </Button>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-3">
          <Image
            src={imageUrl}
            alt={title}
            width={1072}
            height={500}
            className="w-full h-[300px] lg:h-[500px] object-cover object-right lg:object-center"
          />
        </div>
      </div>
    </GridItemsContainer>
  );
}
