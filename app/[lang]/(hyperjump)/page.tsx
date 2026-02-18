import { ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  BreadcrumbJsonLd,
  FAQJsonLd,
  LocalBusinessJsonLd,
  OrganizationJsonLd
} from "next-seo";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import data from "@/data.json";
import { dynamicOpengraph } from "@/lib/default-metadata";
import {
  supportedLanguages,
  type SupportedLanguage
} from "@/locales/.generated/types";
import {
  mainServicesHeading,
  mainServicesDesc,
  mainServicesEyebrow,
  mainCaseStudiesHeading,
  mainCaseStudiesDesc,
  mainCaseStudiesEyebrow,
  mainProjectHeading,
  mainProjectDesc,
  mainFaqHeading,
  mainFaqDesc,
  mainViewMore,
  mainHeroDesc,
  mainCaseStudiesCtaHeading,
  mainCaseStudiesCtaDesc,
  mainCaseStudiesCtaExploreOurCaseStudies,
  mainHeroHeading,
  mainFaqLearnMore
} from "@/locales/.generated/strings";

import { AnimatedLines } from "./components/animated-lines";
import { CaseStudyCarousel } from "./components/case-study-carousel";
import { Clients } from "./components/clients";
import { Location } from "./components/location";
import {
  SectionReveal,
  StaggerItem,
  StaggerContainer
} from "./components/motion-wrappers";
import {
  getCaseStudies,
  getFaqs,
  getProject,
  location,
  services
} from "./data";

const { github, socials, title, url } = data;

type HomeParams = {
  lang: SupportedLanguage;
};

