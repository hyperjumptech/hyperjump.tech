import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  caseStudyButton,
  caseStudyCategory,
  caseStudyErpFisheriesOverviewTitle,
  caseStudyErpFisheriesOverviewText,
  caseStudyErpFisheriesOverviewDesc,
  caseStudyErpFisheriesChallengeTitle,
  caseStudyErpFisheriesChallenge1,
  caseStudyErpFisheriesChallenge2,
  caseStudyErpFisheriesChallenge3,
  caseStudyErpFisheriesChallenge4,
  caseStudyErpFisheriesApproachTitle,
  caseStudyErpFisheriesApproachDesc,
  caseStudyErpFisheriesAgileTitle,
  caseStudyErpFisheriesAgile1,
  caseStudyErpFisheriesAgile2,
  caseStudyErpFisheriesLaunchTitle,
  caseStudyErpFisheriesLaunch1,
  caseStudyErpFisheriesLaunch2,
  caseStudyErpFisheriesEngineeringTitle,
  caseStudyErpFisheriesEngineering1,
  caseStudyErpFisheriesEngineering2,
  caseStudyErpFisheriesEngineering3,
  caseStudyErpFisheriesFullSystemRolloutsTitle,
  caseStudyErpFisheriesFullSystemRollouts1,
  caseStudyErpFisheriesFullSystemRollouts2,
  caseStudyErpFisheriesKeyLearningsTitle,
  caseStudyErpFisheriesKeyLearnings1,
  caseStudyErpFisheriesKeyLearnings2,
  caseStudyErpFisheriesKeyLearnings3,
  caseStudyErpFisheriesKeyLearnings4,
  caseStudyErpFisheriesResultsText,
  caseStudyErpFisheriesResultsDesc,
  caseStudyErpFisheriesResultsTitle,
  caseStudyErpFisheriesMore,
  caseStudyErpFisheriesWhatIsNextTitle,
  caseStudyErpFisheriesWhatIsNextDesc
} from "@/locales/.generated/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCaseStudies } from "../../components/data";
import Image from "next/image";
import { CTACaseStudies } from "../../components/cta-case-studies";

export const generateStaticParams = async () => {
  return [{ lang: "en" }, { lang: "id" }];
};

type erpProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function ErpFisheriesPage({ params }: erpProps) {
  return <Home lang={(await params).lang} />;
}

