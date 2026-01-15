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
} from "@/locales/.generated/server";
import type { SupportedLanguage } from "@/locales/.generated/types";

export function getCommercialProduct(lang: SupportedLanguage) {
  return [
    {
      title: productsCommercialData2Title(lang),
      description: productsCommercialData2Text(lang),
      image: "/images/products/media-pulse.svg"
      // urlLearnMore: "https://mediapulse.hyperjump.tech/",
      // url: "https://mediapulse.hyperjump.tech/"
    },
    {
      title: productsCommercialData1Title(lang),
      description: productsCommercialData1Text(lang),
      image: "/images/products/startGPT.svg",
      urlLearnMore: "https://startgpt.hyperjump.tech/"
    }
  ];
}

export function getOpenSource(lang: SupportedLanguage) {
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
