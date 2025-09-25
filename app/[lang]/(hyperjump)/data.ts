import type { ReactNode } from "react";
import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  aiBestFor,
  aiWhatIsDesc,
  aiDescription,
  aiHeroDesc,
  aiHeroHeading,
  aiHowItWorksDesc,
  aiHowItWorksStep0Text,
  aiHowItWorksStep0Title,
  aiHowItWorksStep1Text,
  aiHowItWorksStep1Title,
  aiHowItWorksStep2Text,
  aiHowItWorksStep2Title,
  aiHowItWorksStep3Text,
  aiHowItWorksStep3Title,
  aiHowItWorksStep4Text,
  aiHowItWorksStep4Title,
  aiWhatIsHighlight,
  aiWhatWeDeliverCard0Items0,
  aiWhatWeDeliverCard0Items1,
  aiWhatWeDeliverCard0Items2,
  aiWhatWeDeliverCard0Text,
  aiWhatWeDeliverCard1Items0,
  aiWhatWeDeliverCard1Items1,
  aiWhatWeDeliverCard1Items2,
  aiWhatWeDeliverCard1Title,
  aiWhatWeDeliverCard2Items0,
  aiWhatWeDeliverCard2Items1,
  aiWhatWeDeliverCard2Items2,
  aiWhatWeDeliverCard2Title,
  aiWhatWeDeliverDesc,
  aiWhatYouGetDesc,
  aiWhatYouGetItems0,
  aiWhatYouGetItems1,
  aiWhatYouGetItems2,
  aiWhatYouGetItems3,
  aiWhoIsItDesc,
  aiWhoIsItTarget0,
  aiWhoIsItTarget1,
  aiWhyUsDesc,
  aiWhyUsReasons0,
  aiWhyUsReasons1,
  aiWhyUsReasons2,
  caseStudyCtoaasMediaCategory,
  caseStudyCtoaasMediaDesc,
  caseStudyCtoaasMediaTitle,
  caseStudyErpFisheriesCategory,
  caseStudyErpFisheriesDesc,
  caseStudyErpFisheriesTitle,
  ctoaasBestFor,
  ctoaasDescription,
  ctoaasHeroDesc,
  ctoaasHeroHeading,
  ctoaasHowItWorksDesc,
  ctoaasHowItWorksStep0Text,
  ctoaasHowItWorksStep0Title,
  ctoaasHowItWorksStep1Text,
  ctoaasHowItWorksStep1Title,
  ctoaasHowItWorksStep2Text,
  ctoaasHowItWorksStep2Title,
  ctoaasHowItWorksStep3Text,
  ctoaasHowItWorksStep3Title,
  ctoaasWhatIsCtoaasDesc,
  ctoaasWhatIsCtoaasHighlight,
  ctoaasWhatWeDeliverCard0Items0,
  ctoaasWhatWeDeliverCard0Items1,
  ctoaasWhatWeDeliverCard0Items2,
  ctoaasWhatWeDeliverCard0Items3,
  ctoaasWhatWeDeliverCard0Text,
  ctoaasWhatWeDeliverCard0Title,
  ctoaasWhatWeDeliverCard1Items0,
  ctoaasWhatWeDeliverCard1Items1,
  ctoaasWhatWeDeliverCard1Items2,
  ctoaasWhatWeDeliverCard1Items3,
  ctoaasWhatWeDeliverCard1Text,
  ctoaasWhatWeDeliverCard1Title,
  ctoaasWhatWeDeliverCard2Items0,
  ctoaasWhatWeDeliverCard2Items1,
  ctoaasWhatWeDeliverCard2Items2,
  ctoaasWhatWeDeliverCard2Items3,
  ctoaasWhatWeDeliverCard2Text,
  ctoaasWhatWeDeliverCard2Title,
  ctoaasWhatYouGetDesc,
  ctoaasWhatYouGetItems0,
  ctoaasWhatYouGetItems1,
  ctoaasWhatYouGetItems2,
  ctoaasWhatYouGetItems3,
  ctoaasWhoIsItDesc,
  ctoaasWhoIsItTarget0,
  ctoaasWhoIsItTarget1,
  ctoaasWhoIsItTarget2,
  ctoaasWhoIsItTarget3,
  ctoaasWhyUsDesc,
  ctoaasWhyUsReasons0,
  ctoaasWhyUsReasons1,
  ctoaasWhyUsReasons2,
  ctoaasWhyUsReasons3,
  erpBestFor,
  erpDescription,
  erpHeroDesc,
  erpHeroHeading,
  erpHowItWorksDesc,
  erpHowItWorksStep0Text,
  erpHowItWorksStep0Title,
  erpHowItWorksStep1Text,
  erpHowItWorksStep1Title,
  erpHowItWorksStep2Text,
  erpHowItWorksStep2Title,
  erpHowItWorksStep3Text,
  erpHowItWorksStep3Title,
  erpHowItWorksStep4Text,
  erpHowItWorksStep4Title,
  erpWhatIsDesc,
  erpWhatIsHighlight,
  erpWhatWeDeliverCard0Items0,
  erpWhatWeDeliverCard0Items1,
  erpWhatWeDeliverCard0Items2,
  erpWhatWeDeliverCard0Items3,
  erpWhatWeDeliverCard0Text,
  erpWhatWeDeliverCard0Title,
  erpWhatWeDeliverCard1Items0,
  erpWhatWeDeliverCard1Items1,
  erpWhatWeDeliverCard1Items2,
  erpWhatWeDeliverCard1Items3,
  erpWhatWeDeliverCard1Text,
  erpWhatWeDeliverCard1Title,
  erpWhatWeDeliverCard2Items0,
  erpWhatWeDeliverCard2Items1,
  erpWhatWeDeliverCard2Items2,
  erpWhatWeDeliverCard2Items3,
  erpWhatWeDeliverCard2Text,
  erpWhatWeDeliverCard2Title,
  erpWhatWeDeliverDesc,
  erpWhatYouGetDesc,
  erpWhatYouGetItems0,
  erpWhatYouGetItems1,
  erpWhatYouGetItems2,
  erpWhatYouGetItems3,
  erpWhoIsItDesc,
  erpWhoIsItTarget0,
  erpWhoIsItTarget1,
  erpWhoIsItTarget2,
  erpWhoIsItTarget3,
  erpWhyUsDesc,
  erpWhyUsReasons0,
  erpWhyUsReasons1,
  erpWhyUsReasons2,
  mainCaseStudies0Category,
  mainCaseStudies0Text,
  mainCaseStudies0Title,
  mainCaseStudies1Category,
  mainCaseStudies1Text,
  mainCaseStudies1Title,
  mainFaq0Answer,
  mainFaq0Question,
  mainFaq1Answer,
  mainFaq1Question,
  mainFaq2Answer,
  mainFaq2Question,
  mainFaq3Answer,
  mainFaq3Question,
  mainProject0Text,
  mainProject0Title,
  mainProject1Text,
  mainProject1Title,
  mainProject2Text,
  mainProject2Title,
  saasBestFor,
  saasDescription,
  saasHeroDesc,
  saasHeroHeading,
  saasHowItWorksDesc,
  saasHowItWorksStep0Text,
  saasHowItWorksStep0Title,
  saasHowItWorksStep1Text,
  saasHowItWorksStep1Title,
  saasHowItWorksStep2Text,
  saasHowItWorksStep2Title,
  saasHowItWorksStep3Text,
  saasHowItWorksStep3Title,
  saasWhatIsSaasDesc,
  saasWhatIsSaasHighlight,
  saasWhatWeDeliverCard0Items0,
  saasWhatWeDeliverCard0Items1,
  saasWhatWeDeliverCard0Items2,
  saasWhatWeDeliverCard0Text,
  saasWhatWeDeliverCard0Title,
  saasWhatWeDeliverCard1Items0,
  saasWhatWeDeliverCard1Items1,
  saasWhatWeDeliverCard1Items2,
  saasWhatWeDeliverCard1Text,
  saasWhatWeDeliverCard1Title,
  saasWhatWeDeliverCard2Items0,
  saasWhatWeDeliverCard2Items1,
  saasWhatWeDeliverCard2Items2,
  saasWhatWeDeliverCard2Text,
  saasWhatWeDeliverCard2Title,
  saasWhatWeDeliverDesc,
  saasWhatYouGetDesc,
  saasWhatYouGetItems0,
  saasWhatYouGetItems1,
  saasWhatYouGetItems2,
  saasWhatYouGetItems3,
  saasWhoIsItDesc,
  saasWhoIsItTarget0,
  saasWhoIsItTarget1,
  saasWhoIsItTarget2,
  saasWhoIsItTarget3,
  saasWhyUsDesc,
  saasWhyUsReasons0,
  saasWhyUsReasons1,
  saasWhyUsReasons2,
  tddBestFor,
  tddDescription,
  tddHeroDesc,
  tddHeroHeading,
  tddHowItWorksDesc,
  tddHowItWorksStep0Text,
  tddHowItWorksStep0Title,
  tddHowItWorksStep1Text,
  tddHowItWorksStep1Title,
  tddHowItWorksStep2Text,
  tddHowItWorksStep2Title,
  tddHowItWorksStep3Text,
  tddHowItWorksStep3Title,
  tddWhatIsTddDesc,
  tddWhatIsTddHighlight,
  tddWhatWeDeliverCard0Items0,
  tddWhatWeDeliverCard0Items1,
  tddWhatWeDeliverCard0Items2,
  tddWhatWeDeliverCard0Items3,
  tddWhatWeDeliverCard0Text,
  tddWhatWeDeliverCard0Title,
  tddWhatWeDeliverCard1Items0,
  tddWhatWeDeliverCard1Items1,
  tddWhatWeDeliverCard1Items2,
  tddWhatWeDeliverCard1Items3,
  tddWhatWeDeliverCard1Text,
  tddWhatWeDeliverCard1Title,
  tddWhatWeDeliverCard2Items0,
  tddWhatWeDeliverCard2Items1,
  tddWhatWeDeliverCard2Items2,
  tddWhatWeDeliverCard2Items3,
  tddWhatWeDeliverCard2Text,
  tddWhatWeDeliverCard2Title,
  tddWhatWeDeliverDesc,
  tddWhatYouGetDesc,
  tddWhatYouGetItems0,
  tddWhatYouGetItems1,
  tddWhatYouGetItems2,
  tddWhatYouGetItems3,
  tddWhoIsItDesc,
  tddWhoIsItTarget0,
  tddWhoIsItTarget1,
  tddWhoIsItTarget2,
  tddWhoIsItTarget3,
  tddWhyUsDesc,
  tddWhyUsReasons0,
  tddWhyUsReasons1,
  tddWhyUsReasons2,
  aiWhoIsItTarget2,
  mediaPulseHeroHeading,
  inferenceaiCaseStudies2Category,
  startGptHeroDesc
} from "@/locales/.generated/server";

