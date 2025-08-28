import { notFound } from "next/navigation";
import { supportedLanguages } from "@/locales/.generated/types";
import { data } from "../data";

type Params = { id?: string; lang: string };

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
  const { id } = await params;
  const job = data.jobs.find((job) => job.id === id);
  if (!job) {
    notFound();
  }

  return (
    <section className="container mx-auto max-w-5xl border-b px-4 py-8 pt-20 text-black md:px-20 xl:px-0">
      <div className="flex flex-col space-y-8 py-12">
        <div>
          <p className="text-gray-500">{job.category}</p>
          <h1 className="text-5xl font-bold text-gray-800">{job.title}</h1>
          <p className="mt-4 leading-normal text-gray-800">{job.description}</p>
        </div>
        <div className="flex flex-col space-y-4">
          {["Responsibilities", "Requirements", "Deliverables"].map(
            (title, i) => {
              return (
                <div key={i} className="flex flex-col space-y-2">
                  <h2 className="text-2xl font-bold">{title}</h2>
                  <ul className="list-disc">
                    {(job[title.toLowerCase() as never] as string[]).map(
                      (item, i) => {
                        return <li key={i}>{item}</li>;
                      }
                    )}
                  </ul>
                </div>
              );
            }
          )}
        </div>
        <a
          href={`mailto:job@hyperjump.tech?subject=Apply for ${job.title}`}
          className="self-start rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow-sm hover:bg-gray-100">
          Apply
        </a>
      </div>
    </section>
  );
}
