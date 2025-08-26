import type { ReactNode } from "react";

import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  ragChatbotNavItems0Label,
  ragChatbotNavItems1Label,
  ragChatbotNavItems2Label,
  ragChatbotNavItems3Label,
  ragChatbotKeyFeaturesFeatures0Title,
  ragChatbotKeyFeaturesFeatures1Title,
  ragChatbotKeyFeaturesFeatures2Title,
  ragChatbotKeyFeaturesFeatures3Title,
  ragChatbotKeyFeaturesFeatures4Title,
  ragChatbotKeyFeaturesFeatures0Text,
  ragChatbotKeyFeaturesFeatures1Text,
  ragChatbotKeyFeaturesFeatures2Text,
  ragChatbotKeyFeaturesFeatures3Text,
  ragChatbotKeyFeaturesFeatures4Text,
  ragChatbotHowItWorksSteps0Title,
  ragChatbotHowItWorksSteps1Title,
  ragChatbotHowItWorksSteps2Title,
  ragChatbotHowItWorksSteps3Title,
  ragChatbotHowItWorksSteps0Text,
  ragChatbotHowItWorksSteps1Text,
  ragChatbotHowItWorksSteps2Text,
  ragChatbotHowItWorksSteps3Text,
  ragChatbotWhatIsIncludedItems0,
  ragChatbotWhatIsIncludedItems1,
  ragChatbotWhatIsIncludedItems2,
  ragChatbotWhatIsIncludedItems3,
  ragChatbotFaq0Question,
  ragChatbotFaq1Question,
  ragChatbotFaq2Question,
  ragChatbotFaq3Question,
  ragChatbotFaq0Answer,
  ragChatbotFaq1Answer,
  ragChatbotFaq2Answer,
  ragChatbotFaq3Answer,
  presentonKeyFeaturesFeatures0Title,
  presentonKeyFeaturesFeatures1Title,
  presentonKeyFeaturesFeatures2Title,
  presentonKeyFeaturesFeatures3Title,
  presentonKeyFeaturesFeatures0Text,
  presentonKeyFeaturesFeatures1Text,
  presentonKeyFeaturesFeatures2Text,
  presentonKeyFeaturesFeatures3Text,
  presentonHowItWorksSteps0Title,
  presentonHowItWorksSteps1Title,
  presentonHowItWorksSteps2Title,
  presentonHowItWorksSteps3Title,
  presentonHowItWorksSteps0Text,
  presentonHowItWorksSteps1Text,
  presentonHowItWorksSteps2Text,
  presentonHowItWorksSteps3Text,
  presentonWhatIsIncludedItems0,
  presentonWhatIsIncludedItems1,
  presentonWhatIsIncludedItems2,
  presentonFaq0Question,
  presentonFaq1Question,
  presentonFaq2Question,
  presentonFaq0Answer,
  presentonFaq1Answer,
  presentonFaq2Answer
  mediaPulseFaq0Question,
  mediaPulseFaq1Question,
  mediaPulseFaq2Question,
  mediaPulseFaq3Question,
  mediaPulseFaq4Question,
  mediaPulseFaq0Answer,
  mediaPulseFaq1Answer,
  mediaPulseFaq2Answer,
  mediaPulseFaq3Answer,
  mediaPulseFaq4Answer,
  mediaPulseHowItWorksSteps0Title,
  mediaPulseHowItWorksSteps1Title,
  mediaPulseHowItWorksSteps2Title,
  mediaPulseHowItWorksSteps3Title,
  mediaPulseHowItWorksSteps0Text,
  mediaPulseHowItWorksSteps1Text,
  mediaPulseHowItWorksSteps2Text,
  mediaPulseHowItWorksSteps3Text,
  mediaPulseWhatIsIncludedItems0Title,
  mediaPulseWhatIsIncludedItems1Title,
  mediaPulseWhatIsIncludedItems0Text,
  mediaPulseWhatIsIncludedItems1Text,
  mediaPulseKeyFeaturesFeatures0Title,
  mediaPulseKeyFeaturesFeatures1Title,
  mediaPulseKeyFeaturesFeatures2Title,
  mediaPulseKeyFeaturesFeatures3Title,
  mediaPulseKeyFeaturesFeatures0Text,
  mediaPulseKeyFeaturesFeatures1Text,
  mediaPulseKeyFeaturesFeatures2Text,
  mediaPulseKeyFeaturesFeatures3Text
} from "@/locales/.generated/server";
import {
  ChatBubbleIcon,
  LockClosedIcon,
  ClockIcon,
  FileTextIcon,
  LayersIcon,
  Link2Icon,
  DashboardIcon,
  ReloadIcon
} from "@radix-ui/react-icons";

