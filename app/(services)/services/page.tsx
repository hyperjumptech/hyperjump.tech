import { Metadata } from "next";
import ServicesLangLayout from "./[lang]/layout";
import ServicesPage from "./[lang]/page";
import {
  servicesHeroDesc,
  servicesHeroHeading
} from "@/locales/.generated/server";
import data from "@/data.json";

export const metadata: Metadata = {
  title: `${data.title} - Services}`,
  description: servicesHeroDesc("en"),
  metadataBase: new URL("https://hyperjump.tech"),
  openGraph: {
    title: `Services - ${servicesHeroHeading("en")}`,
    description: servicesHeroDesc("en"),
    url: `${data.url}/services`,
    siteName: servicesHeroHeading("en"),
    type: "website",
    images: [
      {
        url: "https://hyperjump.tech/images/hyperjump-og.png",
        width: 1200,
        height: 630,
        alt: `${servicesHeroHeading("en")} Logo`,
        type: "image/png"
      }
    ]
  }
};

export default function NoLangServices() {
  return (
    <ServicesLangLayout params={Promise.resolve({ lang: "en" })}>
      <ServicesPage params={Promise.resolve({ lang: "en" })} />
    </ServicesLangLayout>
  );
}
