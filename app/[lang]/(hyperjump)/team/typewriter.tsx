"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = [
  "DevOps",
  "AI",
  "Java",
  "TypeScript",
  "JavaScript",
  "Swift",
  "Kotlin",
  "React",
  "Go",
  "React Native"
];

const TYPE_SPEED = 80;
const DELETE_SPEED = 50;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 400;

type Phase = "typing" | "pausing" | "deleting" | "waiting";

export function Typewriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    const word = WORDS[wordIndex];

    if (phase === "typing") {
      if (displayed.length < word.length) {
        const id = setTimeout(
          () => setDisplayed(word.slice(0, displayed.length + 1)),
          TYPE_SPEED
        );
        return () => clearTimeout(id);
      }
      setPhase("pausing");
    }

    if (phase === "pausing") {
      const id = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_TYPE);
      return () => clearTimeout(id);
    }

    if (phase === "deleting") {
      if (displayed.length > 0) {
        const id = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          DELETE_SPEED
        );
        return () => clearTimeout(id);
      }
      setPhase("waiting");
    }

    if (phase === "waiting") {
      const id = setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setPhase("typing");
      }, PAUSE_AFTER_DELETE);
      return () => clearTimeout(id);
    }
  }, [displayed, phase, wordIndex]);

  return (
    <span className="inline-flex items-baseline text-yellow-300">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={displayed}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          className="inline-block">
          {displayed}
        </motion.span>
      </AnimatePresence>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="ml-[2px] inline-block h-[0.85em] w-[3px] translate-y-[0.05em] rounded-full bg-current"
      />
    </span>
  );
}
