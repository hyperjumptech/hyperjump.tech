import ERPImplementationLangLayout from "./[lang]/layout";
import ERPImplementationPage from "./[lang]/page";

export default function NoLangERPImplementation() {
  return (
    <ERPImplementationLangLayout params={Promise.resolve({ lang: "en" })}>
      <ERPImplementationPage params={Promise.resolve({ lang: "en" })} />
    </ERPImplementationLangLayout>
  );
}
