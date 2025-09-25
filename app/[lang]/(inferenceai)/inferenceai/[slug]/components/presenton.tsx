import { Button } from "@/components/ui/button";
import {
  inferenceaiHeroLabelDemoButton,
  inferenceaiHeroTextDemo,
  inferenceaiHeroUsername,
  inferenceaiHeroPassword
} from "@/locales/.generated/server";
import type { SupportedLanguage } from "@/locales/.generated/types";
import Link from "next/link";

export default function Presenton({
  demoUrl,
  lang,
  slug,
  username,
  password
}: {
  demoUrl: string;
  lang: SupportedLanguage;
  slug: string;
  username: string;
  password: string;
}) {
  return (
    <>
      <Button
        asChild
        variant="default"
        className="mb-3 rounded-full border border-[#6D5697] bg-[radial-gradient(50%_50%_at_50%_50%,_#413AA3_0%,_#332C95_100%),linear-gradient(177.61deg,rgba(255,255,255,0)_2%,rgba(255,255,255,0.12)_98.17%)] font-semibold text-white transition-all hover:bg-white hover:text-gray-300 md:-mt-5">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={demoUrl ?? `/${lang}/inferenceai/${slug}`}>
          {inferenceaiHeroLabelDemoButton(lang)}
        </Link>
      </Button>
      <div className="flex flex-col text-center text-sm md:flex-row md:items-center md:gap-2 md:text-base">
        <div>{inferenceaiHeroTextDemo(lang)}</div>
        <span>
          <b>{inferenceaiHeroUsername(lang)}:</b> {username} &nbsp;|&nbsp;{" "}
          <b>{inferenceaiHeroPassword(lang)}:</b> {password}
        </span>
      </div>
    </>
  );
}
