import { Metadata } from "next";
import TechDueDilligenceLangLayout from "./[lang]/layout";
import TechDueDilligencePage from "./[lang]/page";
import { tddHeroDesc, tddHeroHeading } from "@/locales/.generated/server";
import data from "@/data.json";

export const metadata: Metadata = {
  title: `Services - ${tddHeroHeading("en")}`,
  description: tddHeroDesc("en"),
  metadataBase: new URL("https://hyperjump.tech"),
  openGraph: {
    title: `Services - ${tddHeroHeading("en")}`,
    description: tddHeroDesc("en"),
    url: `${data.url}/services/tech-due-diligence`,
    siteName: tddHeroHeading("en"),
    type: "website",
    images: [
      {
        url: "https://hyperjump.tech/images/hyperjump-og.png",
        width: 1200,
        height: 630,
        alt: `${tddHeroHeading("en")} Logo`,
        type: "image/png"
      }
    ]
  }
};

export default function NoLangTechDueDilligence() {
  return (
    <TechDueDilligenceLangLayout params={Promise.resolve({ lang: "en" })}>
      <TechDueDilligencePage params={Promise.resolve({ lang: "en" })} />
    </TechDueDilligenceLangLayout>
  );
}
