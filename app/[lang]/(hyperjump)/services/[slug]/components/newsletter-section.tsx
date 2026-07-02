"use client";

import { useState } from "react";

import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  aiNewsletterCta,
  aiNewsletterDisclaimer,
  aiNewsletterError,
  aiNewsletterHeading,
  aiNewsletterLanguageEn,
  aiNewsletterLanguageId,
  aiNewsletterLanguageLabel,
  aiNewsletterLanguageSu,
  aiNewsletterPlaceholder,
  aiNewsletterSubheading,
  aiNewsletterSuccess
} from "@/locales/.generated/strings";

type NewsletterSectionProps = {
  lang: SupportedLanguage;
};

export function NewsletterSection({ lang }: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [digestLang, setDigestLang] = useState<"en" | "id" | "su">(
    lang === "id" ? "id" : "en"
  );
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed || !emailRegex.test(trimmed)) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, language: digestLang })
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-[#F6F8F9] py-8 md:py-16">
      <div className="text-hyperjump-black mx-auto flex w-full max-w-5xl flex-col items-center px-4 text-center md:px-20 xl:px-0">
        <h2 className="mb-3 text-[34px] font-medium md:text-4xl">
          {aiNewsletterHeading(lang)}
        </h2>
        <p className="mb-6 max-w-xl text-lg leading-relaxed text-gray-600">
          {aiNewsletterSubheading(lang)}
        </p>

        {/* Language dropdown */}
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
          <label htmlFor="digest-lang">{aiNewsletterLanguageLabel(lang)}</label>
          <select
            id="digest-lang"
            value={digestLang}
            onChange={(e) =>
              setDigestLang(e.target.value as "en" | "id" | "su")
            }
            className="rounded border border-gray-300 px-2 py-1 text-sm text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none">
            <option value="en">{aiNewsletterLanguageEn(lang)}</option>
            <option value="id">{aiNewsletterLanguageId(lang)}</option>
            <option value="su">{aiNewsletterLanguageSu(lang)}</option>
          </select>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={aiNewsletterPlaceholder(lang)}
            disabled={status === "loading" || status === "success"}
            className="text-hyperjump-black flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3 text-base placeholder-gray-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
            {status === "loading" ? "..." : aiNewsletterCta(lang)}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-4 text-sm font-medium text-green-600">
            {aiNewsletterSuccess(lang)}
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm font-medium text-red-500">
            {aiNewsletterError(lang)}
          </p>
        )}

        <p className="mt-4 text-sm text-gray-400">
          {aiNewsletterDisclaimer(lang)}
        </p>
      </div>
    </section>
  );
}
