import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  mainNavItems0Label,
  mainNavItems1Label,
  mainNavItems2Label,
  mainNavItems3Label,
  mainCaseStudies0Title,
  mainCaseStudies1Title,
  mainCaseStudies0Text,
  mainCaseStudies1Text,
  mainCaseStudies0Category,
  mainCaseStudies1Category,
  mainProject0Title,
  mainProject1Title,
  mainProject2Title,
  mainProject0Text,
  mainProject1Text,
  mainProject2Text,
  mainFaq0Question,
  mainFaq1Question,
  mainFaq2Question,
  mainFaq3Question,
  mainFaq0Answer,
  mainFaq1Answer,
  mainFaq2Answer,
  mainFaq3Answer
} from "@/locales/.generated/server";

export const mainNav = (lang: SupportedLanguage) => {
  const data = [
    { label: mainNavItems0Label(lang), href: `/${lang}/services` },
    { label: mainNavItems1Label(lang), href: `/${lang}/case-studies` },
    { label: mainNavItems2Label(lang), href: `/${lang}/#open-source` },
    { label: mainNavItems3Label(lang), href: `/${lang}/#faqs` }
  ];
  return data;
};

export const getProject = (lang: SupportedLanguage) => {
  const data = [
    {
      title: mainProject0Title(lang),
      description: mainProject0Text(lang),
      image: "/images/open-source/grule.svg",
      url: "https://github.com/hyperjumptech/grule-rule-engine",
      button: true,
      repo: "grule-rule-engine"
    },
    {
      title: mainProject1Title(lang),
      description: mainProject1Text(lang),
      image: "/images/open-source/monika.svg",
      url: "https://github.com/hyperjumptech/monika",
      button: true,
      repo: "monika"
    },
    {
      title: mainProject2Title(lang),
      description: mainProject2Text(lang),

      image: "/images/open-source/whatsapp-chatbot-connector.svg",
      url: "https://github.com/hyperjumptech/whatsapp-chatbot-connector",
      button: true,
      repo: "whatsapp-chatbot-connector"
    }
  ];

  return data;
};

export const getCaseStudies = (lang: SupportedLanguage) => {
  const data = [
    {
      title: mainCaseStudies0Title(lang),
      category: mainCaseStudies0Category(lang),
      description: mainCaseStudies0Text(lang),
      urlCaseStudy: "/case-studies/erp-fisheries"
    },
    {
      title: mainCaseStudies1Title(lang),
      category: mainCaseStudies1Category(lang),
      description: mainCaseStudies1Text(lang),
      urlCaseStudy: "/case-studies/ctoaas-media"
    }
  ];

  return data;
};

export const getFaqs = (lang: SupportedLanguage) => {
  return [
    {
      question: mainFaq0Question(lang),
      answer: mainFaq0Answer(lang)
    },
    {
      question: mainFaq1Question(lang),
      answer: mainFaq1Answer(lang)
    },
    {
      question: mainFaq2Question(lang),
      answer: mainFaq2Answer(lang)
    },
    {
      question: mainFaq3Question(lang),
      answer: mainFaq3Answer(lang)
    }
  ];
};

export const pageData = {
  location: {
    title: "D.Lab Building (6th floor)",
    address: [
      "Jl. Riau No. 1, Gondangdia, Menteng,",
      "Jakarta Pusat - 10350",
      "Indonesia"
    ],
    email: "solution@hyperjump.tech",
    duns: "65-975-4901",
    mapsUrl:
      "https://www.google.com/maps/place/DLab+SMD/@-6.1907514,106.8219552,17z/data=!4m15!1m8!3m7!1s0x2e69f42410acef4f:0x2ebaeebb8f5fafbb!2sJl.+Riau+No.1,+RT.9%2FRW.5,+Gondangdia,+Kec.+Menteng,+Kota+Jakarta+Pusat,+Daerah+Khusus+Ibukota+Jakarta+10350!3b1!8m2!3d-6.1907514!4d106.8245301!16s%2Fg%2F11c5lcsgsq!3m5!1s0x2e69f5e04c659f97:0xd2f4629d7651d317!8m2!3d-6.1907514!4d106.8245301!16s%2Fg%2F11kb72cx9p?entry=ttu&g_ep=EgoyMDI1MDQxMy4wIKXMDSoASAFQAw%3D%3D",
    imageUrl: "/images/location-2.webp"
  }
};
