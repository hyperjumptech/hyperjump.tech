import { SupportedLanguage } from "@/locales/.generated/types";
import {
  inferenceaiNavItems0Label,
  inferenceaiNavItems1Label,
  inferenceaiNavItems2Label,
  inferenceaiNavItems3Label,
  inferenceaiNavItems4Label,
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
  inferenceaiCaseStudies0Title,
  inferenceaiCaseStudies1Title,
  inferenceaiCaseStudies0Text,
  inferenceaiCaseStudies1Text,
  inferenceaiCaseStudies0Category,
  inferenceaiCaseStudies1Category,
  inferenceaiFaq0Question,
  inferenceaiFaq1Question,
  inferenceaiFaq2Question,
  inferenceaiFaq3Question,
  inferenceaiFaq4Question,
  inferenceaiFaq0Answer,
  inferenceaiFaq1Answer,
  inferenceaiFaq2Answer,
  inferenceaiFaq3Answer,
  inferenceaiFaq4Answer
} from "@/locales/.generated/server";

export const navInferenceai = (lang: SupportedLanguage) => {
  const data = [
    { label: inferenceaiNavItems0Label(lang), href: "#how-it-works" },
    { label: inferenceaiNavItems1Label(lang), href: "#what-you-get" },
    { label: inferenceaiNavItems2Label(lang), href: "#case-studies" },
    { label: inferenceaiNavItems3Label(lang), href: "#about-us" },
    { label: inferenceaiNavItems4Label(lang), href: "#faqs" }
  ];
  return data;
};

export const getWhyWorkWithUs = (lang: SupportedLanguage) => {
  const data = [
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

  return data;
};

export const getHowItWorks = (lang: SupportedLanguage) => {
  const data = [
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

  return data;
};

export const getWhatYouGet = (lang: SupportedLanguage) => {
  const data = [
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

  return data;
};

export const getCaseStudies = (lang: SupportedLanguage) => {
  const data = [
    {
      title: inferenceaiCaseStudies0Title(lang),
      category: inferenceaiCaseStudies0Category(lang),
      description: inferenceaiCaseStudies0Text(lang)
    },
    {
      title: inferenceaiCaseStudies1Title(lang),
      category: inferenceaiCaseStudies1Category(lang),
      description: inferenceaiCaseStudies1Text(lang)
    }
  ];

  return data;
};

export const getFaqs = (lang: SupportedLanguage) => {
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
