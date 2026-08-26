import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon, MailIcon, StarIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import data from "@/data.json";
import { dynamicOpengraph } from "@/lib/default-metadata";
import {
  supportedLanguages,
  type SupportedLanguage
} from "@/locales/.generated/types";
import {
  aiWorkshopCtaButton,
  aiWorkshopCtaDesc,
  aiWorkshopCtaHeading,
  aiWorkshopFaqDesc,
  aiWorkshopFaqHeading,
  aiWorkshopFeedbackHeading,
  aiWorkshopFeedbackLabel,
  aiWorkshopHeroCta,
  aiWorkshopHeroEyebrow,
  aiWorkshopHeroHeading,
  aiWorkshopHeroImageAlt,
  aiWorkshopHeroLede,
  aiWorkshopLogisticsHeading,
  aiWorkshopLogisticsLabel,
  aiWorkshopMailtoBody,
  aiWorkshopMailtoSubject,
  aiWorkshopMetaDescription,
  aiWorkshopMetaOgAlt,
  aiWorkshopMetaTitle,
  aiWorkshopOutcomesDesc,
  aiWorkshopOutcomesHeading,
  aiWorkshopOutcomesLabel,
  aiWorkshopPhotosParticipantsAlt,
  aiWorkshopPhotosRoomAlt,
  aiWorkshopQuoteCredit,
  aiWorkshopQuoteText,
  aiWorkshopRuleHeading,
  aiWorkshopRuleKicker,
  aiWorkshopRuleText,
  aiWorkshopSessionsDesc,
  aiWorkshopSessionsHeading,
  aiWorkshopSessionsLabel,
  aiWorkshopStickyCta,
  aiWorkshopWhoHeading,
  aiWorkshopWhoLabel
} from "@/locales/.generated/strings";

import { AnimatedLines } from "../components/animated-lines";
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem
} from "../components/motion-wrappers";
import { buildAiWorkshopMailto } from "./build-ai-workshop-mailto";
import {
  getAiWorkshopOgImage,
  getAiWorkshopFacilitatorPhoto,
  getAiWorkshopParticipantsPhoto,
  getAiWorkshopRoomPhoto
} from "./get-ai-workshop-assets";
import {
  getAiWorkshopAudience,
  getAiWorkshopFeedback,
  getAiWorkshopLogistics,
  getAiWorkshopOutcomes,
  getAiWorkshopProofs,
  getAiWorkshopSessions,
  getAiWorkshopStarIndexes,
  getAiWorkshopStarRatingLabel,
  getDefaultAiWorkshopFaqs
} from "./get-ai-workshop-content";
import { getAiWorkshopJsonLd } from "./get-ai-workshop-json-ld";
import { WorkshopStickyCta } from "./workshop-sticky-cta";

const { url } = data;

type LangProps = { lang: SupportedLanguage };
type AiWorkshopPageProps = { params: Promise<LangProps> };

export const generateStaticParams = async () => {
  return supportedLanguages.map((lang) => ({ lang }));
};

/**
 * Builds locale-specific metadata with canonical URLs and the workshop OG image.
 */
export async function generateMetadata({
  params
}: AiWorkshopPageProps): Promise<Metadata> {
  const { lang } = await params;
  const pageUrl = `${url}/${lang}/ai-workshop`;
  const pageTitle = aiWorkshopMetaTitle(lang);
  const pageDescription = aiWorkshopMetaDescription(lang);
  const ogImage = getAiWorkshopOgImage({
    lang,
    siteUrl: url,
    alt: aiWorkshopMetaOgAlt(lang)
  });
  const languages = supportedLanguages.reduce(
    (acc, locale) => {
      acc[locale] = `${url}/${locale}/ai-workshop`;
      return acc;
    },
    { "x-default": `${url}/en/ai-workshop` } as Record<string, string>
  );

  const meta: Metadata = {
    title: pageTitle,
    description: pageDescription,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    },
    alternates: {
      canonical: pageUrl,
      languages
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      locale: lang === "id" ? "id_ID" : "en_US",
      alternateLocale: lang === "id" ? ["en_US"] : ["id_ID"]
    }
  };

  return dynamicOpengraph({
    ...meta,
    image: ogImage
  });
}

/**
 * Hands-on AI workshop landing page with bilingual copy and mailto CTAs.
 */
