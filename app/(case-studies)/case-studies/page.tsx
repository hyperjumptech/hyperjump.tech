import CaseStudiesLangLayout from "./[lang]/layout";
import CaseStudiesPage from "./[lang]/page";

export default function NoLangCaseStudies() {
  return (
    <CaseStudiesLangLayout params={Promise.resolve({ lang: "en" })}>
      <CaseStudiesPage params={Promise.resolve({ lang: "en" })} />
    </CaseStudiesLangLayout>
  );
}
