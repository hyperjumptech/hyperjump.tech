"use client";

import { caseStudies } from "@/locales/.generated/server";
import { SupportedLanguage } from "@/locales/.generated/types";
import { getServices } from "./get-services";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function CaseStudies({ lang }: { lang: SupportedLanguage }) {
  const services = getServices(lang).filter((s) => s.narative.length > 0);

  const [selectedServiceCaseStudy, setSelectedServiceCaseStudy] = useState(
    services[0].title
  );

  return (
    <section className="w-full bg-white px-4 pt-4 sm:pt-0 xl:pt-16">
      <div className="container mx-auto w-full max-w-7xl text-black">
        <h1 className="my-4 mb-8 text-2xl leading-tight font-bold xl:text-5xl">
          {caseStudies(lang)}
        </h1>
        <div>
          <div className="space-y-2 space-x-2">
            {services.map((s, i) => {
              return (
                <button
                  onClick={() => setSelectedServiceCaseStudy(s.title)}
                  className={cn(
                    "rounded-full px-4 py-1 transition-all duration-150",
                    selectedServiceCaseStudy &&
                      selectedServiceCaseStudy === s.title
                      ? "bg-smdd-red text-white"
                      : "bg-slate-100"
                  )}
                  key={i}>
                  {s.title}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-8 rounded-md border p-4 pl-8">
          <div
            className="space-y-4 [&_b]:mt-4 [&_b]:block"
            dangerouslySetInnerHTML={{
              __html:
                services.find((s) => s.title === selectedServiceCaseStudy)
                  ?.narative || ""
            }}
          />
        </div>
      </div>
    </section>
  );
}
