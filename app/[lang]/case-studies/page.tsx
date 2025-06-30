import {
  supportedLanguages,
  type SupportedLanguage
} from "@/locales/.generated/types";
import {
  caseStudyButton,
  caseStudyExplore,
  caseStudyHeroDesc,
  caseStudyHeroHeading
} from "@/locales/.generated/server";
import { getCaseStudies } from "./data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const generateStaticParams = async () => {
  return supportedLanguages.map((lang) => ({ lang }));
};

type CaseStudyProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function CaseStudiesPage({ params }: CaseStudyProps) {
  const { lang } = await params;

  return (
    <main className="bg-white">
      <Hero lang={lang} />
      <div className="xxl:max-w-7xl mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center px-4 text-center md:px-20 md:py-12 xl:px-0">
        <h3 className="text-hyperjump-black w-72 text-[34px] font-medium md:w-full md:text-[40px]">
          {caseStudyExplore(lang)}
        </h3>
        <CaseStudies lang={lang} />
      </div>
    </main>
  );
}

function Hero({ lang }: { lang: SupportedLanguage }) {
  return (
    <section
      id="hero"
      className="bg-services-hero text-hyperjump-black relative h-[415px] w-full px-4 text-center">
      <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center pt-16">
        <div
          className="text-hyperjump-black mb-4 text-3xl font-medium sm:text-4xl md:text-[40px]"
          dangerouslySetInnerHTML={{
            __html: caseStudyHeroHeading(lang)
          }}
        />
        <p className="text-hyperjump-gray text-base sm:text-lg">
          {caseStudyHeroDesc(lang)}
        </p>
      </div>
    </section>
  );
}

function CaseStudies({ lang }: { lang: SupportedLanguage }) {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-2">
          {getCaseStudies(lang).map(
            ({ category, description, slug, title }) => (
              <div
                key={slug}
                className="flex h-full flex-col justify-between rounded-xl border border-gray-200 p-6 text-left shadow-sm transition duration-300 hover:shadow-md">
                <div>
                  <span className="mb-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                    {category}
                  </span>
                  <h3 className="text-hyperjump-black mb-2 text-lg font-semibold md:text-[22px]">
                    {title}
                  </h3>
                  <p className="text-hyperjump-gray mb-4 text-sm md:text-base">
                    {description}
                  </p>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="text-hyperjump-blue hover:bg-hyperjump-blue mt-4 w-full border-gray-300 hover:text-white">
                  <Link href={`/${lang}/case-studies/${slug}`}>
                    {caseStudyButton(lang)}
                  </Link>
                </Button>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
