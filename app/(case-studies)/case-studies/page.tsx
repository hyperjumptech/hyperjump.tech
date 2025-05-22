import { Metadata } from "next";
import CaseStudiesLangLayout from "./[lang]/layout";
import CaseStudiesPage from "./[lang]/page";
import {
  caseStudyHeroDesc,
  caseStudyHeroHeading
} from "@/locales/.generated/server";
import data from "@/data.json";

export const metadata: Metadata = {
  title: `${data.title} - Case Studies`,
  description: caseStudyHeroDesc("en"),
  metadataBase: new URL("https://hyperjump.tech"),
  openGraph: {
    title: `Case Studies - ${caseStudyHeroHeading("en")}`,
    description: caseStudyHeroDesc("en"),
    url: `${data.url}/case-studies`,
    siteName: caseStudyHeroHeading("en"),
    type: "website",
    images: [
      {
        url: "https://hyperjump.tech/images/hyperjump-og.png",
        width: 1200,
        height: 630,
        alt: `Case Studies Logo`,
        type: "image/png"
      }
    ]
  }
};

export default function NoLangCaseStudies() {
  return (
    <CaseStudiesLangLayout params={Promise.resolve({ lang: "en" })}>
      <CaseStudiesPage params={Promise.resolve({ lang: "en" })} />
    </CaseStudiesLangLayout>
  );
}