export function getCaseStudies(lang: SupportedLanguage) {
  return [
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
}

export function getFaqs(lang: SupportedLanguage) {
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
}

export function getProject(lang: SupportedLanguage) {
  return [
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
}

type ListWithIcon = {
  iconUrl: string;
  title: string;
  description: ReactNode;
};

type ListSection = {
  description: ReactNode;
  imageUrl: string;
  items: string[];
};

type Content = {
  what: ReactNode;
  who: ListSection;
  deliverables: {
    description: string;
    items: ({ items: string[] } & ListWithIcon)[];
  };
  how: {
    description: string;
    items: ListWithIcon[];
  };
  whatYouGet: ListSection;
  why: {
    backgroundImageUrl: string;
    clients: { imageUrl: string; name: string }[];
  } & ListSection;
};

export enum ServiceSlug {
  InferenceAI = "inference-ai",
  ErpImplementation = "erp-implementation",
  CtoAsAService = "cto-as-a-service",
  SoftwareAsAService = "software-as-a-service",
  TechDueDiligence = "tech-due-diligence"
}

export type CaseStudy = {
  slug: string;
  title: string;
  description: string;
  category: string;
  basePath: string;
};

export type Service = {
  bestFor: string[];
  caseStudies: CaseStudy[];
  content: Content;
  description: string;
  iconUrl: string;
  imageIconUrl: string;
  imageUrl: string;
  shortDescription: string;
  slug: ServiceSlug;
  title: string;
};

export function services(lang: SupportedLanguage): Service[] {
  return [
    {
      bestFor: aiBestFor(lang),
      content: {
        what: `${aiWhatIsDesc(lang)}<br /><br />${aiWhatIsHighlight(lang)}`,
        who: {
          description: aiWhoIsItDesc(lang),
          imageUrl: `/images/services/${ServiceSlug.InferenceAI}/who-is-it.svg`,
          items: [
            aiWhoIsItTarget0(lang),
            aiWhoIsItTarget1(lang),
            aiWhoIsItTarget2(lang)
          ]
        },
        deliverables: {
          description: aiWhatWeDeliverDesc(lang),
          items: [
            {
              description: aiWhatWeDeliverCard0Text(lang),
              iconUrl: `/images/services/${ServiceSlug.InferenceAI}/what-we-deliver-icon-1.svg`,
              items: [
                aiWhatWeDeliverCard0Items0(lang),
                aiWhatWeDeliverCard0Items1(lang),
                aiWhatWeDeliverCard0Items2(lang)
              ],
              title: erpWhatWeDeliverCard0Title(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.InferenceAI}/what-we-deliver-icon-2.svg`,
              title: aiWhatWeDeliverCard1Title(lang),
              items: [
                aiWhatWeDeliverCard1Items0(lang),
                aiWhatWeDeliverCard1Items1(lang),
                aiWhatWeDeliverCard1Items2(lang)
              ],
              description: erpWhatWeDeliverCard1Text(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.InferenceAI}/what-we-deliver-icon-3.svg`,
              title: aiWhatWeDeliverCard2Title(lang),
              items: [
                aiWhatWeDeliverCard2Items0(lang),
                aiWhatWeDeliverCard2Items1(lang),
                aiWhatWeDeliverCard2Items2(lang)
              ],
              description: erpWhatWeDeliverCard2Text(lang)
            }
          ]
        },
        how: {
          description: aiHowItWorksDesc(lang),
          items: [
            {
              iconUrl: `/images/services/${ServiceSlug.InferenceAI}/how-it-works-icon-1.svg`,
              description: aiHowItWorksStep0Text(lang),
              title: aiHowItWorksStep0Title(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.InferenceAI}/how-it-works-icon-2.svg`,
              description: aiHowItWorksStep1Text(lang),
              title: aiHowItWorksStep1Title(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.InferenceAI}/how-it-works-icon-3.svg`,
              description: aiHowItWorksStep2Text(lang),
              title: aiHowItWorksStep2Title(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.InferenceAI}/how-it-works-icon-4.svg`,
              description: aiHowItWorksStep3Text(lang),
              title: aiHowItWorksStep3Title(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.InferenceAI}/how-it-works-icon-5.svg`,
              description: aiHowItWorksStep4Text(lang),
              title: aiHowItWorksStep4Title(lang)
            }
          ]
        },
        whatYouGet: {
          description: aiWhatYouGetDesc(lang),
          imageUrl: `/images/services/${ServiceSlug.InferenceAI}/what-you-get.svg`,
          items: [
            aiWhatYouGetItems0(lang),
            aiWhatYouGetItems1(lang),
            aiWhatYouGetItems2(lang),
            aiWhatYouGetItems3(lang)
          ]
        },
        why: {
          backgroundImageUrl: `/images/services/${ServiceSlug.InferenceAI}/why-us-bg.png`,
          clients: [],
          description: aiWhyUsDesc(lang),
          imageUrl: `/images/services/${ServiceSlug.InferenceAI}/why-us.svg`,
          items: [
            aiWhyUsReasons0(lang),
            aiWhyUsReasons1(lang),
            aiWhyUsReasons2(lang)
          ]
        }
      },
      description: aiDescription(lang),
      iconUrl: `/images/services/${ServiceSlug.InferenceAI}/icon.svg`,
      imageIconUrl: `/images/services/${ServiceSlug.InferenceAI}/image-icon.svg`,
      imageUrl: `/images/services/${ServiceSlug.InferenceAI}/image.webp`,
      shortDescription: aiHeroDesc(lang),
      slug: ServiceSlug.InferenceAI,
      title: aiHeroHeading(lang),
      caseStudies: [
        {
          slug: "startgpt",
          title: "StartGPT",
          description: startGptHeroDesc(lang),
          category: inferenceaiCaseStudies2Category(lang),
          basePath: "inferenceai"
        },
        {
          slug: "media-pulse",
          title: "MediaPulse",
          description: mediaPulseHeroHeading(lang),
          category: inferenceaiCaseStudies2Category(lang),
          basePath: "inferenceai"
        }
      ]
    },
    {
      bestFor: erpBestFor(lang),
      content: {
        what: `${erpWhatIsDesc(lang)}<br /><br />${erpWhatIsHighlight(lang)}`,
        who: {
          description: erpWhoIsItDesc(lang),
          imageUrl: `/images/services/${ServiceSlug.ErpImplementation}/who-is-it.svg`,
          items: [
            erpWhoIsItTarget0(lang),
            erpWhoIsItTarget1(lang),
            erpWhoIsItTarget2(lang),
            erpWhoIsItTarget3(lang)
          ]
        },
        deliverables: {
          description: erpWhatWeDeliverDesc(lang),
          items: [
            {
              description: erpWhatWeDeliverCard0Text(lang),
              iconUrl: `/images/services/${ServiceSlug.ErpImplementation}/what-we-deliver-icon-1.svg`,
              items: [
                erpWhatWeDeliverCard0Items0(lang),
                erpWhatWeDeliverCard0Items1(lang),
                erpWhatWeDeliverCard0Items2(lang),
                erpWhatWeDeliverCard0Items3(lang)
              ],
              title: erpWhatWeDeliverCard0Title(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.ErpImplementation}/what-we-deliver-icon-2.svg`,
              title: erpWhatWeDeliverCard1Title(lang),
              items: [
                erpWhatWeDeliverCard1Items0(lang),
                erpWhatWeDeliverCard1Items1(lang),
                erpWhatWeDeliverCard1Items2(lang),
                erpWhatWeDeliverCard1Items3(lang)
              ],
              description: erpWhatWeDeliverCard1Text(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.ErpImplementation}/what-we-deliver-icon-3.svg`,
              title: erpWhatWeDeliverCard2Title(lang),
              items: [
                erpWhatWeDeliverCard2Items0(lang),
                erpWhatWeDeliverCard2Items1(lang),
                erpWhatWeDeliverCard2Items2(lang),
                erpWhatWeDeliverCard2Items3(lang)
              ],
              description: erpWhatWeDeliverCard2Text(lang)
            }
          ]
        },
        how: {
          description: erpHowItWorksDesc(lang),
          items: [
            {
              iconUrl: `/images/services/${ServiceSlug.ErpImplementation}/how-it-works-icon-1.svg`,
              description: erpHowItWorksStep0Text(lang),
              title: erpHowItWorksStep0Title(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.ErpImplementation}/how-it-works-icon-2.svg`,
              description: erpHowItWorksStep1Text(lang),
              title: erpHowItWorksStep1Title(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.ErpImplementation}/how-it-works-icon-3.svg`,
              description: erpHowItWorksStep2Text(lang),
              title: erpHowItWorksStep2Title(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.ErpImplementation}/how-it-works-icon-4.svg`,
              description: erpHowItWorksStep3Text(lang),
              title: erpHowItWorksStep3Title(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.ErpImplementation}/how-it-works-icon-5.svg`,
              description: erpHowItWorksStep4Text(lang),
              title: erpHowItWorksStep4Title(lang)
            }
          ]
        },
        whatYouGet: {
          description: erpWhatYouGetDesc(lang),
          imageUrl: `/images/services/${ServiceSlug.ErpImplementation}/what-you-get.svg`,
          items: [
            erpWhatYouGetItems0(lang),
            erpWhatYouGetItems1(lang),
            erpWhatYouGetItems2(lang),
            erpWhatYouGetItems3(lang)
          ]
        },
        why: {
          backgroundImageUrl: `/images/services/${ServiceSlug.ErpImplementation}/why-us-bg.png`,
          clients: [],
          description: erpWhyUsDesc(lang),
          imageUrl: `/images/services/${ServiceSlug.ErpImplementation}/why-us.svg`,
          items: [
            erpWhyUsReasons0(lang),
            erpWhyUsReasons1(lang),
            erpWhyUsReasons2(lang)
          ]
        }
      },
      description: erpDescription(lang),
      iconUrl: `/images/services/${ServiceSlug.ErpImplementation}/icon.svg`,
      imageIconUrl: `/images/services/${ServiceSlug.ErpImplementation}/image-icon.svg`,
      imageUrl: `/images/services/${ServiceSlug.ErpImplementation}/image.webp`,
      shortDescription: erpHeroDesc(lang),
      slug: ServiceSlug.ErpImplementation,
      title: erpHeroHeading(lang),
      caseStudies: []
    },
    {
      bestFor: ctoaasBestFor(lang),
      content: {
        what: `${ctoaasWhatIsCtoaasDesc(lang)}<br /><br />${ctoaasWhatIsCtoaasHighlight(lang)}`,
        who: {
          description: ctoaasWhoIsItDesc(lang),
          imageUrl: `/images/services/${ServiceSlug.CtoAsAService}/who-is-it.png`,
          items: [
            ctoaasWhoIsItTarget0(lang),
            ctoaasWhoIsItTarget1(lang),
            ctoaasWhoIsItTarget2(lang),
            ctoaasWhoIsItTarget3(lang)
          ]
        },
        deliverables: {
          description: tddWhatWeDeliverDesc(lang),
          items: [
            {
              description: ctoaasWhatWeDeliverCard0Text(lang),
              iconUrl: `/images/services/${ServiceSlug.CtoAsAService}/what-we-deliver-icon-1.svg`,
              items: [
                ctoaasWhatWeDeliverCard0Items0(lang),
                ctoaasWhatWeDeliverCard0Items1(lang),
                ctoaasWhatWeDeliverCard0Items2(lang),
                ctoaasWhatWeDeliverCard0Items3(lang)
              ],
              title: ctoaasWhatWeDeliverCard0Title(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.CtoAsAService}/what-we-deliver-icon-2.svg`,
              title: ctoaasWhatWeDeliverCard1Title(lang),
              items: [
                ctoaasWhatWeDeliverCard1Items0(lang),
                ctoaasWhatWeDeliverCard1Items1(lang),
                ctoaasWhatWeDeliverCard1Items2(lang),
                ctoaasWhatWeDeliverCard1Items3(lang)
              ],
              description: ctoaasWhatWeDeliverCard1Text(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.CtoAsAService}/what-we-deliver-icon-3.svg`,
              title: ctoaasWhatWeDeliverCard2Title(lang),
              items: [
                ctoaasWhatWeDeliverCard2Items0(lang),
                ctoaasWhatWeDeliverCard2Items1(lang),
                ctoaasWhatWeDeliverCard2Items2(lang),
                ctoaasWhatWeDeliverCard2Items3(lang)
              ],
              description: ctoaasWhatWeDeliverCard2Text(lang)
            }
          ]
        },
        how: {
          description: ctoaasHowItWorksDesc(lang),
          items: [
            {
              iconUrl: `/images/services/${ServiceSlug.SoftwareAsAService}/how-it-works-icon-1.svg`,
              description: ctoaasHowItWorksStep0Text(lang),
              title: ctoaasHowItWorksStep0Title(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.SoftwareAsAService}/how-it-works-icon-2.svg`,
              description: ctoaasHowItWorksStep1Text(lang),
              title: ctoaasHowItWorksStep1Title(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.SoftwareAsAService}/how-it-works-icon-3.svg`,
              description: ctoaasHowItWorksStep2Text(lang),
              title: ctoaasHowItWorksStep2Title(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.SoftwareAsAService}/how-it-works-icon-4.svg`,
              description: ctoaasHowItWorksStep3Text(lang),
              title: ctoaasHowItWorksStep3Title(lang)
            }
          ]
        },
        whatYouGet: {
          description: ctoaasWhatYouGetDesc(lang),
          imageUrl: `/images/services/${ServiceSlug.CtoAsAService}/what-you-get.svg`,
          items: [
            ctoaasWhatYouGetItems0(lang),
            ctoaasWhatYouGetItems1(lang),
            ctoaasWhatYouGetItems2(lang),
            ctoaasWhatYouGetItems3(lang)
          ]
        },
        why: {
          backgroundImageUrl: `/images/services/${ServiceSlug.CtoAsAService}/why-us-bg.webp`,
          clients: [
            {
              imageUrl: `/images/services/${ServiceSlug.CtoAsAService}/clients/idn-media.png`,
              name: "IDN Media"
            },
            {
              imageUrl: `/images/services/${ServiceSlug.CtoAsAService}/clients/ismaya.png`,
              name: "Ismaya"
            },
            {
              imageUrl: `/images/services/${ServiceSlug.CtoAsAService}/clients/aruna.png`,
              name: "Aruna"
            },
            {
              imageUrl: `/images/services/${ServiceSlug.CtoAsAService}/clients/my-republic.svg`,
              name: "My Republic"
            },
            {
              imageUrl: `/images/services/${ServiceSlug.CtoAsAService}/clients/cashbac.png`,
              name: "Cashbac"
            },
            {
              imageUrl: `/images/services/${ServiceSlug.CtoAsAService}/clients/ausvet.png`,
              name: "Ausvet"
            },
            {
              imageUrl: `/images/services/${ServiceSlug.CtoAsAService}/clients/cohive.png`,
              name: "CoHive"
            }
          ],
          description: ctoaasWhyUsDesc(lang),
          imageUrl: `/images/services/${ServiceSlug.CtoAsAService}/why-us.svg`,
          items: [
            ctoaasWhyUsReasons0(lang),
            ctoaasWhyUsReasons1(lang),
            ctoaasWhyUsReasons2(lang),
            ctoaasWhyUsReasons3(lang)
          ]
        }
      },
      description: ctoaasDescription(lang),
      iconUrl: `/images/services/${ServiceSlug.CtoAsAService}/icon.svg`,
      imageIconUrl: `/images/services/${ServiceSlug.CtoAsAService}/image-icon.svg`,
      imageUrl: `/images/services/${ServiceSlug.CtoAsAService}/image.webp`,
      shortDescription: ctoaasHeroDesc(lang),
      slug: ServiceSlug.CtoAsAService,
      title: ctoaasHeroHeading(lang),
      caseStudies: [
        {
          slug: "erp-fisheries",
          title: caseStudyErpFisheriesTitle(lang),
          description: caseStudyErpFisheriesDesc(lang),
          category: caseStudyErpFisheriesCategory(lang),
          basePath: "case-studies"
        },
        {
          slug: "ctoaas-media",
          title: caseStudyCtoaasMediaTitle(lang),
          description: caseStudyCtoaasMediaDesc(lang),
          category: caseStudyCtoaasMediaCategory(lang),
          basePath: "case-studies"
        }
      ]
    },
    {
      bestFor: saasBestFor(lang),
      content: {
        what: `${saasWhatIsSaasDesc(lang)}<br /><br />${saasWhatIsSaasHighlight(lang)}`,
        who: {
          description: saasWhoIsItDesc(lang),
          imageUrl: `/images/services/${ServiceSlug.SoftwareAsAService}/who-is-it.svg`,
          items: [
            saasWhoIsItTarget0(lang),
            saasWhoIsItTarget1(lang),
            saasWhoIsItTarget2(lang),
            saasWhoIsItTarget3(lang)
          ]
        },
        deliverables: {
          description: saasWhatWeDeliverDesc(lang),
          items: [
            {
              description: saasWhatWeDeliverCard0Text(lang),
              iconUrl: `/images/services/${ServiceSlug.SoftwareAsAService}/what-we-deliver-icon-1.svg`,
              items: [
                saasWhatWeDeliverCard0Items0(lang),
                saasWhatWeDeliverCard0Items1(lang),
                saasWhatWeDeliverCard0Items2(lang)
              ],
              title: saasWhatWeDeliverCard0Title(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.SoftwareAsAService}/what-we-deliver-icon-2.svg`,
              title: saasWhatWeDeliverCard1Title(lang),
              items: [
                saasWhatWeDeliverCard1Items0(lang),
                saasWhatWeDeliverCard1Items1(lang),
                saasWhatWeDeliverCard1Items2(lang)
              ],
              description: saasWhatWeDeliverCard1Text(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.SoftwareAsAService}/what-we-deliver-icon-3.svg`,
              title: saasWhatWeDeliverCard2Title(lang),
              items: [
                saasWhatWeDeliverCard2Items0(lang),
                saasWhatWeDeliverCard2Items1(lang),
                saasWhatWeDeliverCard2Items2(lang)
              ],
              description: saasWhatWeDeliverCard2Text(lang)
            }
          ]
        },
        how: {
          description: saasHowItWorksDesc(lang),
          items: [
            {
              iconUrl: `/images/services/${ServiceSlug.SoftwareAsAService}/how-it-works-icon-1.svg`,
              description: saasHowItWorksStep0Text(lang),
              title: saasHowItWorksStep0Title(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.SoftwareAsAService}/how-it-works-icon-2.svg`,
              description: saasHowItWorksStep1Text(lang),
              title: saasHowItWorksStep1Title(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.SoftwareAsAService}/how-it-works-icon-3.svg`,
              description: saasHowItWorksStep2Text(lang),
              title: saasHowItWorksStep2Title(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.SoftwareAsAService}/how-it-works-icon-4.svg`,
              description: saasHowItWorksStep3Text(lang),
              title: saasHowItWorksStep3Title(lang)
            }
          ]
        },
        whatYouGet: {
          description: saasWhatYouGetDesc(lang),
          imageUrl: `/images/services/${ServiceSlug.SoftwareAsAService}/what-you-get.svg`,
          items: [
            saasWhatYouGetItems0(lang),
            saasWhatYouGetItems1(lang),
            saasWhatYouGetItems2(lang),
            saasWhatYouGetItems3(lang)
          ]
        },
        why: {
          backgroundImageUrl: `/images/services/${ServiceSlug.SoftwareAsAService}/why-us-bg.png`,
          clients: [],
          description: saasWhyUsDesc(lang),
          imageUrl: `/images/services/${ServiceSlug.SoftwareAsAService}/why-us.svg`,
          items: [
            saasWhyUsReasons0(lang),
            saasWhyUsReasons1(lang),
            saasWhyUsReasons2(lang)
          ]
        }
      },
      description: saasDescription(lang),
      iconUrl: `/images/services/${ServiceSlug.SoftwareAsAService}/icon.svg`,
      imageIconUrl: `/images/services/${ServiceSlug.SoftwareAsAService}/image-icon.svg`,
      imageUrl: `/images/services/${ServiceSlug.SoftwareAsAService}/image.webp`,
      shortDescription: saasHeroDesc(lang),
      slug: ServiceSlug.SoftwareAsAService,
      title: saasHeroHeading(lang),
      caseStudies: []
    },
    {
      bestFor: tddBestFor(lang),
      content: {
        what: `${tddWhatIsTddDesc(lang)}<br /><br />${tddWhatIsTddHighlight(lang)}`,
        who: {
          description: tddWhoIsItDesc(lang),
          imageUrl: `/images/services/${ServiceSlug.TechDueDiligence}/who-is-it.png`,
          items: [
            tddWhoIsItTarget0(lang),
            tddWhoIsItTarget1(lang),
            tddWhoIsItTarget2(lang),
            tddWhoIsItTarget3(lang)
          ]
        },
        deliverables: {
          description: tddWhatWeDeliverDesc(lang),
          items: [
            {
              description: tddWhatWeDeliverCard0Text(lang),
              iconUrl: `/images/services/${ServiceSlug.TechDueDiligence}/what-we-deliver-icon-1.svg`,
              items: [
                tddWhatWeDeliverCard0Items0(lang),
                tddWhatWeDeliverCard0Items1(lang),
                tddWhatWeDeliverCard0Items2(lang),
                tddWhatWeDeliverCard0Items3(lang)
              ],
              title: tddWhatWeDeliverCard0Title(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.TechDueDiligence}/what-we-deliver-icon-2.svg`,
              title: tddWhatWeDeliverCard1Title(lang),
              items: [
                tddWhatWeDeliverCard1Items0(lang),
                tddWhatWeDeliverCard1Items1(lang),
                tddWhatWeDeliverCard1Items2(lang),
                tddWhatWeDeliverCard1Items3(lang)
              ],
              description: tddWhatWeDeliverCard1Text(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.TechDueDiligence}/what-we-deliver-icon-3.svg`,
              title: tddWhatWeDeliverCard2Title(lang),
              items: [
                tddWhatWeDeliverCard2Items0(lang),
                tddWhatWeDeliverCard2Items1(lang),
                tddWhatWeDeliverCard2Items2(lang),
                tddWhatWeDeliverCard2Items3(lang)
              ],
              description: tddWhatWeDeliverCard2Text(lang)
            }
          ]
        },
        how: {
          description: tddHowItWorksDesc(lang),
          items: [
            {
              iconUrl: `/images/services/${ServiceSlug.TechDueDiligence}/how-it-works-icon-1.svg`,
              description: tddHowItWorksStep0Text(lang),
              title: tddHowItWorksStep0Title(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.TechDueDiligence}/how-it-works-icon-2.svg`,
              description: tddHowItWorksStep1Text(lang),
              title: tddHowItWorksStep1Title(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.TechDueDiligence}/how-it-works-icon-3.svg`,
              description: tddHowItWorksStep2Text(lang),
              title: tddHowItWorksStep2Title(lang)
            },
            {
              iconUrl: `/images/services/${ServiceSlug.TechDueDiligence}/how-it-works-icon-4.svg`,
              description: tddHowItWorksStep3Text(lang),
              title: tddHowItWorksStep3Title(lang)
            }
          ]
        },
        whatYouGet: {
          description: tddWhatYouGetDesc(lang),
          imageUrl: `/images/services/${ServiceSlug.TechDueDiligence}/what-you-get.svg`,
          items: [
            tddWhatYouGetItems0(lang),
            tddWhatYouGetItems1(lang),
            tddWhatYouGetItems2(lang),
            tddWhatYouGetItems3(lang)
          ]
        },
        why: {
          backgroundImageUrl: `/images/services/${ServiceSlug.TechDueDiligence}/why-us-bg.png`,
          clients: [
            {
              imageUrl: `/images/services/${ServiceSlug.TechDueDiligence}/clients/bali-united.svg`,
              name: "Bali United"
            },
            {
              imageUrl: `/images/services/${ServiceSlug.TechDueDiligence}/clients/btn.svg`,
              name: "BTN"
            },
            {
              imageUrl: `/images/services/${ServiceSlug.TechDueDiligence}/clients/my-republic.svg`,
              name: "My Republic"
            },
            {
              imageUrl: `/images/services/${ServiceSlug.TechDueDiligence}/clients/smdv.svg`,
              name: "SMDV"
            },
            {
              imageUrl: `/images/services/${ServiceSlug.TechDueDiligence}/clients/trimegah.svg`,
              name: "Trimegah"
            }
          ],
          description: tddWhyUsDesc(lang),
          imageUrl: `/images/services/${ServiceSlug.TechDueDiligence}/why-us.svg`,
          items: [
            tddWhyUsReasons0(lang),
            tddWhyUsReasons1(lang),
            tddWhyUsReasons2(lang)
          ]
        }
      },
      description: tddDescription(lang),
      iconUrl: `/images/services/${ServiceSlug.TechDueDiligence}/icon.svg`,
      imageIconUrl: `/images/services/${ServiceSlug.TechDueDiligence}/image-icon.svg`,
      imageUrl: `/images/services/${ServiceSlug.TechDueDiligence}/image.webp`,
      shortDescription: tddHeroDesc(lang),
      slug: ServiceSlug.TechDueDiligence,
      title: tddHeroHeading(lang),
      caseStudies: []
    }
  ];
}

type ServiceBySlugParameters = {
  lang: SupportedLanguage;
  slug: ServiceSlug;
};

export function serviceBySlug({ lang, slug }: ServiceBySlugParameters) {
  return services(lang).find((service) => service.slug === slug);
}

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
