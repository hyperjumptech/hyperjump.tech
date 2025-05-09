import MainLangLayout from "./[lang]/layout";
import MainPage from "./[lang]/page";
import { data } from "./[lang]/data";
import { Metadata } from "next";

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

export default function NoLangMain() {
  return (
    <MainLangLayout params={Promise.resolve({ lang: "en" })}>
      <MainPage params={Promise.resolve({ lang: "en" })} />
    </MainLangLayout>
  );
}
