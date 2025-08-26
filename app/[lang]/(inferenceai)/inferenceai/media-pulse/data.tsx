import { SupportedLanguage } from "@/locales/.generated/types";
import {
  mediaPulseNavItems0Label,
  mediaPulseNavItems1Label,
  mediaPulseNavItems2Label,
  mediaPulseNavItems3Label,
  mediaPulseKeyFeaturesFeatures0Title,
  mediaPulseKeyFeaturesFeatures1Title,
  mediaPulseKeyFeaturesFeatures2Title,
  mediaPulseKeyFeaturesFeatures3Title,
  mediaPulseKeyFeaturesFeatures0Text,
  mediaPulseKeyFeaturesFeatures1Text,
  mediaPulseKeyFeaturesFeatures2Text,
  mediaPulseKeyFeaturesFeatures3Text,
  mediaPulseHowItWorksSteps0Title,
  mediaPulseHowItWorksSteps1Title,
  mediaPulseHowItWorksSteps2Title,
  mediaPulseHowItWorksSteps3Title,
  mediaPulseHowItWorksSteps0Text,
  mediaPulseHowItWorksSteps1Text,
  mediaPulseHowItWorksSteps2Text,
  mediaPulseHowItWorksSteps3Text,
  mediaPulseWhatIsIncludedItems0Text,
  mediaPulseWhatIsIncludedItems0Title,
  mediaPulseWhatIsIncludedItems1Text,
  mediaPulseWhatIsIncludedItems1Title,
  mediaPulseFaq0Question,
  mediaPulseFaq1Question,
  mediaPulseFaq2Question,
  mediaPulseFaq3Question,
  mediaPulseFaq4Question,
  mediaPulseFaq0Answer,
  mediaPulseFaq1Answer,
  mediaPulseFaq2Answer,
  mediaPulseFaq3Answer,
  mediaPulseFaq4Answer
} from "@/locales/.generated/server";
import {
  ChatBubbleIcon,
  ClockIcon,
  FileTextIcon,
  LayersIcon,
} from "@radix-ui/react-icons";

export const getData = (lang: SupportedLanguage) => ({
  name: "RAG Chatbot",
  baseUrl: `https://hyperjump.tech/${lang}/inferenceai/rag-chatbot`
});

export const navMediaPulse = (lang: SupportedLanguage) => {
  const data = [
    { label: mediaPulseNavItems0Label(lang), href: "#key-features" },
    { label: mediaPulseNavItems1Label(lang), href: "#how-it-works" },
    { label: mediaPulseNavItems2Label(lang), href: "#what-is-included" },
    { label: mediaPulseNavItems3Label(lang), href: "#faqs" }
  ];
  return data;
};

export const getKeyFeatures = (lang: SupportedLanguage) => {
  const data = [
    {
      title: mediaPulseKeyFeaturesFeatures0Title(lang),
      description: mediaPulseKeyFeaturesFeatures0Text(lang),
      icon: <FileTextIcon className="h-7 w-7 text-white" />
    },
    {
      title: mediaPulseKeyFeaturesFeatures1Title(lang),
      description: mediaPulseKeyFeaturesFeatures1Text(lang),
      icon: <ClockIcon className="h-7 w-7 text-white" />
    },
    {
      title: mediaPulseKeyFeaturesFeatures2Title(lang),
      description: mediaPulseKeyFeaturesFeatures2Text(lang),
      icon: <LayersIcon className="h-7 w-7 text-white" />
    },
    {
      title: mediaPulseKeyFeaturesFeatures3Title(lang),
      description: mediaPulseKeyFeaturesFeatures3Text(lang),
      icon: <ChatBubbleIcon className="h-7 w-7 text-white" />
    }
  ];

  return data;
};

export const getHowItWorks = (lang: SupportedLanguage) => {
  const data = [
    {
      title: mediaPulseHowItWorksSteps0Title(lang),
      description: mediaPulseHowItWorksSteps0Text(lang)
    },
    {
      title: mediaPulseHowItWorksSteps1Title(lang),
      description: mediaPulseHowItWorksSteps1Text(lang)
    },
    {
      title: mediaPulseHowItWorksSteps2Title(lang),
      description: mediaPulseHowItWorksSteps2Text(lang)
    },
    {
      title: mediaPulseHowItWorksSteps3Title(lang),
      description: mediaPulseHowItWorksSteps3Text(lang)
    }
  ];

  return data;
};

export const getWhatIsIncluded = (lang: SupportedLanguage) => {
  const data = [
    {
      title: mediaPulseWhatIsIncludedItems0Title(lang),
      text: mediaPulseWhatIsIncludedItems0Text(lang)
    },
    {
      title: mediaPulseWhatIsIncludedItems1Title(lang),
      text: mediaPulseWhatIsIncludedItems1Text(lang)
    }
  ];

  return data;
};

export const getFaqs = (lang: SupportedLanguage) => {
  return [
    {
      question: mediaPulseFaq0Question(lang),
      answer: mediaPulseFaq0Answer(lang)
    },
    {
      question: mediaPulseFaq1Question(lang),
      answer: mediaPulseFaq1Answer(lang)
    },
    {
      question: mediaPulseFaq2Question(lang),
      answer: mediaPulseFaq2Answer(lang)
    },
    {
      question: mediaPulseFaq3Question(lang),
      answer: mediaPulseFaq3Answer(lang)
    },
    {
      question: mediaPulseFaq4Question(lang),
      answer: mediaPulseFaq4Answer(lang)
    }
  ];
};
