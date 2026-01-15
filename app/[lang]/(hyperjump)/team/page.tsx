import type { Metadata } from "next";
import data from "@/data.json";
import { dynamicOpengraph } from "@/lib/default-metadata";
import {
  supportedLanguages,
  type SupportedLanguage
} from "@/locales/.generated/types";
import { TeamCard } from "../components/team-card";
import { getTeams } from "./data";
import { mainTeamDesc, mainTeamHeading } from "@/locales/.generated/strings";

export const generateStaticParams = async () => {
  return supportedLanguages.map((lang) => ({ lang }));
};
type TeamsProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export async function generateMetadata() {
  const { title, description } = data;

  const meta: Metadata = {
    title: `Meet Our Team – ${title}`,
    description: description
  };

  return dynamicOpengraph(meta);
}

export default async function TeamSection({ params }: TeamsProps) {
  const { lang } = await params;
  const teams = getTeams();

  const featuredTeams = teams.slice(0, 2);
  const otherTeams = teams.slice(2);

  return (
    <section className="py-24 md:py-32">
      <section className="mx-auto max-w-6xl px-4 md:-mt-5 md:px-20 xl:px-0">
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-3xl font-medium text-[#020F15] md:text-4xl">
            {mainTeamHeading(lang)}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#73767E]">
            {mainTeamDesc(lang)}
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
          {featuredTeams.map((member, i) => (
            <TeamCard key={member.name ?? i} variant="featured" {...member} />
          ))}
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-4">
          {otherTeams.map((member, i) => (
            <TeamCard key={member.name ?? i} variant="compact" {...member} />
          ))}
        </div>
      </section>
    </section>
  );
}
