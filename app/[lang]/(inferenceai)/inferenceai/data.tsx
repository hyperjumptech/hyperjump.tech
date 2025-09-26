import type { ReactNode } from "react";

import type { Item } from "@/app/components/grid-items";
import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  inferenceaiNavItems0Label,
  inferenceaiNavItems1Label,
  inferenceaiNavItems3Label,
  inferenceaiNavItems4Label,
  inferenceaiNavSolutions0Label,
  inferenceaiNavSolutions1Label,
  inferenceaiNavSolutions2Label,
  inferenceaiNavSolutions3Label,
  inferenceaiNavSolutions4Label,
  inferenceaiWhyWorkWithUs0Title,
  inferenceaiWhyWorkWithUs1Title,
  inferenceaiWhyWorkWithUs2Title,
  inferenceaiWhyWorkWithUs0Text,
  inferenceaiWhyWorkWithUs1Text,
  inferenceaiWhyWorkWithUs2Text,
  inferenceaiHowItWorks0Title,
  inferenceaiHowItWorks1Title,
  inferenceaiHowItWorks2Title,
  inferenceaiHowItWorks3Title,
  inferenceaiHowItWorks0Text,
  inferenceaiHowItWorks1Text,
  inferenceaiHowItWorks2Text,
  inferenceaiHowItWorks3Text,
  inferenceaiWhatYouGet0Title,
  inferenceaiWhatYouGet1Title,
  inferenceaiWhatYouGet2Title,
  inferenceaiWhatYouGet3Title,
  inferenceaiWhatYouGet4Title,
  inferenceaiWhatYouGet5Title,
  inferenceaiFaq0Question,
  inferenceaiFaq1Question,
  inferenceaiFaq2Question,
  inferenceaiFaq3Question,
  inferenceaiFaq4Question,
  inferenceaiFaq0Answer,
  inferenceaiFaq1Answer,
  inferenceaiFaq2Answer,
  inferenceaiFaq3Answer,
  inferenceaiFaq4Answer,
  inferenceaiCaseStudies2Category,
  inferenceaiCaseStudies3Category,
  inferenceaiCaseStudies4Category,
  presentonFaqDesc,
  presentonFaqHeading,
  presentonHowItWorksHeading,
  presentonKeyFeaturesHeading,
  presentonWhatIsIncludedHeading,
  mediaPulseFaqDesc,
  mediaPulseFaqHeading,
  mediaPulseHowItWorksHeading,
  mediaPulseKeyFeaturesHeading,
  mediaPulseWhatIsIncludedHeading,
  startGptKeyFeaturesHeading,
  startGptFaqDesc,
  startGptFaqHeading,
  startGptHowItWorksHeading,
  mediaPulseHeroHeading,
  mediaPulseHeroDesc,
  startGptHeroDesc,
  startGptHeroHeading,
  presentonHeroDesc,
  presentonHeroHeading,
  voxaHeroDesc,
  voxaFaqDesc,
  voxaFaqHeading,
  voxaHowItWorksHeading,
  voxaKeyFeaturesHeading,
  voxaHeroHeading,
  inferenceaiCaseStudies5Category,
  voxaWhatIsIncludedHeading,
  inferenceaiNavItems5Label,
  dubsyHeroDesc,
  dubsyFaqDesc,
  dubsyFaqHeading,
  dubsyHowItWorksHeading,
  dubsyKeyFeaturesHeading,
  dubsyHeroHeading,
  dubsyWhatIsIncludedHeading
} from "@/locales/.generated/server";

