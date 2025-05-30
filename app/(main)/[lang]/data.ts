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
    { label: mainNavItems0Label(lang), href: "/services" },
    { label: mainNavItems1Label(lang), href: "/case-studies" },
    { label: mainNavItems2Label(lang), href: "/#open-source" },
    { label: mainNavItems3Label(lang), href: "/#faqs" }
  ];
  return data;
};

export const getProject = (lang: SupportedLanguage) => {
  const data = [
    {
      title: mainProject0Title(lang),
      description: mainProject0Text(lang),
      image: "/images/open-source/monika.svg",
      url: "https://github.com/hyperjumptech/monika",
      button: true,
      repo: "monika"
    },
    {
      title: mainProject1Title(lang),
      description: mainProject1Text(lang),
      image: "/images/open-source/firebase-cronjob.svg",
      url: "https://github.com/hyperjumptech/firebase-cronjob",
      button: true,
      repo: "firebase-cronjob"
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
