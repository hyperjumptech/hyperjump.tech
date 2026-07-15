import {
  productsOpenSourceData1Text,
  productsOpenSourceData1Title,
  productsOpenSourceData2Text,
  productsOpenSourceData2Title,
  productsOpenSourceData3Title,
  productsOpenSourceData3Text,
  productsCommercialData1Text,
  productsCommercialData1Title,
  productsCommercialData2Text,
  productsCommercialData2Title,
  productsCommercialData4Text,
  productsCommercialData4Title,
  productsCommercialData5Text,
  productsCommercialData5Title,
  productsCommercialData6Text,
  productsCommercialData6Title,
  productsCommercialData7Text,
  productsCommercialData7Title,
  productsCommercialData8Text,
  productsCommercialData8Title,
  productsCommercialData9Text,
  productsCommercialData9Title
} from "@/locales/.generated/strings";
import type { SupportedLanguage } from "@/locales/.generated/types";

export type CommercialProduct = {
  title: string;
  description: string;
  image: string;
  urlLearnMore?: string;
};

/**
 * Returns commercial products for the products page, newest first.
 *
 * @param lang - Active locale for localized titles and descriptions
 */
export function getCommercialProduct(
  lang: SupportedLanguage
): CommercialProduct[] {
  return [
    {
      title: productsCommercialData6Title(lang),
      description: productsCommercialData6Text(lang),
      image: "/images/products/typetable.svg",
      urlLearnMore: "https://typetable.io"
    },
    {
      title: productsCommercialData7Title(lang),
      description: productsCommercialData7Text(lang),
      image: "/images/products/hydra8.png",
      urlLearnMore: "https://hydra8.hyperjump.tech"
    },
    {
      title: productsCommercialData8Title(lang),
      description: productsCommercialData8Text(lang),
      image: "/images/products/avenu.png",
      urlLearnMore: "https://avenu.hyperjump.tech"
    },
    {
      title: productsCommercialData9Title(lang),
      description: productsCommercialData9Text(lang),
      image: "/images/products/frontier-news.svg"
    },
    {
      title: productsCommercialData2Title(lang),
      description: productsCommercialData2Text(lang),
      image: "/images/products/media-pulse.svg",
      urlLearnMore: "https://mediapulse.hyperjump.tech/"
    },
    {
      title: productsCommercialData1Title(lang),
      description: productsCommercialData1Text(lang),
      image: "/images/products/startGPT.svg",
      urlLearnMore: "https://startgpt.hyperjump.tech/"
    },
    {
      title: productsCommercialData4Title(lang),
      description: productsCommercialData4Text(lang),
      image: "/images/products/neosense.svg",
      urlLearnMore: "https://www.biznetgio.com/product/neo-sense"
    },
    {
      title: productsCommercialData5Title(lang),
      description: productsCommercialData5Text(lang),
      image: "/images/products/monitime.svg",
      urlLearnMore:
        "https://monitime.qwords.com/?_gl=1*fc90su*_gcl_au*MTMzOTk4Njk4MC4xNzY5Mzk5NjQx"
    }
  ];
}

export type OpenSourceProduct = {
  title: string;
  description: string;
  image: string;
  url: string;
  repoUrl: string;
  button: boolean;
  repo: string;
};

/**
 * Returns open-source products for the products page.
 *
 * @param lang - Active locale for localized titles and descriptions
 */
export function openSourceProducts(
  lang: SupportedLanguage
): OpenSourceProduct[] {
  return [
    {
      title: productsOpenSourceData1Title(lang),
      description: productsOpenSourceData1Text(lang),
      image: "/images/open-source/monika.svg",
      url: "https://monika.hyperjump.tech/",
      repoUrl: "https://github.com/hyperjumptech/monika",
      button: true,
      repo: "monika"
    },
    {
      title: productsOpenSourceData2Title(lang),
      description: productsOpenSourceData2Text(lang),
      image: "/images/open-source/grule.svg",
      url: "https://github.com/hyperjumptech/grule-rule-engine",
      repoUrl: "https://github.com/hyperjumptech/grule-rule-engine",
      button: true,
      repo: "grule-rule-engine"
    },
    {
      title: productsOpenSourceData3Title(lang),
      description: productsOpenSourceData3Text(lang),
      image: "/images/open-source/whatsapp-chatbot-connector.svg",
      url: "https://github.com/hyperjumptech/whatsapp-chatbot-connector",
      repoUrl: "https://github.com/hyperjumptech/whatsapp-chatbot-connector",
      button: true,
      repo: "whatsapp-chatbot-connector"
    }
  ];
}