import {
  getFaqsPresenton,
  getHowItWorksPresenton,
  getKeyFeaturesPresenton,
  getFaqsStartGPT,
  getHowItWorksStartGPT,
  getKeyFeaturesStartGPT,
  getWhatIsIncludedPresenton,
  getFaqsMediaPulse,
  getHowItWorksMediaPulse,
  getKeyFeaturesMediaPulse,
  getWhatIsIncludedMediaPulse,
  getFaqsVoxa,
  getHowItWorksVoxa,
  getKeyFeaturesVoxa,
  getWhatIsIncludedVoxa,
  type WhatIsIncluded,
  getFaqsDubsy,
  getHowItWorksDubsy,
  getKeyFeaturesDubsy,
  getWhatIsIncludedDubsy
} from "./[slug]/data";
import StartGPT from "./[slug]/components/startgpt";
import Presenton from "./[slug]/components/presenton";
import Voxa from "./[slug]/components/voxa";
import Dubsy from "./[slug]/components/dubsy";
import { Menu } from "./components/nav";
import { MediaPulse } from "./[slug]/components/media-pulse";

export const navInferenceai = (lang: SupportedLanguage) => {
  return [
    {
      key: "how-it-works",
      label: inferenceaiNavItems0Label(lang),
      href: "#how-it-works"
    },
    {
      key: "what-you-get",
      label: inferenceaiNavItems1Label(lang),
      href: "#what-you-get"
    },
    {
      key: "solutions",
      label: inferenceaiNavItems3Label(lang),
      children: solutionsMenu(lang)
    },
    {
      key: "about-us",
      label: inferenceaiNavItems4Label(lang),
      href: "#about-us"
    },
    { key: "faqs", label: inferenceaiNavItems5Label(lang), href: "#faqs" }
  ];
};

function solutionsMenu(lang: SupportedLanguage): Menu[] {
  return getCaseStudies(lang).map(({ descUrl, name, slug }) => ({
    key: slug,
    label: name,
    href: `/${lang}/inferenceai/${slug}`,
    description: descUrl
  }));
}

export const navSolutions = (lang: SupportedLanguage, slug: string) => {
  const caseStudies = getCaseStudies(lang);
  const activeCase = caseStudies.find((c) => c.slug === slug);

  let items = [
    {
      key: "key-features",
      label: inferenceaiNavSolutions0Label(lang),
      href: "#key-features"
    },
    {
      key: "how-it-works",
      label: inferenceaiNavSolutions1Label(lang),
      href: "#how-it-works"
    },
    {
      key: "what-is-include",
      label: inferenceaiNavSolutions2Label(lang),
      href: "#what-is-included"
    },
    {
      key: "solutions",
      label: inferenceaiNavSolutions3Label(lang),
      children: solutionsMenu(lang)
    },
    { key: "faqs", label: inferenceaiNavSolutions4Label(lang), href: "#faqs" }
  ];

  if (activeCase?.slug === "startgpt") {
    items = items.filter((item) => item.key !== "what-is-include");
  }

  return items;
};

export const getWhyWorkWithUs = (lang: SupportedLanguage) => {
  return [
    {
      title: inferenceaiWhyWorkWithUs0Title(lang),
      description: inferenceaiWhyWorkWithUs0Text(lang),
      icon: "/images/inferenceai/why-work-with-us/tailored-to-your-workflow.svg"
    },
    {
      title: inferenceaiWhyWorkWithUs1Title(lang),
      description: inferenceaiWhyWorkWithUs1Text(lang),
      icon: "/images/inferenceai/why-work-with-us/speed-to-launch.svg"
    },
    {
      title: inferenceaiWhyWorkWithUs2Title(lang),
      description: inferenceaiWhyWorkWithUs2Text(lang),
      icon: "/images/inferenceai/why-work-with-us/ongoing-support-n-optimization.svg"
    }
  ];
};

export const getHowItWorks = (lang: SupportedLanguage) => {
  return [
    {
      title: inferenceaiHowItWorks0Title(lang),
      description: inferenceaiHowItWorks0Text(lang),
      image: "/images/inferenceai/how-it-works/discovery-n-strategy.png"
    },
    {
      title: inferenceaiHowItWorks1Title(lang),
      description: inferenceaiHowItWorks1Text(lang),
      image: "/images/inferenceai/how-it-works/agent-design-n-prototype.png"
    },
    {
      title: inferenceaiHowItWorks2Title(lang),
      description: inferenceaiHowItWorks2Text(lang),
      image: "/images/inferenceai/how-it-works/integration-n-deployment.png"
    },
    {
      title: inferenceaiHowItWorks3Title(lang),
      description: inferenceaiHowItWorks3Text(lang),
      image: "/images/inferenceai/how-it-works/training-n-iteration.png"
    }
  ];
};

