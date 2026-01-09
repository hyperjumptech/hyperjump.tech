import Image from "next/image";

interface TeamCardProps {
  variant?: "featured" | "compact";
  name: string;
  role: string;
  image?: string;
  description: string;
  linkedIn?: string;
}

const FALLBACK_IMAGE = "/images/no-user-image.webp";

const FEATURED_CARD_HEIGHT = 640;
const COMPACT_CARD_HEIGHT = 520;

export function TeamCard({
  variant = "compact",
  name,
  role,
  image,
  description,
  linkedIn
}: TeamCardProps) {
  const isFeatured = variant === "featured";
  const imageSrc = image && image.trim() !== "" ? image : FALLBACK_IMAGE;

  return (
    <div className="h-full">
      <div
        className="flex h-full flex-col rounded-xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
        style={{
          height: isFeatured ? FEATURED_CARD_HEIGHT : COMPACT_CARD_HEIGHT
        }}>
        <div
          className="relative w-full overflow-hidden rounded-t-xl bg-gray-100"
          style={{
            height: isFeatured ? 420 : 290
          }}>
          <Image
            src={imageSrc}
            alt={name}
            fill
            sizes={isFeatured ? "620px" : "290px"}
            className="object-cover grayscale"
          />
        </div>

        <div className={`flex flex-1 flex-col ${isFeatured ? "p-6" : "p-4"} `}>
          <h3 className="text-base font-semibold text-[#020F15]">{name}</h3>

          <p className="text-sm text-[#73767E]">{role}</p>

          <p className="mt-2 flex-1 text-sm leading-relaxed text-[#73767E]">
            {description}
          </p>

          {linkedIn && (
            <a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#73767E] text-[#73767E] transition-colors hover:border-[#a1cfff] hover:bg-[#a1cfff]">
              <Image
                src="/images/linkedIn.svg"
                alt="LinkedIn"
                width={16}
                height={16}
                className="h-4 w-4"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
