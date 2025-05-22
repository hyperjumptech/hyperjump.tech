import type { SupportedLanguage } from "@/locales/.generated/types";

import { CTACaseStudies } from "../../components/cta-case-studies";
import { getCaseStudies } from "../../components/data";
import { Content } from "./components/content";
import { Recommendation } from "./components/recommendation";

type CaseStudyProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export const generateStaticParams = async () => {
  return [{ lang: "en" }, { lang: "id" }];
};

export default async function CaseStudy({ params }: CaseStudyProps) {
  const { lang } = await params;

  return (
    <>
      <section className="mx-auto max-w-3xl px-4 md:px-20">
        <article className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-md dark:prose-headings:text-white text-left">
          <Content slug="erp-fisheries" lang={lang} />
        </article>
      </section>

      <section className="mt-5 px-4 md:px-20">
        <Recommendation caseStudies={getCaseStudies(lang)} lang={lang} />
      </section>
      <section className="flex justify-center px-4 md:px-20">
        <CTACaseStudies lang={lang} />
      </section>
    </>
  );
}
