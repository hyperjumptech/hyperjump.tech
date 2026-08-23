import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  oneaiFaq0Answer,
  oneaiFaq0Question,
  oneaiFaq1Answer,
  oneaiFaq1Question,
  oneaiFaq2Answer,
  oneaiFaq2Question,
  oneaiFaq3Answer,
  oneaiFaq3Question,
  oneaiFaq4Answer,
  oneaiFaq4Question,
  oneaiFaq5Answer,
  oneaiFaq5Question,
  oneaiFaq6Answer,
  oneaiFaq6Question,
  oneaiFaq7Answer,
  oneaiFaq7Question,
  oneaiMetaDescription,
  oneaiMetaTitle
} from "@/locales/.generated/strings";

export type OneaiFaq = {
  question: string;
  answer: string;
};

export type GetOneaiJsonLdOptions = {
  lang: SupportedLanguage;
  pageUrl: string;
  siteUrl: string;
  /** FAQ loader for tests */
  getFaqs?: (lang: SupportedLanguage) => OneaiFaq[];
  /** Title loader for tests */
  getTitle?: (lang: SupportedLanguage) => string;
  /** Description loader for tests */
  getDescription?: (lang: SupportedLanguage) => string;
};

const ONEAI_OG_IMAGE_PATH = "/images/oneai/og.png";

/**
 * Returns structured data graphs for the OneAI landing page.
 *
 * @param options - Locale, URLs, and optional string loaders for DI
 * @returns JSON-LD graph with SoftwareApplication, Offer, FAQPage, and BreadcrumbList
 */
export function getOneaiJsonLd({
  lang,
  pageUrl,
  siteUrl,
  getFaqs = getDefaultOneaiFaqs,
  getTitle = oneaiMetaTitle,
  getDescription = oneaiMetaDescription
}: GetOneaiJsonLdOptions) {
  const faqs = getFaqs(lang);
  const productName = getTitle(lang);
  const description = getDescription(lang);

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
            name: productName,
            item: pageUrl
          }
        ]
      },
      {
        "@type": "SoftwareApplication",
        name: "OneAI",
        applicationCategory: "BusinessApplication",
        operatingSystem: "On-premises, Web",
        description,
        url: pageUrl,
        image: `${siteUrl}${ONEAI_OG_IMAGE_PATH}`,
        offers: {
          "@type": "Offer",
          price: "12400000",
          priceCurrency: "IDR",
          description:
            lang === "id"
              ? "Paket hingga 40 pengguna, ditagih per kuartal, sebelum pajak"
              : "Plan for up to 40 users, billed quarterly, before tax",
          url: pageUrl
        },
        provider: {
          "@type": "Organization",
          name: "Hyperjump Technology",
          url: siteUrl
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

/**
 * Loads default OneAI FAQ entries for the active locale.
 *
 * @param lang - Active locale
 * @returns Ordered FAQ question and answer pairs
 */
export function getDefaultOneaiFaqs(lang: SupportedLanguage): OneaiFaq[] {
  return [
    { question: oneaiFaq0Question(lang), answer: oneaiFaq0Answer(lang) },
    { question: oneaiFaq5Question(lang), answer: oneaiFaq5Answer(lang) },
    { question: oneaiFaq1Question(lang), answer: oneaiFaq1Answer(lang) },
    { question: oneaiFaq6Question(lang), answer: oneaiFaq6Answer(lang) },
    { question: oneaiFaq2Question(lang), answer: oneaiFaq2Answer(lang) },
    { question: oneaiFaq7Question(lang), answer: oneaiFaq7Answer(lang) },
    { question: oneaiFaq3Question(lang), answer: oneaiFaq3Answer(lang) },
    { question: oneaiFaq4Question(lang), answer: oneaiFaq4Answer(lang) }
  ];
}

export { ONEAI_OG_IMAGE_PATH };
