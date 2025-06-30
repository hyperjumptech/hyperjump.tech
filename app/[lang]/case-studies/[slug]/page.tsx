import Image from "next/image";
import { notFound } from "next/navigation";

import {
  supportedLanguages,
  type SupportedLanguage
} from "@/locales/.generated/types";

import { Content } from "./components/content";
import { Recommendation } from "./components/recommendation";
import { caseStudyBy, getCaseStudies } from "../data";

type Params = { lang: SupportedLanguage; slug: string };

export const generateStaticParams = async () => {
  return getCaseStudies().reduce<Params[]>(
    (acc, { slug }) => [
      ...acc,
      ...supportedLanguages.map((lang) => ({ slug, lang }))
    ],
    []
  );
};

type CaseStudyProps = {
  params: Promise<Params>;
};

export default async function CaseStudy({ params }: CaseStudyProps) {
  const { lang, slug } = await params;
  const caseStudy = caseStudyBy(slug, lang);
  if (!caseStudy) {
    notFound();
  }

  return (
    <main className="bg-white">
      <Hero heading={caseStudy.title} />
      <section className="mx-auto max-w-3xl px-4 md:px-20">
        <article className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-md dark:prose-headings:text-white text-left">
          <Content slug={slug} lang={lang} />
        </article>
      </section>

      <section className="mt-5 px-4 md:px-20">
        <Recommendation
          caseStudies={getCaseStudies(lang).filter(
            (caseStudy) => caseStudy.slug !== slug
          )}
          lang={lang}
        />
      </section>
    </main>
  );
}

function Hero({ heading }: { heading: string }) {
  return (
    <section
      id="hero"
      className="bg-hyperjump-black relative h-[351px] overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        <Image
          alt="Hero background"
          blurDataURL="/images/case-studies/banner.jpg"
          className="object-cover object-center"
          fill
          placeholder="blur"
          priority
          src="/images/case-studies/banner.jpg"
        />
      </div>

      <div className="relative z-10 mt-10 flex h-[351px] items-center justify-center">
        <h1
          className="mb-4 max-w-3xl px-4 text-center text-2xl font-medium text-white sm:text-4xl md:px-20 md:text-[40px]"
          dangerouslySetInnerHTML={{
            __html: heading
          }}
        />
      </div>
    </section>
  );
}
