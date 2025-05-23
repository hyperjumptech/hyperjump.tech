import findAllPages from "@/helpers/find-all-pages";
import { MetadataRoute } from "next";

export const dynamic = "force-static";
const baseUrl = "http://hyperjump.tech";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const paths = findAllPages("out");

  const urls: MetadataRoute.Sitemap = Array.from(paths).map((p) => {
    const basePathWithoutLocale = p.replace(/\/en$/, "").replace(/\/id$/, "");
    const defaultPath = `${baseUrl}${basePathWithoutLocale}`;
    const englishPath = `${baseUrl}${basePathWithoutLocale}/en`;
    const indonesianPath = `${baseUrl}${basePathWithoutLocale}/id`;

    const alternates: { [key: string]: string } = {
      "x-default": defaultPath,
      en: englishPath
    };

    if (p.endsWith("/id") || (!p.endsWith("/en") && !p.endsWith("/id"))) {
      alternates["id"] = indonesianPath;
    }

    return {
      url: defaultPath,
      lastModified,
      alternates: {
        languages: alternates
      }
    };
  });

  return urls;
}
