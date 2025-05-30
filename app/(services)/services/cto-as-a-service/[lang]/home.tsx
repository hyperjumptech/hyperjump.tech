import Image from "next/image";
import { notFound } from "next/navigation";

import { type Service, serviceBySlug, ServiceSlug } from "@/app/data/service";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  servicesWhoIsItFor,
  servicesWhatWeDeliver,
  servicesHowItWorks,
  servicesWhatYouGet,
  servicesWhyHyperjump
} from "@/locales/.generated/server";

type HomeProps = { lang: SupportedLanguage };

export default function Home({ lang }: HomeProps) {
  const service = serviceBySlug({ lang, slug: ServiceSlug.CtoAsAService });

  if (!service) {
    notFound();
  }

  return (
    <>
      <About service={service} />
      <WhoIsIt lang={lang} service={service} />
      <WhatWeDeliver lang={lang} service={service} />
      <HowItWorks lang={lang} service={service} />
      <WhatYouGet lang={lang} service={service} />
      <WhyUs lang={lang} service={service} />
    </>
  );
}

type LangProps = {
  lang: SupportedLanguage;
};

type ServiceProps = {
  service: Service;
};

export function About({ service }: ServiceProps) {
  const {
    content: { what },
    title
  } = service;

  return (
    <section className="bg-[#F6F8F9] py-8 md:py-16">
      <div className="text-hyperjump-black mx-auto flex w-full max-w-4xl flex-wrap items-center px-4 py-10 md:px-16 md:py-20 xl:px-0">
        <h2 className="mb-5 text-[34px] font-medium md:text-4xl">{title}</h2>
        <p
          className="text-xl leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: `${what}`
          }}
        />
      </div>
    </section>
  );
}