export const navRagChatbot = (lang: SupportedLanguage) => {
  return [
    { label: ragChatbotNavItems0Label(lang), href: "#key-features" },
    { label: ragChatbotNavItems1Label(lang), href: "#how-it-works" },
    { label: ragChatbotNavItems2Label(lang), href: "#what-is-included" },
    { label: ragChatbotNavItems3Label(lang), href: "#faqs" }
  ];
};

export const getKeyFeatures = (lang: SupportedLanguage) => {
  return [
    {
      title: ragChatbotKeyFeaturesFeatures0Title(lang),
      description: ragChatbotKeyFeaturesFeatures0Text(lang),
      icon: <FileTextIcon className="h-7 w-7 text-white" />
    },
    {
      title: ragChatbotKeyFeaturesFeatures1Title(lang),
      description: ragChatbotKeyFeaturesFeatures1Text(lang),
      icon: <ClockIcon className="h-7 w-7 text-white" />
    },
    {
      title: ragChatbotKeyFeaturesFeatures2Title(lang),
      description: ragChatbotKeyFeaturesFeatures2Text(lang),
      icon: <LayersIcon className="h-7 w-7 text-white" />
    },
    {
      title: ragChatbotKeyFeaturesFeatures3Title(lang),
      description: ragChatbotKeyFeaturesFeatures3Text(lang),
      icon: <ChatBubbleIcon className="h-7 w-7 text-white" />
    },
    {
      title: ragChatbotKeyFeaturesFeatures4Title(lang),
      description: ragChatbotKeyFeaturesFeatures4Text(lang),
      icon: <LockClosedIcon className="h-7 w-7 text-white" />
    }
  ];
};

export const getHowItWorks = (lang: SupportedLanguage) => {
  return [
    {
      title: ragChatbotHowItWorksSteps0Title(lang),
      description: ragChatbotHowItWorksSteps0Text(lang)
    },
    {
      title: ragChatbotHowItWorksSteps1Title(lang),
      description: ragChatbotHowItWorksSteps1Text(lang)
    },
    {
      title: ragChatbotHowItWorksSteps2Title(lang),
      description: ragChatbotHowItWorksSteps2Text(lang)
    },
    {
      title: ragChatbotHowItWorksSteps3Title(lang),
      description: ragChatbotHowItWorksSteps3Text(lang)
    }
  ];
};

export type WhatIsIncluded = {
  icon: ReactNode;
  title: string;
  text?: string;
};

export const getWhatIsIncluded = (
  lang: SupportedLanguage
): WhatIsIncluded[] => {
  return [
    {
      title: ragChatbotWhatIsIncludedItems0(lang),
      icon: <ChatBubbleIcon className="h-7 w-7 text-white" />
    },
    {
      title: ragChatbotWhatIsIncludedItems1(lang),
      icon: <Link2Icon className="h-7 w-7 text-white" />
    },
    {
      title: ragChatbotWhatIsIncludedItems2(lang),
      icon: <DashboardIcon className="h-7 w-7 text-white" />
    },
    {
      title: ragChatbotWhatIsIncludedItems3(lang),
      icon: <ReloadIcon className="h-7 w-7 text-white" />
    }
  ];
};

