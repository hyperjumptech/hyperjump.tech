import data from "@/data.json";

import type { SupportedLanguage } from "@/locales/.generated/types";

import { SITE_URL } from "./site-url";

/**
 * Footer links, overridable at build time with FOOTER_* variables
 * (see .env.oneai). Falls back to data.json values when unset.
 */

type Social = {
  platform: string;
  url: string;
  icon: string;
};

const SOCIAL_ENV_KEYS: Record<string, string> = {
  LinkedIn: "FOOTER_SOCIAL_LINKEDIN_URL",
  GitHub: "FOOTER_SOCIAL_GITHUB_URL",
  Medium: "FOOTER_SOCIAL_MEDIUM_URL",
  Substack: "FOOTER_SOCIAL_SUBSTACK_URL"
};

/**
 * Hyperjump logo link in the footer.
 *
 * - OneAI build (.env.oneai): FOOTER_LOGO_HREF points to the main site,
 *   e.g. https://hyperjump.tech/ — the standalone deploy has no homepage.
 * - Normal en/id build: `${SITE_URL}/<lang>` where SITE_URL comes from
 *   NEXT_PUBLIC_SITE_URL (env), falling back to data.json.
 */
export function footerLogoHref(lang: SupportedLanguage) {
  return process.env.FOOTER_LOGO_HREF || `${SITE_URL}/${lang}`;
}

export const footerSocials: Social[] = data.socials.map(
  ({ platform, url, icon }) => {
    const override = process.env[SOCIAL_ENV_KEYS[platform] ?? ""];
    return {
      platform,
      icon,
      url: override || url
    };
  }
);
