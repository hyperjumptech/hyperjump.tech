import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  aiWorkshopMetaDescription,
  aiWorkshopMetaSchemaName,
  aiWorkshopMetaTitle
} from "@/locales/.generated/strings";

import {
  getAiWorkshopOgImagePath,
  getAiWorkshopStructuredImages
} from "./get-ai-workshop-assets";
import {
  getDefaultAiWorkshopFaqs,
  type AiWorkshopFaq
} from "./get-ai-workshop-content";

export type GetAiWorkshopJsonLdOptions = {
  lang: SupportedLanguage;
  pageUrl: string;
  siteUrl: string;
  /** FAQ loader for tests */
  getFaqs?: (lang: SupportedLanguage) => AiWorkshopFaq[];
  /** Title loader for tests */
  getTitle?: (lang: SupportedLanguage) => string;
  /** Short course name loader for tests */
  getCourseName?: (lang: SupportedLanguage) => string;
  /** Description loader for tests */
  getDescription?: (lang: SupportedLanguage) => string;
  /** Image URL loader for tests */
  getImages?: (lang: SupportedLanguage) => string[];
};

/**
 * Returns structured data graphs for the AI workshop landing page.
 *
 * @param options - Locale, URLs, and optional string loaders for DI
 * @returns JSON-LD graph with WebPage, Course, FAQPage, and BreadcrumbList
 */
export function getAiWorkshopJsonLd({
  lang,
  pageUrl,
  siteUrl,
  getFaqs = (locale) => getDefaultAiWorkshopFaqs({ lang: locale }),
  getTitle = aiWorkshopMetaTitle,
  getCourseName = aiWorkshopMetaSchemaName,
  getDescription = aiWorkshopMetaDescription,
  getImages = (locale) =>
    getAiWorkshopStructuredImages({ lang: locale, siteUrl })
}: GetAiWorkshopJsonLdOptions) {
  const faqs = getFaqs(lang);
  const name = getTitle(lang);
  const courseName = getCourseName(lang);
  const description = getDescription(lang);
  const images = getImages(lang);
  const ogImage = images[0] ?? `${siteUrl}${getAiWorkshopOgImagePath(lang)}`;
  const inLanguage = lang === "id" ? "id" : "en";
  const organization = {
    "@type": "Organization",
    name: "Hyperjump Technology",
    url: siteUrl,
    logo: `${siteUrl}/images/hyperjump-colored.png`
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: lang === "id" ? "Beranda" : "Home",
            item: `${siteUrl}/${lang}`
          },
          {
            "@type": "ListItem",
            position: 2,
            name: name,
            item: pageUrl
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": pageUrl,
        url: pageUrl,
        name,
        description,
        inLanguage,
        isPartOf: {
          "@type": "WebSite",
          name: "Hyperjump Technology",
          url: siteUrl
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: ogImage,
          width: 1200,
          height: 630
        }
      },
      {
        "@type": "Course",
        name: courseName,
        description,
        url: pageUrl,
        image: images,
        inLanguage,
        educationalLevel: "professional",
        courseMode: "Onsite",
        teaches:
          lang === "id"
            ? [
                "Di mana AI generatif gagal",
                "Kapan AI tidak perlu dipakai",
                "Cara memverifikasi keluaran AI"
              ]
            : [
                "Where generative AI fails",
                "When not to use AI",
                "How to verify AI output"
              ],
        provider: organization,
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "Onsite",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name:
              lang === "id"
                ? "Di lokasi klien, Indonesia"
                : "At the client's site, Indonesia",
            address: {
              "@type": "PostalAddress",
              addressCountry: "ID"
            }
          }
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(({ answer, question }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer
          }
        }))
      }
    ]
  };
}

export { AI_WORKSHOP_OG_IMAGE_PATH } from "./get-ai-workshop-assets";
