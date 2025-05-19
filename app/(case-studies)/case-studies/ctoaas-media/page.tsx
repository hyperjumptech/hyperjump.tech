import CtoaasMediaLangLayout from "./[lang]/layout";
import CtoaasMediaPage from "./[lang]/page";

export default function NoLangCtoaasMedia() {
  return (
    <CtoaasMediaLangLayout params={Promise.resolve({ lang: "en" })}>
      <CtoaasMediaPage params={Promise.resolve({ lang: "en" })} />
    </CtoaasMediaLangLayout>
  );
}
