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
  productsCommercialData5Title
} from "@/locales/.generated/strings";
import type { SupportedLanguage } from "@/locales/.generated/types";

export type CommercialProduct = {
  title: string;
  description: string;
  image: string;
  urlLearnMore: string;
};

export function getCommercialProduct(
  lang: SupportedLanguage
): CommercialProduct[] {
  return [
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
