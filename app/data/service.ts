import type { ReactNode } from "react";
import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  ctoaasHeroDesc,
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
  ctoaasWhatWeDeliverDesc,
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
  mainServices0Text,
  servicesCtoaasDesc,
  servicesCtoaasItems0,
  servicesCtoaasItems1,
  servicesCtoaasItems2,
  servicesCtoaasText,
  servicesCtoaasTitle
} from "@/locales/.generated/server";

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
    clients: { imageUrl: string; name: string }[];
  } & ListSection;
};

export type Service = {
  bestFor: string;
  content: Content;
  description: string;
  features: string[];
  iconUrl: string;
  imageIconUrl: string;
  imageUrl: string;
  shortDescription: string;
  slug: string;
  title: string;
};

export enum ServiceSlug {
  CtoAsAService = "cto-as-a-service"
}

export function services(lang: SupportedLanguage): Service[] {
  return [
    {
      bestFor: servicesCtoaasDesc(lang),
      content: {
        what: `${ctoaasWhatIsCtoaasDesc(lang)}<br /><br />${ctoaasWhatIsCtoaasHighlight(lang)}`,
        who: {
          description: ctoaasWhoIsItDesc(lang),
          imageUrl: "/images/services/ctoaas/who-is-it.png",
          items: [
            ctoaasWhoIsItTarget0(lang),
            ctoaasWhoIsItTarget1(lang),
            ctoaasWhoIsItTarget2(lang),
            ctoaasWhoIsItTarget3(lang)
          ]
        },
        deliverables: {
          description: ctoaasWhatWeDeliverDesc(lang),
          items: [
            {
              description: ctoaasWhatWeDeliverCard0Text(lang),
              iconUrl: "/images/services/ctoaas/what-we-deliver-icon-1.svg",
              items: [
                ctoaasWhatWeDeliverCard0Items0(lang),
                ctoaasWhatWeDeliverCard0Items1(lang),
                ctoaasWhatWeDeliverCard0Items2(lang),
                ctoaasWhatWeDeliverCard0Items3(lang)
              ],
              title: ctoaasWhatWeDeliverCard0Title(lang)
            },
            {
              iconUrl: "/images/services/ctoaas/what-we-deliver-icon-2.svg",
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
              iconUrl: "/images/services/ctoaas/what-we-deliver-icon-3.svg",
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
              iconUrl: "/images/services/ctoaas/how-it-works-icon-1.svg",
              description: ctoaasHowItWorksStep0Text(lang),
              title: ctoaasHowItWorksStep0Title(lang)
            },
            {
              iconUrl: "/images/services/ctoaas/how-it-works-icon-2.svg",
              description: ctoaasHowItWorksStep1Text(lang),
              title: ctoaasHowItWorksStep1Title(lang)
            },
            {
              iconUrl: "/images/services/ctoaas/how-it-works-icon-3.svg",
              description: ctoaasHowItWorksStep2Text(lang),
              title: ctoaasHowItWorksStep2Title(lang)
            },
            {
              iconUrl: "/images/services/ctoaas/how-it-works-icon-4.svg",
              description: ctoaasHowItWorksStep3Text(lang),
              title: ctoaasHowItWorksStep3Title(lang)
            }
          ]
        },
        whatYouGet: {
          description: ctoaasWhatYouGetDesc(lang),
          imageUrl: "/images/services/ctoaas/what-you-get.svg",
          items: [
            ctoaasWhatYouGetItems0(lang),
            ctoaasWhatYouGetItems1(lang),
            ctoaasWhatYouGetItems2(lang),
            ctoaasWhatYouGetItems3(lang)
          ]
        },
        why: {
          clients: [
            {
              imageUrl: "/images/services/ctoaas/clients/idn-media.png",
              name: "IDN Media"
            },
            {
              imageUrl: "/images/services/ctoaas/clients/ismaya.png",
              name: "Ismaya"
            },
            {
              imageUrl: "/images/services/ctoaas/clients/aruna.png",
              name: "Aruna"
            },
            {
              imageUrl: "/images/services/ctoaas/clients/my-republic.svg",
              name: "My Republic"
            },
            {
              imageUrl: "/images/services/ctoaas/clients/cashbac.png",
              name: "Cashbac"
            },
            {
              imageUrl: "/images/services/ctoaas/clients/ausvet.png",
              name: "Ausvet"
            },
            {
              imageUrl: "/images/services/ctoaas/clients/cohive.png",
              name: "CoHive"
            }
          ],
          description: ctoaasWhyUsDesc(lang),
          imageUrl: "/images/services/ctoaas/why-us.svg",
          items: [
            ctoaasWhyUsReasons0(lang),
            ctoaasWhyUsReasons1(lang),
            ctoaasWhyUsReasons2(lang),
            ctoaasWhyUsReasons3(lang)
          ]
        }
      },
      description: mainServices0Text(lang),
      features: [
        servicesCtoaasItems0(lang),
        servicesCtoaasItems1(lang),
        servicesCtoaasItems2(lang)
      ],
      iconUrl: "/images/services/cto-as-a-service.svg",
      imageIconUrl: "/images/services/ctoaas-icon.svg",
      imageUrl: "/images/services/ctoaas.webp",
      shortDescription: servicesCtoaasText(lang),
      slug: ServiceSlug.CtoAsAService,
      title: servicesCtoaasTitle(lang)
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
