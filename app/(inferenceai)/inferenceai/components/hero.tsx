"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import data from "../inferenceai-data.json";
import { ScheduleConsultationButton } from "./grid-items";

export default function Hero() {
  const { header, subheader, image, banner } = data.hero;

  return (
    <section className="relative overflow-hidden bg-[#04040B] text-white">
      {/* Background Image with Zoom-in Effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: "easeOut" }}
        className="absolute inset-0 z-0">
        <Image
          src={image}
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
          <h1 className="font-figtree mb-4 mt-28 bg-gradient-to-b from-white to-[#0C1711] bg-clip-text text-center text-5xl font-semibold leading-[120%] tracking-[-0.02em] text-transparent md:mb-6 md:max-w-4xl md:text-6xl">
            {header}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="my-6 text-base font-medium text-[#AFB0C3] md:my-10 md:max-w-3xl md:text-xl">
            {subheader}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}>
            <ScheduleConsultationButton />
          </motion.div>
        </motion.div>
      </article>

      {/* Bottom Banner with Fade-in */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
        className="relative z-10 h-56 w-full md:h-[400px]">
        <Image
          src={banner}
          alt="Banner Bottom"
          fill
          className="object-cover object-center md:object-top"
        />
      </motion.div>
    </section>
  );
}
