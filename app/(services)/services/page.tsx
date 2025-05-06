import ServicesLangLayout from "./[lang]/layout";
import ServicesPage from "./[lang]/page";

export default function NoLangServices() {
  return (
    <ServicesLangLayout params={Promise.resolve({ lang: "en" })}>
      <ServicesPage params={Promise.resolve({ lang: "en" })} />
    </ServicesLangLayout>
  );
}
