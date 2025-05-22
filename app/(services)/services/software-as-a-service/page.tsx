import { Metadata } from "next";
import SaasLangLayout from "./[lang]/layout";
import SaasPage from "./[lang]/page";
import { saasHeroDesc, saasHeroHeading } from "@/locales/.generated/server";
import data from "@/data.json";

export const metadata: Metadata = {
  title: `Services - ${saasHeroHeading("en")}`,
  description: saasHeroDesc("en"),
  metadataBase: new URL("https://hyperjump.tech"),
  openGraph: {
    title: `Services - ${saasHeroHeading("en")}`,
    description: saasHeroDesc("en"),
    url: `${data.url}/services/software-as-a-service`,
    siteName: saasHeroHeading("en"),
    type: "website",
    images: [
      {
        url: "https://hyperjump.tech/images/hyperjump-og.png",
        width: 1200,
        height: 630,
        alt: `${saasHeroHeading("en")} Logo`,
        type: "image/png"
      }
    ]
  }
};

export default function NoLangSaas() {
  return (
    <SaasLangLayout params={Promise.resolve({ lang: "en" })}>
      <SaasPage params={Promise.resolve({ lang: "en" })} />
    </SaasLangLayout>
  );
}
