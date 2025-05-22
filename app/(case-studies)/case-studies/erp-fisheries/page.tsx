import { Metadata } from "next";
import ErpFisheriesLangLayout from "./[lang]/layout";
import ErpFisheriesPage from "./[lang]/page";
import { caseStudyErpFisheriesTitle } from "@/locales/.generated/server";
import data from "@/data.json";

export const metadata: Metadata = {
  title: `Case Studies - ${caseStudyErpFisheriesTitle("en")}`,
  metadataBase: new URL("https://hyperjump.tech"),
  openGraph: {
    title: `Case Studies - ${caseStudyErpFisheriesTitle("en")}`,
    url: `${data.url}/case-studies/erp-fisheries`,
    siteName: caseStudyErpFisheriesTitle("en"),
    type: "website",
    images: [
      {
        url: "https://hyperjump.tech/images/hyperjump-og.png",
        width: 1200,
        height: 630,
        alt: `${caseStudyErpFisheriesTitle("en")} Logo`,
        type: "image/png"
      }
    ]
  }
};

export default function NoLangErpFisheries() {
  return (
    <ErpFisheriesLangLayout params={Promise.resolve({ lang: "en" })}>
      <ErpFisheriesPage params={Promise.resolve({ lang: "en" })} />
    </ErpFisheriesLangLayout>
  );
}
