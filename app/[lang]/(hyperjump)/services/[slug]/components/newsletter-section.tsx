"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef, useState } from "react";

import type { SupportedLanguage } from "@/locales/.generated/types";

type NewsletterSectionProps = {
  lang: SupportedLanguage;
};

type DigestLang = "en" | "id" | "su" | "de";

type NewsletterCopy = {
  heading: string;
  subheading: string;
  placeholder: string;
  cta: string;
  disclaimer: string;
  success: string;
  error: string;
  captchaError: string;
  languageLabel: string;
  languageEn: string;
  languageId: string;
  languageSu: string;
  languageDe: string;
};

const newsletterCopyByDigestLang: Record<
  "en" | "id" | "de" | "su",
  NewsletterCopy
> = {
    en: {
      heading: "Stay Ahead of the Curve",
      subheading:
        "Get practical AI insights, agent architecture breakdowns, and real-world implementation stories — straight to your inbox.",
      placeholder: "Enter your email",
      cta: "Subscribe",
      disclaimer: "No spam. Unsubscribe anytime.",
      success:
        "Almost there! Check your inbox to confirm your subscription.",
      error: "Something went wrong. Please try again.",
      captchaError: "Please complete the CAPTCHA verification.",
      languageLabel: "Digest language:",
      languageEn: "English",
      languageId: "Bahasa Indonesia",
      languageSu: "Basa Sunda",
      languageDe: "Deutsch"
    },
    id: {
      heading: "Selangkah Lebih Maju",
      subheading:
        "Dapatkan insight AI praktis, breakdown arsitektur agent, dan kisah implementasi nyata — langsung ke kotak masukmu.",
      placeholder: "Masukkan email kamu",
      cta: "Langganan",
      disclaimer: "Tanpa spam. Bisa berhenti berlangganan kapan saja.",
      success: "Hampir selesai! Cek email kamu untuk konfirmasi langganan.",
      error: "Terjadi kesalahan. Silakan coba lagi.",
      captchaError: "Mohon selesaikan verifikasi CAPTCHA terlebih dahulu.",
      languageLabel: "Bahasa digest:",
      languageEn: "English",
      languageId: "Bahasa Indonesia",
      languageSu: "Basa Sunda",
      languageDe: "Deutsch"
    },
    de: {
      heading: "Bleiben Sie immer einen Schritt voraus",
      subheading:
        "Erhalte praxisnahe KI-Einblicke, detaillierte Agent-Architekturen und Berichte aus echten Implementierungen — direkt in dein Postfach.",
      placeholder: "Gib deine E-Mail-Adresse ein",
      cta: "Abonnieren",
      disclaimer: "Kein Spam. Jederzeit abbestellbar.",
      success:
        "Fast geschafft! Bestätige dein Abonnement über den Link in deinem Postfach.",
      error: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
      captchaError: "Bitte schließe die CAPTCHA-Verifizierung ab.",
      languageLabel: "Digest-Sprache:",
      languageEn: "English",
      languageId: "Bahasa Indonesia",
      languageSu: "Basa Sunda",
      languageDe: "Deutsch"
    },
    su: {
      heading: "Salangkung Leuwih Maju",
      subheading:
        "Kenging insight AI anu praktis, bedah arsitektur agent, sareng carita implementasi nyata — langsung ka kotak surel anjeun.",
      placeholder: "Lebetkeun email anjeun",
      cta: "Langganan",
      disclaimer: "Tanpa spam. Tiasa eureun langganan iraha wae.",
      success: "Ampir rengse! Pariksa email anjeun kanggo konfirmasi langganan.",
      error: "Aya kasalahan. Mangga cobian deui.",
      captchaError: "Mangga lengkepan verifikasi CAPTCHA heula.",
      languageLabel: "Basa digest:",
      languageEn: "English",
      languageId: "Bahasa Indonesia",
      languageSu: "Basa Sunda",
      languageDe: "Deutsch"
    }
  };

export function NewsletterSection({ lang }: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [digestLang, setDigestLang] = useState<DigestLang>(
    lang === "id" ? "id" : "en"
  );
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "captcha-error"
  >("idle");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const copy = newsletterCopyByDigestLang[digestLang] ??
    newsletterCopyByDigestLang.en;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed || !emailRegex.test(trimmed)) {
      setStatus("error");
      return;
    }

    if (!captchaToken) {
      setStatus("captcha-error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          language: digestLang,
          turnstileToken: captchaToken
        })
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setCaptchaToken(null);
      turnstileRef.current?.reset();
    }
  };

  return (
    <section className="bg-[#F6F8F9] py-8 md:py-16">
      <div className="text-hyperjump-black mx-auto flex w-full max-w-5xl flex-col items-center px-4 text-center md:px-20 xl:px-0">
        <h2 className="mb-3 text-[34px] font-medium md:text-4xl">
          {copy.heading}
        </h2>
        <p className="mb-6 max-w-xl text-lg leading-relaxed text-gray-600">
          {copy.subheading}
        </p>

        {/* Language dropdown */}
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
          <label htmlFor="digest-lang">{copy.languageLabel}</label>
          <select
            id="digest-lang"
            value={digestLang}
            onChange={(e) =>
              setDigestLang(e.target.value as "en" | "id" | "su" | "de")
            }
            className="rounded border border-gray-300 px-2 py-1 text-sm text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none">
            <option value="en">{copy.languageEn}</option>
            <option value="id">{copy.languageId}</option>
            <option value="de">{copy.languageDe}</option>
            <option value="su">{copy.languageSu}</option>
          </select>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-xl flex-col gap-3">
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={copy.placeholder}
              disabled={status === "loading" || status === "success"}
              className="text-hyperjump-black flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3 text-base placeholder-gray-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={
                status === "loading" || status === "success" || !captchaToken
              }
              className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
              {status === "loading" ? "..." : copy.cta}
            </button>
          </div>

          <div className="flex justify-center">
            <Turnstile
              ref={turnstileRef}
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
              onSuccess={(token) => setCaptchaToken(token)}
              onExpire={() => setCaptchaToken(null)}
              onError={() => setCaptchaToken(null)}
            />
          </div>
        </form>

        {status === "success" && (
          <p className="mt-4 text-sm text-green-700">{copy.success}</p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm text-red-400">{copy.error}</p>
        )}
        {status === "captcha-error" && (
          <p className="mt-4 text-sm text-red-400">
            {copy.captchaError}
          </p>
        )}

        <p className="mt-4 text-sm text-gray-400">{copy.disclaimer}</p>
      </div>
    </section>
  );
}
