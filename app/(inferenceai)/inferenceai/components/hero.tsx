"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SupportedLanguage } from "@/locales/.generated/types";
import {
  ragChatbotHeroHeading,
  ragChatbotHeroDesc,
  inferenceaiHeroHeading,
  inferenceaiHeroDesc
} from "@/locales/.generated/server";
import { HeroCTAButton } from "./hero-cta-button";

export default function Hero({
  lang,
  type = "inferenceai"
}: {
  lang: SupportedLanguage;
  type?: "inferenceai" | "rag-chatbot";
}) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#04040B] text-white">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: "easeOut" }}
        className="absolute inset-0 z-0">
        <Image
          src="/images/inferenceai/swatch.svg"
          alt="Hero Background"
          fill
          className="object-cover object-top"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 to-transparent" />
      <article className="relative z-20 mt-16 flex items-center justify-center px-4 md:mt-28 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex w-full flex-col items-center justify-center">
          <h1 className="mb-4 mt-28 text-center text-5xl font-semibold md:mb-6 md:max-w-4xl md:text-6xl">
            {type === "inferenceai"
              ? inferenceaiHeroHeading(lang)
              : ragChatbotHeroHeading(lang)}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="my-6 text-center text-base font-medium text-[#AFB0C3] md:my-10 md:max-w-3xl md:text-[22px]">
            {type === "inferenceai"
              ? inferenceaiHeroDesc(lang)
              : ragChatbotHeroDesc(lang)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}>
            <HeroCTAButton lang={lang} />
          </motion.div>
        </motion.div>
      </article>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
        className="relative z-10 h-56 w-full md:h-[400px]">
        <Image
          src="/images/inferenceai/banner.png"
          alt="Banner Bottom"
          fill
          className="object-cover object-center md:object-top"
        />

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#020F15] to-transparent md:h-32" />
      </motion.div>
    </section>
  );
}
