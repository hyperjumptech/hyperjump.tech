import data from "@/data.json";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  return data.jobs.map((job) => ({ id: job.url.split("/").pop() }));
};

export default function JobDetail({ params }: { params: { id: string } }) {
  const job = data.jobs.find((j) => j.url.endsWith(params.id.toLowerCase()));
  if (!job) {
    notFound();
  }
  return (
    <section className="border-b bg-white py-8 text-black">
      <div className="container mx-auto flex  flex-col flex-wrap space-y-8 py-12">
        <div>
          <p className="text-gray-500">{job.category}</p>
          <h1 className="text-5xl font-bold    text-gray-800">{job.title}</h1>
          <p className=" leading-normal text-gray-800">{job.description}</p>
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
          className="self-start rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100">
          Apply
        </a>
      </div>
    </section>
  );
}
