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
      <div className="w-full mt-6 flex flex-col md:flex-row rounded-xl overflow-hidden shadow-lg">
        <div
          className="text-white p-6 w-full md:w-[380px]"
          style={{
            background:
              "linear-gradient(134.7deg, #5954DA 3.43%, #0B0B0D 48.93%)",
          }}
        >
          <h2 className="text-lg font-bold mb-4">{location.title}</h2>
          <div className="text-sm leading-relaxed mb-2">
            {location.address.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          <p className="text-sm mb-2">Email: {location.email}</p>
          <p className="text-sm mb-4">D&B D-U-N-S: {location.duns}</p>
          <a
            href={location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-black text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Open in Google Maps
          </a>
        </div>

        <div className="w-full">
          <Image
            src={location.image}
            alt={location.imageAlt}
            width={180}
            height={80}
            className="w-full h-[342px] md:h-[418px] object-cover"
          />
        </div>
      </div>
    </GridItemsContainer>
  );
}
