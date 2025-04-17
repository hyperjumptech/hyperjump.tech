import Faqs from "./faqs";
import AboutUs from "./about-us";
import CaseStudies from "./case-studies";
import WhyWorkWithUs from "./why-work-with-us";
import { PartnersList } from "./partner-list";

export default function Home() {
  return (
    <>
      <PartnersList />
      <WhyWorkWithUs />
      <CaseStudies />
      <AboutUs />
      <Faqs />
    </>
  );
}
