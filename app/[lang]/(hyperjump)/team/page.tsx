import { BreadcrumbJsonLd, ProfilePageJsonLd } from "next-seo";

import data from "@/data.json";
import { dynamicOpengraph } from "@/lib/default-metadata";
import {
  supportedLanguages,
  type SupportedLanguage
} from "@/locales/.generated/types";
import {
  mainTeamDesc,
  mainOurTeam,
  mainExpertIn,
  mainHome,
  mainTeamLabel
} from "@/locales/.generated/strings";

import { AnimatedLines } from "../components/animated-lines";

import { TeamCard } from "./card";
import { team } from "./data";
import { TeamLinkedInMoreCard } from "./linkedin-more-card";
import { Typewriter } from "./typewriter";

export async function generateMetadata(props: { params: Promise<LangProps> }) {
  const { lang } = await props.params;
  return dynamicOpengraph({
    title: `${mainOurTeam(lang)} - ${data.title}`
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

/**
 * Team listing page.
 */
export default async function TeamSection({ params }: TeamsProps) {
  const { lang } = await params;
  const founders = team.slice(0, 2);
  const members = team.slice(2);

  return (
    <>
      <section className="bg-hero-premium relative overflow-hidden text-white">
        <div className="hero-glow animate-glow top-1/4 left-1/2 -translate-x-1/2" />
        <div className="hero-glow animate-glow -top-32 right-0 [animation-delay:1.5s]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />
        <AnimatedLines className="pointer-events-none absolute inset-0 h-full w-full opacity-30" />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 pt-40 pb-20 md:px-20 md:pt-52 md:pb-28 xl:px-0">
          <div className="max-w-4xl text-center">
            <span className="mb-5 inline-block text-xs font-semibold tracking-[0.2em] text-yellow-300 uppercase">
              {mainOurTeam(lang)}
            </span>
            <h1 className="mb-6 text-5xl leading-[1.08] font-semibold tracking-tight md:text-7xl lg:text-[5.25rem]">
              {mainExpertIn(lang)} <Typewriter />
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
            <TeamLinkedInMoreCard variant="compact" lang={lang} />
          </div>
        </div>
      </section>
      <JsonLd lang={lang} />
    </>
  );
}

/**
 * JSON-LD metadata for team profiles and breadcrumbs.
 */
function JsonLd({ lang }: LangProps) {
  const { url } = data;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            name: mainHome(lang),
            item: `${url}/${lang}`
          },
          {
            name: mainTeamLabel(lang),
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
