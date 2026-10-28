import data from "@/data.json";

/**
 * Base URL used for metadata, canonical links, Open Graph, and JSON-LD.
 *
 * Falls back to the main site URL from data.json. Standalone builds
 * (e.g. the OneAI landing page deployed to oneaisystem.tech) override it
 * with NEXT_PUBLIC_SITE_URL, see .env.oneai.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || data.url;
