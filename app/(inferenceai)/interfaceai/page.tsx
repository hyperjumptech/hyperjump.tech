import AboutUs from "./components/about-us";
import CaseStudies from "./components/case-studies";
import Faqs from "./components/faqs";
import HowItWorks from "./components/how-it-works";
import { PartnersList } from "./components/partner-list";
import WhatYouGet from "./components/what-you-get";
import WhyWorkWithUs from "./components/why-work-with-us";

export default function InterfaceAI() {
  return (
    <>
      <PartnersList />
      <WhyWorkWithUs />
      <HowItWorks />
      <WhatYouGet />
      <CaseStudies />
      <AboutUs />
      <Faqs />
    </>
  );
}
