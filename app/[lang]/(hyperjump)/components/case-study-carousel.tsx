"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

import { caseStudyButton } from "@/locales/.generated/strings";
import type { SupportedLanguage } from "@/locales/.generated/types";

import type { CaseStudy } from "../data";
import { serviceBySlug } from "../data";

type CaseStudyCarouselProps = {
  caseStudies: CaseStudy[];
  lang: SupportedLanguage;
};

/**
 * Hook encapsulating carousel navigation state and handlers.
 */
const useCarousel = (itemCount: number) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + itemCount) % itemCount);
    },
    [itemCount]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  return { activeIndex, goTo, goNext, goPrev };
};

/**
 * Stripe-style "squeezy carousel" for case studies.
 * The active item expands to fill most of the row width while
 * inactive items collapse into narrow vertical image strips.
 */
const CaseStudyCarousel = ({ caseStudies, lang }: CaseStudyCarouselProps) => {
  const { activeIndex, goTo, goNext, goPrev } = useCarousel(caseStudies.length);
  const active = caseStudies[activeIndex];

  return (
    <div>
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous case study"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/20 bg-white text-black/70 shadow-sm transition-colors hover:border-black/40 hover:text-black">
          <ArrowLeftIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next case study"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/20 bg-white text-black/70 shadow-sm transition-colors hover:border-black/40 hover:text-black">
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="flex h-64 gap-2 sm:h-80 md:h-[420px]">
        {caseStudies.map((cs, i) => {
          const isActive = i === activeIndex;
          return (
            <motion.div
              key={cs.slug}
              role="button"
              tabIndex={0}
              onClick={() => goTo(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") goTo(i);
              }}
              aria-label={cs.title}
              aria-current={isActive ? "true" : undefined}
              style={{ position: "relative" }}
              className="cursor-pointer overflow-hidden rounded-xl"
              initial={false}
              animate={{
                flexGrow: isActive ? 6 : 1,
                flexShrink: 1,
                flexBasis: 0
              }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>
              <Image
                src={cs.imageUrl}
                alt={cs.title}
                fill
                className="object-cover object-center"
                sizes={isActive ? "(max-width: 768px) 100vw, 65vw" : "80px"}
              />
              {!isActive && <div className="absolute inset-0 bg-black/20" />}
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.slug}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 flex-1">
            <span className="text-hyperjump-blue mb-1 inline-block text-xs font-semibold tracking-widest uppercase">
              {serviceBySlug({ lang, slug: active.serviceSlug })?.title}
            </span>
            <p className="text-hyperjump-black text-base leading-relaxed md:text-lg">
              <strong>{active.title}.</strong>{" "}
              <span className="text-hyperjump-gray">{active.description}</span>
            </p>
          </div>
          <Link
            href={active.url}
            className="text-hyperjump-blue inline-flex shrink-0 items-center gap-1.5 rounded-full border border-blue-200 px-5 py-2 text-sm font-semibold transition-all duration-200 hover:gap-2.5 hover:bg-blue-50">
            {caseStudyButton(lang)}
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export { CaseStudyCarousel };
