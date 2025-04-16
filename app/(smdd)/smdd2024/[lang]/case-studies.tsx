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
    <section className="bg-white w-full pt-4 sm:pt-0 xl:pt-16 px-4">
      <div className="w-full max-w-7xl mx-auto text-black container">
        <h1 className="my-4 xl:text-5xl text-2xl font-bold leading-tight mb-8">
          {caseStudies(lang)}
        </h1>
        <div>
          <div className="space-x-2 space-y-2">
            {services.map((s, i) => {
              return (
                <button
                  onClick={() => setSelectedServiceCaseStudy(s.title)}
                  className={cn(
                    "px-4 py-1 transition-all duration-150 rounded-full",
                    selectedServiceCaseStudy &&
                      selectedServiceCaseStudy === s.title
                      ? "bg-smdd-red text-white"
                      : "bg-slate-100"
                  )}
                  key={i}
                >
                  {s.title}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-8 border p-4 pl-8 rounded-md">
          <div
            className="space-y-4 [&_b]:mt-4 [&_b]:block"
            dangerouslySetInnerHTML={{
              __html:
                services.find((s) => s.title === selectedServiceCaseStudy)
                  ?.narative || "",
            }}
          />
        </div>
      </div>
    </section>
  );
}
