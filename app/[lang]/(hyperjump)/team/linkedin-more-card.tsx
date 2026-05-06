import Image from "next/image";

import type { SupportedLanguage } from "@/locales/.generated/types";

type TeamLinkedInMoreCardProps = {
  /** Match layout of existing team cards. */
  variant: "compact";
  lang: SupportedLanguage;
};

const HYPERJUMP_LINKEDIN_URL = "https://www.linkedin.com/company/hyperjump";

/**
 * A compact “more on LinkedIn” card that matches the team grid styling.
 */
export function TeamLinkedInMoreCard({ variant }: TeamLinkedInMoreCardProps) {
  const isCompact = variant === "compact";

  return (
    <div>
      <a
        href={HYPERJUMP_LINKEDIN_URL}
        target="_blank"
        rel="noreferrer noopener"
        className={`team-card flex h-auto flex-col rounded-xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg ${
          isCompact ? "md:h-160" : ""
        }`}
        aria-label="Find more members of Hyperjump on LinkedIn">
        <div className="team-card-image relative h-100 w-full overflow-hidden rounded-t-xl bg-gray-100 md:h-80">
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#0A66C2]/10">
              <Image
                src="/images/linkedIn.svg"
                alt="LinkedIn"
                width={36}
                height={36}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <h3 className="text-base font-semibold text-[#020F15]">
              Find more members
            </h3>
            <p className="text-sm text-[#73767E]">of Hyperjump on LinkedIn</p>
            <p className="mt-2 text-sm leading-relaxed text-[#73767E]">
              Explore the full team and connect with us.
            </p>
          </div>

          <span className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#73767E] text-[#73767E] transition-colors hover:border-[#a1cfff] hover:bg-[#a1cfff]">
            <Image
              src="/images/linkedIn.svg"
              alt="Hyperjump LinkedIn page"
              width={16}
              height={16}
            />
          </span>
        </div>
      </a>
    </div>
  );
}