export const getWhatYouGet = (lang: SupportedLanguage) => {
  return [
    {
      title: inferenceaiWhatYouGet0Title(lang),
      icon: "/images/inferenceai/what-you-get/end-to-end-strategy-session.svg"
    },
    {
      title: inferenceaiWhatYouGet1Title(lang),
      icon: "/images/inferenceai/what-you-get/custom-ai-agent-architecture-n-design.svg"
    },
    {
      title: inferenceaiWhatYouGet2Title(lang),
      icon: "/images/inferenceai/what-you-get/pompt-engineering-n-llm-integration.svg"
    },
    {
      title: inferenceaiWhatYouGet3Title(lang),
      icon: "/images/inferenceai/what-you-get/api-n-tool-integrations.svg"
    },
    {
      title: inferenceaiWhatYouGet4Title(lang),
      icon: "/images/inferenceai/what-you-get/deployment-n-hosting-setup.svg"
    },
    {
      title: inferenceaiWhatYouGet5Title(lang),
      icon: "/images/inferenceai/what-you-get/training-documentation-n-walkthrough.svg"
    }
  ];
};

type Faq = {
  answer: string;
  question: string;
};

export type CaseStudy = {
  category: string;
  demo: ReactNode | null;
  description: string;
  faqDesc: string;
  faqHeading: string;
  faqs: Faq[];
  howItWorks: Item[];
  howItWorksHeading: string;
  keyFeatures: Item[];
  keyFeaturesHeading: string;
  slug: string;
  title: string;
  whatsIncluded: WhatIsIncluded[];
  whatsIncludedHeading: string;
  name: string;
  descUrl: string;
};

