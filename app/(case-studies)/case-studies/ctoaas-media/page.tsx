import { Metadata } from "next";
import CtoaasMediaLangLayout from "./[lang]/layout";
import CtoaasMediaPage from "./[lang]/page";
import { caseStudyCtoaasMediaTitle } from "@/locales/.generated/server";
import data from "@/data.json";

export const metadata: Metadata = {
  title: `Case Studies - ${caseStudyCtoaasMediaTitle("en")}`,
  metadataBase: new URL("https://hyperjump.tech"),
  openGraph: {
    title: `Case Studies - ${caseStudyCtoaasMediaTitle("en")}`,
    url: `${data.url}/case-studies/ctoaas-media`,
    siteName: caseStudyCtoaasMediaTitle("en"),
    type: "website",
    images: [
      {
        url: "https://hyperjump.tech/images/hyperjump-og.png",
        width: 1200,
        height: 630,
        alt: `${caseStudyCtoaasMediaTitle("en")} Logo`,
        type: "image/png"
      }
    ]
  }
};

export default function NoLangCtoaasMedia() {
  return (
    <CtoaasMediaLangLayout params={Promise.resolve({ lang: "en" })}>
      <CtoaasMediaPage params={Promise.resolve({ lang: "en" })} />
    </CtoaasMediaLangLayout>
  );
}
