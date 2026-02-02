import data from "@/data.json";
import { dynamicOpengraph } from "@/lib/default-metadata";
import {
  supportedLanguages,
  type SupportedLanguage
} from "@/locales/.generated/types";
import { mainTeamDesc, mainTeamHeading } from "@/locales/.generated/strings";

import { TeamCard } from "./card";
import { team } from "./data";

export async function generateMetadata() {
  return dynamicOpengraph({
    title: `Meet Our Team - ${data.title}`
  });
}

export async function generateStaticParams() {
  return supportedLanguages.map((lang) => ({ lang }));
}

type TeamsProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function TeamSection({ params }: TeamsProps) {
  const { lang } = await params;
  const founders = team.slice(0, 2);
  const members = team.slice(2);

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
      </section>
    </section>
  );
}