export async function generateMetadata(props: {
  params: Promise<HomeParams>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  const meta: Metadata = {
    title: mainHeroHeading(lang),
    description: mainHeroDesc(lang),
    alternates: {
      canonical: `${url}/${lang}`,
      languages: (supportedLanguages as SupportedLanguage[]).reduce(
        (acc, l) => {
          acc[l] = `${url}/${l}`;
          return acc;
        },
        {} as Record<string, string>
      )
    }
  };

  return dynamicOpengraph(meta);
}

export const generateStaticParams = async () => {
  return supportedLanguages.map((lang) => ({ lang }));
};

type HomeProps = {
  params: Promise<HomeParams>;
};

export default async function MainPage({ params }: HomeProps) {
  const { lang } = await params;
  return (
    <>
      <Hero lang={lang} />
      <Services lang={lang} />
      <CaseStudies lang={lang} />
      <OpenSourceProducts lang={lang} />
      <Faqs lang={lang} />
      <Location lang={lang} location={location} />
      <JsonLd lang={lang} />
    </>
  );
}

function Hero({ lang }: HomeParams) {
  return (
    <section
      id="hero"
      className="bg-hero-premium relative overflow-hidden text-white">
      <div className="hero-glow animate-glow top-1/4 left-1/2 -translate-x-1/2" />
      <div className="hero-glow animate-glow -top-32 right-0 [animation-delay:1.5s]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 pt-40 pb-20 md:px-20 md:pt-52 md:pb-28 xl:px-0">
        <div className="max-w-4xl text-center">
          <h1 className="mb-6 text-5xl leading-[1.08] font-semibold tracking-tight md:text-7xl lg:text-[5.25rem]">
            {mainHeroHeading(lang)}
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-white/70 md:text-xl">
            {mainHeroDesc(lang)}
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button
            asChild
            className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 h-12 rounded-full px-8 text-base font-medium text-white shadow-lg shadow-[#635BFF]/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#635BFF]/30">
            <Link href={`/${lang}/services`}>
              Explore our services
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-full border-white/20 bg-white/5 px-8 text-base font-medium text-white backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:border-white/30 hover:bg-white/10 hover:text-white">
            <Link href={`/${lang}/case-studies`}>View case studies</Link>
          </Button>
        </div>

        <div className="mt-20 w-full">
          <Clients clients={data.clients} />
        </div>
      </div>
    </section>
  );
}

function Services({ lang }: HomeParams) {
  const serviceList = services(lang);
  const [featured, ...rest] = serviceList;

  return (
    <section id="services" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-20 md:px-20 md:py-28 xl:px-0">
        <SectionReveal>
          <div className="mb-16 text-center">
            <span className="text-hyperjump-blue mb-4 inline-block text-xs font-semibold tracking-[0.2em] uppercase">
              {mainServicesEyebrow(lang)}
            </span>
            <h2 className="text-hyperjump-black mx-auto max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl lg:text-[3.5rem]">
              {mainServicesHeading(lang)}
            </h2>
            <p className="text-hyperjump-gray mx-auto mt-5 max-w-xl text-lg leading-relaxed">
              {mainServicesDesc(lang)}
            </p>
          </div>
        </SectionReveal>

        {featured && (
          <SectionReveal>
            <Link
              href={`/${lang}/services/${featured.slug}`}
              className="bg-cta-premium group relative mb-6 flex flex-col gap-6 overflow-hidden rounded-2xl p-8 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#635BFF]/20 md:flex-row md:items-center md:p-10 lg:p-12">
              <AnimatedLines className="pointer-events-none absolute inset-0 h-full w-full opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
              <div className="hero-glow animate-glow top-0 right-0 h-[400px]! w-[400px]! transition-opacity duration-500 group-hover:opacity-80" />
              <div className="relative z-10 flex-1">
                <span className="mb-4 inline-block text-sm font-medium tracking-wider text-white/40 tabular-nums">
                  {String(1).padStart(2, "0")}
                </span>
                {featured.imageIconUrl && (
                  <img
                    src={featured.imageIconUrl}
                    alt={featured.title}
                    className="mb-5 h-16 w-16 drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <h3 className="mb-3 text-2xl font-semibold text-white md:text-3xl">
                  {featured.title}
                </h3>
                <p className="max-w-lg text-base leading-relaxed text-white/60">
                  {featured.description}
                </p>
              </div>
              <div className="relative z-10 shrink-0">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 group-hover:border-white/40 group-hover:bg-white group-hover:text-[#0A0E27]">
                  Learn more
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </SectionReveal>
        )}

        <StaggerContainer className="grid gap-5 md:grid-cols-2">
          {rest.map(({ description, iconUrl, slug, title }, idx) => (
            <StaggerItem key={slug}>
              <Link
                href={`/${lang}/services/${slug}`}
                className="group flex h-full flex-col rounded-2xl border border-black/6 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/6">
                <span className="text-hyperjump-muted mb-4 text-sm font-medium tracking-wider tabular-nums">
                  {String(idx + 2).padStart(2, "0")}
                </span>
                {iconUrl && (
                  <img src={iconUrl} alt={title} className="mb-4 h-12 w-12" />
                )}
                <h3 className="text-hyperjump-black mb-2 text-xl font-semibold">
                  {title}
                </h3>
                <p className="text-hyperjump-gray mb-6 flex-1 text-[15px] leading-relaxed">
                  {description}
                </p>
                <span className="text-hyperjump-blue inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-2.5">
                  Learn more
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <SectionReveal>
          <div className="mt-12 flex w-full items-center justify-center">
            <Button
              variant="outline"
              className="text-hyperjump-blue border-hyperjump-blue/20 hover:bg-hyperjump-blue h-11 rounded-full px-8 font-semibold transition-all duration-200 hover:scale-[1.02] hover:text-white"
              asChild>
              <Link href={`/${lang}/services`}>{mainViewMore(lang)}</Link>
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function CaseStudies({ lang }: HomeParams) {
  const caseStudies = getCaseStudies(lang);

  return (
    <section id="case-studies" className="bg-hyperjump-surface scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4 py-20 md:px-20 md:py-28 xl:px-0">
        <SectionReveal>
          <div className="mb-16 text-center">
            <span className="text-hyperjump-blue mb-4 inline-block text-xs font-semibold tracking-[0.2em] uppercase">
              {mainCaseStudiesEyebrow(lang)}
            </span>
            <h2 className="text-hyperjump-black mx-auto max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl lg:text-[3.5rem]">
              {mainCaseStudiesHeading(lang)}
            </h2>
            <p className="text-hyperjump-gray mx-auto mt-5 max-w-xl text-lg leading-relaxed">
              {mainCaseStudiesDesc(lang)}
            </p>
          </div>
        </SectionReveal>

        <SectionReveal>
          <CaseStudyCarousel caseStudies={caseStudies} lang={lang} />
        </SectionReveal>

        <SectionReveal>
          <div className="bg-cta-premium relative mt-16 w-full overflow-hidden rounded-2xl">
            <div className="hero-glow animate-glow top-0 right-0 h-[400px]! w-[400px]!" />
            <div className="relative flex flex-col items-center justify-center px-8 py-16 text-center md:py-20">
              <h3 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {mainCaseStudiesCtaHeading(lang)}
              </h3>
              <p className="mt-2 max-w-lg text-lg text-white/60">
                {mainCaseStudiesCtaDesc(lang)}
              </p>
              <Button
                asChild
                className="mt-8 h-12 rounded-full border border-white/20 bg-white/10 px-8 text-base font-medium text-white backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:bg-white/20">
                <Link href={`${lang}/case-studies`}>
                  {mainCaseStudiesCtaExploreOurCaseStudies(lang)}
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function OpenSourceProducts({ lang }: HomeParams) {
  const projects = getProject(lang);

  return (
    <section id="open-source" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-20 md:px-20 md:py-28 xl:px-0">
        <SectionReveal>
          <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="text-hyperjump-black text-4xl font-semibold tracking-tight md:text-5xl">
              {mainProjectHeading(lang)}
            </h2>
            <p className="text-hyperjump-gray max-w-md text-lg">
              {mainProjectDesc(lang)}
            </p>
          </div>
        </SectionReveal>

        <StaggerContainer className="grid gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <StaggerItem key={project.title}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-black/6 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/6">
                {project.image && (
                  <div className="bg-hyperjump-surface -mx-7 -mt-7 mb-5 overflow-hidden rounded-t-2xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-hyperjump-black mb-2 text-xl font-semibold">
                  {project.title}
                </h3>
                <p className="text-hyperjump-gray mb-6 flex-1 text-[15px] leading-relaxed">
                  {project.description}
                </p>
                <span className="text-hyperjump-blue inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-2.5">
                  View on GitHub
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <SectionReveal>
          <div className="mt-12 flex w-full items-center justify-center">
            <Button
              variant="outline"
              className="text-hyperjump-blue border-hyperjump-blue/20 hover:bg-hyperjump-blue h-11 rounded-full px-8 font-semibold transition-all duration-200 hover:scale-[1.02] hover:text-white"
              asChild>
              <Link href={github} target="_blank" rel="noreferrer noopener">
                {mainViewMore(lang)}
              </Link>
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

function Faqs({ lang }: HomeParams) {
  return (
    <section id="faqs" className="bg-hyperjump-surface scroll-mt-20">
      <div className="mx-auto max-w-3xl px-4 py-20 md:px-20 md:py-28 xl:px-0">
        <SectionReveal>
          <div className="mb-12 text-center">
            <h2 className="text-hyperjump-black mb-4 text-4xl font-semibold tracking-tight md:text-5xl">
              {mainFaqHeading(lang)}
            </h2>
            <p className="text-hyperjump-gray mx-auto max-w-lg text-lg">
              {mainFaqDesc(lang)}
            </p>
          </div>
        </SectionReveal>

        <SectionReveal>
          <Accordion type="single" collapsible className="w-full">
            {getFaqs(lang).map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-b border-black/8 py-1">
                <AccordionTrigger className="text-hyperjump-black flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-lg font-medium no-underline transition hover:no-underline focus:no-underline md:text-xl">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-hyperjump-gray pb-6 text-base leading-relaxed md:text-lg">
                  {item.answer}
                  {item?.url && (
                    <Link
                      href={item.url}
                      className="text-hyperjump-blue mt-3 inline-flex items-center gap-1.5 text-base font-semibold transition-all duration-200 hover:gap-2.5">
                      {mainFaqLearnMore(lang)}
                      <ArrowRightIcon className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionReveal>
      </div>
    </section>
  );
}

function JsonLd({ lang }: HomeParams) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            name: "Home",
            item: `${url}/${lang}`
          }
        ]}
      />
      <JsonLdOrganization />
      <JsonLdLocalBusiness />
      <FAQJsonLd questions={getFaqs(lang)} />
    </>
  );
}

function JsonLdOrganization() {
  const {
    address: { countryCode, locality, region, postalCode, street },
    email,
    title
  } = location;
  return (
    <OrganizationJsonLd
      name={title}
      url={url}
      logo={`${url}/images/hyperjump-colored.png`}
      address={{
        streetAddress: `${title}, ${street}`,
        addressLocality: locality,
        addressRegion: region,
        postalCode,
        addressCountry: countryCode
      }}
      contactPoint={[
        {
          email,
          contactType: "Sales"
        }
      ]}
      sameAs={socials.map(({ url }) => url)}
    />
  );
}

function JsonLdLocalBusiness() {
  const {
    address: { countryCode, locality, region, postalCode, street },
    geo: { latitude, longitude },
    imageUrl,
    title
  } = location;

  return (
    <LocalBusinessJsonLd
      type="ProfessionalService"
      name={title}
      image={`${url}${imageUrl}`}
      address={{
        streetAddress: `${title}, ${street}`,
        addressLocality: locality,
        addressRegion: region,
        postalCode,
        addressCountry: countryCode
      }}
      geo={{
        latitude,
        longitude
      }}
      url={url}
      sameAs={socials.map(({ url }) => url)}
    />
  );
}
