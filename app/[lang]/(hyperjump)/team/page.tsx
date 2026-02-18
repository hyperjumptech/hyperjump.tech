import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { BreadcrumbJsonLd, ProfilePageJsonLd } from "next-seo";

import { Button } from "@/components/ui/button";
import data from "@/data.json";
import { dynamicOpengraph } from "@/lib/default-metadata";
import {
  supportedLanguages,
  type SupportedLanguage
} from "@/locales/.generated/types";
import { mainTeamDesc, mainTeamHeading } from "@/locales/.generated/strings";

import { TeamCard } from "./card";
import { team } from "./data";
import { Typewriter } from "./typewriter";

export async function generateMetadata() {
  return dynamicOpengraph({
    title: `Meet Our Team - ${data.title}`
  });
}

export async function generateStaticParams() {
  return supportedLanguages.map((lang) => ({ lang }));
}

type LangProps = {
  lang: SupportedLanguage;
};

type TeamsProps = {
  params: Promise<LangProps>;
};

export default async function TeamSection({ params }: TeamsProps) {
  const { lang } = await params;
  const founders = team.slice(0, 2);
  const members = team.slice(2);

  return (
    <>
      <section className="bg-hero-premium relative overflow-hidden text-white">
        <div className="hero-glow animate-glow top-1/4 left-1/2 -translate-x-1/2" />
        <div className="hero-glow animate-glow -top-32 right-0 [animation-delay:1.5s]" />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 pt-40 pb-20 md:px-20 md:pt-52 md:pb-28 xl:px-0">
          <div className="max-w-4xl text-center">
            <span className="mb-5 inline-block text-xs font-semibold tracking-[0.2em] text-yellow-300 uppercase">
              Our Team
            </span>
            <h1 className="mb-6 text-5xl leading-[1.08] font-semibold tracking-tight md:text-7xl lg:text-[5.25rem]">
              Expert in <Typewriter />
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-white/70 md:text-xl">
              {mainTeamDesc(lang)}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-20 xl:px-0">
          <div className="mb-16 grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
            {founders.map((founder) => (
              <TeamCard key={founder.name} variant="featured" {...founder} />
            ))}
          </div>

          <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-4">
            {members
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((member) => (
                <TeamCard key={member.name} variant="compact" {...member} />
              ))}
          </div>

          <div className="mt-12 flex w-full items-center justify-center">
            <Button
              variant="outline"
              className="text-hyperjump-blue border-hyperjump-blue/20 hover:bg-hyperjump-blue h-11 rounded-full px-8 font-semibold transition-all duration-200 hover:scale-[1.02] hover:text-white"
              asChild>
              <Link
                href="https://www.linkedin.com/company/hyperjump"
                target="_blank"
                rel="noreferrer noopener">
                And more
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <JsonLd lang={lang} />
    </>
  );
}

function JsonLd({ lang }: LangProps) {
  const { url } = data;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            name: "Home",
            item: `${url}/${lang}`
          },
          {
            name: "Team",
            item: `${url}/${lang}/team`
          }
        ]}
      />
      {team.map(({ description, image, linkedIn, name }) => (
        <ProfilePageJsonLd
          key={name}
          mainEntity={{
            name,
            description,
            image: `${url}/images/teams/${image}`,
            sameAs: linkedIn
          }}
        />
      ))}
    </>
  );
}