export const getCaseStudies = (lang: SupportedLanguage): CaseStudy[] => {
  return [
    {
      category: inferenceaiCaseStudies2Category(lang),
      demo: <MediaPulse />,
      description: mediaPulseHeroDesc(lang),
      faqDesc: mediaPulseFaqDesc(lang),
      faqHeading: mediaPulseFaqHeading(lang),
      faqs: getFaqsMediaPulse(lang),
      howItWorks: getHowItWorksMediaPulse(lang),
      howItWorksHeading: mediaPulseHowItWorksHeading(lang),
      keyFeatures: getKeyFeaturesMediaPulse(lang),
      keyFeaturesHeading: mediaPulseKeyFeaturesHeading(lang),
      slug: "media-pulse",
      name: "Media Pulse",
      descUrl: "Media monitoring",
      title: mediaPulseHeroHeading(lang),
      whatsIncluded: getWhatIsIncludedMediaPulse(lang),
      whatsIncludedHeading: mediaPulseWhatIsIncludedHeading(lang)
    },
    {
      category: inferenceaiCaseStudies3Category(lang),
      demo: (
        <StartGPT
          demoUrl="https://chatgpt.hyperjump.tech/"
          lang={lang}
          slug="startgpt"
          username="demo@hyperjump.tech"
          password="inference-ai-is-my-solution"
        />
      ),
      description: startGptHeroDesc(lang),
      faqDesc: startGptFaqDesc(lang),
      faqHeading: startGptFaqHeading(lang),
      faqs: getFaqsStartGPT(lang),
      howItWorks: getHowItWorksStartGPT(lang),
      howItWorksHeading: startGptHowItWorksHeading(lang),
      keyFeatures: getKeyFeaturesStartGPT(lang),
      keyFeaturesHeading: startGptKeyFeaturesHeading(lang),
      slug: "startgpt",
      name: "StartGPT",
      descUrl: "Enterprise AI assistant",
      title: startGptHeroHeading(lang),
      whatsIncluded: [],
      whatsIncludedHeading: ""
    },
    {
      category: inferenceaiCaseStudies4Category(lang),
      demo: (
        <Presenton
          demoUrl="https://presenton.hyperjump.tech/"
          lang={lang}
          slug="presenton"
          username="hyperjump"
          password="inference-ai-is-my-solution"
        />
      ),
      description: presentonHeroDesc(lang),
      faqDesc: presentonFaqDesc(lang),
      faqHeading: presentonFaqHeading(lang),
      faqs: getFaqsPresenton(lang),
      howItWorks: getHowItWorksPresenton(lang),
      howItWorksHeading: presentonHowItWorksHeading(lang),
      keyFeatures: getKeyFeaturesPresenton(lang),
      keyFeaturesHeading: presentonKeyFeaturesHeading(lang),
      slug: "presenton",
      name: "Presenton",
      descUrl: "AI-Powered Presentation",
      title: presentonHeroHeading(lang),
      whatsIncluded: getWhatIsIncludedPresenton(lang),
      whatsIncludedHeading: presentonWhatIsIncludedHeading(lang)
    },
    {
      category: inferenceaiCaseStudies5Category(lang),
      demo: <Voxa />,
      description: voxaHeroDesc(lang),
      faqDesc: voxaFaqDesc(lang),
      faqHeading: voxaFaqHeading(lang),
      faqs: getFaqsVoxa(lang),
      howItWorks: getHowItWorksVoxa(lang),
      howItWorksHeading: voxaHowItWorksHeading(lang),
      keyFeatures: getKeyFeaturesVoxa(lang),
      keyFeaturesHeading: voxaKeyFeaturesHeading(lang),
      slug: "voxa",
      name: "Voxa",
      descUrl: "Phone cold outreach",
      title: voxaHeroHeading(lang),
      whatsIncluded: getWhatIsIncludedVoxa(lang),
      whatsIncludedHeading: voxaWhatIsIncludedHeading(lang)
    },
    {
      category: inferenceaiCaseStudies5Category(lang),
      demo: <Dubsy />,
      description: dubsyHeroDesc(lang),
      faqDesc: dubsyFaqDesc(lang),
      faqHeading: dubsyFaqHeading(lang),
      faqs: getFaqsDubsy(lang),
      howItWorks: getHowItWorksDubsy(lang),
      howItWorksHeading: dubsyHowItWorksHeading(lang),
      keyFeatures: getKeyFeaturesDubsy(lang),
      keyFeaturesHeading: dubsyKeyFeaturesHeading(lang),
      slug: "dubsy",
      name: "Dubsy",
      descUrl: "Turn videos into multilingual captions",
      title: dubsyHeroHeading(lang),
      whatsIncluded: getWhatIsIncludedDubsy(lang),
      whatsIncludedHeading: dubsyWhatIsIncludedHeading(lang)
    }
  ];
};

export function caseStudyBy(slug: string, lang: SupportedLanguage) {
  return getCaseStudies(lang).find((cs) => cs.slug === slug);
}

export const getFaqs = (lang: SupportedLanguage): Faq[] => {
  return [
    {
      question: inferenceaiFaq0Question(lang),
      answer: inferenceaiFaq0Answer(lang)
    },
    {
      question: inferenceaiFaq1Question(lang),
      answer: inferenceaiFaq1Answer(lang)
    },
    {
      question: inferenceaiFaq2Question(lang),
      answer: inferenceaiFaq2Answer(lang)
    },
    {
      question: inferenceaiFaq3Question(lang),
      answer: inferenceaiFaq3Answer(lang)
    },
    {
      question: inferenceaiFaq4Question(lang),
      answer: inferenceaiFaq4Answer(lang)
    }
  ];
};

export const getData = (lang: SupportedLanguage) => ({
  name: "Inference AI",
  baseUrl: `https://hyperjump.tech/${lang}/inferenceai`,
  socials: [
    {
      platform: "GitHub",
      url: "https://github.com/hyperjumptech",
      icon: "/images/inferenceai/socials/github.svg"
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/company/hyperjump",
      icon: "/images/inferenceai/socials/linkedin.svg"
    },
    {
      platform: "Medium",
      url: "https://medium.com/hyperjump-tech",
      icon: "/images/inferenceai/socials/medium.svg"
    }
  ]
});