export function WhoIsIt({ lang, service }: LangProps & ServiceProps) {
  const {
    content: {
      who: { description, imageUrl, items }
    }
  } = service;

  return (
    <section className="flex bg-white px-4 py-8 md:px-20 md:py-16">
      <div className="xxl:max-w-7xl mx-auto flex w-full max-w-6xl flex-col items-center gap-6 md:flex-row">
        <div className="relative w-full xl:w-1/2">
          <Image
            src="/images/services/background.webp"
            alt={servicesWhoIsItFor(lang)}
            className="h-auto w-full rounded-2xl"
            width={660}
            height={400}
          />
          <div className="absolute top-10 left-1/2 flex w-full -translate-x-1/2 items-center justify-center px-4">
            <Image
              className="h-auto w-2/3 xl:w-8/12"
              src={imageUrl}
              alt={`${servicesWhoIsItFor(lang)} icon`}
              width={500}
              height={380}
            />
          </div>
        </div>

        <div className="w-full xl:mt-0 xl:w-1/2">
          <h2 className="text-hyperjump-black text-left text-[28px] font-medium md:mb-4 md:text-4xl">
            {servicesWhoIsItFor(lang)}
          </h2>
          <p className="mb-2 text-left text-lg text-gray-700">{description}</p>
          <ul className="list-none space-y-4 text-left text-base text-gray-700 md:text-lg [&_b]:mt-4 [&_b]:block">
            {items.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Image
                  src="/images/checklist.svg"
                  width="24"
                  height="24"
                  alt="icon"
                />
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function WhatWeDeliver({ lang, service }: LangProps & ServiceProps) {
  const {
    content: {
      deliverables: { description, items }
    }
  } = service;

  return (
    <section className="bg-white py-16">
      <div className="text-hyperjump-black xxl:max-w-7xl mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-4 py-8 text-center md:px-20 md:py-16 xl:px-0">
        <h3 className="mb-5 text-[34px] font-medium md:text-4xl">
          {servicesWhatWeDeliver(lang)}
        </h3>
        <p className="text-hyperjump-gray mt-2 max-w-lg">{description}</p>
        <div className="mt-6 grid w-full grid-cols-1 gap-6 md:mt-12 md:grid-cols-3 xl:grid-cols-3">
          {items.map(({ description, iconUrl, items, title }) => (
            <div
              key={title}
              className="rounded-xl bg-white p-6 text-left shadow-md transition hover:shadow-lg">
              <Avatar className="mb-3 flex h-14 w-14 items-center justify-center rounded-md border p-2 shadow-[0px_4px_14px_0px_#3276F533] md:mb-6">
                <AvatarImage className="h-7 w-7" src={iconUrl} alt={title} />
              </Avatar>
              <h2 className="text-hyperjump-black mb-2 text-lg font-medium md:text-xl">
                {title}
              </h2>
              <p className="text-hyperjump-gray mb-4 md:text-lg">
                {description}
              </p>
              <ul className="text-hyperjump-gray list-outside list-disc space-y-1 pl-4 [&_b]:mt-4 [&_b]:block">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks({ lang, service }: LangProps & ServiceProps) {
  const {
    content: {
      how: { description, items }
    }
  } = service;

  return (
    <section className="bg-[#F6F8F9] py-16">
      <div className="text-hyperjump-black xxl:max-w-7xl mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center">
        <h2 className="mb-5 text-[34px] font-medium md:text-4xl">
          {servicesHowItWorks(lang)}
        </h2>
        <p
          className="text-hyperjump-gray mt-2 mb-10 md:max-w-xl"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="relative space-y-10 xl:max-w-lg">
          <div className="bg-dashed absolute top-6 bottom-6 left-5 z-0 w-px bg-gray-300" />
          {items.map(({ description, iconUrl, title }) => (
            <div key={title} className="relative z-10 flex items-start">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white p-2 shadow">
                <Image
                  width={28}
                  height={28}
                  src={iconUrl}
                  alt={`${title} icon`}
                  className="h-7 w-7"
                />
              </div>
              <div className="ml-4 text-left">
                <h3 className="font-meidum text-hyperjump-black text-xl">
                  {title}
                </h3>
                <p className="text-hyperjump-gray mt-1 text-sm md:text-base">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhatYouGet({ lang, service }: LangProps & ServiceProps) {
  const {
    content: {
      whatYouGet: { description, imageUrl, items }
    }
  } = service;

  return (
    <section className="flex bg-white px-4 py-8 md:px-20 md:py-16">
      <div className="xxl:max-w-7xl mx-auto flex w-full max-w-6xl flex-col items-center gap-6 md:flex-row-reverse">
        <div className="relative w-full xl:w-1/2">
          <Image
            src={imageUrl}
            alt={servicesWhatYouGet(lang)}
            className="h-auto w-full rounded-2xl"
            width={660}
            height={400}
          />
        </div>
        <div className="w-full xl:mt-0 xl:w-1/2">
          <h3 className="text-hyperjump-black text-left text-[28px] font-medium md:mb-4 md:text-4xl">
            {servicesWhatYouGet(lang)}
          </h3>
          <p className="mb-2 text-left text-lg text-gray-700">{description}</p>
          <ul className="list-none space-y-4 text-left text-base text-gray-700 md:text-lg [&_b]:mt-4 [&_b]:block">
            {items.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Image
                  src="/images/checklist.svg"
                  width="24"
                  height="24"
                  alt="Checklist icon"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function WhyUs({ lang, service }: LangProps & ServiceProps) {
  const {
    content: {
      why: { backgroundImageUrl, clients, description, imageUrl, items }
    }
  } = service;
  return (
    <section className="flex bg-white px-4 py-8 md:px-20 md:py-16">
      <div className="xxl:max-w-7xl mx-auto flex w-full max-w-6xl flex-col items-center gap-6 md:flex-row">
        <div className="relative w-full xl:w-1/2">
          <Image
            src={backgroundImageUrl}
            alt={servicesWhyHyperjump(lang)}
            className="h-auto w-full rounded-2xl"
            width={660}
            height={400}
          />
          <div className="absolute top-10 left-1/2 flex w-full -translate-x-1/2 items-center justify-center px-4">
            <Image
              className="h-auto w-2/3 xl:w-8/12"
              src={imageUrl}
              alt={`${servicesWhyHyperjump(lang)} icon`}
              width={500}
              height={380}
            />
          </div>
        </div>
        <div className="w-full xl:mt-0 xl:w-1/2">
          <h3 className="text-hyperjump-black text-left text-[28px] font-medium md:mb-4 md:text-4xl">
            {servicesWhyHyperjump(lang)}
          </h3>
          <p className="mb-2 text-left text-lg text-gray-700">{description}</p>
          <ul className="list-none space-y-4 text-left text-base text-gray-700 md:text-lg [&_b]:mt-4 [&_b]:block">
            {items.map((item) => (
              <li key={item?.toString()} className="flex items-center gap-2">
                <Image
                  src="/images/checklist.svg"
                  width="24"
                  height="24"
                  alt="Checklist icon"
                />
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-row flex-wrap gap-5">
            {clients.map(({ imageUrl, name }) => (
              <Image
                alt={name}
                className="inline h-6 w-auto border-r border-gray-300 object-contain pr-2"
                src={imageUrl}
                key={name}
                width={140}
                height={24}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
