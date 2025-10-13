import {
  mainProject0Text,
  mainProject0Title,
  mainProject1Text,
  mainProject1Title,
  mainProject2Text,
  mainProject2Title,
  ourProductsCommercialData1Text,
  ourProductsCommercialData1Title,
  ourProductsCommercialData2Text,
  ourProductsCommercialData2Title,
  ourProductsCommercialData3Text,
  ourProductsCommercialData3Title
} from "@/locales/.generated/server";
import type { SupportedLanguage } from "@/locales/.generated/types";

export function getCommercialProduct(lang: SupportedLanguage) {
  return [
    {
      title: ourProductsCommercialData1Title(lang),
      description: ourProductsCommercialData1Text(lang),
      image: "/images/our-products/startGPT.svg",
      urlLearnMore: `/${lang}/inferenceai/startgpt`
    },
    {
      title: ourProductsCommercialData2Title(lang),
      description: ourProductsCommercialData2Text(lang),
      image: "/images/our-products/media-pulse.svg",
      urlLearnMore: `/${lang}/inferenceai/media-pulse`
    },
    {
      title: ourProductsCommercialData3Title(lang),
      description: ourProductsCommercialData3Text(lang),
      image: "/images/open-source/monika.svg",
      urlLearnMore: "https://monika.hyperjump.tech/"
    }
  ];
}

export function getOpenSource(lang: SupportedLanguage) {
  return [
    {
      title: mainProject1Title(lang),
      description: mainProject1Text(lang),
      image: "/images/open-source/monika.svg",
      url: "https://monika.hyperjump.tech/",
      repoUrl: "https://github.com/hyperjumptech/monika",
      button: true,
      repo: "monika"
    },
    {
      title: mainProject0Title(lang),
      description: mainProject0Text(lang),
      image: "/images/open-source/grule.svg",
      url: "https://github.com/hyperjumptech/grule-rule-engine",
      repoUrl: "https://github.com/hyperjumptech/grule-rule-engine",
      button: true,
      repo: "grule-rule-engine"
    },
    {
      title: mainProject2Title(lang),
      description: mainProject2Text(lang),
      image: "/images/open-source/whatsapp-chatbot-connector.svg",
      url: "https://github.com/hyperjumptech/whatsapp-chatbot-connector",
      repoUrl: "https://github.com/hyperjumptech/whatsapp-chatbot-connector",
      button: true,
      repo: "whatsapp-chatbot-connector"
    }
  ];
}