function Home({ lang }: { lang: SupportedLanguage }) {
  return (
    <main className="mx-auto flex w-full flex-col items-center justify-center px-4 py-12 text-center md:px-20 xl:px-0">
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center">
        {/* Overview */}
        <div className="text-hyperjump-black py-4 text-left">
          <h3 className="mb-2 text-2xl font-semibold capitalize md:text-[28px]">
            {caseStudyErpFisheriesOverviewTitle(lang)}
          </h3>
          <div
            className="mb-2 text-lg"
            dangerouslySetInnerHTML={{
              __html: caseStudyErpFisheriesOverviewText(lang)
            }}
          />
          <div
            className="text-lg"
            dangerouslySetInnerHTML={{
              __html: caseStudyErpFisheriesOverviewDesc(lang)
            }}
          />
        </div>

        {/* The Challenge */}
        <div className="text-hyperjump-black py-4 text-left">
          <h3 className="mb-2 text-2xl font-semibold capitalize md:text-[28px]">
            {caseStudyErpFisheriesChallengeTitle(lang)}
          </h3>
          <ul
            className="list-disc pl-5"
            dangerouslySetInnerHTML={{
              __html: [
                caseStudyErpFisheriesChallenge1,
                caseStudyErpFisheriesChallenge2,
                caseStudyErpFisheriesChallenge3,
                caseStudyErpFisheriesChallenge4
              ]
                .map(
                  (point, index) =>
                    `<li key=${index} className="mb-2 text-lg">${point(lang)}</li>`
                )
                .join("")
            }}
          />
        </div>

        {/* Our Approach */}
        <div className="text-hyperjump-black pt-4 text-left">
          <h3 className="mb-2 text-2xl font-semibold capitalize md:text-[28px]">
            {caseStudyErpFisheriesApproachTitle(lang)}
          </h3>
          <div
            className="mb-2 text-lg"
            dangerouslySetInnerHTML={{
              __html: caseStudyErpFisheriesApproachDesc(lang)
            }}
          />
        </div>

        {/* Agile Overhaul */}
        <div className="text-hyperjump-black text-left">
          <h3 className="mb-2 text-lg font-semibold capitalize md:text-[22px]">
            {caseStudyErpFisheriesAgileTitle(lang)}
          </h3>
          <ul
            className="list-disc pl-5"
            dangerouslySetInnerHTML={{
              __html: [caseStudyErpFisheriesAgile1, caseStudyErpFisheriesAgile2]
                .map(
                  (point, index) =>
                    `<li key=${index} className="mb-2 text-lg">${point(lang)}</li>`
                )
                .join("")
            }}
          />
        </div>

        {/* From Zero to Launch */}
        <div className="text-hyperjump-black text-left">
          <h3 className="mb-2 text-lg font-semibold capitalize md:text-[22px]">
            {caseStudyErpFisheriesLaunchTitle(lang)}
          </h3>
          <ul
            className="list-disc pl-5"
            dangerouslySetInnerHTML={{
              __html: [
                caseStudyErpFisheriesLaunch1,
                caseStudyErpFisheriesLaunch2
              ]
                .map(
                  (point, index) =>
                    `<li key=${index} className="mb-2 text-lg">${point(lang)}</li>`
                )
                .join("")
            }}
          />
        </div>

        {/* Engineering Maturity */}
        <div className="text-hyperjump-black text-left">
          <h3 className="mb-2 text-lg font-semibold capitalize md:text-[22px]">
            {caseStudyErpFisheriesEngineeringTitle(lang)}
          </h3>
          <ul
            className="list-disc pl-5"
            dangerouslySetInnerHTML={{
              __html: [
                caseStudyErpFisheriesEngineering1,
                caseStudyErpFisheriesEngineering2,
                caseStudyErpFisheriesEngineering3
              ]
                .map(
                  (point, index) =>
                    `<li key=${index} className="mb-2 text-lg">${point(lang)}</li>`
                )
                .join("")
            }}
          />
        </div>

        {/* Full-System Rollouts */}
        <div className="text-hyperjump-black text-left">
          <h3 className="mb-2 text-lg font-semibold capitalize md:text-[22px]">
            {caseStudyErpFisheriesFullSystemRolloutsTitle(lang)}
          </h3>
          <ul
            className="list-disc pl-5"
            dangerouslySetInnerHTML={{
              __html: [
                caseStudyErpFisheriesFullSystemRollouts1,
                caseStudyErpFisheriesFullSystemRollouts2
              ]
                .map(
                  (point, index) =>
                    `<li key=${index} className="mb-2 text-lg">${point(lang)}</li>`
                )
                .join("")
            }}
          />
        </div>

        {/* Key Learnings */}
        <div className="text-hyperjump-black py-4 text-left">
          <h3 className="mb-2 text-2xl font-semibold capitalize md:text-[28px]">
            {caseStudyErpFisheriesKeyLearningsTitle(lang)}
          </h3>
          <ul
            className="list-disc pl-5"
            dangerouslySetInnerHTML={{
              __html: [
                caseStudyErpFisheriesKeyLearnings1,
                caseStudyErpFisheriesKeyLearnings2,
                caseStudyErpFisheriesKeyLearnings3,
                caseStudyErpFisheriesKeyLearnings4
              ]
                .map(
                  (point, index) =>
                    `<li key=${index} className="mb-2 text-lg">${point(lang)}</li>`
                )
                .join("")
            }}
          />
        </div>

        {/* Results */}
        <div className="text-hyperjump-black py-4 text-left">
          <h3 className="mb-2 text-2xl font-semibold capitalize md:text-[28px]">
            {caseStudyErpFisheriesResultsTitle(lang)}
          </h3>
          <div
            className="mb-2 text-lg"
            dangerouslySetInnerHTML={{
              __html: caseStudyErpFisheriesResultsText(lang)
            }}
          />
          <div
            className="mb-4 text-lg"
            dangerouslySetInnerHTML={{
              __html: caseStudyErpFisheriesResultsDesc(lang)
            }}
          />
          <Image
            src="/images/case-studies/erp-fisheries.png"
            alt={caseStudyErpFisheriesResultsText(lang)}
            className="h-auto w-full rounded-2xl"
            width={660}
            height={400}
          />
        </div>

        {/* What’s Next */}
        <div className="text-hyperjump-black pt-4 text-left">
          <h3 className="mb-2 text-2xl font-semibold capitalize md:text-[28px]">
            {caseStudyErpFisheriesWhatIsNextTitle(lang)}
          </h3>
          <div
            className="mb-2 text-lg"
            dangerouslySetInnerHTML={{
              __html: caseStudyErpFisheriesWhatIsNextDesc(lang)
            }}
          />
        </div>
      </section>

      <div className="hidden md:flex">
        <CaseStudies lang={lang} />
      </div>
      <CTACaseStudies lang={lang} />
    </main>
  );
}

function CaseStudies({ lang }: { lang: SupportedLanguage }) {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-hyperjump-black mb-5 text-2xl font-semibold capitalize md:text-4xl">
          {caseStudyErpFisheriesMore(lang)}
        </h1>
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

              <Button
                asChild
                variant="outline"
                className="text-hyperjump-blue hover:bg-hyperjump-blue mt-4 w-full border-gray-300 hover:text-white">
                <Link href={study.url}>{caseStudyButton(lang)}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
