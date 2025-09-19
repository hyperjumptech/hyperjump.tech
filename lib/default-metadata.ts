import { Metadata } from "next";
import data from "@/data.json";
import { supportedLanguages } from "@/locales/.generated/types";

const { description, title, url } = data;

const DEFAULT_BASE_URL = url || "https://hyperjump.tech";
const DEFAULT_TITLE = title || "Hyperjump Technology";
const DEFAULT_DESCRIPTION =
  description || "Your partner in building reliable, modern software.";
const DEFAULT_IMAGE = `${DEFAULT_BASE_URL}/images/hyperjump-og.png`;

const DEFAULT_ALTERNATES = {
  canonical: `${DEFAULT_BASE_URL}/`,
  languages: supportedLanguages.reduce(
    (acc, l) => {
      acc[l] = `${DEFAULT_BASE_URL}/${l}`;
      return acc;
    },
    {} as Record<string, string>
  )
};

export const DEFAULT_OPENGRAPH: Metadata = {
  metadataBase: new URL(DEFAULT_BASE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
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
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    type: "website",
    url: DEFAULT_BASE_URL,
    siteName: DEFAULT_TITLE,
    images: [
      {
        url: DEFAULT_IMAGE,
        width: 1200,
        height: 630,
        alt: DEFAULT_TITLE
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_IMAGE]
  },
  alternates: DEFAULT_ALTERNATES
};

export const dynamicOpengraph = ({
  title,
  description,
  images,
  canonicalUrl,
  url = DEFAULT_BASE_URL
}: {
  title?: string;
  description?: string;
  images?: string | string[];
  canonicalUrl?: string;
  url?: string;
}): Metadata => {
  const imageArray = Array.isArray(images) ? images : [images || DEFAULT_IMAGE];

  return {
    ...DEFAULT_OPENGRAPH,
    title: title || DEFAULT_TITLE,
    description: description || DEFAULT_DESCRIPTION,
    openGraph: {
      ...DEFAULT_OPENGRAPH.openGraph,
      title: title || DEFAULT_TITLE,
      description: description || DEFAULT_DESCRIPTION,
      url,
      images: imageArray.map((img) => ({
        url: img,
        width: 1200,
        height: 630,
        alt: title || DEFAULT_TITLE
      }))
    },
    alternates: {
      ...DEFAULT_ALTERNATES,
      canonical: canonicalUrl || `${DEFAULT_BASE_URL}/`
    },
    twitter: {
      ...DEFAULT_OPENGRAPH.twitter,
      title: title || DEFAULT_TITLE,
      description: description || DEFAULT_DESCRIPTION,
      images: imageArray
    }
  };
};