export const getFaqs = (lang: SupportedLanguage) => {
  return [
    {
      question: ragChatbotFaq0Question(lang),
      answer: ragChatbotFaq0Answer(lang)
    },
    {
      question: ragChatbotFaq1Question(lang),
      answer: ragChatbotFaq1Answer(lang)
    },
    {
      question: ragChatbotFaq2Question(lang),
      answer: ragChatbotFaq2Answer(lang)
    },
    {
      question: ragChatbotFaq3Question(lang),
      answer: ragChatbotFaq3Answer(lang)
    }
  ];
};

export const getKeyFeaturesPresenton = (lang: SupportedLanguage) => {
  return [
    {
      title: presentonKeyFeaturesFeatures0Title(lang),
      description: presentonKeyFeaturesFeatures0Text(lang),
      icon: <FileTextIcon className="h-7 w-7 text-white" />
    },
    {
      title: presentonKeyFeaturesFeatures1Title(lang),
      description: presentonKeyFeaturesFeatures1Text(lang),
      icon: <ClockIcon className="h-7 w-7 text-white" />
    },
    {
      title: presentonKeyFeaturesFeatures2Title(lang),
      description: presentonKeyFeaturesFeatures2Text(lang),
      icon: <LayersIcon className="h-7 w-7 text-white" />
    },
    {
      title: presentonKeyFeaturesFeatures3Title(lang),
      description: presentonKeyFeaturesFeatures3Text(lang),
      icon: <ChatBubbleIcon className="h-7 w-7 text-white" />
    }
  ];
};

export const getHowItWorksPresenton = (lang: SupportedLanguage) => {
  return [
    {
      title: presentonHowItWorksSteps0Title(lang),
      description: presentonHowItWorksSteps0Text(lang)
    },
    {
      title: presentonHowItWorksSteps1Title(lang),
      description: presentonHowItWorksSteps1Text(lang)
    },
    {
      title: presentonHowItWorksSteps2Title(lang),
      description: presentonHowItWorksSteps2Text(lang)
    },
    {
      title: presentonHowItWorksSteps3Title(lang),
      description: presentonHowItWorksSteps3Text(lang)
    }
  ]
}

export const getKeyFeaturesMediaPulse = (lang: SupportedLanguage) => {
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

export const getWhatIsIncludedMediaPulse = (
  lang: SupportedLanguage
): WhatIsIncluded[] => {
  return [
    {
      title: mediaPulseWhatIsIncludedItems0Title(lang),
      text: mediaPulseWhatIsIncludedItems0Text(lang),
      icon: <ChatBubbleIcon className="h-7 w-7 text-white" />
    },
    {
      title: mediaPulseWhatIsIncludedItems1Title(lang),
      text: mediaPulseWhatIsIncludedItems1Text(lang),
      icon: <Link2Icon className="h-7 w-7 text-white" />
    }
  ];
};

export const getWhatIsIncludedPresenton = (
  lang: SupportedLanguage
): WhatIsIncluded[] => {
  return [
    {
      title: presentonWhatIsIncludedItems0(lang),
      icon: <ChatBubbleIcon className="h-7 w-7 text-white" />
    },
    {
      title: presentonWhatIsIncludedItems1(lang),
      icon: <Link2Icon className="h-7 w-7 text-white" />
    },
    {
      title: presentonWhatIsIncludedItems2(lang),
      icon: <DashboardIcon className="h-7 w-7 text-white" />
    }
  ];
};

export const getFaqsPresenton = (lang: SupportedLanguage) => {
  return [
    {
      question: presentonFaq0Question(lang),
      answer: presentonFaq0Answer(lang)
    },
    {
      question: presentonFaq1Question(lang),
      answer: presentonFaq1Answer(lang)
    },
    {
      question: presentonFaq2Question(lang),
      answer: presentonFaq2Answer(lang)
    }
  ];
};

type Faq = {
  answer: string;
  question: string;
};

export const getHowItWorksMediaPulse = (lang: SupportedLanguage) => {
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

export const getFaqsMediaPulse = (lang: SupportedLanguage): Faq[] => {
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