export default async function AiWorkshopPage({ params }: AiWorkshopPageProps) {
  const { lang } = await params;
  const mailtoHref = buildAiWorkshopMailto({
    subject: aiWorkshopMailtoSubject(lang),
    body: aiWorkshopMailtoBody(lang)
  });
  const pageUrl = `${url}/${lang}/ai-workshop`;
  const jsonLd = getAiWorkshopJsonLd({ lang, pageUrl, siteUrl: url });
  const proofs = getAiWorkshopProofs({ lang });
  const audience = getAiWorkshopAudience({ lang });
  const sessions = getAiWorkshopSessions({ lang });
  const outcomes = getAiWorkshopOutcomes({ lang });
  const feedback = getAiWorkshopFeedback({ lang });
  const logistics = getAiWorkshopLogistics({ lang });
  const faqs = getDefaultAiWorkshopFaqs({ lang });
  const facilitator = getAiWorkshopFacilitatorPhoto();
  const participants = getAiWorkshopParticipantsPhoto();
  const room = getAiWorkshopRoomPhoto();

  return (
    <main className="pb-24 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        id="hero"
        className="bg-hero-premium relative overflow-hidden text-white">
        <div className="hero-glow animate-glow top-[12%] left-1/2 -translate-x-1/2" />
        <div className="hero-glow animate-glow -top-32 right-0 [animation-delay:1.5s]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />
        <AnimatedLines className="pointer-events-none absolute inset-0 h-full w-full opacity-30" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-20 xl:px-0">
          <div className="flex flex-col gap-12 pt-40 pb-16 lg:flex-row lg:items-center lg:pt-48 lg:pb-24">
            <SectionReveal className="w-full lg:w-[48%]">
              <div className="max-w-xl">
                <span className="mb-5 inline-block text-xs font-semibold tracking-[0.2em] text-yellow-300 uppercase">
                  {aiWorkshopHeroEyebrow(lang)}
                </span>
                <h1 className="mb-6 text-4xl leading-[1.08] font-semibold tracking-tight md:text-5xl lg:text-[3.35rem]">
                  {aiWorkshopHeroHeading(lang)}
                </h1>
                <p className="mb-8 text-lg leading-relaxed font-medium text-white/60 md:text-xl">
                  {aiWorkshopHeroLede(lang)}
                </p>
                <ul className="mb-8 space-y-3">
                  {proofs.map((proof) => (
                    <li
                      key={proof}
                      className="flex items-start gap-3 text-sm font-medium text-white/80 md:text-base">
                      <span className="bg-hyperjump-teal mt-2 h-2 w-2 shrink-0 rounded-full" />
                      {proof}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 hidden h-12 rounded-full px-8 text-base font-semibold shadow-lg shadow-[#635BFF]/25 md:inline-flex">
                  <Link href={mailtoHref} data-testid="ai-workshop-hero-cta">
                    <MailIcon className="mr-2 h-4 w-4" aria-hidden />
                    {aiWorkshopHeroCta(lang)}
                  </Link>
                </Button>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.15} className="w-full lg:w-[52%]">
              <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
                <Image
                  src={facilitator.src}
                  alt={aiWorkshopHeroImageAlt(lang)}
                  width={facilitator.width}
                  height={facilitator.height}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <WorkshopStickyCta href={mailtoHref} label={aiWorkshopStickyCta(lang)} />

      <section className="bg-hyperjump-navy relative overflow-hidden py-16 text-white md:py-24">
        <div className="relative z-10 mx-auto max-w-3xl px-4 md:px-20 xl:px-0">
          <SectionReveal>
            <blockquote data-testid="ai-workshop-quote">
              <p className="text-2xl leading-snug font-medium tracking-tight md:text-3xl">
                {aiWorkshopQuoteText(lang)}
              </p>
              <footer className="text-hyperjump-teal mt-6 text-xs font-semibold tracking-[0.16em] uppercase">
                {aiWorkshopQuoteCredit(lang)}
              </footer>
            </blockquote>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-20 xl:px-0">
          <div className="flex flex-col items-center gap-10 md:flex-row-reverse md:gap-14">
            <SectionReveal className="w-full md:w-1/2">
              <div className="overflow-hidden rounded-2xl shadow-xl ring-1 shadow-black/15 ring-black/5">
                <Image
                  src={participants.src}
                  alt={aiWorkshopPhotosParticipantsAlt(lang)}
                  width={participants.width}
                  height={participants.height}
                  className="h-auto w-full"
                />
              </div>
            </SectionReveal>
            <SectionReveal delay={0.12} className="w-full md:w-1/2">
              <p className="text-hyperjump-blue mb-4 text-xs font-bold tracking-[0.16em] uppercase">
                {aiWorkshopRuleKicker(lang)}
              </p>
              <h2 className="text-hyperjump-black mb-5 text-3xl font-semibold tracking-tight md:text-4xl">
                {aiWorkshopRuleHeading(lang)}
              </h2>
              <p className="text-hyperjump-gray text-base leading-relaxed md:text-lg">
                {aiWorkshopRuleText(lang)}
              </p>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="bg-[#F6F8F9] py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-20 xl:px-0">
          <SectionReveal>
            <p className="text-hyperjump-blue mb-3 text-xs font-bold tracking-[0.16em] uppercase">
              {aiWorkshopWhoLabel(lang)}
            </p>
            <h2 className="text-hyperjump-black mb-12 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
              {aiWorkshopWhoHeading(lang)}
            </h2>
          </SectionReveal>
          <StaggerContainer className="divide-y divide-black/8 border-t border-black/8">
            {audience.map((item, index) => (
              <StaggerItem key={item.title}>
                <article className="grid gap-4 py-8 md:grid-cols-[4rem_minmax(0,18rem)_1fr] md:items-start md:gap-8">
                  <span className="text-hyperjump-blue font-mono text-sm font-semibold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-hyperjump-black text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-hyperjump-gray text-[15px] leading-relaxed">
                    {item.text}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section
        data-testid="ai-workshop-sessions"
        className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-20 xl:px-0">
          <SectionReveal>
            <p className="text-hyperjump-blue mb-3 text-xs font-bold tracking-[0.16em] uppercase">
              {aiWorkshopSessionsLabel(lang)}
            </p>
            <h2 className="text-hyperjump-black mb-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
              {aiWorkshopSessionsHeading(lang)}
            </h2>
            <p className="text-hyperjump-gray mb-12 max-w-2xl text-lg leading-relaxed">
              {aiWorkshopSessionsDesc(lang)}
            </p>
          </SectionReveal>
          <ol className="space-y-0">
            {sessions.map((session, index) => (
              <li
                key={session.title}
                className="relative grid gap-3 border-l border-black/10 py-7 pl-8 last:pb-0 md:grid-cols-[11rem_1fr] md:gap-10">
                <span className="bg-hyperjump-blue absolute top-9 -left-[5px] h-2.5 w-2.5 rounded-full" />
                <div>
                  <p className="text-hyperjump-blue text-xs font-bold tracking-[0.16em] uppercase">
                    {session.kicker}
                  </p>
                  <p className="text-hyperjump-gray mt-2 text-sm">
                    {session.duration}
                  </p>
                </div>
                <div>
                  <h3 className="text-hyperjump-black mb-2 text-xl font-semibold">
                    {session.title}
                  </h3>
                  <p className="text-hyperjump-gray text-[15px] leading-relaxed">
                    {session.text}
                  </p>
                </div>
                {index === 2 && (
                  <div className="md:col-span-2">
                    <div className="mt-4 overflow-hidden rounded-2xl shadow-xl ring-1 shadow-black/10 ring-black/5">
                      <Image
                        src={room.src}
                        alt={aiWorkshopPhotosRoomAlt(lang)}
                        width={room.width}
                        height={room.height}
                        className="h-auto w-full"
                      />
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#F6F8F9] py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-20 xl:px-0">
          <SectionReveal>
            <p className="text-hyperjump-blue mb-3 text-xs font-bold tracking-[0.16em] uppercase">
              {aiWorkshopOutcomesLabel(lang)}
            </p>
            <h2 className="text-hyperjump-black mb-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
              {aiWorkshopOutcomesHeading(lang)}
            </h2>
            <p className="text-hyperjump-gray mb-12 max-w-2xl text-lg leading-relaxed">
              {aiWorkshopOutcomesDesc(lang)}
            </p>
          </SectionReveal>
          <StaggerContainer className="space-y-8">
            {outcomes.map((outcome, index) => (
              <StaggerItem key={outcome.title}>
                <article className="flex gap-6">
                  <span className="text-hyperjump-blue shrink-0 font-mono text-sm font-semibold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-hyperjump-black mb-2 text-xl font-semibold">
                      {outcome.title}
                    </h3>
                    <p className="text-hyperjump-gray max-w-2xl text-[15px] leading-relaxed">
                      {outcome.text}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section
        data-testid="ai-workshop-feedback"
        className="bg-hyperjump-navy relative overflow-hidden py-16 text-white md:py-24">
        <div className="relative z-10 mx-auto max-w-3xl px-4 md:px-20 xl:px-0">
          <SectionReveal>
            <p className="text-hyperjump-teal mb-3 text-xs font-bold tracking-[0.16em] uppercase">
              {aiWorkshopFeedbackLabel(lang)}
            </p>
            <h2 className="mb-12 text-3xl font-semibold tracking-tight md:text-4xl">
              {aiWorkshopFeedbackHeading(lang)}
            </h2>
          </SectionReveal>
          <div className="space-y-12">
            {feedback.map((item) => (
              <blockquote
                key={item.quote}
                data-testid="ai-workshop-feedback-quote">
                <div
                  className="mb-5 flex gap-1"
                  data-testid="ai-workshop-feedback-stars"
                  role="img"
                  aria-label={getAiWorkshopStarRatingLabel({
                    lang,
                    rating: item.rating
                  })}>
                  {getAiWorkshopStarIndexes({ rating: item.rating }).map(
                    (index) => (
                      <StarIcon
                        key={index}
                        className="h-5 w-5 fill-yellow-300 text-yellow-300"
                        aria-hidden
                      />
                    )
                  )}
                </div>
                <p className="text-2xl leading-snug font-medium tracking-tight md:text-3xl">
                  “{item.quote}”
                </p>
                <footer className="mt-8">
                  <cite className="text-hyperjump-teal text-sm font-semibold tracking-[0.04em] not-italic">
                    {item.credit}
                  </cite>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-20 xl:px-0">
          <SectionReveal>
            <p className="text-hyperjump-blue mb-3 text-xs font-bold tracking-[0.16em] uppercase">
              {aiWorkshopLogisticsLabel(lang)}
            </p>
            <h2 className="text-hyperjump-black mb-10 max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
              {aiWorkshopLogisticsHeading(lang)}
            </h2>
          </SectionReveal>
          <ul className="grid gap-4 sm:grid-cols-2">
            {logistics.map((item) => (
              <li
                key={item}
                className="text-hyperjump-gray flex items-start gap-3 text-[15px] leading-relaxed">
                <span className="bg-hyperjump-blue/10 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                  <CheckIcon className="text-hyperjump-blue h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="faqs"
        data-testid="ai-workshop-faq-section"
        className="bg-[#F6F8F9] px-4 py-16 md:px-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <SectionReveal>
            <h2 className="text-hyperjump-black mb-3 text-center text-3xl font-semibold md:text-4xl">
              {aiWorkshopFaqHeading(lang)}
            </h2>
            <p className="text-hyperjump-gray mx-auto mb-10 max-w-2xl text-center text-lg">
              {aiWorkshopFaqDesc(lang)}
            </p>
          </SectionReveal>
          <Accordion
            type="single"
            collapsible
            className="space-y-4"
            data-testid="ai-workshop-faq-accordion">
            {faqs.map(({ answer, question }, index) => (
              <AccordionItem
                key={`ai-workshop-faq-${index}`}
                value={`ai-workshop-faq-${index}`}
                asChild>
                <div className="rounded-xl border border-gray-200 bg-white px-6 py-2 shadow-xs">
                  <AccordionTrigger className="text-left text-lg font-medium text-[#020F15] hover:no-underline">
                    {question}
                  </AccordionTrigger>
                  <AccordionContent className="text-hyperjump-gray text-base leading-relaxed">
                    {answer}
                  </AccordionContent>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section
        data-testid="ai-workshop-close-cta"
        className="bg-cta-premium relative overflow-hidden px-4 py-16 text-white md:px-20 md:py-24">
        <div className="hero-glow animate-glow top-0 right-0 h-100! w-100!" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <SectionReveal>
            <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
              {aiWorkshopCtaHeading(lang)}
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-white/70">
              {aiWorkshopCtaDesc(lang)}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 h-12 rounded-full px-8 text-base font-semibold">
              <Link
                href={mailtoHref}
                data-testid="ai-workshop-close-cta-button">
                <MailIcon className="mr-2 h-4 w-4" aria-hidden />
                {aiWorkshopCtaButton(lang)}
              </Link>
            </Button>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
