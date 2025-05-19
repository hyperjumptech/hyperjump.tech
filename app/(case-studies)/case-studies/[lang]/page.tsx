import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  caseStudyExplore,
  caseStudyCategory
} from "@/locales/.generated/server";
import { getCaseStudies } from "../components/data";
import { CaseStudyButton } from "../components/button";
import { CTACaseStudies } from "../components/cta-case-studies";

export const generateStaticParams = async () => {
  return [{ lang: "en" }, { lang: "id" }];
};

type CaseStudyProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function CaseStudiesPage({ params }: CaseStudyProps) {
  return <Home lang={(await params).lang} />;
}

function Home({ lang }: { lang: SupportedLanguage }) {
  return (
    <main className="xxl:max-w-7xl mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center px-4 text-center md:px-20 md:py-12 xl:px-0">
      <h3 className="text-hyperjump-black w-72 text-[34px] font-medium md:w-full md:text-[40px]">
        {caseStudyExplore(lang)}
      </h3>
      <CaseStudies lang={lang} />
      <CTACaseStudies lang={lang} />
    </main>
  );
}

function CaseStudies({ lang }: { lang: SupportedLanguage }) {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-2">
          {getCaseStudies(lang).map((study, index) => (
            <div
              key={index}
              className="flex h-full flex-col justify-between rounded-xl border border-gray-200 p-6 text-left shadow-sm transition duration-300 hover:shadow-md">
              <div>
                <span className="mb-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                  {caseStudyCategory(lang)}
                </span>
                <h3 className="text-hyperjump-black mb-2 text-lg font-semibold md:text-[22px]">
                  {study.title}
                </h3>
                <p className="text-hyperjump-gray mb-4 text-sm md:text-base">
                  {study.description}
                </p>
              </div>

              <CaseStudyButton url={study.url} lang={lang} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
