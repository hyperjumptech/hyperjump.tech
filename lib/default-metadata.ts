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

export function dynamicOpengraph({
  title: dynamicTitle,
  description: dynamicDescription
}: Metadata): Metadata {
  return {
    ...DEFAULT_OPENGRAPH,
    title: dynamicTitle || title,
    description: dynamicDescription || description,
    openGraph: {
      ...DEFAULT_OPENGRAPH.openGraph,
      title: dynamicTitle || title,
      description: dynamicDescription || description,
      images: {
        url: DEFAULT_IMAGE,
        width: 1200,
        height: 630,
        alt: (dynamicTitle as string) || title
      }
    },
    twitter: {
      ...DEFAULT_OPENGRAPH.twitter,
      title: dynamicTitle || title,
      description: dynamicDescription || description,
      images: {
        url: DEFAULT_IMAGE,
        width: 1200,
        height: 630,
        alt: (dynamicTitle as string) || title
      }
    }
  };
}
