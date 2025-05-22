import { Metadata } from "next";
import CTOAsAServiceLangLayout from "./[lang]/layout";
import CTOAsAServicePage from "./[lang]/page";
import { ctoaasHeroDesc, ctoaasHeroHeading } from "@/locales/.generated/server";
import data from "@/data.json";

export const metadata: Metadata = {
  title: `Services - ${ctoaasHeroHeading("en")}`,
  description: ctoaasHeroDesc("en"),
  metadataBase: new URL("https://hyperjump.tech"),
  openGraph: {
    title: `Services - ${ctoaasHeroHeading("en")}`,
    description: ctoaasHeroDesc("en"),
    url: `${data.url}/services/cto-as-a-service`,
    siteName: ctoaasHeroHeading("en"),
    type: "website",
    images: [
      {
        url: "https://hyperjump.tech/images/hyperjump-og.png",
        width: 1200,
        height: 630,
        alt: `${ctoaasHeroHeading("en")} Logo`,
        type: "image/png"
      }
    ]
  }
};

export default function NoLangCTOAsAService() {
  return (
    <CTOAsAServiceLangLayout params={Promise.resolve({ lang: "en" })}>
      <CTOAsAServicePage params={Promise.resolve({ lang: "en" })} />
    </CTOAsAServiceLangLayout>
  );
}
