import { notFound } from "next/navigation";
import { BreadcrumbJsonLd, JobPostingJsonLd } from "next-seo";

import dataJson from "@/data.json";
import {
  mainApply,
  mainApplyFor,
  mainDeliverables,
  mainHome,
  mainJobsLabel,
  mainRequirements,
  mainResponsibilities
} from "@/locales/.generated/strings";
import {
  type SupportedLanguage,
  supportedLanguages
} from "@/locales/.generated/types";

import { data, type Job } from "../data";

type Params = { id?: string; lang: SupportedLanguage };

export const generateStaticParams = async () => {
  return data.jobs.reduce<Params[]>(
    (acc, { id }) => [
      ...acc,
      ...supportedLanguages.map((lang) => ({ id, lang }))
    ],
    []
  );
};

type JobDetailProps = { params: Promise<Required<Params>> };

export default async function JobDetail({ params }: JobDetailProps) {
  const { id, lang } = await params;
  const job = data.jobs.find((job) => job.id === id);
  if (!job) {
    notFound();
  }

  const { category, description, title } = job;

  const sections = [
    { key: "responsibilities", label: mainResponsibilities(lang) },
    { key: "requirements", label: mainRequirements(lang) },
    { key: "deliverables", label: mainDeliverables(lang) }
  ];

  return (
    <section className="container mx-auto max-w-5xl border-b px-4 py-8 pt-20 text-black md:px-20 xl:px-0">
      <div className="flex flex-col space-y-8 py-12" data-testid="job-detail">
        <div>
          <p className="text-gray-500">{category}</p>
          <h1 className="text-5xl font-bold text-gray-800">{title}</h1>
          <p className="mt-4 leading-normal text-gray-800">{description}</p>
        </div>
        <div className="flex flex-col space-y-4">
          {sections.map(({ key, label }) => {
            return (
              <div key={key} className="flex flex-col space-y-2">
                <h2 className="text-2xl font-bold">{label}</h2>
                <ul className="list-disc">
                  {(job[key as keyof Job] as string[]).map((item, i) => {
                    return <li key={i}>{item}</li>;
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        <a
          href={`mailto:job@hyperjump.tech?subject=${mainApplyFor(lang)} ${title}`}
          className="self-start rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow-sm hover:bg-gray-100">
          {mainApply(lang)}
        </a>
      </div>
      <JsonLd lang={lang} job={job} />
    </section>
  );
}

type JsonLdProps = {
  lang: SupportedLanguage;
  job: Job;
};

function JsonLd({
  lang,
  job: { description, id, responsibilities, requirements, deliverables, title }
}: JsonLdProps) {
  const { url, title: siteTitle } = dataJson;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            name: mainHome(lang),
            item: `${url}/${lang}`
          },
          {
            name: mainJobsLabel(lang),
            item: `${url}/${lang}/jobs`
          },
          {
            name: title,
            item: `${url}/${lang}/jobs/${id}`
          }
        ]}
      />
      <JobPostingJsonLd
        applicantLocationRequirements={{ name: "Worldwide" }}
        datePosted="2026-02-11"
        description={`
          <p>${description}</p>
          <h2>${mainResponsibilities(lang)}</h2>
          <ul>${responsibilities.map((r) => `<li>${r}</li>`).join("")}</ul>
          <h2>${mainRequirements(lang)}</h2>
          <ul>${requirements.map((r) => `<li>${r}</li>`).join("")}</ul>
          <h2>${mainDeliverables(lang)}</h2>
          <ul>${deliverables.map((d) => `<li>${d}</li>`).join("")}</ul>
        `}
        employmentType="FULL_TIME"
        hiringOrganization={{
          name: siteTitle,
          sameAs: url,
          logo: `${url}/images/hyperjump-colored.png`
        }}
        jobLocationType="TELECOMMUTE"
        title={title}
      />
    </>
  );
}
