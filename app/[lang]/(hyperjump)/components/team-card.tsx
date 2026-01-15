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

const CARD_HEIGHT_FEATURED = 680;
const CARD_HEIGHT_COMPACT = 640;

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
    <div>
      <div
        className={`flex flex-col rounded-xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg ${isFeatured ? "h-auto md:h-[680px]" : "h-auto md:h-[640px]"} `}>
        <div
          className={`relative w-full overflow-hidden rounded-t-xl bg-gray-100 ${
            isFeatured ? "h-[400px] md:h-[440px]" : "h-[400px] md:h-[320px]"
          }`}>
          <Image
            src={`/images/teams/${imageSrc}`}
            alt={name}
            fill
            sizes={
              isFeatured
                ? "(min-width: 768px) 50vw, 100vw"
                : "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
            }
            className="object-cover grayscale"
          />
        </div>

        <div
          className={`flex flex-1 flex-col justify-between ${
            isFeatured ? "p-6" : "p-4"
          }`}>
          <div>
            <h3 className="text-base font-semibold text-[#020F15]">{name}</h3>
            <p className="text-sm text-[#73767E]">{role}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#73767E]">
              {description}
            </p>
          </div>

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
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
