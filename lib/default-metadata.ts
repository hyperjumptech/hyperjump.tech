import type { Metadata } from "next";
import data from "@/data.json";
import { supportedLanguages } from "@/locales/.generated/types";

const { description, title, url } = data;
const DEFAULT_IMAGE = `${url}/images/hyperjump-og.png`;
export const DEFAULT_OPENGRAPH: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  authors: [
    {
      name: "Nico Prananta",
      url: "https://nico.fyi"
    }
  ],
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/apple-touch-icon.png",
    shortcut: "/icons/icon-192x192.png"
  },
  openGraph: {
    title,
    description,
    type: "website",
    url,
    siteName: title,
    images: {
      url: DEFAULT_IMAGE,
      width: 1200,
      height: 630,
      alt: title
    }
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: DEFAULT_IMAGE
  },
  alternates: {
    canonical: `${url}/`,
    languages: supportedLanguages.reduce(
      (acc, l) => {
        acc[l] = `${url}/${l}`;
        return acc;
      },
      {} as Record<string, string>
    )
  }
};

export type DynamicOpengraphImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

export type DynamicOpengraphOptions = Metadata & {
  /** Optional Open Graph / Twitter image override */
  image?: DynamicOpengraphImage;
};

/**
 * Merges page metadata with site-wide Open Graph defaults.
 *
 * @param options - Page title, description, alternates, and optional OG image
 * @returns Metadata object with Open Graph and Twitter tags
 */
export function dynamicOpengraph({
  title: dynamicTitle,
  description: dynamicDescription,
  image,
  openGraph,
  twitter,
  alternates,
  ...rest
}: DynamicOpengraphOptions): Metadata {
  const resolvedTitle = dynamicTitle || title;
  const resolvedDescription = dynamicDescription || description;
  const resolvedImage = image ?? {
    url: DEFAULT_IMAGE,
    width: 1200,
    height: 630,
    alt: (resolvedTitle as string) || title
  };

  return {
    ...DEFAULT_OPENGRAPH,
    ...rest,
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: alternates ?? DEFAULT_OPENGRAPH.alternates,
    openGraph: {
      ...DEFAULT_OPENGRAPH.openGraph,
      ...openGraph,
      title: resolvedTitle,
      description: resolvedDescription,
      images: resolvedImage
    },
    twitter: {
      ...DEFAULT_OPENGRAPH.twitter,
      ...twitter,
      title: resolvedTitle,
      description: resolvedDescription,
      images: resolvedImage
    }
  };
}
