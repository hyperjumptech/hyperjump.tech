import type { Metadata } from "next";

import { SearchpointPage } from "@/app/searchpoint/searchpoint-page";
import { supportedLanguages } from "@/locales/.generated/types";
import data from "@/data.json";

const { url } = data;

const TITLE =
  "SearchPoint | Unified search for PC files, OneDrive, and SharePoint";
const DESCRIPTION =
  "Stop switching apps to find documents. SearchPoint searches local files, OneDrive, and SharePoint in one place. On-premise deployment; permissions respected; raw files stay in your environment.";

const OG_IMAGE = `${url}/images/searchpoint/feature-sp-1-trimmed.webp`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${url}/${supportedLanguages[0]}/searchpoint`,
    languages: supportedLanguages.reduce(
      (acc, l) => {
        acc[l] = `${url}/${l}/searchpoint`;
        return acc;
      },
      {} as Record<string, string>
    )
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${url}/${supportedLanguages[0]}/searchpoint`,
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        alt: "SearchPoint unified search across local files and Microsoft 365."
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE]
  }
};

export async function generateStaticParams() {
  return supportedLanguages.map((lang) => ({ lang }));
}

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SearchPoint",
    applicationCategory: "BusinessApplication",
    description: DESCRIPTION,
    url: `${url}/${supportedLanguages[0]}/searchpoint`,
    publisher: {
      "@type": "Organization",
      name: "Hyperjump Technology",
      url
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SearchpointPage />
    </>
  );
}
