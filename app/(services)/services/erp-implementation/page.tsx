import { Metadata } from "next";
import ERPImplementationLangLayout from "./[lang]/layout";
import ERPImplementationPage from "./[lang]/page";
import { erpHeroDesc, erpHeroHeading } from "@/locales/.generated/server";
import data from "@/data.json";

export const metadata: Metadata = {
  title: `Services - ${erpHeroHeading("en")}`,
  description: erpHeroDesc("en"),
  metadataBase: new URL("https://hyperjump.tech"),
  openGraph: {
    title: `Services - ${erpHeroHeading("en")}`,
    description: erpHeroDesc("en"),
    url: `${data.url}/services/erp-implementation`,
    siteName: erpHeroHeading("en"),
    type: "website",
    images: [
      {
        url: "https://hyperjump.tech/images/hyperjump-og.png",
        width: 1200,
        height: 630,
        alt: `${erpHeroHeading("en")} Logo`,
        type: "image/png"
      }
    ]
  }
};

export default function NoLangERPImplementation() {
  return (
    <ERPImplementationLangLayout params={Promise.resolve({ lang: "en" })}>
      <ERPImplementationPage params={Promise.resolve({ lang: "en" })} />
    </ERPImplementationLangLayout>
  );
}
