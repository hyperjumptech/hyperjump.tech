import data from "@/data.json";
import GridItemsContainer, {
  GridItemsTitle,
} from "@/app/components/grid-items";
import Image from "next/image";

export default function Location() {
  const { location } = data;

  return (
    <GridItemsContainer>
      <GridItemsTitle title="Our Location" layout="vertical" />
      <div className="my-6 w-full grid grid-cols-1 lg:grid-cols-4 rounded-md overflow-hidden shadow-lg">
        <div className="relative text-white p-6 col-span-1 overflow-hidden">
          <Image
            src="/images/swatch.svg"
            alt="Footer background"
            layout="fill"
            objectFit="cover"
            quality={100}
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
            <h2 className="text-lg font-bold mb-4">{location.title}</h2>
            <div className="text-sm leading-relaxed mb-2">
              {location.address.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            <p className="text-sm mb-2 mt-4">Email: {location.email}</p>
            <p className="text-sm mb-4">D&B D-U-N-S: {location.duns}</p>
            <a
              href={location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-transparent text-white text-sm font-medium px-4 py-2 rounded-md border-white border hover:border-gray-500 transition"
            >
              Open in Google Maps
            </a>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-3">
          <Image
            src={location.image}
            alt={location.imageAlt}
            width={1600}
            height={500}
            className="w-full h-[300px] lg:h-[500px] object-cover object-right lg:object-center"
            priority
          />
        </div>
      </div>
    </GridItemsContainer>
  );
}
