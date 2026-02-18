"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  mainLocationDesc,
  mainLocationEyebrow,
  mainLocationHeading,
  mainOpenInGoogleMaps
} from "@/locales/.generated/strings";
import type { SupportedLanguage } from "@/locales/.generated/types";

import type { Location as LocationType } from "../data";

type LocationProps = { lang: SupportedLanguage; location: LocationType };

const FALLBACK_CLIP = "inset(30% 4% 30% 4% round 16px)";
const REVEALED_CLIP = "inset(0 0 0 0 round 0px)";

/**
 * Location section with a full-bleed image that reveals on hover via
 * an animated clip-path. Text transitions to white over a dark overlay.
 */
export function Location({ lang, location }: LocationProps) {
  const {
    address: { country, locality, postalCode, street },
    duns,
    email,
    imageUrl,
    mapsUrl,
    title
  } = location;

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [clipInset, setClipInset] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const computeClipPath = useCallback(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    const s = section.getBoundingClientRect();
    const c = card.getBoundingClientRect();

    const top = c.top - s.top;
    const right = s.right - c.right;
    const bottom = s.bottom - c.bottom;
    const left = c.left - s.left;

    setClipInset(`inset(${top}px ${right}px ${bottom}px ${left}px round 16px)`);
  }, []);

  useEffect(() => {
    computeClipPath();
    window.addEventListener("resize", computeClipPath);
    return () => window.removeEventListener("resize", computeClipPath);
  }, [computeClipPath]);

  const h = isDesktop && isHovered;

  return (
    <motion.section
      ref={sectionRef}
      id="location"
      className="relative scroll-mt-20 overflow-hidden bg-white"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, amount: 0.1 }}>
      {/* Desktop: full-bleed background image with animated clip-path */}
      {isDesktop && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            clipPath: h ? REVEALED_CLIP : (clipInset ?? FALLBACK_CLIP),
            transition: "clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          }}>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={`object-cover object-center transition-transform duration-800 ease-in-out ${
              h ? "scale-100" : "scale-[0.7]"
            }`}
          />
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.65))",
              opacity: h ? 1 : 0
            }}
          />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 md:px-20 md:py-28 xl:px-0">
        <div className="mb-16 text-center">
          <span
            className={`mb-4 inline-block text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-500 ${
              h ? "text-yellow-300" : "text-hyperjump-blue"
            }`}>
            {mainLocationEyebrow(lang)}
          </span>
          <h2
            className={`mx-auto max-w-2xl text-4xl font-semibold tracking-tight transition-colors duration-500 md:text-5xl lg:text-[3.5rem] ${
              h ? "text-white" : "text-hyperjump-black"
            }`}>
            {mainLocationHeading(lang)}
          </h2>
          <p
            className={`mx-auto mt-5 max-w-xl text-lg leading-relaxed transition-colors duration-500 ${
              h ? "text-white/70" : "text-hyperjump-gray"
            }`}>
            {mainLocationDesc(lang)}
          </p>
        </div>

        <div
          onMouseEnter={isDesktop ? () => setIsHovered(true) : undefined}
          onMouseLeave={isDesktop ? () => setIsHovered(false) : undefined}>
          {/* Mobile: static full-width image */}
          {!isDesktop && (
            <div className="-mx-4 overflow-hidden">
              <div className="relative h-64 sm:h-80">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          )}

          {/* Desktop: invisible clip-path reference area */}
          {isDesktop && (
            <div ref={cardRef} className="relative h-96 rounded-2xl lg:h-112">
              <span
                className={`pointer-events-none absolute inset-0 flex items-center justify-center text-[clamp(4rem,15vw,12rem)] font-black tracking-tight text-white transition-all duration-700 select-none ${
                  h ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}>
                JAKARTA
              </span>
            </div>
          )}

          <div
            className={`mt-8 flex flex-col gap-8 border-t pt-8 transition-colors duration-500 md:mt-10 md:flex-row md:items-start md:justify-between md:pt-10 ${
              h ? "border-white/20" : "border-black/6"
            }`}>
            <div>
              <h3
                className={`mb-3 text-xl font-semibold transition-colors duration-500 md:text-2xl ${
                  h ? "text-white" : "text-hyperjump-black"
                }`}>
                {title}
              </h3>
              <div
                className={`space-y-0.5 text-[15px] leading-relaxed transition-colors duration-500 ${
                  h ? "text-white/70" : "text-hyperjump-gray"
                }`}>
                <p>{street}</p>
                <p>
                  {locality} {postalCode}
                </p>
                <p>{country}</p>
              </div>
            </div>

            <div className="flex flex-col gap-5 md:items-end md:text-right">
              <div className="space-y-1">
                <p>
                  <a
                    href={`mailto:${email}`}
                    className={`text-[15px] font-medium transition-colors duration-500 ${
                      h
                        ? "text-white hover:text-white/80"
                        : "text-hyperjump-black hover:text-[#635BFF]"
                    }`}>
                    {email}
                  </a>
                </p>
                <p
                  className={`text-sm transition-colors duration-500 ${
                    h ? "text-white/60" : "text-hyperjump-gray"
                  }`}>
                  D&B D-U-N-S: {duns}
                </p>
              </div>
              <Button
                asChild
                className={`h-11 rounded-full px-8 text-sm font-semibold transition-all duration-500 hover:scale-[1.02] ${
                  h
                    ? "border border-white/30 bg-white/10 text-white shadow-lg shadow-white/10 backdrop-blur-sm hover:bg-white/20"
                    : "bg-hyperjump-blue hover:bg-hyperjump-blue/90 text-white shadow-lg shadow-[#635BFF]/20 hover:shadow-xl hover:shadow-[#635BFF]/25"
                }`}>
                <Link href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  {mainOpenInGoogleMaps(lang)}
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
