import type { ReactNode } from "react";

import type { SupportedLanguage } from "@/locales/.generated/types";
import {
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
  presentonFaq2Answer,
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
  mediaPulseWhatIsIncludedItems0Title,
  mediaPulseWhatIsIncludedItems1Title,
  mediaPulseWhatIsIncludedItems0Text,
  mediaPulseWhatIsIncludedItems1Text,
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
  startGptKeyFeaturesFeatures0Title,
  startGptKeyFeaturesFeatures1Title,
  startGptKeyFeaturesFeatures2Title,
  startGptKeyFeaturesFeatures3Title,
  startGptKeyFeaturesFeatures0Text,
  startGptKeyFeaturesFeatures1Text,
  startGptKeyFeaturesFeatures2Text,
  startGptKeyFeaturesFeatures3Text,
  startGptHowItWorksSteps0Title,
  startGptHowItWorksSteps1Title,
  startGptHowItWorksSteps2Title,
  startGptHowItWorksSteps3Title,
  startGptHowItWorksSteps0Text,
  startGptHowItWorksSteps1Text,
  startGptHowItWorksSteps2Text,
  startGptHowItWorksSteps3Text,
  startGptFaq0Question,
  startGptFaq1Question,
  startGptFaq2Question,
  startGptFaq3Question,
  startGptFaq0Answer,
  startGptFaq1Answer,
  startGptFaq2Answer,
  startGptFaq3Answer,
  startGptFaq4Question,
  startGptFaq4Answer,
  startGptHowItWorksSteps4Title,
  startGptHowItWorksSteps4Text,
  voxaKeyFeaturesFeatures0Title,
  voxaKeyFeaturesFeatures1Title,
  voxaKeyFeaturesFeatures2Title,
  voxaKeyFeaturesFeatures3Title,
  voxaKeyFeaturesFeatures0Text,
  voxaKeyFeaturesFeatures1Text,
  voxaKeyFeaturesFeatures2Text,
  voxaKeyFeaturesFeatures3Text,
  voxaHowItWorksSteps0Title,
  voxaHowItWorksSteps1Title,
  voxaHowItWorksSteps2Title,
  voxaHowItWorksSteps3Title,
  voxaHowItWorksSteps0Text,
  voxaHowItWorksSteps1Text,
  voxaHowItWorksSteps2Text,
  voxaHowItWorksSteps3Text,
  voxaWhatIsIncludedItems0,
  voxaWhatIsIncludedItems1,
  voxaWhatIsIncludedItems2,
  voxaFaq0Question,
  voxaFaq1Question,
  voxaFaq2Question,
  voxaFaq0Answer,
  voxaFaq1Answer,
  voxaFaq2Answer,
  voxaWhatIsIncludedItems3,
  voxaFaq3Question,
  voxaFaq3Answer,
  voxaFaq4Question,
  voxaFaq4Answer,
  voxaFaq5Question,
  voxaFaq5Answer,
  dubsyHowItWorksSteps0Title,
  dubsyHowItWorksSteps2Title,
  dubsyHowItWorksSteps3Title,
  dubsyHowItWorksSteps1Text,
  dubsyHowItWorksSteps1Title,
  dubsyHowItWorksSteps0Text,
  dubsyWhatIsIncludedItems0,
  dubsyWhatIsIncludedItems1,
  dubsyFaq0Question,
  dubsyFaq0Answer,
  dubsyFaq1Question,
  dubsyFaq1Answer,
  dubsyFaq2Question,
  dubsyFaq2Answer,
  dubsyKeyFeaturesFeatures0Text,
  dubsyKeyFeaturesFeatures0Title,
  dubsyKeyFeaturesFeatures1Text,
  dubsyKeyFeaturesFeatures1Title,
  dubsyKeyFeaturesFeatures2Title,
  dubsyKeyFeaturesFeatures2Text
} from "@/locales/.generated/server";
import {
  ChatBubbleIcon,
  ClockIcon,
  FileTextIcon,
  LayersIcon,
  Link2Icon,
  DashboardIcon
} from "@radix-ui/react-icons";
import { Users } from "lucide-react";

