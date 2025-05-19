import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  caseStudyButton,
  caseStudyCategory,
  caseStudyCtoaasMediaOverviewTitle,
  caseStudyCtoaasMediaOverviewDesc,
  caseStudyCtoaasMediaChallengeTitle,
  caseStudyCtoaasMediaChallenge1,
  caseStudyCtoaasMediaChallenge2,
  caseStudyCtoaasMediaChallenge3,
  caseStudyCtoaasMediaChallenge4,
  caseStudyCtoaasMediaApproachTitle,
  caseStudyCtoaasMediaApproachDesc,
  caseStudyCtoaasMediaAgileTitle,
  caseStudyCtoaasMediaAgile1,
  caseStudyCtoaasMediaAgile2,
  caseStudyCtoaasMediaCiCdTitle,
  caseStudyCtoaasMediaCiCd1,
  caseStudyCtoaasMediaCiCd2,
  caseStudyCtoaasMediaQaTitle,
  caseStudyCtoaasMediaQa1,
  caseStudyCtoaasMediaQa2,
  caseStudyCtoaasMediaKpiTitle,
  caseStudyCtoaasMediaKpi1,
  caseStudyCtoaasMediaKpi2,
  caseStudyCtoaasMediaKeyLearningsTitle,
  caseStudyCtoaasMediaKeyLearnings1,
  caseStudyCtoaasMediaKeyLearnings2,
  caseStudyCtoaasMediaKeyLearnings3,
  caseStudyCtoaasMediaKeyLearnings4,
  caseStudyCtoaasMediaResultsText,
  caseStudyCtoaasMediaResultsDesc,
  caseStudyCtoaasMediaResultsTitle,
  caseStudyErpFisheriesMore,
  caseStudyCtoaasMediaChallenge5,
  caseStudyCtoaasMediaChallenge6,
  caseStudyCtoaasMediaAgile3,
  caseStudyCtoaasMediaCiCd3,
  caseStudyCtoaasMediaKpi3,
  caseStudyCtoaasMediaKeyLearnings5,
  caseStudyCtoaasMediaKeyLearnings6,
  caseStudyCtoaasMediaKeyLearnings7,
  caseStudyCtoaasMediaCentralizedTitle,
  caseStudyCtoaasMediaCentralized1,
  caseStudyCtoaasMediaCentralized2
} from "@/locales/.generated/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCaseStudies } from "../../components/data";
import Image from "next/image";
import { CTACaseStudies } from "../../components/cta-case-studies";

export const generateStaticParams = async () => {
  return [{ lang: "en" }, { lang: "id" }];
};

type ctoaasMediaProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function CtoaasMediaPage({ params }: ctoaasMediaProps) {
  return <Home lang={(await params).lang} />;
}

