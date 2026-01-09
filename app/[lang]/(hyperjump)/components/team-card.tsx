import Image from "next/image";
import { Linkedin } from "lucide-react";

interface TeamCardProps {
  variant?: "featured" | "compact";
  name: string;
  role: string;
  image?: string;
  description: string;
  linkedIn?: string;
}

const FALLBACK_IMAGE = "/team/placeholder.jpg";
const FEATURED_CARD_HEIGHT = 700;
const COMPACT_CARD_HEIGHT = 560;

const FEATURED_IMAGE_HEIGHT = 520;
const COMPACT_IMAGE_HEIGHT = 290;

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
        className="flex flex-col rounded-xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
        style={{
          width: isFeatured ? 620 : 290,
          height: isFeatured ? FEATURED_CARD_HEIGHT : COMPACT_CARD_HEIGHT,
          opacity: 1
        }}>
        <div
          className="relative w-full overflow-hidden rounded-t-xl bg-gray-100"
          style={{
            height: isFeatured ? FEATURED_IMAGE_HEIGHT : COMPACT_IMAGE_HEIGHT
          }}>
          <Image
            src={imageSrc}
            alt={name}
            fill
            sizes={isFeatured ? "620px" : "290px"}
            className="object-cover grayscale"
          />
        </div>

        <div
          className={`flex flex-1 flex-col ${isFeatured ? "space-y-3 p-6" : "space-y-2 p-4"} `}>
          <h3 className="text-base font-semibold text-[#1F2328]">{name}</h3>

          <p className="text-sm text-[#646D82]">{role}</p>

          <p className="flex-1 text-sm leading-relaxed text-[#646D82]">
            {description}
          </p>

          {linkedIn && (
            <a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-[#646D82] transition-colors hover:text-[#0A66C2]">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