export type WhatIsIncluded = {
  icon: ReactNode;
  title: string;
  text?: string;
};

type Faq = {
  answer: string;
  question: string;
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
      description: presentonKeyFeaturesFeatures3Text(lang)
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

export const getKeyFeaturesStartGPT = (lang: SupportedLanguage) => {
  return [
    {
      title: startGptKeyFeaturesFeatures0Title(lang),
      description: startGptKeyFeaturesFeatures0Text(lang),
      icon: <FileTextIcon className="h-7 w-7 text-white" />
    },
    {
      title: startGptKeyFeaturesFeatures1Title(lang),
      description: startGptKeyFeaturesFeatures1Text(lang),
      icon: <ClockIcon className="h-7 w-7 text-white" />
    },
    {
      title: startGptKeyFeaturesFeatures2Title(lang),
      description: startGptKeyFeaturesFeatures2Text(lang),
      icon: <LayersIcon className="h-7 w-7 text-white" />
    },
    {
      title: startGptKeyFeaturesFeatures3Title(lang),
      description: startGptKeyFeaturesFeatures3Text(lang)
    }
  ];
};

export const getKeyFeaturesVoxa = (lang: SupportedLanguage) => {
  return [
    {
      title: voxaKeyFeaturesFeatures0Title(lang),
      description: voxaKeyFeaturesFeatures0Text(lang),
      icon: <FileTextIcon className="h-7 w-7 text-white" />
    },
    {
      title: voxaKeyFeaturesFeatures1Title(lang),
      description: voxaKeyFeaturesFeatures1Text(lang),
      icon: <ClockIcon className="h-7 w-7 text-white" />
    },
    {
      title: voxaKeyFeaturesFeatures2Title(lang),
      description: voxaKeyFeaturesFeatures2Text(lang),
      icon: <LayersIcon className="h-7 w-7 text-white" />
    },
    {
      title: voxaKeyFeaturesFeatures3Title(lang),
      description: voxaKeyFeaturesFeatures3Text(lang),
      icon: <ChatBubbleIcon className="h-7 w-7 text-white" />
    }
  ];
};

export const getHowItWorksStartGPT = (lang: SupportedLanguage) => {
  return [
    {
      title: startGptHowItWorksSteps0Title(lang),
      description: startGptHowItWorksSteps0Text(lang)
    },
    {
      title: startGptHowItWorksSteps1Title(lang),
      description: startGptHowItWorksSteps1Text(lang)
    },
    {
      title: startGptHowItWorksSteps2Title(lang),
      description: startGptHowItWorksSteps2Text(lang)
    },
    {
      title: startGptHowItWorksSteps3Title(lang),
      description: startGptHowItWorksSteps3Text(lang)
    },
    {
      title: startGptHowItWorksSteps4Title(lang),
      description: startGptHowItWorksSteps4Text(lang)
    }
  ];
};

export const getFaqsStartGPT = (lang: SupportedLanguage) => {
  return [
    {
      question: startGptFaq0Question(lang),
      answer: startGptFaq0Answer(lang)
    },
    {
      question: startGptFaq1Question(lang),
      answer: startGptFaq1Answer(lang)
    },
    {
      question: startGptFaq2Question(lang),
      answer: startGptFaq2Answer(lang)
    },
    {
      question: startGptFaq3Question(lang),
      answer: startGptFaq3Answer(lang)
    },
    {
      question: startGptFaq4Question(lang),
      answer: startGptFaq4Answer(lang)
    }
  ];
};

export const getHowItWorksVoxa = (lang: SupportedLanguage) => {
  return [
    {
      title: voxaHowItWorksSteps0Title(lang),
      description: voxaHowItWorksSteps0Text(lang)
    },
    {
      title: voxaHowItWorksSteps1Title(lang),
      description: voxaHowItWorksSteps1Text(lang)
    },
    {
      title: voxaHowItWorksSteps2Title(lang),
      description: voxaHowItWorksSteps2Text(lang)
    },
    {
      title: voxaHowItWorksSteps3Title(lang),
      description: voxaHowItWorksSteps3Text(lang)
    }
  ];
};

export const getWhatIsIncludedVoxa = (
  lang: SupportedLanguage
): WhatIsIncluded[] => {
  return [
    {
      title: voxaWhatIsIncludedItems0(lang),
      icon: <ChatBubbleIcon className="h-7 w-7 text-white" />
    },
    {
      title: voxaWhatIsIncludedItems1(lang),
      icon: <Link2Icon className="h-7 w-7 text-white" />
    },
    {
      title: voxaWhatIsIncludedItems2(lang),
      icon: <DashboardIcon className="h-7 w-7 text-white" />
    },
    {
      title: voxaWhatIsIncludedItems3(lang),
      icon: <DashboardIcon className="h-7 w-7 text-white" />
    }
  ];
};

export const getFaqsVoxa = (lang: SupportedLanguage) => {
  return [
    {
      question: voxaFaq0Question(lang),
      answer: voxaFaq0Answer(lang)
    },
    {
      question: voxaFaq1Question(lang),
      answer: voxaFaq1Answer(lang)
    },
    {
      question: voxaFaq2Question(lang),
      answer: voxaFaq2Answer(lang)
    },
    {
      question: voxaFaq3Question(lang),
      answer: voxaFaq3Answer(lang)
    },
    {
      question: voxaFaq4Question(lang),
      answer: voxaFaq4Answer(lang)
    },
    {
      question: voxaFaq5Question(lang),
      answer: voxaFaq5Answer(lang)
    }
  ];
};

export const getHowItWorksDubsy = (lang: SupportedLanguage) => {
  return [
    {
      title: dubsyHowItWorksSteps0Title(lang),
      description: dubsyHowItWorksSteps0Text(lang)
    },
    {
      title: dubsyHowItWorksSteps1Title(lang),
      description: dubsyHowItWorksSteps1Text(lang)
    },
    {
      title: dubsyHowItWorksSteps2Title(lang),
      description: voxaHowItWorksSteps2Text(lang)
    },
    {
      title: dubsyHowItWorksSteps3Title(lang),
      description: voxaHowItWorksSteps3Text(lang)
    }
  ];
};

export const getWhatIsIncludedDubsy = (
  lang: SupportedLanguage
): WhatIsIncluded[] => {
  return [
    {
      title: dubsyWhatIsIncludedItems0(lang),
      icon: <Users className="h-7 w-7 text-white" />
    },
    {
      title: dubsyWhatIsIncludedItems1(lang),
      icon: <DashboardIcon className="h-7 w-7 text-white" />
    }
  ];
};

export const getFaqsDubsy = (lang: SupportedLanguage) => {
  return [
    {
      question: dubsyFaq0Question(lang),
      answer: dubsyFaq0Answer(lang)
    },
    {
      question: dubsyFaq1Question(lang),
      answer: dubsyFaq1Answer(lang)
    },
    {
      question: dubsyFaq2Question(lang),
      answer: dubsyFaq2Answer(lang)
    }
  ];
};

export const getKeyFeaturesDubsy = (lang: SupportedLanguage) => {
  return [
    {
      title: dubsyKeyFeaturesFeatures0Title(lang),
      description: dubsyKeyFeaturesFeatures0Text(lang)
    },
    {
      title: dubsyKeyFeaturesFeatures1Title(lang),
      description: dubsyKeyFeaturesFeatures1Text(lang)
    },
    {
      title: dubsyKeyFeaturesFeatures2Title(lang),
      description: dubsyKeyFeaturesFeatures2Text(lang)
    }
  ];
};