function Home({ lang }: { lang: SupportedLanguage }) {
  return (
    <main className="mx-auto flex w-full flex-col items-center justify-center px-4 py-12 text-center md:px-20 xl:px-0">
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center">
        {/* Overview */}
        <div className="text-hyperjump-black py-4 text-left">
          <h3 className="mb-2 text-2xl font-semibold capitalize md:text-[28px]">
            {caseStudyCtoaasMediaOverviewTitle(lang)}
          </h3>
          <div
            className="text-lg"
            dangerouslySetInnerHTML={{
              __html: caseStudyCtoaasMediaOverviewDesc(lang)
            }}
          />
        </div>

        {/* The Challenge */}
        <div className="text-hyperjump-black py-4 text-left">
          <h3 className="mb-2 text-2xl font-semibold capitalize md:text-[28px]">
            {caseStudyCtoaasMediaChallengeTitle(lang)}
          </h3>
          <ul
            className="list-disc pl-5"
            dangerouslySetInnerHTML={{
              __html: [
                caseStudyCtoaasMediaChallenge1,
                caseStudyCtoaasMediaChallenge2,
                caseStudyCtoaasMediaChallenge3,
                caseStudyCtoaasMediaChallenge4,
                caseStudyCtoaasMediaChallenge5,
                caseStudyCtoaasMediaChallenge6
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
            {caseStudyCtoaasMediaApproachTitle(lang)}
          </h3>
          <div
            className="mb-2 text-lg"
            dangerouslySetInnerHTML={{
              __html: caseStudyCtoaasMediaApproachDesc(lang)
            }}
          />
        </div>

        {/*  Agile Implementation  */}
        <div className="text-hyperjump-black text-left">
          <h3 className="mb-2 text-lg font-semibold capitalize md:text-[22px]">
            {caseStudyCtoaasMediaAgileTitle(lang)}
          </h3>
          <ul
            className="list-disc pl-5"
            dangerouslySetInnerHTML={{
              __html: [
                caseStudyCtoaasMediaAgile1,
                caseStudyCtoaasMediaAgile2,
                caseStudyCtoaasMediaAgile3
              ]
                .map(
                  (point, index) =>
                    `<li key=${index} className="mb-2 text-lg">${point(lang)}</li>`
                )
                .join("")
            }}
          />
        </div>

        {/* CI/CD Transformation  */}
        <div className="text-hyperjump-black text-left">
          <h3 className="mb-2 text-lg font-semibold capitalize md:text-[22px]">
            {caseStudyCtoaasMediaCiCdTitle(lang)}
          </h3>
          <ul
            className="list-disc pl-5"
            dangerouslySetInnerHTML={{
              __html: [
                caseStudyCtoaasMediaCiCd1,
                caseStudyCtoaasMediaCiCd2,
                caseStudyCtoaasMediaCiCd3
              ]
                .map(
                  (point, index) =>
                    `<li key=${index} className="mb-2 text-lg">${point(lang)}</li>`
                )
                .join("")
            }}
          />
        </div>

        {/* Quality Assurance Reinforcement  */}
        <div className="text-hyperjump-black text-left">
          <h3 className="mb-2 text-lg font-semibold capitalize md:text-[22px]">
            {caseStudyCtoaasMediaQaTitle(lang)}
          </h3>
          <ul
            className="list-disc pl-5"
            dangerouslySetInnerHTML={{
              __html: [caseStudyCtoaasMediaQa1, caseStudyCtoaasMediaQa2]
                .map(
                  (point, index) =>
                    `<li key=${index} className="mb-2 text-lg">${point(lang)}</li>`
                )
                .join("")
            }}
          />
        </div>

        {/* KPI-Driven Growth  */}
        <div className="text-hyperjump-black text-left">
          <h3 className="mb-2 text-lg font-semibold capitalize md:text-[22px]">
            {caseStudyCtoaasMediaKpiTitle(lang)}
          </h3>
          <ul
            className="list-disc pl-5"
            dangerouslySetInnerHTML={{
              __html: [
                caseStudyCtoaasMediaKpi1,
                caseStudyCtoaasMediaKpi2,
                caseStudyCtoaasMediaKpi3
              ]
                .map(
                  (point, index) =>
                    `<li key=${index} className="mb-2 text-lg">${point(lang)}</li>`
                )
                .join("")
            }}
          />
        </div>

        {/* Centralized Feedback Handling  */}
        <div className="text-hyperjump-black text-left">
          <h3 className="mb-2 text-lg font-semibold capitalize md:text-[22px]">
            {caseStudyCtoaasMediaCentralizedTitle(lang)}
          </h3>
          <ul
            className="list-disc pl-5"
            dangerouslySetInnerHTML={{
              __html: [
                caseStudyCtoaasMediaCentralized1,
                caseStudyCtoaasMediaCentralized2
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
            {caseStudyCtoaasMediaKeyLearningsTitle(lang)}
          </h3>
          <ul
            className="list-disc pl-5"
            dangerouslySetInnerHTML={{
              __html: [
                caseStudyCtoaasMediaKeyLearnings1,
                caseStudyCtoaasMediaKeyLearnings2,
                caseStudyCtoaasMediaKeyLearnings3,
                caseStudyCtoaasMediaKeyLearnings4,
                caseStudyCtoaasMediaKeyLearnings5,
                caseStudyCtoaasMediaKeyLearnings6,
                caseStudyCtoaasMediaKeyLearnings7
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
            {caseStudyCtoaasMediaResultsTitle(lang)}
          </h3>
          <div
            className="mb-2 text-lg"
            dangerouslySetInnerHTML={{
              __html: caseStudyCtoaasMediaResultsText(lang)
            }}
          />
          <Image
            src="/images/case-studies/ctoaas-media.png"
            alt={caseStudyCtoaasMediaResultsTitle(lang)}
            className="h-auto w-full rounded-2xl"
            width={660}
            height={400}
          />
          <div
            className="mt-4 text-lg"
            dangerouslySetInnerHTML={{
              __html: caseStudyCtoaasMediaResultsDesc(lang)
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
