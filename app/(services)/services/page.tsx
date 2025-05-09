import { Metadata } from "next";
import ServicesLangLayout from "./[lang]/layout";
import ServicesPage from "./[lang]/page";
import { data } from "@/app/(inferenceai)/inferenceai/data";

export async function generateMetadata(): Promise<Metadata> {
  const { baseUrl, name } = data;
  const title = `${name} - Open source first. Cloud native. DevOps excellence.`;

  return {
    description: "Open source first. Cloud native. DevOps excellence.",
    title,
    openGraph: {
      url: baseUrl,
      type: "website",
      title,
      images: [
        {
          url: "https://hyperjump.tech/images/hyperjump-og.png",
          width: 1200,
          height: 630,
          alt: `${name} Logo`,
          type: "image/png"
        }
      ],
      siteName: name
    }
  };
}

export default function NoLangServices() {
  return (
    <ServicesLangLayout params={Promise.resolve({ lang: "en" })}>
      <ServicesPage params={Promise.resolve({ lang: "en" })} />
    </ServicesLangLayout>
  );
}
